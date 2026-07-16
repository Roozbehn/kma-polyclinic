import type { Metadata } from "next";
import { localeLanguageAlternates, SITE_URL } from "@/lib/schema-org";

const OG_LOCALE: Record<string, string> = {
  tr: "tr_TR",
  en: "en_US",
  fa: "fa_IR",
  ar: "ar_SA",
};

export function pageMetadata(options: {
  locale: string;
  path: string;
  title: string;
  description: string;
  noIndex?: boolean;
}): Metadata {
  const { locale, path, title, description, noIndex } = options;
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonical = `/${locale}${normalized}`;
  const url = `${SITE_URL}${canonical}`;

  return {
    title,
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: localeLanguageAlternates(normalized),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale] || "en_US",
      url,
      siteName: "KMA PolyClinic",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
