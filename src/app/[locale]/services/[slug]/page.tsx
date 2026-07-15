import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getServiceBySlugForLocale } from "@/lib/mvp-content";

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

  return (
    <main className="content-page">
      <h1 className="brand-display content-page__title">{service.title}</h1>
      <p className="content-page__summary">{service.summary}</p>
      <Link className="btn-primary" href="/contact">
        {t("cta.appointment")}
      </Link>
    </main>
  );
}
