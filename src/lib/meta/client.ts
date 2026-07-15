"use client";

export type ClientMetaEvent =
  | "ViewContent"
  | "Contact"
  | "Schedule"
  | "FindLocation";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function newMetaEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function getMetaClickIds() {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
  };
}

export function trackMetaPixel(
  eventName: ClientMetaEvent,
  eventId: string,
  params?: Record<string, string | number | string[]>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params || {}, { eventID: eventId });
}

/** Pixel + server CAPI with shared event_id for dedupe. */
export async function trackMetaEvent(opts: {
  eventName: ClientMetaEvent;
  eventId?: string;
  email?: string;
  phone?: string;
  customData?: Record<string, string | number | string[]>;
  eventSourceUrl?: string;
}) {
  const eventId = opts.eventId || newMetaEventId();
  const { fbp, fbc } = getMetaClickIds();
  trackMetaPixel(opts.eventName, eventId, opts.customData);

  try {
    await fetch("/api/meta/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: opts.eventName,
        eventId,
        eventSourceUrl: opts.eventSourceUrl || window.location.href,
        email: opts.email,
        phone: opts.phone,
        fbp,
        fbc,
        customData: opts.customData,
      }),
      keepalive: true,
    });
  } catch {
    // Tracking must never break UX
  }

  return eventId;
}
