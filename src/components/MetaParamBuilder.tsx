"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * Meta CAPI Parameter Builder (client-side).
 * Captures _fbc / _fbp early (including fbclid → fbc), and client_ip_address via getIpFn.
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api/parameter-builder-feature-library
 */

declare global {
  interface Window {
    clientParamBuilder?: {
      processAndCollectAllParams: (
        url?: string | null,
        getIpFn?: () => string | Promise<string>,
      ) => Promise<Record<string, string>>;
      getFbc: () => string;
      getFbp: () => string;
      getClientIpAddress: () => string;
      getNormalizedAndHashedPII: (value: string, dataType: string) => string;
    };
  }
}

const STORAGE_IP_KEY = "kma_meta_client_ip";

async function getIpFn(): Promise<string> {
  try {
    // Prefer our edge-seen IP (IPv6 when Cloudflare/Vercel provides it).
    const res = await fetch("/api/meta/client-ip", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { ip?: string };
      if (data.ip) {
        try {
          sessionStorage.setItem(STORAGE_IP_KEY, data.ip);
        } catch {
          /* ignore */
        }
        return data.ip;
      }
    }
  } catch {
    /* ignore */
  }
  try {
    return sessionStorage.getItem(STORAGE_IP_KEY) || "";
  } catch {
    return "";
  }
}

export async function ensureMetaParamBuilderReady(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const builder = window.clientParamBuilder;
  if (!builder?.processAndCollectAllParams) return false;
  try {
    await builder.processAndCollectAllParams(window.location.href, getIpFn);
    return true;
  } catch (err) {
    console.error("[meta-param-builder] process failed", err);
    return false;
  }
}

/** Read fbc/fbp/ip after builder ran — fall back to document cookies (do not lowercase fbc). */
export function getParamBuilderIds(): {
  fbp?: string;
  fbc?: string;
  clientIp?: string;
} {
  if (typeof window === "undefined") return {};
  const b = window.clientParamBuilder;
  const fbp = b?.getFbp?.() || readCookieRaw("_fbp");
  const fbc = b?.getFbc?.() || readCookieRaw("_fbc");
  const clientIp =
    b?.getClientIpAddress?.() ||
    (() => {
      try {
        return sessionStorage.getItem(STORAGE_IP_KEY) || undefined;
      } catch {
        return undefined;
      }
    })();
  return {
    fbp: fbp || undefined,
    fbc: fbc || undefined,
    clientIp: clientIp || undefined,
  };
}

function readCookieRaw(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  // Do not force lowercase — fbc is case-sensitive per Meta.
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function MetaParamBuilder() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    const tryRun = () => {
      if (!window.clientParamBuilder) return false;
      ran.current = true;
      void ensureMetaParamBuilderReady();
      return true;
    };
    if (tryRun()) return;
    const id = window.setInterval(() => {
      if (tryRun()) window.clearInterval(id);
    }, 50);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Script
      id="meta-capi-param-builder"
      src="/meta/clientParamBuilder.bundle.js"
      strategy="afterInteractive"
      onLoad={() => {
        void ensureMetaParamBuilderReady();
      }}
    />
  );
}
