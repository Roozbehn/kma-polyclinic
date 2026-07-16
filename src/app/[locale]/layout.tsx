import { Fraunces, DM_Sans, Noto_Sans_Arabic } from "next/font/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MetaPixel } from "@/components/MetaPixel";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { routing, isRtlLocale } from "@/i18n/routing";
import { localeLanguageAlternates, SITE_URL } from "@/lib/schema-org";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "KMA PolyClinic",
      template: "%s | KMA PolyClinic",
    },
    description: t("support"),
    applicationName: "KMA PolyClinic",
    authors: [{ name: "KMA PolyClinic" }],
    creator: "KMA PolyClinic",
    keywords: [
      "KMA PolyClinic",
      "Istanbul clinic",
      "Torun Center",
      "hair transplant",
      "eyebrow transplant",
      "aesthetics",
    ],
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/brand/logo.svg", type: "image/svg+xml" }],
      apple: [{ url: "/brand/logo.svg" }],
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: `/${locale}`,
      languages: localeLanguageAlternates(""),
    },
    openGraph: {
      siteName: "KMA PolyClinic",
      type: "website",
      locale: locale === "tr" ? "tr_TR" : locale === "fa" ? "fa_IR" : locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "tr" | "en" | "fa" | "ar")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtlLocale(locale) ? "rtl" : "ltr";
  const fontClass = `${fraunces.variable} ${dmSans.variable} ${notoArabic.variable}`;

  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={fontClass}>
        <MetaPixel />
        <NextIntlClientProvider messages={messages}>
          <a className="skip-link" href="#main-content">
            {tA11y("skip")}
          </a>
          <SiteHeader />
          <div id="main-content">{children}</div>
          <SiteFooter />
          <FloatingWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
