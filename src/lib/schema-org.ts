import { NAP } from "./nap";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kmapoliklinik.com.tr";

export const BRAND = "KMA PolyClinic";

const MEDICAL_SPECIALTIES = [
  "AestheticMedicine",
  "Dermatology",
  "Dentistry",
  "PlasticSurgery",
] as const;

export function medicalClinicJsonLd(siteUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${siteUrl}/#clinic`,
    name: BRAND,
    alternateName: ["KMA Polyclinic", "KMA Poly Clinic"],
    description:
      "Private multi-specialty polyclinic in Torun Center, Istanbul offering aesthetics, hair and eyebrow transplant, dermatology, dentistry, plastic surgery, and medical wellness.",
    url: siteUrl,
    telephone: NAP.phoneTel,
    email: NAP.email,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/brand/logo.svg`,
    priceRange: "$$",
    currenciesAccepted: "TRY, EUR, USD",
    paymentAccepted: "Cash, Credit Card",
    medicalSpecialty: [...MEDICAL_SPECIALTIES],
    address: {
      "@type": "PostalAddress",
      streetAddress: NAP.streetAddress,
      addressLocality: NAP.addressLocality,
      addressRegion: "Istanbul",
      addressCountry: NAP.addressCountry,
      postalCode: "34394",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NAP.geo.lat,
      longitude: NAP.geo.lng,
    },
    hasMap: `https://www.google.com/maps?q=${NAP.geo.lat},${NAP.geo.lng}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: NAP.hours.days,
      opens: NAP.hours.opens,
      closes: NAP.hours.closes,
    },
    areaServed: [
      { "@type": "City", name: "Istanbul" },
      { "@type": "Country", name: "Turkey" },
      { "@type": "AdministrativeArea", name: "Middle East" },
    ],
    availableLanguage: ["tr", "en", "fa", "ar"],
    sameAs: [NAP.social.instagram, NAP.social.facebook, NAP.social.tiktok],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: NAP.phoneTel,
        contactType: "customer service",
        email: NAP.email,
        areaServed: ["TR", "IR", "AE", "SA", "QA", "KW", "IQ"],
        availableLanguage: ["Turkish", "English", "Persian", "Arabic"],
      },
    ],
  };
}

export function websiteJsonLd(siteUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: BRAND,
    url: siteUrl,
    inLanguage: ["tr-TR", "en-US", "fa-IR", "ar-SA"],
    publisher: { "@id": `${siteUrl}/#clinic` },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  siteUrl: string = SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function faqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function medicalProcedureJsonLd(options: {
  name: string;
  description: string;
  url: string;
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: options.name,
    description: options.description,
    url: options.url,
    procedureType: "http://schema.org/NoninvasiveProcedure",
    howPerformed:
      "Consultation and clinical assessment at KMA PolyClinic, Torun Center, Istanbul, followed by a personalised treatment plan.",
    preparation:
      "In-person or remote pre-assessment; suitability confirmed by clinic staff before treatment.",
    followup:
      "Aftercare guidance and optional follow-up appointments as clinically indicated.",
    status: "https://schema.org/ActiveActionStatus",
    provider: {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic`,
      name: BRAND,
      url: SITE_URL,
    },
    availableService: {
      "@type": "MedicalTherapy",
      name: options.name,
      description: options.description,
    },
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: options.name,
    description: options.description,
    url: options.url,
    provider: {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic`,
      name: BRAND,
    },
    areaServed: {
      "@type": "City",
      name: "Istanbul",
    },
    serviceType: options.name,
  };
}

export function webPageJsonLd(options: {
  name: string;
  description: string;
  url: string;
  locale: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  dateModified?: string;
}) {
  const inLanguage =
    options.locale === "tr"
      ? "tr-TR"
      : options.locale === "fa"
        ? "fa-IR"
        : options.locale === "ar"
          ? "ar-SA"
          : "en-US";

  return {
    "@context": "https://schema.org",
    "@type": options.type || "WebPage",
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#clinic` },
    dateModified: options.dateModified || new Date().toISOString().slice(0, 10),
    publisher: {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic`,
      name: BRAND,
    },
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
