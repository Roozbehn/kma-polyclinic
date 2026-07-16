import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAP } from "@/lib/nap";

export async function SiteFooter() {
  const t = await getTranslations();
  const hoursLabel = t("footer.hours", {
    days: t("footer.daysMonSat"),
    opens: NAP.hours.opens,
    closes: NAP.hours.closes,
  });

  return (
    <footer className="site-footer">
      <div className="site-footer__brand">
        <p className="brand-display site-footer__name">{t("brand")}</p>
        <p className="site-footer__tagline">{t("footer.tagline")}</p>
        <div className="site-footer__nap">
          <a href={`tel:${NAP.phoneTel}`}>{NAP.phoneDisplay}</a>
          <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
          <p>
            {NAP.streetAddress}
            <br />
            {NAP.addressLocality}, {NAP.addressCountry}
          </p>
          <p>{hoursLabel}</p>
        </div>
      </div>

      <nav className="site-footer__nav" aria-label={t("footer.navLabel")}>
        <Link href="/departments">{t("nav.departments")}</Link>
        <Link href="/services">{t("services.title")}</Link>
        <Link href="/gallery">{t("nav.gallery")}</Link>
        <Link href="/about">{t("nav.about")}</Link>
        <Link href="/contact">{t("nav.contact")}</Link>
      </nav>

      <div className="site-footer__meta">
        <div className="site-footer__social">
          <a href={NAP.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={NAP.social.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={NAP.social.tiktok} target="_blank" rel="noopener noreferrer">
            TikTok
          </a>
        </div>
        <div className="site-footer__legal">
          <Link href="/privacy">{t("legal.privacy")}</Link>
          <Link href="/terms">{t("legal.terms")}</Link>
          <Link href="/measurement">{t("legal.measurement")}</Link>
        </div>
        <p className="site-footer__copy">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
