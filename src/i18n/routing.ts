import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en", "fa", "ar"],
  defaultLocale: "tr",
  localePrefix: "always",
});

export const rtlLocales = new Set(["fa", "ar"]);

export function isRtlLocale(locale: string): boolean {
  return rtlLocales.has(locale);
}
