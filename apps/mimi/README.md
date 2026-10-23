# mimi 小咪 · 产品官网

Static product marketing site for **mimi / 小咪**, deployed at https://mimi.heydusk.com.

Lives in the `Yankj/heydusk-site` monorepo as `apps/mimi`. The iOS / backend app repo is [`Yankj/mimi`](https://github.com/Yankj/mimi); the company site is sibling `apps/company` → https://heydusk.com.

## Local development

```sh
cd apps/mimi
npm run dev
```

Default `http://localhost:4173/`. Override with `PORT=4174 npm run dev`.

```sh
npm run build
npm run check
npm run preview
```

## Structure

- `src/` — home, trust, technology, updates (native HTML) + CSS / JS
- `public/assets/` — video, PDF, product shots, marks used on the live site
- `brand/` — SVG / PNG brand kit snapshot used by this site (canonical guidelines stay in `Yankj/mimi/docs/brand`)
- `content.json` — tagline, version, URLs
- `build.mjs` — builds four pages, SEO, sitemap
- `dist/` — deploy output (gitignored)

## Vercel

| Setting | Value |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Root Directory | `apps/mimi` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

See root `README.md` and `DEPLOY.md` for DNS (`CNAME mimi → cname.vercel-dns.com`, grey cloud).

## Cross-links

- Footer → https://heydusk.com（理想三旬 / HeyDusk）
- Company products page → this site
- Contact shared with company: `hello@heydusk.com`
