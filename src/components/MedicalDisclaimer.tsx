import { getTranslations } from "next-intl/server";

export async function MedicalDisclaimer() {
  const t = await getTranslations("disclaimer");
  return (
    <aside className="medical-disclaimer" role="note" aria-label={t("label")}>
      <p>{t("text")}</p>
    </aside>
  );
}
