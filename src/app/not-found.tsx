import Link from "next/link";

/** Fallback 404 outside locale layout (rare). Prefer locale-prefixed routes. */
export default function RootNotFound() {
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
          <p style={{ margin: 0, fontSize: "2.5rem", fontFamily: "Georgia, serif" }}>404</p>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 500 }}>Page not found</h1>
          <p style={{ margin: 0, color: "#57534e" }}>
            The page you requested is not available. Continue to the KMA PolyClinic home page.
          </p>
          <Link
            href="/tr"
            style={{
              display: "inline-flex",
              width: "fit-content",
              background: "#1c1917",
              color: "#fafaf9",
              padding: "0.85rem 1.4rem",
              textDecoration: "none",
            }}
          >
            Go to home
          </Link>
        </main>
      </body>
    </html>
  );
}
