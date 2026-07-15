"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { NAP } from "@/lib/nap";

export type ContactDepartmentOption = {
  slug: string;
  title: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactPanelProps = {
  departments: ContactDepartmentOption[];
};

const hoursLabel = `${NAP.hours.days[0]}–${NAP.hours.days[NAP.hours.days.length - 1]} ${NAP.hours.opens}–${NAP.hours.closes}`;

const mapsSrc = `https://www.google.com/maps?q=${NAP.geo.lat},${NAP.geo.lng}&z=16&output=embed`;

export function ContactPanel({ departments }: ContactPanelProps) {
  const locale = useLocale();
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          email: String(data.get("email") || "").trim(),
          department: String(data.get("department") || "").trim() || undefined,
          message: String(data.get("message") || "").trim() || undefined,
          locale,
          website: String(data.get("website") || ""),
        }),
      });
      if (!res.ok) throw new Error("lead_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact-panel" aria-labelledby="contact-heading">
      <div className="contact-panel__intro">
        <h1 id="contact-heading" className="brand-display content-page__title">
          {t("title")}
        </h1>
        <p className="content-page__summary">{t("support")}</p>
      </div>

      <div className="contact-panel__grid">
        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <label className="contact-form__field">
            <span>{t("name")}</span>
            <input name="name" type="text" required autoComplete="name" minLength={2} />
          </label>
          <label className="contact-form__field">
            <span>{t("phone")}</span>
            <input name="phone" type="tel" required autoComplete="tel" minLength={7} />
          </label>
          <label className="contact-form__field">
            <span>{t("email")}</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          <label className="contact-form__field">
            <span>{t("department")}</span>
            <select name="department" defaultValue="">
              <option value="">{t("departmentPlaceholder")}</option>
              {departments.map((dept) => (
                <option key={dept.slug} value={dept.slug}>
                  {dept.title}
                </option>
              ))}
            </select>
          </label>
          <label className="contact-form__field">
            <span>{t("message")}</span>
            <textarea name="message" rows={4} maxLength={2000} />
          </label>
          <input
            className="contact-form__hp"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button className="btn-primary" type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? t("sending") : t("submit")}
          </button>
          {status === "success" ? (
            <p className="contact-form__status contact-form__status--ok" role="status">
              {t("success")}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="contact-form__status contact-form__status--err" role="alert">
              {t("error")}
            </p>
          ) : null}
        </form>

        <aside className="contact-panel__nap">
          <h2 className="brand-display section-heading">{t("napHeading")}</h2>
          <a href={`tel:${NAP.phoneTel}`}>{NAP.phoneDisplay}</a>
          <a href={`mailto:${NAP.email}`}>{NAP.email}</a>
          <p>
            {NAP.streetAddress}
            <br />
            {NAP.addressLocality}, {NAP.addressCountry}
          </p>
          <p>{hoursLabel}</p>
          <div className="contact-panel__map">
            <iframe
              title={t("mapTitle")}
              src={mapsSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
