import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import { getPriorityServicesForLocale } from "@/lib/mvp-content";
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
    path: "/services",
    title: t("servicesTitle"),
    description: t("servicesDescription"),
  });
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const items = await getPriorityServicesForLocale(locale);
  const url = `${SITE_URL}/${locale}/services`;

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("services.title"), path: `/${locale}/services` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t("services.title"),
          description: t("services.support"),
          url,
          locale,
          type: "CollectionPage",
        })}
      />
      <header className="content-page content-page--wide">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("services.title") },
          ]}
        />
        <h1 className="brand-display content-page__title">{t("services.title")}</h1>
        <p className="content-page__summary">{t("services.support")}</p>
      </header>
      <ServiceHighlight items={items} showAll />
    </main>
  );
}
