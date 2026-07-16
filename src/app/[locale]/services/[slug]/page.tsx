import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { MetaViewContent } from "@/components/MetaViewContent";
import { routing } from "@/i18n/routing";
import {
  getServiceBySlugForLocale,
  MVP_PRIORITY_SERVICE_SLUGS,
} from "@/lib/mvp-content";
import { blocksToParagraphs } from "@/lib/portable-text";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  medicalProcedureJsonLd,
  serviceJsonLd,
  SITE_URL,
} from "@/lib/schema-org";
import { getServiceFaqs } from "@/lib/seo-faq";
import { pageMetadata } from "@/lib/seo";

const KEYWORD_MAP: Record<string, string> = {
  "eyebrow-transplant": "keywordsEyebrow",
  "hair-transplant": "keywordsHair",
  botox: "keywordsBotox",
  filler: "keywordsFiller",
  laser: "keywordsLaser",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MVP_PRIORITY_SERVICE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await getServiceBySlugForLocale(locale, slug);
  if (!service) return {};
  const tSeo = await getTranslations({ locale, namespace: "seo" });
  const kwKey = KEYWORD_MAP[slug];
  const keywords = kwKey
    ? tSeo(kwKey as "keywordsHair")
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: service.seoTitle?.trim() || service.title,
    description:
      service.seoDescription?.trim() ||
      service.summary ||
      tSeo("servicesDescription"),
    keywords,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await getServiceBySlugForLocale(locale, slug);
  if (!service) notFound();

  const t = await getTranslations();
  const body = blocksToParagraphs(service.body);
  const faqs = getServiceFaqs(locale, slug);
  const url = `${SITE_URL}/${locale}/services/${slug}`;
  const crumbs = [
    { name: t("breadcrumb.home"), href: "/" as const },
    { name: t("services.title"), href: "/services" as const },
    { name: service.title },
  ];
  const faqLd = faqPageJsonLd(faqs);

  return (
    <main className="content-page content-page--wide">
      <MetaViewContent contentName={service.title} contentIds={[slug]} contentType="service" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("services.title"), path: `/${locale}/services` },
          { name: service.title, path: `/${locale}/services/${slug}` },
        ])}
      />
      <JsonLd
        data={medicalProcedureJsonLd({
          name: service.title,
          description: service.summary || service.title,
          url,
          locale,
        })}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.summary || service.title,
          url,
        })}
      />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <Breadcrumbs items={crumbs} />
      <h1 className="brand-display content-page__title">{service.title}</h1>
      <p className="content-page__summary">{service.summary}</p>
      {body.length > 0 ? (
        <div className="content-page__body">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      <FaqSection heading={t("faq.heading")} items={faqs} />
      <MedicalDisclaimer />
      <div className="content-page__actions">
        <Link className="btn-primary" href="/contact">
          {t("cta.appointment")}
        </Link>
        <Link className="btn-ghost" href="/services">
          {t("services.title")}
        </Link>
      </div>
    </main>
  );
}
