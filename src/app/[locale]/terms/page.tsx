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
    title: "Terms of Use | KMA PolyClinic",
    alternates: {
      canonical: `/${locale}/terms`,
      languages: localeLanguageAlternates("/terms"),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="legal-page">
      <h1>Terms of Use</h1>
      <p>Full terms of use copy will be added in a follow-up release.</p>
    </main>
  );
}
