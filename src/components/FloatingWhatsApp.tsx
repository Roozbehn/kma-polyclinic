"use client";

import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const locale = useLocale();
  const t = useTranslations();
  const href = whatsappHref(locale, t("whatsappPrefill"));

  return (
    <Reveal className="floating-wa">
      <a className="btn-primary" href={href} target="_blank" rel="noopener noreferrer">
        {t("cta.whatsapp")}
      </a>
    </Reveal>
  );
}
