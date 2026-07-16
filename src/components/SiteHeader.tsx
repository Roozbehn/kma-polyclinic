"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const NAV = [
  { href: "/services/eyebrow-transplant", key: "eyebrow" as const },
  { href: "/services/hair-transplant", key: "hair" as const },
  { href: "/departments", key: "departments" as const },
  { href: "/gallery", key: "gallery" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="site-header__logo" aria-label="KMA PolyClinic">
        <Image src="/brand/logo.svg" alt="KMA PolyClinic" width={140} height={40} priority />
      </Link>
      <nav className="site-header__nav" aria-label="Primary">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {t(item.key)}
          </Link>
        ))}
      </nav>
      <div className="site-header__actions">
        <LocaleSwitcher />
        <button
          type="button"
          className="site-header__menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t("close") : t("menu")}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className={open ? "site-header__drawer is-open" : "site-header__drawer"}
        aria-label="Mobile"
        hidden={!open}
      >
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {t(item.key)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
