import { setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/ContactPanel";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";

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
