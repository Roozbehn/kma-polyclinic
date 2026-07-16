import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandHero } from "@/components/BrandHero";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { JsonLd } from "@/components/JsonLd";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import {
  getDepartmentsForLocale,
  getPriorityServicesForLocale,
} from "@/lib/mvp-content";
import { getHomeHeroCopy } from "@/lib/cms-pages";
import { medicalClinicJsonLd, SITE_URL } from "@/lib/schema-org";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hero = await getHomeHeroCopy(locale);
  return pageMetadata({
    locale,
    path: "",
    title: `KMA PolyClinic | ${hero.headline}`,
    description: hero.support,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const [departments, priority, hero] = await Promise.all([
    getDepartmentsForLocale(locale),
    getPriorityServicesForLocale(locale),
    getHomeHeroCopy(locale),
  ]);

  return (
    <main>
      <JsonLd data={medicalClinicJsonLd(SITE_URL)} />
      <BrandHero locale={locale} headline={hero.headline} support={hero.support} />
      <ServiceHighlight items={priority} heading={t("home.priorityServices")} />
      <DepartmentGrid items={departments} heading={t("home.departments")} />
    </main>
  );
}
