import { hashEmail, hashPhone } from "@/lib/meta/hash";

export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Contact"
  | "Schedule"
  | "FindLocation";

export type CapIUserInput = {
  email?: string;
  phone?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
};

export type CapIEventInput = {
  eventName: MetaStandardEvent;
  eventId: string;
  eventSourceUrl: string;
  eventTime?: number;
  user: CapIUserInput;
  customData?: Record<string, string | number | string[]>;
};

type GraphResponse = {
  events_received?: number;
  messages?: unknown[];
  error?: { message?: string; type?: string; code?: number };
};

function buildUserData(user: CapIUserInput) {
  const userData: Record<string, string | string[]> = {};
  const em = hashEmail(user.email);
  const ph = hashPhone(user.phone);
  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (user.clientIpAddress) userData.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) userData.client_user_agent = user.clientUserAgent;
  if (user.fbp) userData.fbp = user.fbp;
  if (user.fbc) userData.fbc = user.fbc;
  return userData;
}

export async function sendMetaCapIEvent(input: CapIEventInput): Promise<{ ok: boolean; detail?: string }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return { ok: false, detail: "meta_not_configured" };
  }

  const payload: {
    data: Record<string, unknown>[];
    test_event_code?: string;
  } = {
    data: [
      {
        event_name: input.eventName,
        event_time: input.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: input.eventSourceUrl,
        action_source: "website",
        user_data: buildUserData(input.user),
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await res.json().catch(() => ({}))) as GraphResponse;
  if (!res.ok || json.error) {
    console.error("[meta-capi]", json.error || res.statusText);
    return { ok: false, detail: json.error?.message || `http_${res.status}` };
  }
  return { ok: true };
}
