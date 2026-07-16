import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GalleryStrip, type GalleryCmsItem } from "@/components/GalleryStrip";
import { JsonLd } from "@/components/JsonLd";
import { getDepartmentsForLocale } from "@/lib/mvp-content";
import { getGallery } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity-image";
import { breadcrumbJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path: "/gallery",
    title: t("galleryTitle"),
    description: t("galleryDescription"),
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const raw = await getGallery(locale);
  const url = `${SITE_URL}/${locale}/gallery`;

  let items: GalleryCmsItem[] = (raw ?? []).map(
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

  if (items.length === 0) {
    const departments = await getDepartmentsForLocale(locale);
    items = departments.slice(0, 6).map((dept, index) => ({
      id: `mvp-${dept.slug}-${index}`,
      title: dept.title,
      beforeAfter: false,
      departmentSlug: dept.slug,
      departmentTitle: dept.title,
      imageUrl: null,
    }));
  }

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("gallery.title"), path: `/${locale}/gallery` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t("gallery.title"),
          description: t("gallery.support"),
          url,
          locale,
          type: "CollectionPage",
        })}
      />
      <header className="content-page content-page--wide">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("gallery.title") },
          ]}
        />
        <h1 className="brand-display content-page__title">{t("gallery.title")}</h1>
        <p className="content-page__summary">{t("gallery.support")}</p>
      </header>
      <GalleryStrip heading="" emptyLabel={t("gallery.empty")} items={items} />
    </main>
  );
}
