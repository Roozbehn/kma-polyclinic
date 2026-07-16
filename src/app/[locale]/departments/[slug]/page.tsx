import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { MetaViewContent } from "@/components/MetaViewContent";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentBySlugForLocale } from "@/lib/mvp-content";
import { blocksToParagraphs } from "@/lib/portable-text";
import { urlForImage } from "@/lib/sanity-image";
import { pageMetadata } from "@/lib/seo";

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
    title: `${dept.title} | KMA PolyClinic`,
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
  const heroSrc =
    dept.heroImage && typeof dept.heroImage === "object"
      ? urlForImage(dept.heroImage).width(1600).height(900).fit("crop").url()
      : null;

  return (
    <main className="content-page content-page--visual">
      <MetaViewContent contentName={dept.title} contentIds={[slug]} contentType="department" />
      {heroSrc ? (
        <div className="content-page__hero">
          <Image
            src={heroSrc}
            alt=""
            width={1600}
            height={900}
            className="content-page__hero-img"
            priority
          />
        </div>
      ) : null}
      <h1 className="brand-display content-page__title">{dept.title}</h1>
      <p className="content-page__summary">{dept.summary}</p>
      {body.length > 0 ? (
        <div className="content-page__body">
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      <Link className="btn-primary" href="/contact">
        {t("cta.appointment")}
      </Link>
    </main>
  );
}
