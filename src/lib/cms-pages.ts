import { getPage } from "@/lib/sanity";
import { getTranslations } from "next-intl/server";

export type CmsPageSection = {
  heading?: string;
  body?: string;
};

export type CmsPage = {
  key?: string;
  title?: string;
  sections?: CmsPageSection[];
};

export async function getHomeHeroCopy(locale: string) {
  const page = (await getPage(locale, "home")) as CmsPage | null;
  const section = page?.sections?.[0];
  const t = await getTranslations("home");

  return {
    headline: section?.heading?.trim() || t("headline"),
    support: section?.body?.trim() || t("support"),
  };
}

export async function getAboutPageContent(locale: string) {
  const page = (await getPage(locale, "about")) as CmsPage | null;
  const t = await getTranslations("about");
  const sections = page?.sections?.filter((s) => s.heading || s.body) ?? [];

  if (sections.length >= 2) {
    return {
      brand: t("brand"),
      title: page?.title?.trim() || t("title"),
      lead: t("lead"),
      blocks: sections.map((s) => ({
        heading: s.heading || "",
        body: s.body || "",
      })),
      fromCms: true as const,
    };
  }

  return {
    brand: t("brand"),
    title: t("title"),
    lead: t("lead"),
    blocks: [
      { heading: t("storyHeading"), body: t("story") },
      { heading: t("trustHeading"), body: t("trust") },
      { heading: t("positionHeading"), body: t("position") },
    ],
    fromCms: false as const,
  };
}
