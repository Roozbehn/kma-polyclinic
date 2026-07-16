import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { parseLeadBody } from "@/lib/leads";
import { sendMetaCapIEvent } from "@/lib/meta/capi";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

const limiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });
// Note: in-memory limiter is per-instance on serverless — not a global quota.

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!limiter.check(ip).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = parseLeadBody(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Silent success for honeypot hits
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // Client also sends Schedule/Lead with browser-side event_id for Pixel dedupe.
  // Server sends a companion CAPI event with em/ph (+ name split) for high EMQ.
  const eventId = parsed.data.eventId;
  if (eventId && parsed.data.eventSourceUrl) {
    const nameParts = parsed.data.name.trim().split(/\s+/).filter(Boolean);
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;
    const digits = parsed.data.phone.replace(/\D/g, "");
    void sendMetaCapIEvent({
      eventName: "Schedule",
      eventId,
      eventSourceUrl: parsed.data.eventSourceUrl,
      user: {
        email: parsed.data.email || undefined,
        phone: parsed.data.phone,
        firstName,
        lastName,
        country: "tr",
        externalId: digits ? `lead_${digits.slice(-10)}` : undefined,
        clientIpAddress: ip === "unknown" ? undefined : ip,
        clientUserAgent: req.headers.get("user-agent") || undefined,
        fbp: parsed.data.fbp,
        fbc: parsed.data.fbc,
      },
      customData: parsed.data.department
        ? { content_name: parsed.data.department, content_category: "appointment" }
        : { content_category: "appointment" },
    }).catch((err) => console.error("[meta-capi] schedule", err));
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[leads] RESEND_API_KEY missing");
    return NextResponse.json({ error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const to = process.env.LEADS_TO_EMAIL || "info@kmapoliklinik.com.tr";
  const from = process.env.LEADS_FROM_EMAIL || "noreply@kmapoliklinik.com.tr";

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `[KMA Lead] ${parsed.data.name} (${parsed.data.locale})`,
      text: [
        `Name: ${parsed.data.name}`,
        `Phone: ${parsed.data.phone}`,
        `Email: ${parsed.data.email || "-"}`,
        `Locale: ${parsed.data.locale}`,
        `Department: ${parsed.data.department || "-"}`,
        `Message: ${parsed.data.message || "-"}`,
        `IP: ${ip}`,
      ].join("\n"),
    });
    if (error) {
      console.error("[leads] resend error", error);
      return NextResponse.json({ error: "email_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[leads] resend throw", err);
    return NextResponse.json({ error: "email_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
