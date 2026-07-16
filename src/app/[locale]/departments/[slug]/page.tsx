import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { MetaViewContent } from "@/components/MetaViewContent";
import { routing } from "@/i18n/routing";
import { canViewDepartment } from "@/lib/locale-gate";
import {
  getDepartmentBySlugForLocale,
  MVP_DEPARTMENT_SLUGS,
} from "@/lib/mvp-content";
import { blocksToParagraphs } from "@/lib/portable-text";
import { breadcrumbJsonLd, serviceJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
import { urlForImage } from "@/lib/sanity-image";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    MVP_DEPARTMENT_SLUGS.filter((slug) => slug !== "checkup-laboratory" || locale === "fa").map(
      (slug) => ({ locale, slug }),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dept = await getDepartmentBySlugForLocale(locale, slug);
  if (!dept || !canViewDepartment(dept, locale)) return {};
  return pageMetadata({
    locale,
    path: `/departments/${slug}`,
    title: dept.title,
    description: dept.summary || dept.title,
  });
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const dept = await getDepartmentBySlugForLocale(locale, slug);
  if (!dept || !canViewDepartment(dept, locale)) notFound();

  const t = await getTranslations();
  const body = blocksToParagraphs(dept.body);
  const url = `${SITE_URL}/${locale}/departments/${slug}`;
  const heroSrc =
    dept.heroImage && typeof dept.heroImage === "object"
      ? urlForImage(dept.heroImage).width(1600).height(900).fit("crop").url()
      : null;

  return (
    <main className="content-page content-page--visual content-page--wide">
      <MetaViewContent contentName={dept.title} contentIds={[slug]} contentType="department" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("departmentsPage.title"), path: `/${locale}/departments` },
          { name: dept.title, path: `/${locale}/departments/${slug}` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: dept.title,
          description: dept.summary || dept.title,
          url,
          locale,
          type: "CollectionPage",
        })}
      />
      <JsonLd
        data={serviceJsonLd({
          name: dept.title,
          description: dept.summary || dept.title,
          url,
        })}
      />

      {heroSrc ? (
        <div className="content-page__hero">
          <Image
            src={heroSrc}
            alt={dept.title}
            width={1600}
            height={900}
            className="content-page__hero-img"
            priority
          />
        </div>
      ) : null}
      <Breadcrumbs
        items={[
          { name: t("breadcrumb.home"), href: "/" },
          { name: t("departmentsPage.title"), href: "/departments" },
          { name: dept.title },
        ]}
      />
      <h1 className="brand-display content-page__title">{dept.title}</h1>
      <p className="content-page__summary">{dept.summary}</p>
      {body.length > 0 ? (
        <div className="content-page__body">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      <MedicalDisclaimer />
      <div className="content-page__actions">
        <Link className="btn-primary" href="/contact">
          {t("cta.appointment")}
        </Link>
        <Link className="btn-ghost" href="/departments">
          {t("departmentsPage.title")}
        </Link>
      </div>
    </main>
  );
}
