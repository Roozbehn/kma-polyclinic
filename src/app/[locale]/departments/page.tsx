import { getTranslations, setRequestLocale } from "next-intl/server";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const departments = (await getDepartmentsForLocale(locale)).filter((dept) =>
    canViewDepartment(dept, locale),
  );

  return (
    <main>
      <DepartmentGrid items={departments} heading={t("nav.departments")} />
    </main>
  );
}
