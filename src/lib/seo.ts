import type { Metadata } from "next";
import { BRAND, localeLanguageAlternates, SITE_URL } from "@/lib/schema-org";

const OG_LOCALE: Record<string, string> = {
  tr: "tr_TR",
  en: "en_US",
  fa: "fa_IR",
  ar: "ar_SA",
};

/** SEO-safe title (keeps under ~60 chars when possible). */
export function seoTitle(primary: string, withBrand = true): string {
  const clean = primary.replace(/\s+/g, " ").trim();
  if (!withBrand) return clean;
  if (clean.includes(BRAND)) return clean;
  const combined = `${clean} | ${BRAND}`;
  return combined.length <= 65 ? combined : clean.slice(0, 60).trim();
}

/** SEO-safe description (target 140–160 chars). */
export function seoDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function pageMetadata(options: {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const { locale, path, title, description, keywords, noIndex, type = "website" } =
    options;
  const normalized = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = `/${locale}${normalized}`;
  const url = `${SITE_URL}${canonicalPath}`;
  const fullTitle = seoTitle(title);
  const fullDescription = seoDescription(description);

  return {
    title: { absolute: fullTitle },
    description: fullDescription,
    keywords: keywords?.length ? keywords : undefined,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    alternates: {
      canonical: canonicalPath,
      languages: localeLanguageAlternates(normalized),
    },
    openGraph: {
      type,
      locale: OG_LOCALE[locale] || "en_US",
      url,
      siteName: BRAND,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${BRAND} — Torun Center, Istanbul`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: ["/opengraph-image"],
    },
  };
}
