"use client";

import { useEffect, useMemo } from "react";
import { trackMetaEvent } from "@/lib/meta/client";

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
      customData: {
        content_name: contentName,
        content_ids: idsKey.split(",").filter(Boolean),
        content_type: contentType,
      },
    });
  }, [contentName, contentType, idsKey]);

  return null;
}
