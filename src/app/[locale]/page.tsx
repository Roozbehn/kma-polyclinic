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
import {
  localeLanguageAlternates,
  medicalClinicJsonLd,
  SITE_URL,
} from "@/lib/schema-org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: localeLanguageAlternates(""),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const [departments, priority] = await Promise.all([
    getDepartmentsForLocale(locale),
    getPriorityServicesForLocale(locale),
  ]);

  return (
    <main>
      <JsonLd data={medicalClinicJsonLd(SITE_URL)} />
      <BrandHero locale={locale} />
      <ServiceHighlight items={priority} heading={t("home.priorityServices")} />
      <DepartmentGrid items={departments} heading={t("home.departments")} />
    </main>
  );
}
