import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GalleryStrip, type GalleryCmsItem } from "@/components/GalleryStrip";
import { getGallery } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity-image";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return pageMetadata({
    locale,
    path: "/gallery",
    title: `${t("title")} | KMA PolyClinic`,
    description: t("support"),
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const raw = await getGallery(locale);

  const items: GalleryCmsItem[] = (raw ?? []).map(
    (
      item: {
        title?: string;
        beforeAfter?: boolean;
        image?: unknown;
        department?: { title?: string; slug?: string };
      },
      index: number,
    ) => {
      let imageUrl: string | null = null;
      try {
        if (item.image) {
          imageUrl = urlForImage(item.image as never)
            .width(1200)
            .height(900)
            .fit("crop")
            .url();
        }
      } catch {
        imageUrl = null;
      }
      return {
        id: `${item.department?.slug ?? "item"}-${index}`,
        title: item.title,
        beforeAfter: item.beforeAfter,
        departmentSlug: item.department?.slug,
        departmentTitle: item.department?.title,
        imageUrl,
      };
    },
  );

  return (
    <main>
      <GalleryStrip heading={t("title")} emptyLabel={t("empty")} items={items} />
    </main>
  );
}
