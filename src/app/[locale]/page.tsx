import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandHero } from "@/components/BrandHero";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import {
  getDepartmentsForLocale,
  getPriorityServicesForLocale,
} from "@/lib/mvp-content";
import { getHomeHeroCopy } from "@/lib/cms-pages";
import {
  faqPageJsonLd,
  medicalClinicJsonLd,
  websiteJsonLd,
} from "@/lib/schema-org";
import { getDepartmentHubFaqs } from "@/lib/seo-faq";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
    keywords: t("keywordsHome")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
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
  const faqs = getDepartmentHubFaqs(locale);
  const faqLd = faqPageJsonLd(faqs);

  return (
    <main>
      <JsonLd data={medicalClinicJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <BrandHero locale={locale} headline={hero.headline} support={hero.support} />
      <ServiceHighlight items={priority} heading={t("home.priorityServices")} />
      <DepartmentGrid items={departments} heading={t("home.departments")} />
      <div className="home-faq-wrap">
        <FaqSection heading={t("faq.heading")} items={faqs} />
      </div>
    </main>
  );
}
