# KMA incomplete features closeout

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close incomplete product surfaces from the Jul 15 audit — gallery CMS, SEO/OG, SSR lang/dir + RTL fonts, legal CMS fallback, service body/SEO, light API/studio hardening — without changing Kimia Estetik PHP.

**Architecture:** Next.js App Router + next-intl + Sanity hybrid. Prefer CMS when published; keep MVP fallbacks. No new CMS types. Kimia root unchanged.

**Tech Stack:** Next.js 16, next-intl, Sanity, Tailwind/CSS tokens, Vitest, Vercel.

**Out of scope:** Git commit/push unless user asks; inventing fake gallery photos; DNS; secret rotation.

## Tasks
1. Gallery CMS wiring
2. SEO helpers + generateMetadata/OG
3. SSR lang/dir + Arabic/Persian fonts
4. Legal Sanity with MVP fallback
5. Service body + services index
6. Light hardening headers
7. Verify tests + build + redeploy

User asked to run without permission prompts. Skip commits unless later requested.
