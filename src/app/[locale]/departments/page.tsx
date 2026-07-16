import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";
import { breadcrumbJsonLd, faqPageJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
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
    path: "/departments",
    title: t("departmentsTitle"),
    description: t("departmentsDescription"),
  });
}

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const items = (await getDepartmentsForLocale(locale)).filter((d) =>
    canViewDepartment(d, locale),
  );
  const faqs = getDepartmentHubFaqs(locale);
  const faqLd = faqPageJsonLd(faqs);
  const url = `${SITE_URL}/${locale}/departments`;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("departmentsPage.title"), path: `/${locale}/departments` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t("departmentsPage.title"),
          description: t("departmentsPage.support"),
          url,
          locale,
          type: "CollectionPage",
        })}
      />
      {faqLd ? <JsonLd data={faqLd} /> : null}
      <header className="content-page content-page--wide">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("departmentsPage.title") },
          ]}
        />
        <h1 className="brand-display content-page__title">{t("departmentsPage.title")}</h1>
        <p className="content-page__summary">{t("departmentsPage.support")}</p>
      </header>
      <DepartmentGrid items={items} />
      <div className="home-faq-wrap">
        <FaqSection heading={t("faq.heading")} items={faqs} />
      </div>
    </main>
  );
}
