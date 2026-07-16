import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalDocument } from "@/components/LegalDocument";
import { getLegalForLocale } from "@/lib/legal-content";
import { breadcrumbJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
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
    path: "/terms",
    title: t("termsTitle"),
    description: t("termsDescription"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const document = await getLegalForLocale(locale, "terms");
  const url = `${SITE_URL}/${locale}/terms`;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: document.title, path: `/${locale}/terms` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: document.title,
          description: t("seo.termsDescription"),
          url,
          locale,
        })}
      />
      <div className="page-crumbs">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("legal.terms") },
          ]}
        />
      </div>
      <LegalDocument document={document} />
    </main>
  );
}
