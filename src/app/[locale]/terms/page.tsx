import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalDocument";
import { getLegalForLocale } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const document = await getLegalForLocale(locale, "terms");
  return pageMetadata({
    locale,
    path: "/terms",
    title: `${document.title} | KMA PolyClinic`,
    description: document.sections[0]?.paragraphs[0] || document.title,
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument document={await getLegalForLocale(locale, "terms")} />;
}
