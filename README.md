# HeyDusk sites · 理想三旬

One repo, two sites:

| Site | Path | Domain | Stack |
|---|---|---|---|
| Company | `apps/company` | https://heydusk.com | Vinext / Vite (React) |
| Product · mimi 小咪 | `apps/mimi` | https://mimi.heydusk.com | Static HTML (Node build) |

Company and product brands stay visually distinct. Shared tooling is only the monorepo layout and Vercel pointing at different root directories.

## Local development

Requires Node.js `>=22.13.0` for the company site; Node.js `>=20` for mimi.

```bash
# Company (heydusk.com)
cd apps/company
npm install
npm run dev

# Product (mimi.heydusk.com)
cd apps/mimi
npm run dev          # http://localhost:4173
```

Validate:

```bash
cd apps/company && npm run build && npm test
cd apps/mimi && npm run build && npm run check
```

## Vercel (two projects, one repo)

Import `Yankj/heydusk-site` twice. Do **not** attach production domains until the PR is reviewed and merged.

### Project A — company (`heydusk.com`)

| Setting | Value |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Project name | `heydusk-site` (or `heydusk-company`) |
| Root Directory | `apps/company` |
| Framework Preset | Other |
| Build Command | `npm run build:vercel` (see `apps/company/vercel.json`) |
| Output Directory | (Nitro / Vercel adapter; leave default from build) |
| Production Branch | `main` |

### Project B — product (`mimi.heydusk.com`)

| Setting | Value |
|---|---|
| Git repository | `Yankj/heydusk-site` |
| Project name | `mimi-site` |
| Root Directory | `apps/mimi` |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Production Branch | `main` |

Preview URLs are generated per branch. Production deploys only after merge to `main` and domain attach.

## DNS (Cloudflare · heydusk.com)

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME / apex | `@` / `www` | per existing heydusk.com Vercel setup | as today |
| CNAME | `mimi` | `cname.vercel-dns.com` | DNS only (grey cloud) |

Then add `mimi.heydusk.com` in the mimi Vercel project Domains.

## Brand homes

- **Company (HeyDusk):** `apps/company/design-system/` — monochrome mark + Last Light. Do not replace with the mimi cat.
- **Product (mimi 小咪):** marketing assets used by the site live in `apps/mimi/brand/` and `apps/mimi/public/assets/`. Canonical product brand kit (source of truth for app icons and guidelines) remains in the app repo: [`Yankj/mimi/docs/brand`](https://github.com/Yankj/mimi/tree/main/docs/brand).

## Cross-links

- Company `/products` → https://mimi.heydusk.com
- Product footer → https://heydusk.com
- Contact: `hello@heydusk.com`
