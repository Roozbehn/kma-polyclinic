"use client";

import {
  ensureMetaParamBuilderReady,
  getParamBuilderIds,
} from "@/components/MetaParamBuilder";
import {
  readMetaStoredUser,
  toPixelAdvancedMatching,
  tryReadFacebookLoginId,
  writeMetaStoredUser,
  type MetaStoredUser,
} from "@/lib/meta/user-data";

export type ClientMetaEvent =
  | "ViewContent"
  | "Contact"
  | "Schedule"
  | "FindLocation"
  | "Lead"
  | "PageView";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  // Preserve original case (especially for _fbc).
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function newMetaEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Prefer Parameter Builder values; fall back to raw cookies. */
export function getMetaClickIds() {
  const fromBuilder = getParamBuilderIds();
  return {
    fbp: fromBuilder.fbp || readCookie("_fbp"),
    fbc: fromBuilder.fbc || readCookie("_fbc"),
    clientIp: fromBuilder.clientIp,
  };
}

export function resolveMetaUser(overrides?: MetaStoredUser): MetaStoredUser {
  const stored = readMetaStoredUser();
  const fbLoginId =
    overrides?.fbLoginId || stored.fbLoginId || tryReadFacebookLoginId();
  if (fbLoginId && fbLoginId !== stored.fbLoginId) {
    writeMetaStoredUser({ fbLoginId });
  }
  return {
    ...stored,
    ...overrides,
    ...(fbLoginId ? { fbLoginId } : {}),
  };
}

export function applyMetaAdvancedMatching(user?: MetaStoredUser) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return;
  const am = toPixelAdvancedMatching(user || resolveMetaUser());
  if (Object.keys(am).length === 0) return;
  window.fbq("init", pixelId, am);
}

export function trackMetaPixel(
  eventName: ClientMetaEvent,
  eventId: string,
  params?: Record<string, string | number | string[]>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params || {}, { eventID: eventId });
}

/**
 * Pixel + CAPI with shared event_id.
 * Uses Meta Parameter Builder for fbc/fbp/IP; server hashes PII once.
 */
export async function trackMetaEvent(opts: {
  eventName: ClientMetaEvent;
  eventId?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fbLoginId?: string;
  externalId?: string;
  country?: string;
  city?: string;
  customData?: Record<string, string | number | string[]>;
  eventSourceUrl?: string;
  persistUser?: boolean;
  skipPixel?: boolean;
}) {
  if (opts.persistUser) {
    writeMetaStoredUser({
      email: opts.email,
      phone: opts.phone,
      firstName: opts.firstName,
      lastName: opts.lastName,
      fbLoginId: opts.fbLoginId,
      externalId: opts.externalId,
      country: opts.country,
      city: opts.city,
    });
    applyMetaAdvancedMatching();
  }

  // Ensure client Param Builder collected cookies as early as possible.
  await ensureMetaParamBuilderReady();

  const user = resolveMetaUser({
    email: opts.email,
    phone: opts.phone,
    firstName: opts.firstName,
    lastName: opts.lastName,
    fbLoginId: opts.fbLoginId,
    externalId: opts.externalId,
    country: opts.country,
    city: opts.city,
  });

  const eventId = opts.eventId || newMetaEventId();
  const { fbp, fbc, clientIp } = getMetaClickIds();
  if (!opts.skipPixel) {
    trackMetaPixel(opts.eventName, eventId, opts.customData);
  }

  try {
    await fetch("/api/meta/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: opts.eventName,
        eventId,
        eventSourceUrl: opts.eventSourceUrl || window.location.href,
        email: user.email || "",
        phone: user.phone || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        fbLoginId: user.fbLoginId || "",
        externalId: user.externalId || "",
        country: user.country || "tr",
        city: user.city || "",
        fbp: fbp || "",
        fbc: fbc || "",
        clientIp: clientIp || "",
        customData: opts.customData,
      }),
      keepalive: true,
    });
  } catch {
    // Tracking must never break UX
  }

  return eventId;
}
