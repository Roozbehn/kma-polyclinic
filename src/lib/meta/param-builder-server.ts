import { createRequire } from "node:module";
import type { NextRequest } from "next/server";

const require = createRequire(import.meta.url);

// CommonJS Meta package
const {
  ParamBuilder,
}: {
  ParamBuilder: new (domains?: string[]) => {
    processRequest: (
      host: string,
      queries: Record<string, string> | null,
      cookies: Record<string, string> | null,
      referer?: string | null,
      xForwardedFor?: string | null,
      remoteAddress?: string | null,
    ) => Array<{ name: string; value: string; maxAge: number; domain: string }>;
    getFbc: () => string | null;
    getFbp: () => string | null;
    getClientIpAddress: () => string | null;
    getNormalizedAndHashedPII: (value: string, type: string) => string | null;
  };
} = require("capi-param-builder-nodejs");

const DOMAIN_LIST = [
  "kmapoliklinik.com.tr",
  "www.kmapoliklinik.com.tr",
  "kma-polyclinic.vercel.app",
];

export type PlainCustomerInfo = {
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
};

export type BuiltUserData = {
  userData: Record<string, string | string[]>;
  cookiesToSet: Array<{ name: string; value: string; maxAge: number; domain: string }>;
  fbc: string | null;
  fbp: string | null;
  clientIp: string | null;
};

function parseCookieHeader(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

function queryFromUrl(url: string | undefined): Record<string, string> | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const q: Record<string, string> = {};
    u.searchParams.forEach((v, k) => {
      q[k] = v;
    });
    return q;
  } catch {
    return null;
  }
}

function pushHashed(
  userData: Record<string, string | string[]>,
  key: string,
  hashed: string | null | undefined,
) {
  if (hashed) userData[key] = [hashed];
}

/**
 * Server-side Meta Parameter Builder:
 * - Generates / validates fbc + fbp cookies
 * - Picks best client_ip_address (cookie + request headers)
 * - Normalizes + hashes PII once (do not hash again before Graph API)
 */
export function buildUserDataWithParamBuilder(
  req: NextRequest,
  plain: PlainCustomerInfo,
  options?: {
    eventSourceUrl?: string;
    /** Client-reported fbp/fbc (may already include library appendix). */
    clientFbp?: string;
    clientFbc?: string;
    clientIpFromBrowser?: string;
  },
): BuiltUserData {
  const builder = new ParamBuilder(DOMAIN_LIST);
  const cookies = parseCookieHeader(req.headers.get("cookie"));

  // Prefer client-builder cookies when present (case-sensitive; do not lowercase).
  if (options?.clientFbp) cookies._fbp = options.clientFbp;
  if (options?.clientFbc) cookies._fbc = options.clientFbc;
  if (options?.clientIpFromBrowser) {
    // Client library may store IP in a cookie; also accept explicit field.
    cookies._fbi = options.clientIpFromBrowser;
  }

  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    "kmapoliklinik.com.tr";
  const referer = req.headers.get("referer");
  const xff = req.headers.get("x-forwarded-for");
  const queries = queryFromUrl(options?.eventSourceUrl);

  const cookiesToSet = builder.processRequest(
    host,
    queries,
    cookies,
    referer,
    xff,
    null,
  );

  const userData: Record<string, string | string[]> = {};

  pushHashed(
    userData,
    "em",
    plain.email ? builder.getNormalizedAndHashedPII(plain.email, "email") : null,
  );
  pushHashed(
    userData,
    "ph",
    plain.phone ? builder.getNormalizedAndHashedPII(plain.phone, "phone") : null,
  );
  pushHashed(
    userData,
    "fn",
    plain.firstName
      ? builder.getNormalizedAndHashedPII(plain.firstName, "first_name")
      : null,
  );
  pushHashed(
    userData,
    "ln",
    plain.lastName
      ? builder.getNormalizedAndHashedPII(plain.lastName, "last_name")
      : null,
  );
  pushHashed(
    userData,
    "ct",
    plain.city ? builder.getNormalizedAndHashedPII(plain.city, "city") : null,
  );
  pushHashed(
    userData,
    "st",
    plain.state ? builder.getNormalizedAndHashedPII(plain.state, "state") : null,
  );
  pushHashed(
    userData,
    "zp",
    plain.zip ? builder.getNormalizedAndHashedPII(plain.zip, "zip_code") : null,
  );
  pushHashed(
    userData,
    "country",
    plain.country
      ? builder.getNormalizedAndHashedPII(plain.country, "country")
      : builder.getNormalizedAndHashedPII("tr", "country"),
  );
  pushHashed(
    userData,
    "external_id",
    plain.externalId
      ? builder.getNormalizedAndHashedPII(plain.externalId, "external_id")
      : null,
  );

  const fbc = builder.getFbc();
  const fbp = builder.getFbp();
  let clientIp = builder.getClientIpAddress();
  if (!clientIp && options?.clientIpFromBrowser) {
    clientIp = options.clientIpFromBrowser;
  }
  if (!clientIp && xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) clientIp = first;
  }

  if (fbc) userData.fbc = fbc;
  if (fbp) userData.fbp = fbp;
  if (clientIp) userData.client_ip_address = clientIp;

  const ua = req.headers.get("user-agent");
  if (ua) userData.client_user_agent = ua;
  if (plain.fbLoginId) userData.fb_login_id = plain.fbLoginId;

  return { userData, cookiesToSet, fbc, fbp, clientIp };
}

export function applyParamBuilderCookies(
  response: Response,
  cookiesToSet: BuiltUserData["cookiesToSet"],
) {
  // NextResponse cookie API is preferred when caller has NextResponse.
  return cookiesToSet;
}

export function setBuilderCookiesOnNextResponse(
  res: { cookies: { set: (name: string, value: string, opts: Record<string, unknown>) => void } },
  cookiesToSet: BuiltUserData["cookiesToSet"],
) {
  for (const c of cookiesToSet) {
    if (!c?.name || !c?.value) continue;
    res.cookies.set(c.name, c.value, {
      maxAge: c.maxAge || 90 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: true,
      // Domain from library (e.g. .kmapoliklinik.com.tr)
      ...(c.domain ? { domain: c.domain.startsWith(".") ? c.domain : `.${c.domain}` } : {}),
    });
  }
}
