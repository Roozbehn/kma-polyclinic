/**
 * Meta Conversions API sender.
 * Prefer userData already built by `buildUserDataWithParamBuilder` (normalized+hashed once).
 * Fallback `buildUserData` remains for unit tests / offline use without the SDK.
 */
import {
  hashCountry,
  hashEmail,
  hashExternalId,
  hashGeoText,
  hashName,
  hashPhone,
} from "@/lib/meta/hash";

export type MetaStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Contact"
  | "Schedule"
  | "FindLocation"
  | "Lead";

export type CapIUserInput = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  externalId?: string;
  fbLoginId?: string;
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
  /** Prefer pre-built user_data from Parameter Builder (single hash). */
  userData?: Record<string, string | string[]>;
  /** Used only when userData is not provided. */
  user?: CapIUserInput;
  customData?: Record<string, string | number | string[]>;
};

type GraphResponse = {
  events_received?: number;
  messages?: unknown[];
  error?: { message?: string; type?: string; code?: number };
};

/** Fallback builder when Parameter Builder is unavailable. */
export function buildUserData(user: CapIUserInput) {
  const userData: Record<string, string | string[]> = {};

  const em = hashEmail(user.email);
  const ph = hashPhone(user.phone);
  const fn = hashName(user.firstName);
  const ln = hashName(user.lastName);
  const ct = hashGeoText(user.city);
  const st = hashGeoText(user.state);
  const country = hashCountry(user.country);
  const externalId = hashExternalId(user.externalId);

  if (em) userData.em = [em];
  if (ph) userData.ph = [ph];
  if (fn) userData.fn = [fn];
  if (ln) userData.ln = [ln];
  if (ct) userData.ct = [ct];
  if (st) userData.st = [st];
  if (country) userData.country = [country];
  if (externalId) userData.external_id = [externalId];

  if (user.clientIpAddress) userData.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) userData.client_user_agent = user.clientUserAgent;
  if (user.fbp) userData.fbp = user.fbp;
  if (user.fbc) userData.fbc = user.fbc;
  if (user.fbLoginId) userData.fb_login_id = user.fbLoginId;

  return userData;
}

export async function sendMetaCapIEvent(
  input: CapIEventInput,
): Promise<{ ok: boolean; detail?: string }> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    return { ok: false, detail: "meta_not_configured" };
  }

  const userData =
    input.userData && Object.keys(input.userData).length > 0
      ? input.userData
      : input.user
        ? buildUserData(input.user)
        : {};

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
        user_data: userData,
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
