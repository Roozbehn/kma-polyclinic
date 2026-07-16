import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendMetaCapIEvent, type MetaStandardEvent } from "@/lib/meta/capi";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

const limiter = createMemoryRateLimiter({ limit: 40, windowMs: 60_000 });

const schema = z.object({
  eventName: z.enum([
    "ViewContent",
    "Contact",
    "Schedule",
    "FindLocation",
    "Lead",
    "PageView",
  ]),
  eventId: z.string().min(8).max(80),
  eventSourceUrl: z.string().url().max(2000),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  firstName: z.string().max(80).optional().or(z.literal("")),
  lastName: z.string().max(80).optional().or(z.literal("")),
  /** Facebook Login ID — plain text, not hashed. */
  fbLoginId: z.string().max(64).optional().or(z.literal("")),
  externalId: z.string().max(120).optional().or(z.literal("")),
  country: z.string().max(8).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(200).optional(),
  customData: z
    .record(z.string(), z.union([z.string(), z.number(), z.array(z.string())]))
    .optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!limiter.check(ip).ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const d = parsed.data;
  const result = await sendMetaCapIEvent({
    eventName: d.eventName as MetaStandardEvent,
    eventId: d.eventId,
    eventSourceUrl: d.eventSourceUrl,
    user: {
      email: d.email || undefined,
      phone: d.phone || undefined,
      firstName: d.firstName || undefined,
      lastName: d.lastName || undefined,
      fbLoginId: d.fbLoginId || undefined,
      externalId: d.externalId || undefined,
      country: d.country || "tr",
      city: d.city || undefined,
      clientIpAddress: ip === "unknown" ? undefined : ip,
      clientUserAgent: req.headers.get("user-agent") || undefined,
      fbp: d.fbp,
      fbc: d.fbc,
    },
    customData: d.customData,
  });

  return NextResponse.json({ ok: result.ok, detail: result.detail });
}
