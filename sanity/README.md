# Sanity CMS setup

Studio is embedded at `/studio` and schemas live in `sanity/schemas/`.

## Required: create a live project

This environment cannot run interactive `sanity init`. You must create a project once:

1. Sign in at [sanity.io/manage](https://www.sanity.io/manage) and create a project (dataset: `production`).
2. Copy the project ID into `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Restart `npm run dev` and open `/studio`.

Until a real project ID is set, config uses `"placeholder"` so the Next app still builds. Fetch helpers return empty results instead of throwing.
