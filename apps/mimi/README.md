# mimi 小咪 · 产品官网

Product site for **mimi / 小咪** → https://mimi.heydusk.com

小咪是给爸爸妈妈、尤其是妈妈的家庭事务助理：拍一张、说一句、打几个字，整理成待你确认的卡片；「今天」看要办的事，「我们家」记着家里的事；不确认不改动，提醒有分寸。成长陪伴是之后的第二层。口号：**先你一步，把事办妥。**

Lives in `Yankj/heydusk-site` as `apps/mimi`; the company site is sibling `apps/company` → https://heydusk.com. App code is in [`Yankj/mimi`](https://github.com/Yankj/mimi).

## Develop

```sh
cd apps/mimi
npm run dev      # build + serve http://localhost:4173 (PORT=… to override)
npm run build    # → dist/
npm run check    # links, anchors, retired-content guard
```

No dependencies; Node ≥ 20.

## Layout

| Path | What |
|---|---|
| `content.json` | All copy: tagline, phrases, demo scenarios, 今天/我们家 examples, promises, privacy, roadmap, FAQ, contact |
| `src/index.html` | Single-page template with `{{TOKENS}}` filled from `content.json` |
| `src/styles.css`, `src/app.js` | Styles (light/dark) and the client-only confirm-card demo, theme, menu |
| `build.mjs` | Renders `dist/index.html`, copies `public/`, writes robots + sitemap |
| `verify.mjs` | Post-build checks |
| `public/` | Favicon and the images the page uses |
| `brand/` | Snapshot of the mimi brand kit (canonical: `Yankj/mimi/docs/brand`) |

Edit copy in `content.json`; edit structure in `src/index.html`.

## Rules for this site

- Speak to parents, especially moms, about family affairs. No internal tech, deploy history, commit SHAs, model or agent comparisons.
- No product film or deck on the site. `verify.mjs` fails the build check if `.mp4`/`.pdf`, "deck" or "catpaw" reappear.
- Examples are fictional and labelled 示例; the demo runs in the browser only and stores nothing.
- Beta access is by email (`hello@heydusk.com`); no forms, no tracking.

## Vercel

Root Directory `apps/mimi`, Build `npm run build`, Output `dist`, Production branch `main`. Old URLs (`trust.html`, `technology.html`, `updates.html`, the old deck and film) redirect to `/` via `vercel.json`.
