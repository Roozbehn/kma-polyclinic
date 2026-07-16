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
    path: "/privacy",
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const document = await getLegalForLocale(locale, "privacy");
  const url = `${SITE_URL}/${locale}/privacy`;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: document.title, path: `/${locale}/privacy` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: document.title,
          description: t("seo.privacyDescription"),
          url,
          locale,
        })}
      />
      <div className="page-crumbs">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("legal.privacy") },
          ]}
        />
      </div>
      <LegalDocument document={document} />
    </main>
  );
}
