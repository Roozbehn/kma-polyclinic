import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { MetaViewContent } from "@/components/MetaViewContent";
import { routing } from "@/i18n/routing";
import {
  getServiceBySlugForLocale,
  MVP_PRIORITY_SERVICE_SLUGS,
} from "@/lib/mvp-content";
import { blocksToParagraphs } from "@/lib/portable-text";
import { pageMetadata } from "@/lib/seo";

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
  const title = service.seoTitle?.trim() || `${service.title} | KMA PolyClinic`;
  const description =
    service.seoDescription?.trim() ||
    service.summary ||
    "KMA PolyClinic Istanbul";
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title,
    description,
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

  return (
    <main className="content-page">
      <MetaViewContent contentName={service.title} contentIds={[slug]} contentType="service" />
      <h1 className="brand-display content-page__title">{service.title}</h1>
      <p className="content-page__summary">{service.summary}</p>
      {body.length > 0 ? (
        <div className="content-page__body">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      <MedicalDisclaimer />
      <Link className="btn-primary" href="/contact">
        {t("cta.appointment")}
      </Link>
    </main>
  );
}
