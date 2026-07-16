import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema-org";
import { routing } from "@/i18n/routing";

const LOCALES = routing.locales;

const STATIC_PATHS = [
  "",
  "/about",
  "/departments",
  "/services",
  "/gallery",
  "/contact",
  "/privacy",
  "/terms",
  "/measurement",
] as const;

const DEPARTMENT_SLUGS = [
  "aesthetics",
  "dermatology",
  "dentistry",
  "plastic-surgery",
  "hair-transplant",
  "eyebrow-transplant",
] as const;

const SERVICE_SLUGS = [
  "eyebrow-transplant",
  "hair-transplant",
  "botox",
  "filler",
  "laser",
] as const;

function languagesFor(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of LOCALES) {
    map[locale] = `${SITE_URL}/${locale}${path}`;
  }
  map["x-default"] = `${SITE_URL}/tr${path}`;
  return map;
}

function entry(locale: string, path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.includes("contact") ? 0.9 : 0.7,
    alternates: {
      languages: languagesFor(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      urls.push(entry(locale, path));
    }
    for (const slug of DEPARTMENT_SLUGS) {
      urls.push(entry(locale, `/departments/${slug}`));
    }
    for (const slug of SERVICE_SLUGS) {
      urls.push(entry(locale, `/services/${slug}`));
    }
  }

  urls.push({
    url: `${SITE_URL}/fa/departments/checkup-laboratory`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  });

  return urls;
}
