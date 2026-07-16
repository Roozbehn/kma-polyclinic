import { createHash } from "crypto";

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Normalize email then hash for Meta CAPI. */
export function hashEmail(email: string | undefined | null): string | undefined {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@")) return undefined;
  return sha256(normalized);
}

/** Digits-only E.164-ish phone, then hash. Turkish leading 0 → 90. */
export function hashPhone(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0") && digits.length === 11) {
    digits = `90${digits.slice(1)}`;
  }
  if (digits.length < 8) return undefined;
  return sha256(digits);
}

/** Meta name hashing: lowercase, trim, remove punctuation/spaces for strict match. */
export function hashName(name: string | undefined | null): string | undefined {
  if (!name) return undefined;
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z\u00c0-\u024f\u0400-\u04ff\u0600-\u06ff]/gi, "");
  if (!normalized) return undefined;
  return sha256(normalized);
}

/** City / state: lowercase, remove spaces and punctuation, then hash. */
export function hashGeoText(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9\u00c0-\u024f]/gi, "");
  if (!normalized) return undefined;
  return sha256(normalized);
}

/** Country: ISO 2-letter lowercase then hash (e.g. tr, us). */
export function hashCountry(country: string | undefined | null): string | undefined {
  if (!country) return undefined;
  const normalized = country.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (normalized.length !== 2) return undefined;
  return sha256(normalized);
}

/** external_id: trim then hash (recommended by Meta). */
export function hashExternalId(id: string | undefined | null): string | undefined {
  if (!id) return undefined;
  const normalized = id.trim();
  if (!normalized) return undefined;
  return sha256(normalized);
}
