"use client";

import { FormEvent, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { NAP } from "@/lib/nap";
import {
  getMetaClickIds,
  newMetaEventId,
  trackMetaEvent,
  trackMetaPixel,
} from "@/lib/meta/client";
import { splitPersonName, writeMetaStoredUser } from "@/lib/meta/user-data";

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
const mapsOpenUrl = `https://www.google.com/maps?q=${NAP.geo.lat},${NAP.geo.lng}`;

export function ContactPanel({ departments }: ContactPanelProps) {
  const locale = useLocale();
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const department = String(data.get("department") || "").trim() || undefined;
    const message = String(data.get("message") || "").trim() || undefined;
    const eventId = newMetaEventId();
    const { fbp, fbc } = getMetaClickIds();

    const { firstName, lastName } = splitPersonName(name);
    // Persist for future ViewContent EMQ (email / phone / name).
    writeMetaStoredUser({
      email: email || undefined,
      phone,
      firstName,
      lastName,
      country: "tr",
      externalId: `lead_${phone.replace(/\D/g, "").slice(-10) || Date.now()}`,
    });

    trackMetaPixel("Schedule", eventId, {
      content_category: "appointment",
      ...(department ? { content_name: department } : {}),
    });

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          department,
          message,
          locale,
          website: String(data.get("website") || ""),
          eventId,
          fbp,
          fbc,
          eventSourceUrl: window.location.href,
        }),
      });
      if (!res.ok) throw new Error("lead_failed");

      // Persist em/ph for future ViewContent; fire Lead (Pixel+CAPI).
      // Schedule CAPI is sent server-side from /api/leads with the same eventId.
      void trackMetaEvent({
        eventName: "Lead",
        email: email || undefined,
        phone,
        firstName,
        lastName,
        country: "tr",
        persistUser: true,
        customData: {
          content_category: "appointment",
          content_name: department || "contact_form",
        },
      });

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
          <a
            href={`tel:${NAP.phoneTel}`}
            onClick={() => {
              void trackMetaEvent({ eventName: "Contact", customData: { content_name: "phone" } });
            }}
          >
            {NAP.phoneDisplay}
          </a>
          <a
            href={`mailto:${NAP.email}`}
            onClick={() => {
              void trackMetaEvent({
                eventName: "Contact",
                email: NAP.email,
                customData: { content_name: "email" },
              });
            }}
          >
            {NAP.email}
          </a>
          <p>
            {NAP.streetAddress}
            <br />
            {NAP.addressLocality}, {NAP.addressCountry}
          </p>
          <p>{hoursLabel}</p>
          <a
            className="btn-ghost"
            href={mapsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void trackMetaEvent({
                eventName: "FindLocation",
                customData: { content_name: "torun-center" },
              });
            }}
          >
            {t("mapTitle")}
          </a>
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
