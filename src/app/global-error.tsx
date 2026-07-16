"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f3efe9",
          color: "#1c1917",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "28rem", display: "grid", gap: "1rem" }}>
          <h1 style={{ margin: 0, fontFamily: "Georgia, serif", fontWeight: 500 }}>
            Something went wrong
          </h1>
          <p style={{ margin: 0, color: "#57534e" }}>
            We could not load this page. Please try again or return home.
          </p>
          {error.digest ? (
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#78716c" }}>Ref: {error.digest}</p>
          ) : null}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#1c1917",
                color: "#fafaf9",
                border: "none",
                padding: "0.85rem 1.4rem",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              Try again
            </button>
            <Link
              href="/tr"
              style={{
                border: "1px solid #1c1917",
                color: "#1c1917",
                padding: "0.85rem 1.4rem",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
