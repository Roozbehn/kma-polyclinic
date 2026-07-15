import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NAP } from "@/lib/nap";

export async function SiteFooter() {
  const t = await getTranslations("legal");
  const hoursLabel = `${NAP.hours.days[0]}–${NAP.hours.days[NAP.hours.days.length - 1]} ${NAP.hours.opens}–${NAP.hours.closes}`;

  return (
    <footer className="site-footer">
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
        <Link href="/privacy">{t("privacy")}</Link>
        <Link href="/terms">{t("terms")}</Link>
      </div>
    </footer>
  );
}
