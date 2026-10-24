# Contributing

This repo holds two sites: `apps/company` (heydusk.com) and `apps/mimi` (mimi.heydusk.com). See [README.md](README.md) for Vercel settings and local development.

## Checklist

1. Branch from the latest `main`: `feat|fix|docs|chore|refactor/<topic>`. One topic per branch; no direct commits to `main`; no force-push; no `--no-verify`.
2. Commit in small steps. Author must be the company address:
   `git config user.name Yankj` / `git config user.email hello@heydusk.com` (also enable *Keep my email addresses private* and *Block command line pushes that expose my email* on GitHub).
3. Build and check only the site you changed:
   - Company: `cd apps/company && npm install && npm run build && npm test`
   - mimi: `cd apps/mimi && npm run build && npm run check`
4. Open a PR into `main`. Describe what changed, which site(s) it affects, and attach screenshots for visual changes. Review with the Vercel preview.
5. Merge with a **merge commit** only after the owner approves; merging to `main` deploys production. Delete the branch afterwards.

## Do not commit

Secrets, `.env*`, build output (`dist/`, `.vercel/`, `node_modules/`), personal names or emails, or internal documents (for example the product deck). Public pages must not name the owner personally.

## Brand

- HeyDusk company mark: `apps/company/design-system/`. Do not replace it with the mimi cat.
- mimi product brand kit lives in [`Yankj/mimi/docs/brand`](https://github.com/Yankj/mimi/tree/main/docs/brand).
