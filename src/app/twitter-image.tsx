import { ImageResponse } from "next/og";

export const alt = "KMA PolyClinic — Quiet care in Istanbul";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          background: "linear-gradient(155deg, #f7f4ef 0%, #f3efe9 42%, #ddd6cb 100%)",
          color: "#1c1917",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "55%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(125,143,122,0.28), transparent 60%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
          <div style={{ fontSize: 64, fontWeight: 500, letterSpacing: "-0.02em" }}>
            KMA PolyClinic
          </div>
          <div style={{ fontSize: 32, fontFamily: "system-ui, sans-serif", color: "#57534e" }}>
            Quiet care in the heart of Istanbul
          </div>
          <div style={{ fontSize: 22, fontFamily: "system-ui, sans-serif", color: "#78716c" }}>
            Torun Center · Aesthetics · Hair · Medical wellness
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
