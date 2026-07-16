import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getAboutPageContent } from "@/lib/cms-pages";
import { breadcrumbJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const about = await getAboutPageContent(locale);
  const t = await getTranslations();
  const url = `${SITE_URL}/${locale}/about`;

  return (
    <main className="about-page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: about.title, path: `/${locale}/about` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: about.title,
          description: about.lead,
          url,
          locale,
          type: "AboutPage",
        })}
      />
      <Breadcrumbs
        items={[
          { name: t("breadcrumb.home"), href: "/" },
          { name: t("nav.about") },
        ]}
      />
      <header className="about-page__header">
        <p className="brand-display about-page__brand">{about.brand}</p>
        <h1 className="about-page__title">{about.title}</h1>
        <p className="about-page__lead">{about.lead}</p>
      </header>

      {about.blocks.map((block, index) => (
        <section
          key={`${block.heading}-${index}`}
          className={
            index === about.blocks.length - 1
              ? "about-page__block about-page__block--accent"
              : "about-page__block"
          }
          aria-labelledby={`about-block-${index}`}
        >
          <h2 id={`about-block-${index}`} className="brand-display section-heading">
            {block.heading}
          </h2>
          <p>{block.body}</p>
        </section>
      ))}

      <div className="content-page__actions">
        <Link className="btn-primary" href="/contact">
          {t("cta.appointment")}
        </Link>
        <Link className="btn-ghost" href="/departments">
          {t("nav.departments")}
        </Link>
      </div>
    </main>
  );
}
