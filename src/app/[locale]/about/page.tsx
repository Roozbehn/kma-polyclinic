import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getAboutPageContent } from "@/lib/cms-pages";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const about = await getAboutPageContent(locale);
  return pageMetadata({
    locale,
    path: "/about",
    title: `${about.title} | KMA PolyClinic`,
    description: about.lead,
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

  return (
    <main className="about-page">
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
    </main>
  );
}
