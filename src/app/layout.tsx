import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/schema-org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

/** Root layout passes through; locale layout owns <html>/<body> for correct lang/dir SSR. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
