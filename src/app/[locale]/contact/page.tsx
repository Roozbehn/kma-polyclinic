import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactPanel } from "@/components/ContactPanel";
import { JsonLd } from "@/components/JsonLd";
import { canViewDepartment } from "@/lib/locale-gate";
import { getDepartmentsForLocale } from "@/lib/mvp-content";
import { breadcrumbJsonLd, medicalClinicJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
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
    path: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const departments = (await getDepartmentsForLocale(locale)).filter((d) =>
    canViewDepartment(d, locale),
  );
  const url = `${SITE_URL}/${locale}/contact`;

  return (
    <main>
      <JsonLd data={medicalClinicJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: t("nav.contact"), path: `/${locale}/contact` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: t("contact.title"),
          description: t("contact.support"),
          url,
          locale,
          type: "ContactPage",
        })}
      />
      <div className="page-crumbs">
        <Breadcrumbs
          items={[
            { name: t("breadcrumb.home"), href: "/" },
            { name: t("nav.contact") },
          ]}
        />
      </div>
      <ContactPanel
        departments={departments.map((d) => ({ slug: d.slug, title: d.title }))}
      />
    </main>
  );
}
