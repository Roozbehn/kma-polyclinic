export type AppLocale = "tr" | "en" | "fa" | "ar";
const WHATSAPP_FA = "905550362924";
const WHATSAPP_PRIMARY = "905019446595";
export function whatsappNumberForLocale(locale: string): string {
  return locale === "fa" ? WHATSAPP_FA : WHATSAPP_PRIMARY;
}
export function whatsappHref(locale: string, text: string): string {
  const num = whatsappNumberForLocale(locale);
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
