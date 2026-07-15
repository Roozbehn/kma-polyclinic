import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const isSanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
});

async function fetchOrEmpty<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  return sanityClient.fetch<T>(query, params);
}

export async function getDepartments(locale: string) {
  return fetchOrEmpty(
    `*[_type == "department" && language == $locale && (!faOnly || $locale == "fa")]|order(navPriority asc){
      title, summary, faOnly, navPriority, "slug": slug.current, heroImage
    }`,
    { locale },
    [],
  );
}

export async function getDepartmentBySlug(locale: string, slug: string) {
  return fetchOrEmpty(
    `*[_type == "department" && language == $locale && slug.current == $slug && (!faOnly || $locale == "fa")][0]{
      title, summary, faOnly, navPriority, "slug": slug.current, heroImage
    }`,
    { locale, slug },
    null,
  );
}

export async function getPriorityServices(locale: string) {
  return fetchOrEmpty(
    `*[_type == "service" && language == $locale && priority == true]|order(title asc){
      title, summary, "slug": slug.current, seoTitle, seoDescription,
      "department": department->{ title, "slug": slug.current }
    }`,
    { locale },
    [],
  );
}

export async function getPage(locale: string, key: string) {
  return fetchOrEmpty(
    `*[_type == "page" && language == $locale && key == $key][0]{
      key, title, sections
    }`,
    { locale, key },
    null,
  );
}

export async function getGallery(locale: string) {
  return fetchOrEmpty(
    `*[_type == "galleryItem" && language == $locale]|order(_createdAt desc){
      title, image, beforeAfter,
      "department": department->{ title, "slug": slug.current }
    }`,
    { locale },
    [],
  );
}

export async function getLegal(locale: string, key: string) {
  return fetchOrEmpty(
    `*[_type == "legalPage" && language == $locale && key == $key][0]{
      key, title, body
    }`,
    { locale, key },
    null,
  );
}
