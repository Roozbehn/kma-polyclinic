"use client";
import { useLocale, useTranslations } from "next-intl";
import { whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const locale = useLocale();
  const t = useTranslations();
  const href = whatsappHref(locale, t("whatsappPrefill"));
  return (
    <a className="floating-wa btn-primary" href={href} target="_blank" rel="noopener noreferrer">
      {t("cta.whatsapp")}
    </a>
  );
}
