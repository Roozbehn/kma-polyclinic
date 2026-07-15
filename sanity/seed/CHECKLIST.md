# Sanity seed checklist

Use Studio at `/studio`. Prefer document internationalization so each document has `tr` / `en` / `fa` / `ar` versions.

1. Create all department slugs from `MVP_DEPARTMENT_SLUGS` in `src/lib/mvp-content.ts`.
2. For `checkup-laboratory`, set **`faOnly: true`**.
3. Create priority services from `MVP_PRIORITY_SERVICE_SLUGS`.
4. Optional: gallery items + legal pages (`privacy`, `terms`).
5. Publish. Site falls back to `mvp-content.ts` / `mvp-legal.ts` until then.
