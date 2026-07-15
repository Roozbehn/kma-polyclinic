import { createClient, type SanityClient } from "next-sanity";

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Sanity project IDs are short (≈8 chars). Long strings are usually API tokens. */
function isValidSanityProjectId(id: string): boolean {
  return /^[a-z0-9]{6,16}$/i.test(id);
}

export const isSanityConfigured = isValidSanityProjectId(rawProjectId);

const projectId = isSanityConfigured ? rawProjectId : "placeholder";

export const sanityClient: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN || undefined,
});

async function fetchOrEmpty<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback", error);
    return fallback;
  }
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
