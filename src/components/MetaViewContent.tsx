"use client";

import { useEffect, useMemo } from "react";
import { trackMetaEvent } from "@/lib/meta/client";

/**
 * Fires ViewContent (Pixel + CAPI) with Event Match Quality fields when available:
 * email (em), phone (ph), fb_login_id — from appointment form storage / FB SDK.
 */
export function MetaViewContent({
  contentName,
  contentIds,
  contentType = "product",
}: {
  contentName: string;
  contentIds: string[];
  contentType?: string;
}) {
  const idsKey = useMemo(() => contentIds.join(","), [contentIds]);

  useEffect(() => {
    void trackMetaEvent({
      eventName: "ViewContent",
      // email / phone / fbLoginId resolved inside trackMetaEvent from storage
      country: "tr",
      customData: {
        content_name: contentName,
        content_ids: idsKey.split(",").filter(Boolean),
        content_type: contentType,
      },
    });
  }, [contentName, contentType, idsKey]);

  return null;
}
