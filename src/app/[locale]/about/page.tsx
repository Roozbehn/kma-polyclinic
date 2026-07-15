import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <main className="about-page">
      <header className="about-page__header">
        <p className="brand-display about-page__brand">{t("brand")}</p>
        <h1 className="about-page__title">{t("title")}</h1>
        <p className="about-page__lead">{t("lead")}</p>
      </header>

      <section className="about-page__block" aria-labelledby="about-story">
        <h2 id="about-story" className="brand-display section-heading">
          {t("storyHeading")}
        </h2>
        <p>{t("story")}</p>
      </section>

      <section className="about-page__block" aria-labelledby="about-trust">
        <h2 id="about-trust" className="brand-display section-heading">
          {t("trustHeading")}
        </h2>
        <p>{t("trust")}</p>
      </section>

      <section className="about-page__block about-page__block--accent" aria-labelledby="about-position">
        <h2 id="about-position" className="brand-display section-heading">
          {t("positionHeading")}
        </h2>
        <p>{t("position")}</p>
      </section>
    </main>
  );
}
