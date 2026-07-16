import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getMeasurementPage } from "@/lib/measurement-content";
import { breadcrumbJsonLd, SITE_URL, webPageJsonLd } from "@/lib/schema-org";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const doc = getMeasurementPage(locale);
  return pageMetadata({
    locale,
    path: "/measurement",
    title: doc.seoTitle,
    description: doc.seoDescription,
  });
}

export default async function MeasurementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const doc = getMeasurementPage(locale);
  const url = `${SITE_URL}/${locale}/measurement`;

  return (
    <main className="legal-page measurement-page">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t("breadcrumb.home"), path: `/${locale}` },
          { name: doc.title, path: `/${locale}/measurement` },
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: doc.title,
          description: doc.seoDescription,
          url,
          locale,
        })}
      />

      <Breadcrumbs
        items={[
          { name: t("breadcrumb.home"), href: "/" },
          { name: t("legal.measurement") },
        ]}
      />

      <h1 className="brand-display legal-page__title">{doc.title}</h1>
      <p className="measurement-page__lead">{doc.lead}</p>

      {doc.sections.map((section) => (
        <section
          key={section.id}
          className="legal-page__section"
          aria-labelledby={`meas-${section.id}`}
        >
          <h2 id={`meas-${section.id}`}>{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {section.bullets?.length ? (
            <ul className="measurement-page__list">
              {section.bullets.map((b) => (
                <li key={b.slice(0, 48)}>{b}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      <section className="legal-page__section" aria-labelledby="meas-checklist">
        <h2 id="meas-checklist">{doc.checklistHeading}</h2>
        <ol className="measurement-page__list measurement-page__list--ordered">
          {doc.checklist.map((item) => (
            <li key={item.slice(0, 48)}>{item}</li>
          ))}
        </ol>
      </section>

      <section
        className="legal-page__section measurement-page__kma"
        aria-labelledby="meas-kma"
      >
        <h2 id="meas-kma">{doc.kmaHeading}</h2>
        {doc.kmaParagraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
        <ul className="measurement-page__list">
          {doc.kmaBullets.map((b) => (
            <li key={b.slice(0, 48)}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="legal-page__section" aria-labelledby="meas-links">
        <h2 id="meas-links">{doc.linksHeading}</h2>
        <ul className="measurement-page__list">
          {doc.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
