"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import {
  applyMetaAdvancedMatching,
  newMetaEventId,
  resolveMetaUser,
  trackMetaEvent,
  trackMetaPixel,
} from "@/lib/meta/client";
import { toPixelAdvancedMatching } from "@/lib/meta/user-data";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta Pixel + CAPI PageView with shared event_id for deduplication.
 * Strategy: same event_name from browser and server (Option 2 in Meta docs).
 */
export function MetaPixel() {
  const pageViewSent = useRef(false);

  useEffect(() => {
    if (!PIXEL_ID || pageViewSent.current) return;

    let attempts = 0;
    const maxAttempts = 50;

    const sendDedupedPageView = () => {
      if (pageViewSent.current) return true;
      if (typeof window.fbq !== "function") return false;

      pageViewSent.current = true;
      const user = resolveMetaUser();
      const am = toPixelAdvancedMatching(user);
      if (Object.keys(am).length > 0) {
        window.fbq("init", PIXEL_ID, am);
      } else {
        window.fbq("init", PIXEL_ID);
      }

      const eventId = newMetaEventId();
      // Browser Pixel PageView with eventID
      trackMetaPixel("PageView", eventId, { content_name: "page" });
      // Server CAPI PageView — same event_name + event_id (dedupe)
      void trackMetaEvent({
        eventName: "PageView",
        eventId,
        skipPixel: true,
        customData: { content_name: "page" },
      });
      return true;
    };

    if (sendDedupedPageView()) {
      return;
    }

    const timer = window.setInterval(() => {
      attempts += 1;
      if (sendDedupedPageView() || attempts >= maxAttempts) {
        window.clearInterval(timer);
      }
    }, 100);

    const refreshAm = window.setTimeout(() => {
      applyMetaAdvancedMatching(resolveMetaUser());
    }, 1500);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(refreshAm);
    };
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel-loader" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
      `}</Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
