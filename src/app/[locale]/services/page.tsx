import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import { getPriorityServicesForLocale } from "@/lib/mvp-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({
    locale,
    path: "/services",
    title: `${t("title")} | KMA PolyClinic`,
    description: t("support"),
  });
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const items = await getPriorityServicesForLocale(locale);

  return (
    <main>
      <header className="content-page">
        <h1 className="brand-display content-page__title">{t("title")}</h1>
        <p className="content-page__summary">{t("support")}</p>
      </header>
      <ServiceHighlight items={items} heading={t("title")} showAll />
    </main>
  );
}
