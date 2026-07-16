import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="content-page">
      <p className="brand-display content-page__title">{t("code")}</p>
      <h1 className="content-page__summary" style={{ fontSize: "1.35rem", color: "var(--color-ink)" }}>
        {t("title")}
      </h1>
      <p className="content-page__summary">{t("support")}</p>
      <div className="brand-hero__cta" style={{ marginTop: 0 }}>
        <Link className="btn-primary" href="/">
          {t("home")}
        </Link>
        <Link className="btn-ghost" href="/contact">
          {t("contact")}
        </Link>
      </div>
    </main>
  );
}
