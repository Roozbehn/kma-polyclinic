import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/ContactPanel";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: `${t("title")} | KMA PolyClinic`,
    description: t("support"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const departments = (await getDepartmentsForLocale(locale))
    .filter((dept) => canViewDepartment(dept, locale))
    .map((dept) => ({ slug: dept.slug, title: dept.title }));

  return (
    <main>
      <ContactPanel departments={departments} />
    </main>
  );
}
