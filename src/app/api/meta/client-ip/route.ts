import { NextRequest, NextResponse } from "next/server";

/**
 * Returns the caller IP for Meta client-side Param Builder getIpFn.
 * Prefer IPv6 when present in the chain; fall back to IPv4.
 * Never hash client_ip_address.
 */
export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const realIp = req.headers.get("x-real-ip") || "";
  const candidates = [
    ...forwarded.split(",").map((s) => s.trim()).filter(Boolean),
    realIp.trim(),
  ].filter(Boolean);

  const ipv6 = candidates.find((ip) => ip.includes(":"));
  const ipv4 = candidates.find((ip) => !ip.includes(":"));
  const ip = ipv6 || ipv4 || "";

  return NextResponse.json(
    { ip },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
