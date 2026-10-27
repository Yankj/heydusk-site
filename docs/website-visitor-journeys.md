# HeyDusk website visitor journeys

The public site presents **HeyDusk / 理想三旬, an independent AI product studio**. It is not registered as a company. Display names are **HeyDusk, Mimi, Momo, FrameForge**; repository names, URLs, routes and code identifiers retain their existing spelling. The public next step for all three products is an introduction followed by an enquiry to `hello@heydusk.com`, without promising direct access, a trial or beta admission.

## Navigation contract

This information site uses ordinary document links. The previous production build had the target pages but its hydrated `next/link` clicks could throw `e is not a function` and leave the URL and content unchanged. The fix preserves the framework and existing visual identity while making page navigation independent of the client RSC router.

| Entry | Destination / action | Expected visitor outcome |
|---|---|---|
| Desktop navigation, mobile menu and home CTA | Localized home, catalog, about or contact route | Full document navigation; URL, title and body agree |
| Header and footer logo | `/` or `/zh` | Return to the current language's home |
| Three direction cards | Corresponding `/products/mimi`, `/products/momo`, `/products/frameforge`, with `/zh` equivalents | Read the relevant product introduction |
| Catalog icon, product title and detail CTA | The same localized product detail | All three entry forms reach the same product |
| Detail introduction button | The page's product-purpose section | A visible section is reached, without implying product access |
| Detail enquiry link | `/contact?product=mimi\|momo\|frameforge`, localized | The contact page shows the chosen product and prepares an appropriate email subject |
| Footer contact address | Localized contact page | The visible address has a page with usable email and copy options |
| Mail link | `mailto:hello@heydusk.com` with an optional known-product subject | The visitor's own client handles sending; the website never claims delivery |
| Copy email | Browser clipboard, or a visible selectable-address fallback | Accurate success/failure feedback, with manual copying always possible |
| Language switch | Same semantic page in the other language | Product details stay on that product; contact preserves the allowed product parameter after hydration |
| Theme toggle | Guarded browser preference | Works on the current page even if local storage is denied; does not interrupt navigation |
| Mobile menu | Native `details` plus Escape/outside closing | Keyboard and touch navigation; no duplicate contact menu item |
| Privacy / terms | Localized static-site explanations | Describe this information site, with draft/review boundaries rather than a product service agreement |
| Unknown route | Real HTTP 404 with localized home/catalog/contact actions | Recover through the page itself; no empty screen |

The six original route families (`/`, `/products`, `/about`, `/contact`, `/privacy`, `/terms`) remain. Each product has English and Chinese detail pages, for 18 known pages. `robots.txt` and `sitemap.xml` list the public site; unknown pages are not indexed. The framework proxy derives document language only from the path and supplies the corresponding server-rendered `html lang` and 404 recovery language. It does not authenticate, fetch data, store records or contact another service.

`/products/mimi` and `/zh/products/mimi` now resolve to actual studio detail pages, so the old conflicting off-site redirects are removed. Other existing legacy redirects remain in `apps/company/vercel.json`. Vercel-specific redirect execution must be checked after a separately authorized deployment; a local server check does not prove platform routing.

The separate Mimi marketing page keeps its fictional browser-only demonstration. Its visible name is Mimi, enquiry buttons reach a contact section with email/copy feedback, and its studio link returns to the Chinese studio page. This does not change the native product or backend.

## Checks

Build the company site and run its rendered HTTP checks, then start the resulting local production server:

```sh
cd apps/company
npm run build
node --test tests/rendered-html.test.mjs
npm run start -- --port 4180
```

From the repository root, use the existing Python Playwright / Chromium environment for actual visitor actions:

```sh
python3 scripts/check-visitor-journeys.py --base-url http://127.0.0.1:4180 --output-dir /tmp/heydusk-visitor-checks
```

An already-running local Mimi marketing server can be supplied with `--mimi-url http://127.0.0.1:4173`. The checker does not start servers, send email, deploy or access remote sites. It exercises real clicks and page content, history, cold deep links, language, menus, storage denial, clipboard denial, no-JavaScript paths and 404 recovery. External destinations are intercepted; this does not validate their live availability.

Also run company lint, the local Vercel build, `node scripts/check-brand-consistency.mjs`, and Mimi's static build/check when that site changes. The full repository TypeScript check has pre-existing Cloudflare worker type-declaration gaps; keep that failure separate from the app/proxy type check and do not call it a pass.

## Evidence limits

Website journey checks establish the local information-site experience, not native App acceptance, learning results, real host compatibility, mailbox delivery, legal review or complete commercial readiness. Hosting retention, responsible-provider details and other formal operating information require separate confirmation. No database, email delivery service, credentials or new dependencies are introduced.
