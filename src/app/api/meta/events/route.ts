import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendMetaCapIEvent, type MetaStandardEvent } from "@/lib/meta/capi";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

const limiter = createMemoryRateLimiter({ limit: 30, windowMs: 60_000 });

const schema = z.object({
  eventName: z.enum(["ViewContent", "Contact", "Schedule", "FindLocation"]),
  eventId: z.string().min(8).max(80),
  eventSourceUrl: z.string().url().max(2000),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional(),
  fbp: z.string().max(200).optional(),
  fbc: z.string().max(200).optional(),
  customData: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])).optional(),
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

  const result = await sendMetaCapIEvent({
    eventName: parsed.data.eventName as MetaStandardEvent,
    eventId: parsed.data.eventId,
    eventSourceUrl: parsed.data.eventSourceUrl,
    user: {
      email: parsed.data.email || undefined,
      phone: parsed.data.phone,
      clientIpAddress: ip === "unknown" ? undefined : ip,
      clientUserAgent: req.headers.get("user-agent") || undefined,
      fbp: parsed.data.fbp,
      fbc: parsed.data.fbc,
    },
    customData: parsed.data.customData,
  });

  return NextResponse.json({ ok: result.ok, detail: result.detail });
}
