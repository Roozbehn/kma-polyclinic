import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { localeLanguageAlternates } from "@/lib/schema-org";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Privacy Policy | KMA PolyClinic",
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

  return (
    <main className="legal-page">
      <h1>Privacy Policy</h1>
      <p>Full privacy policy copy will be added in a follow-up release.</p>
    </main>
  );
}
