import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryStrip } from "@/components/GalleryStrip";
import { getDepartmentsForLocale } from "@/lib/mvp-content";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const departments = await getDepartmentsForLocale(locale);
  const labels = Object.fromEntries(departments.map((d) => [d.slug, d.title]));

  return (
    <main>
      <GalleryStrip heading={t("title")} labels={labels} />
    </main>
  );
}
