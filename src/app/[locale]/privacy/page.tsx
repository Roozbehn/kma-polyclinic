import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { getMvpLegal } from "@/lib/mvp-legal";
import { localeLanguageAlternates } from "@/lib/schema-org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const document = getMvpLegal(locale, "privacy");
  return {
    title: `${document.title} | KMA PolyClinic`,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: localeLanguageAlternates("/privacy"),
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument document={getMvpLegal(locale, "privacy")} />;
}
