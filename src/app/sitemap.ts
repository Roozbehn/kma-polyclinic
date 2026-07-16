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

function entry(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      urls.push(entry(`/${locale}${path}`));
    }
    for (const slug of DEPARTMENT_SLUGS) {
      urls.push(entry(`/${locale}/departments/${slug}`));
    }
    for (const slug of SERVICE_SLUGS) {
      urls.push(entry(`/${locale}/services/${slug}`));
    }
  }

  urls.push(entry("/fa/departments/checkup-laboratory"));

  return urls;
}
