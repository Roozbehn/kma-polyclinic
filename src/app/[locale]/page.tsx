import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandHero } from "@/components/BrandHero";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import {
  getDepartmentsForLocale,
  getPriorityServicesForLocale,
} from "@/lib/mvp-content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const [departments, priority] = await Promise.all([
    getDepartmentsForLocale(locale),
    getPriorityServicesForLocale(locale),
  ]);

  return (
    <main>
      <BrandHero locale={locale} />
      <ServiceHighlight items={priority} heading={t("home.priorityServices")} />
      <DepartmentGrid items={departments} heading={t("home.departments")} />
    </main>
  );
}
