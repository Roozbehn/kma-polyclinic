import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentBySlugForLocale } from "@/lib/mvp-content";

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

  return (
    <main className="content-page">
      <h1 className="brand-display content-page__title">{dept.title}</h1>
      <p className="content-page__summary">{dept.summary}</p>
      <Link className="btn-primary" href="/contact">
        {t("cta.appointment")}
      </Link>
    </main>
  );
}
