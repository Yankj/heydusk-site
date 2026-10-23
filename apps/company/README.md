# HeyDusk · 理想三旬（公司官网）

Official company site for **理想三旬 / HeyDusk**. Lives at https://heydusk.com.

This app is one half of the `Yankj/heydusk-site` monorepo. The product marketing site for **mimi 小咪** is sibling `apps/mimi` → https://mimi.heydusk.com.

## Site structure (en + /zh)

- `/` — company home: mission, principles, featured product
- `/products` — product list (mimi card links out to https://mimi.heydusk.com)
- `/about` — company
- `/contact` — `hello@heydusk.com`
- `/privacy`, `/terms` — DRAFT legal placeholders, not in effect
- Redirects (see `vercel.json`): `/products/cat`, `/products/mimi` → mimi site; `/brand` → `/about`; `/projects` → `/products`

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

Root Directory for this project must be **`apps/company`**. Build: `npm run build:vercel`.

## Brand

Production assets: `public/`. Visual system: `design-system/heydusk/MASTER.md`. Logo kit: `design-system/logo/`.

The monochrome HeyDusk mark is the permanent company identity. Do **not** replace it with the mimi orange cream cat mark.
