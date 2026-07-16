import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Studio, Next internals, static files, and root metadata/OG image routes.
  matcher: [
    "/",
    "/(tr|en|fa|ar)/:path*",
    "/((?!api|studio|_next|_vercel|opengraph-image|twitter-image|robots\\.txt|sitemap\\.xml|site\\.webmanifest|favicon\\.ico|.*\\..*).*)",
  ],
};
