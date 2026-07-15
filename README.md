# KMA PolyClinic (`kma-web`)

Next.js marketing site for **KMA PolyClinic** — Quiet Luxury polyclinic in Torun Center, Istanbul. Locales: `tr` (default), `en`, `fa`, `ar` (RTL for `fa` / `ar`).

Content loads from Sanity when configured; otherwise `src/lib/mvp-content.ts` (and `mvp-legal.ts`) provides production-ready fallback copy.

## Setup

```bash
cd kma-web
npm install
cp .env.example .env.local
# fill Sanity / Resend values as needed
npm run dev
```

Open [http://localhost:3000/tr](http://localhost:3000/tr).

Sanity Studio (same app): [http://localhost:3000/studio](http://localhost:3000/studio) after project ID is set.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://kmapolyclinic.com.tr`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (default `production`) |
| `SANITY_API_READ_TOKEN` | Optional read token for private drafts |
| `SANITY_API_WRITE_TOKEN` | Optional write token (studio / seed) |
| `RESEND_API_KEY` | Contact form email via Resend |
| `LEADS_TO_EMAIL` | Lead inbox (default `info@kmapolyclinic.com.tr`) |
| `LEADS_FROM_EMAIL` | From address for lead mail |

Without Sanity IDs, department/service/gallery queries fall back to MVP static content. Without Resend, the leads API should still rate-limit and reject/fail gracefully (see tests).

## Scripts

```bash
npm run dev      # Next.js + Studio
npm test         # Vitest
npm run build    # production build
npm start        # serve build
npm run lint     # ESLint
```

## Sanity Studio seed checklist

Create **translated documents** for each locale (`tr`, `en`, `fa`, `ar`) using document internationalization.

### Departments (`department`)

| Slug | Notes |
| --- | --- |
| `aesthetics` | |
| `dermatology` | |
| `dentistry` | |
| `plastic-surgery` | |
| `hair-transplant` | |
| `eyebrow-transplant` | |
| `checkup-laboratory` | Set **`faOnly: true`** — published only for Persian (`/fa`) |

Fill `title`, `slug`, `summary`, optional `heroImage`, and `navPriority` (lower = higher).

### Priority services (`service`)

| Slug |
| --- |
| `eyebrow-transplant` |
| `hair-transplant` |
| `botox` |
| `filler` |
| `laser` |

Mark them as priority / homepage services per your schema so `getPriorityServices` returns them.

### Also recommended

- [ ] `galleryItem` docs with images/tags
- [ ] `legalPage` docs with `key` = `privacy` / `terms` per locale (site already serves MVP legal copy from `mvp-legal.ts`)
- [ ] `siteSettings` NAP/social if used in CMS later

Until CMS is populated, `getDepartmentsForLocale` / `getPriorityServicesForLocale` use `mvp-content.ts`.

## Deploy notes

1. Deploy the `kma-web` app on Vercel (or similar) from this directory.
2. Set the env vars above in the host dashboard.
3. Attach `kmapolyclinic.com.tr` (and redirect `kmapolyclinic.tr` → `.com.tr` when redirect rules are added).
4. Confirm `/tr` loads, `/fa` has `dir="rtl"`, WhatsApp numbers differ by locale, and contact form returns 200 when Resend is configured.

NAP / controller contact: **KMA PolyClinic**, Torun Center address in `src/lib/nap.ts`, email `info@kmapolyclinic.com.tr`.
