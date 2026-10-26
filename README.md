# HeyDusk sites · 理想三旬

One repo, two sites:

| Site | Path | Domain | Stack |
|---|---|---|---|
| Company | `apps/company` | https://heydusk.com | Vinext / Vite (React) |
| Product · mimi 小咪 | `apps/mimi` | https://mimi.heydusk.com | Static HTML (Node build) |

Company and product brands stay visually distinct. Shared tooling is only the monorepo layout and Vercel pointing at different root directories.

## Positioning (keep them different)

[Brand, directions and product directory](docs/brand-product-system.md) is the maintenance entry for the parent brand. HeyDusk builds independent AI products across family & life, learning & growth, and creation & expression: mimi, Momo, and FrameForge / 小片场. Product capabilities and acceptance remain authoritative in each product repository. The public bilingual catalog is a dated summary in `apps/company/app/product-catalog.ts`.

| | Company · heydusk.com | Product · mimi.heydusk.com |
|---|---|---|
| Whose site | 理想三旬 / HeyDusk **company** | **mimi / 小咪** product |
| Tone | Editorial / company catalog | Full product marketing |
| Logo | HeyDusk mark | Orange-cream cat series |
| Primary CTA | Contact / products list | Product enquiries (existing email) |
| Cross-link | Independent product entries and documented stages | Badge → heydusk.com 「理想三旬出品」 |

A visitor should never wonder which site they are on.

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

## Branch and PR conventions

- Branch from the latest `main`, named `feat|fix|docs|chore|refactor/<topic>`; one topic per branch. Never commit to `main` directly; never force-push.
- Small commits, one change each, with a message that says what and why.
- Everything lands through a PR into `main`. Default to **merge commits** (no squash) so history stays traceable. Delete the branch after merge.
- **Commit author must be** `Yankj <hello@heydusk.com>`. Turn on *Keep my email addresses private* and *Block command line pushes that expose my email* in GitHub, set `git config user.email hello@heydusk.com` locally, and use the same for web merges.
- **Merging to `main` deploys production** (both Vercel projects build from `main`), so it needs the owner's explicit approval. Use the per-branch Vercel preview to review first, and keep preview URLs that contain a personal name private.
- Keep the company and product sites separate: a change to one app's `apps/<site>/` directory should not touch the other's, unless it is repo-level tooling or docs.
- Product behaviour and the product's brand kit live in [`Yankj/mimi`](https://github.com/Yankj/mimi); this repo only holds the marketing sites.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the short checklist.

## Brand homes

- **Company (HeyDusk):** `apps/company/design-system/` — monochrome mark + Last Light. Do not replace with the mimi cat.
- **Product (mimi 小咪):** marketing assets used by the site live in `apps/mimi/brand/` and `apps/mimi/public/assets/`. Canonical product brand kit (source of truth for app icons and guidelines) remains in the app repo: [`Yankj/mimi/docs/brand`](https://github.com/Yankj/mimi/tree/main/docs/brand).

## Cross-links

- Company `/products` → https://mimi.heydusk.com
- Product footer → https://heydusk.com
- Contact: `hello@heydusk.com`
