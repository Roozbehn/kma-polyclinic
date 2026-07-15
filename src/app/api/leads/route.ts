import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { parseLeadBody } from "@/lib/leads";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

const limiter = createMemoryRateLimiter({ limit: 5, windowMs: 60_000 });

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
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "email_not_configured" }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const to = process.env.LEADS_TO_EMAIL || "info@kmapolyclinic.com.tr";
  const from = process.env.LEADS_FROM_EMAIL || "noreply@kmapolyclinic.com.tr";

  await resend.emails.send({
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
    ].join("\n"),
  });

  return NextResponse.json({ ok: true });
}
