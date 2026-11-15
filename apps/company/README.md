# HeyDusk · 理想三旬（公司官网）

Official company site for **理想三旬 / HeyDusk**. Lives at https://heydusk.com.

This app is one half of the `Yankj/heydusk-site` monorepo. The product marketing site for **mimi 小咪** is sibling `apps/mimi` → https://mimi.heydusk.com.

## Site structure (en + /zh)

- `/` — company home: mission, principles, featured product
- `/products` — independent product catalog: mimi, Momo, FrameForge / 小片场 and Ferry Dock / 渡口; dated summaries and existing entry points
- `/about` — company
- `/contact` — `hello@heydusk.com`
- `/privacy`, `/terms` — DRAFT legal placeholders, not in effect
- Redirects (see `vercel.json`): `/products/cat` and `/zh/products/cat` → the Mimi product site; `/en` and `/en/` → English home `/`; `/brand` → `/about`; `/projects` → `/products`. `/products/mimi` remains the company-site product introduction.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

```bash
npm run build
npm test
```

## Vercel

Root Directory for this project must be **`apps/company`**. Build: `npm run build:vercel`. Full project and DNS notes live in the repo [docs/vercel-and-dns.md](../../docs/vercel-and-dns.md).

## Brand

Production assets: `public/`. Visual system: `design-system/heydusk/MASTER.md`. Logo kit: `design-system/logo/`.

The monochrome HeyDusk mark is the permanent company identity. Do **not** replace it with the mimi orange cream cat mark.
