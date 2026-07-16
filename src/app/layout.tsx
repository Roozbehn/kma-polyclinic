import type { ReactNode } from "react";

/** Root layout passes through; locale layout owns <html>/<body> for correct lang/dir SSR. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
