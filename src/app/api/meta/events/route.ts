import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendMetaCapIEvent, type MetaStandardEvent } from "@/lib/meta/capi";
import {
  buildUserDataWithParamBuilder,
  setBuilderCookiesOnNextResponse,
} from "@/lib/meta/param-builder-server";
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
  fbLoginId: z.string().max(64).optional().or(z.literal("")),
  externalId: z.string().max(120).optional().or(z.literal("")),
  country: z.string().max(8).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  /** From client Param Builder — preserve case. */
  fbp: z.string().max(300).optional().or(z.literal("")),
  fbc: z.string().max(500).optional().or(z.literal("")),
  clientIp: z.string().max(80).optional().or(z.literal("")),
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

  // Meta Parameter Builder (server): fbc/fbp cookies + single-pass PII hash + best IP
  const built = buildUserDataWithParamBuilder(
    req,
    {
      email: d.email || undefined,
      phone: d.phone || undefined,
      firstName: d.firstName || undefined,
      lastName: d.lastName || undefined,
      fbLoginId: d.fbLoginId || undefined,
      externalId: d.externalId || undefined,
      country: d.country || "tr",
      city: d.city || undefined,
    },
    {
      eventSourceUrl: d.eventSourceUrl,
      clientFbp: d.fbp || undefined,
      clientFbc: d.fbc || undefined,
      clientIpFromBrowser: d.clientIp || undefined,
    },
  );

  const result = await sendMetaCapIEvent({
    eventName: d.eventName as MetaStandardEvent,
    eventId: d.eventId,
    eventSourceUrl: d.eventSourceUrl,
    userData: built.userData,
    customData: d.customData,
  });

  const res = NextResponse.json({
    ok: result.ok,
    detail: result.detail,
    /** Echo match keys presence for debugging (no raw PII). */
    match: {
      hasEm: Boolean(built.userData.em),
      hasPh: Boolean(built.userData.ph),
      hasFbp: Boolean(built.fbp),
      hasFbc: Boolean(built.fbc),
      hasIp: Boolean(built.clientIp),
    },
  });

  setBuilderCookiesOnNextResponse(res, built.cookiesToSet);
  return res;
}
