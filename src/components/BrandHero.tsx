import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { whatsappHref } from "@/lib/whatsapp";

type BrandHeroProps = {
  locale: string;
  headline?: string;
  support?: string;
};

export async function BrandHero({ locale, headline, support }: BrandHeroProps) {
  const t = await getTranslations();
  const wa = whatsappHref(locale, t("whatsappPrefill"));

  return (
    <section className="brand-hero" aria-labelledby="brand-hero-title">
      <div className="brand-hero__veil" aria-hidden="true" />
      <div className="brand-hero__content">
        <p id="brand-hero-title" className="brand-display brand-hero__brand">
          {t("brand")}
        </p>
        <h1 className="brand-hero__headline">{headline ?? t("home.headline")}</h1>
        <p className="brand-hero__support">{support ?? t("home.support")}</p>
        <div className="brand-hero__cta">
          <a className="btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
            {t("cta.whatsapp")}
          </a>
          <Link className="btn-ghost" href="/contact">
            {t("cta.appointment")}
          </Link>
        </div>
      </div>
    </section>
  );
}
