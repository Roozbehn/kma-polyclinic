import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema-org";

/**
 * Allow major search + AI answer crawlers for SEO/GEO visibility.
 * Studio and API remain disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/", "/api"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
