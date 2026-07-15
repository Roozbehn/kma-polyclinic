import { NAP } from "./nap";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kmapolyclinic.com.tr";

export function medicalClinicJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "KMA PolyClinic",
    url: siteUrl,
    telephone: NAP.phoneTel,
    email: NAP.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressCountry: NAP.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: NAP.hours.days,
      opens: NAP.hours.opens,
      closes: NAP.hours.closes,
    },
    sameAs: [NAP.social.instagram, NAP.social.facebook, NAP.social.tiktok],
  };
}

/** Build hreflang alternates for a path relative to locale root (e.g. "" or "/about"). */
export function localeLanguageAlternates(path = "") {
  const normalized = path === "/" ? "" : path;
  return {
    tr: `${SITE_URL}/tr${normalized}`,
    en: `${SITE_URL}/en${normalized}`,
    fa: `${SITE_URL}/fa${normalized}`,
    ar: `${SITE_URL}/ar${normalized}`,
    "x-default": `${SITE_URL}/tr${normalized}`,
  };
}
