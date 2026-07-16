"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  applyMetaAdvancedMatching,
  newMetaEventId,
  resolveMetaUser,
  trackMetaEvent,
} from "@/lib/meta/client";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Meta Pixel bootstrap + Advanced Matching refresh when email/phone/fb_login_id known.
 * Browser PageView fires once via init script; CAPI PageView is sent separately
 * with the same user_data enrichment (em/ph/fb_login_id) for Event Match Quality.
 */
export function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return;

    const refreshAm = window.setTimeout(() => {
      applyMetaAdvancedMatching(resolveMetaUser());
    }, 800);

    // Server-side PageView for EMQ — do not fire a second browser PageView.
    const eventId = newMetaEventId();
    void trackMetaEvent({
      eventName: "PageView",
      eventId,
      skipPixel: true,
      customData: { content_name: "page" },
    });

    return () => window.clearTimeout(refreshAm);
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
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
