import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DepartmentGrid } from "@/components/DepartmentGrid";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "departmentsPage" });
  return pageMetadata({
    locale,
    path: "/departments",
    title: `${t("title")} | KMA PolyClinic`,
    description: t("support"),
  });
}

export default async function DepartmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("departmentsPage");
  const departments = (await getDepartmentsForLocale(locale)).filter((dept) =>
    canViewDepartment(dept, locale),
  );

  return (
    <main>
      <DepartmentGrid items={departments} heading={t("title")} />
    </main>
  );
}
