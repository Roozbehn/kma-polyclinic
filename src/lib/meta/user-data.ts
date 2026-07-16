/**
 * Client-side customer info for Meta Pixel Advanced Matching + CAPI.
 * Values are stored in localStorage after consentful form actions (appointment form).
 * Never log these values.
 */

export const META_USER_STORAGE_KEY = "kma_meta_user_v1";

export type MetaStoredUser = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  /** Facebook Login app-scoped user id — not hashed on the wire. */
  fbLoginId?: string;
  /** Stable CRM / site id (hashed server-side as external_id). */
  externalId?: string;
  country?: string;
  city?: string;
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function readMetaStoredUser(): MetaStoredUser {
  if (!canUseStorage()) return {};
  try {
    const raw = localStorage.getItem(META_USER_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as MetaStoredUser;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeMetaStoredUser( partial: MetaStoredUser): MetaStoredUser {
  if (!canUseStorage()) return partial;
  const next: MetaStoredUser = { ...readMetaStoredUser() };
  for (const [key, value] of Object.entries(partial) as [keyof MetaStoredUser, string | undefined][]) {
    if (typeof value === "string" && value.trim()) {
      next[key] = value.trim();
    }
  }
  try {
    localStorage.setItem(META_USER_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // private mode / quota — ignore
  }
  return next;
}

/** Split "Full Name" into first / last for Meta fn / ln. */
export function splitPersonName(fullName: string | undefined | null): {
  firstName?: string;
  lastName?: string;
} {
  if (!fullName) return {};
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

/** Digits-only phone for Pixel Advanced Matching (Meta hashes client-side). */
export function normalizePhoneForPixel(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0") && digits.length === 11) {
    digits = `90${digits.slice(1)}`;
  }
  return digits.length >= 8 ? digits : undefined;
}

/** Build Pixel Advanced Matching object (plain text — browser SDK hashes). */
export function toPixelAdvancedMatching(user: MetaStoredUser): Record<string, string> {
  const am: Record<string, string> = {};
  if (user.email?.includes("@")) am.em = user.email.trim().toLowerCase();
  const ph = normalizePhoneForPixel(user.phone);
  if (ph) am.ph = ph;
  if (user.firstName) am.fn = user.firstName.trim().toLowerCase();
  if (user.lastName) am.ln = user.lastName.trim().toLowerCase();
  if (user.country) am.country = user.country.trim().toLowerCase();
  if (user.city) am.ct = user.city.trim().toLowerCase();
  if (user.externalId) am.external_id = user.externalId.trim();
  if (user.fbLoginId) am.fb_login_id = user.fbLoginId.trim();
  return am;
}

/**
 * Try to read Facebook Login user id when the FB JS SDK is present.
 * Safe no-op if Login / SDK is not configured.
 */
export function tryReadFacebookLoginId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as Window & {
    FB?: {
      getUserID?: () => string;
      getAuthResponse?: () => { userID?: string } | null;
    };
  };
  try {
    const fromAuth = w.FB?.getAuthResponse?.()?.userID;
    if (fromAuth) return String(fromAuth);
    const fromGet = w.FB?.getUserID?.();
    if (fromGet && fromGet !== "0") return String(fromGet);
  } catch {
    // SDK not ready
  }
  return undefined;
}
