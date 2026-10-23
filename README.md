# HeyDusk · 理想三旬

Official company site for **理想三旬 / HeyDusk**, a small product company building calm, trustworthy AI software for families.

## Site structure (en + /zh)

- `/` — company home: mission, principles, featured product
- `/products` — product list
- `/products/cat` — cat, family-affairs assistant (closed beta, iOS)
- `/about` — company
- `/contact` — contact (email in `app/content-docs.ts`, `CONTACT_EMAIL`)
- `/privacy`, `/terms` — DRAFT legal placeholders, not in effect
- `/brand`, `/projects` — legacy pages, not in main navigation

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Production validation:

```bash
npm run build
npm test
```

## Brand assets

Production assets live in `public/`. The persisted visual system lives in `design-system/heydusk/MASTER.md`.

The monochrome mark is the permanent identity. The Last Light gradient is the digital signature.
