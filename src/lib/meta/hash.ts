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
