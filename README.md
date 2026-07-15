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
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://kmapoliklinik.com.tr`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (default `production`) |
| `SANITY_API_READ_TOKEN` | Optional read token for private drafts |
| `SANITY_API_WRITE_TOKEN` | Optional write token (studio / seed) |
| `RESEND_API_KEY` | Contact form email via Resend |
| `LEADS_TO_EMAIL` | Lead inbox (default `info@kmapoliklinik.com.tr`) |
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

## Deploy (Vercel)

`vercel.json` permanently redirects `www.kmapoliklinik.com.tr` → `https://kmapoliklinik.com.tr/:path*`.

### 1. Project + env

1. From this directory, create/link a Vercel project (`vercel link` or Import Git Repo in the dashboard).
2. Set all environment variables from `.env.example` in the Vercel project settings (Production + Preview as needed).
3. Deploy with `vercel --prod` **only when logged in** (`vercel whoami`). Do **not** run `vercel --yes` unattended if auth fails — leave deploy as a human step.

### 2. Attach domains on Vercel

In **Project → Settings → Domains**, add:

| Domain | Role |
| --- | --- |
| `kmapoliklinik.com.tr` | Primary (canonical) — only custom domain |
| `www.kmapoliklinik.com.tr` | Optional; redirects via `vercel.json` → apex |

Confirm Vercel shows the domain as **Valid** after DNS propagates.

### 3. DNS at the registrar

Point DNS at Vercel (values shown in the Domains UI; typically):

| Type | Host | Value |
| --- | --- | --- |
| `A` | `@` | `76.76.21.21` (Vercel apex; confirm in dashboard) |
| `CNAME` | `www` | `cname.vercel-dns.com` (or the exact target Vercel shows) |

Wait for propagation, then hard-refresh Domain status.

### 4. Smoke checks after live deploy

1. `https://kmapoliklinik.com.tr/tr` loads.
2. `https://www.kmapoliklinik.com.tr/…` 301/308 to `https://kmapoliklinik.com.tr/…` (if www is configured).
3. `/fa` and `/ar` have `dir="rtl"`; `/en` and `/tr` are LTR.
4. WhatsApp numbers differ by locale (`fa` vs others).
5. Contact form returns 200 when `RESEND_API_KEY` is set.

NAP / controller contact: **KMA PolyClinic**, Torun Center address in `src/lib/nap.ts`, email `info@kmapoliklinik.com.tr`.
