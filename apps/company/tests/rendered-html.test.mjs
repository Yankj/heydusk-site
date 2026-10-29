import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html", host: "heydusk.com" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const localize = (locale, path) => locale === "en" ? path : `/zh${path === "/" ? "" : path}`;
const visibleHTML = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tagAttributes = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))].map((match) => Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attribute) => [attribute[1].toLowerCase(), attribute[2]])));
const products = [["mimi", "Mimi / 小咪"], ["momo", "Momo"], ["frameforge", "FrameForge / 小片场"], ["ferry-dock", "Ferry Dock / 渡口"]];
const routes = [
  ["/", null, "Calm software", "安静可靠的软件"],
  ["/products", ["Products", "产品"], "Products with a clear job to do", "为一个清晰的任务而生"],
  ["/about", ["About", "关于我们"], "Who we are", "我们是谁"],
  ["/contact", ["Contact", "联系我们"], "hello@heydusk.com", "hello@heydusk.com"],
  ["/privacy", ["Privacy Policy (draft)", "隐私政策（草案）"], "DRAFT", "草案"],
  ["/terms", ["Terms of Service (draft)", "服务条款（草案）"], "DRAFT", "草案"],
  ...products.map(([slug, name]) => [`/products/${slug}`, null, name, name]),
];

for (const locale of ["en", "zh"]) {
  const lang = locale === "en" ? "en" : "zh-CN";
  for (const [route, title, englishCopy, chineseCopy] of routes) {
    const path = localize(locale, route);
    test(`${path} returns its complete localized document and metadata`, async () => {
      const response = await render(path);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
      const html = visibleHTML(await response.text());
      assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "one visible document heading");
      assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`));
      assert.match(html, new RegExp(`<main[^>]+lang="${lang}"`));
      assert.ok(html.includes(locale === "en" ? englishCopy : chineseCopy));
      if (title) assert.match(html, new RegExp(`<title>${escape(title[locale === "en" ? 0 : 1])} — HeyDusk<\\/title>`));
      else assert.match(html, /<title>[^<]*HeyDusk[^<]*<\/title>/);
      assert.match(html, /<meta name="description" content="[^"]+"/);
      const links = tagAttributes(html, "link");
      const canonical = links.filter((attributes) => attributes.rel === "canonical");
      assert.equal(canonical.length, 1, "one canonical link");
      assert.equal(new URL(canonical[0].href).href, new URL(path, "https://heydusk.com").href);
      for (const [tag, otherLocale] of [["en", "en"], ["zh-CN", "zh"]]) {
        const alternates = links.filter((attributes) => attributes.rel === "alternate" && attributes.hreflang === tag);
        assert.equal(alternates.length, 1, `one ${tag} alternate`);
        assert.equal(new URL(alternates[0].href).href, new URL(localize(otherLocale, route), "https://heydusk.com").href);
      }
      assert.match(html, /href="\/heydusk-favicon\.ico"/);
      assert.match(html, /src="\/heydusk-mark\.svg"/);
      assert.doesNotMatch(html, /href="(?:#|javascript:[^"]*|)"|aria-disabled="true"/);
      assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
    });
  }

  test(`${locale} header and footer expose complete native navigation before hydration`, async () => {
    const html = visibleHTML(await (await render(localize(locale, "/"))).text());
    const header = html.match(/<header\b[^>]*class="site-header"[^>]*>([\s\S]*?)<\/header>/)?.[1];
    const footer = html.match(/<footer\b[^>]*class="site-footer"[^>]*>([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(header && footer, "shared navigation must server-render");
    for (const path of ["/", "/products", "/about", "/contact"]) assert.ok(header.includes(`href="${localize(locale, path)}"`), `header link ${path}`);
    for (const path of ["/", "/products", "/about", "/contact", "/privacy", "/terms", ...products.map(([slug]) => `/products/${slug}`)]) assert.ok(footer.includes(`href="${localize(locale, path)}"`), `footer link ${path}`);
    assert.match(header, /<details[^>]+class="mobile-menu"/);
    assert.match(header, /<summary>/);
    assert.match(header, /class="theme-toggle"/);
    assert.match(header, new RegExp(`<form[^>]+action="${escape(localize(locale === "en" ? "zh" : "en", "/"))}"[^>]+method="get"`));
    // Ferry Dock is a catalog-only tool: it has no home direction card.
    for (const [slug] of products.filter(([slug]) => slug !== "ferry-dock")) assert.match(html, new RegExp(`<a[^>]+class="product-card[^"]*"[^>]+href="${escape(localize(locale, `/products/${slug}`))}"`));
    assert.match(html, /src="\/dusk-field-v2\.webp"/);
    assert.doesNotMatch(html, /\/_next\/image/);
  });

  test(`${locale} catalog leads to detail pages without advertising direct access`, async () => {
    const html = visibleHTML(await (await render(localize(locale, "/products"))).text());
    for (const [slug, name] of products) {
      assert.ok(html.includes(name));
      const target = localize(locale, `/products/${slug}`);
      assert.ok((html.match(new RegExp(`href="${escape(target)}"`, "g")) ?? []).length >= 4, `${name}: icon, title, detail action and footer entry`);
    }
    assert.doesNotMatch(html, /href="https:\/\/(?:mimi\.heydusk\.com|word-island\.kunjie-yan\.chatgpt\.site)/);
    assert.doesNotMatch(html, /github\.com\/Yankj\/(?:momo-word-island|agent-frameforge)/);
    assert.doesNotMatch(html, /href="https:\/\/github\.com\/Yankj\/ferry-dock/);
    assert.doesNotMatch(html, /Closed beta|内测中|Get early access|立即体验/);
  });

  for (const [slug, name] of products) {
    test(`${localize(locale, `/products/${slug}`)} has introduction, boundaries and a product enquiry route`, async () => {
      const html = visibleHTML(await (await render(localize(locale, `/products/${slug}`))).text());
      assert.match(html, new RegExp(`<h1[^>]+id="product-title"[^>]*>${escape(name)}<\\/h1>`));
      assert.match(html, /id="product-purpose-title"/);
      assert.match(html, /id="product-stage-title"/);
      assert.match(html, /class="product-detail-primary" href="#product-purpose-title"/);
      assert.ok(html.includes(`href="${localize(locale, "/contact")}?product=${slug}"`));
      assert.match(html, new RegExp(`class="product-detail-back" href="${escape(localize(locale, "/products"))}"`));
      assert.match(html, new RegExp(`<form[^>]+action="${escape(localize(locale === "en" ? "zh" : "en", `/products/${slug}`))}"`));
      assert.doesNotMatch(html, /href="https:\/\/(?:mimi\.heydusk\.com|word-island\.kunjie-yan\.chatgpt\.site)/);
    });
  }

  test(`${locale} Ferry Dock page states alpha scope honestly and links its source`, async () => {
    const html = visibleHTML(await (await render(localize(locale, "/products/ferry-dock"))).text());
    assert.match(html, /<a class="product-detail-repo" href="https:\/\/github\.com\/Yankj\/ferry-dock"[^>]*rel="noopener noreferrer"/);
    for (const fact of locale === "en"
      ? ["Early alpha", "15 minutes", "64 KiB", "1 MiB", "MIT", "trusted local network", "Agent task inputs are planned", "no binary release or npm package"]
      : ["早期 alpha", "15 分钟", "64 KiB", "1 MiB", "MIT", "可信局域网", "Agent 任务输入", "没有二进制发布或 npm 包"]) assert.ok(html.includes(fact), fact);
    assert.doesNotMatch(html, /href="[^"]*(?:\/releases|\.zip|\.dmg|\.exe|npmjs\.com)/i);
    assert.match(html, /class="product-mark product-mark-ferry" aria-hidden="true"/);
  });

  test(`${locale} contact has a usable no-JavaScript email fallback`, async () => {
    const html = visibleHTML(await (await render(localize(locale, "/contact") + "?product=momo")).text());
    assert.match(html, /class="email-contact"/);
    assert.match(html, /<input[^>]+readOnly=""[^>]+value="hello@heydusk\.com"|<input[^>]+value="hello@heydusk\.com"[^>]+readOnly=""/i);
    assert.match(html, /href="mailto:hello@heydusk\.com"/);
    assert.match(html, /role="status"[^>]+aria-live="polite"/);
    assert.doesNotMatch(html, /<form[^>]+(?:action="mailto:|method="post")/);
  });

  test(`${locale} unknown route returns genuine 404 with localized recovery links`, async () => {
    const response = await render(localize(locale, "/__visitor_missing__"));
    assert.equal(response.status, 404);
    const html = visibleHTML(await response.text());
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.match(html, /404/);
    assert.match(html, new RegExp(`<html[^>]+lang="${lang}"`));
    for (const path of ["/", "/products", "/contact"]) assert.ok(html.includes(`href="${localize(locale, path)}"`));
    assert.match(html, /<meta name="robots" content="[^"]*noindex/);
  });
}

test("visitor navigation excludes the failing Next Link client dependency", async () => {
  // The old production build rendered valid hrefs but hydrated next/link clicks
  // threw `e is not a function`. Browser tests exercise actual clicks; this
  // dependency contract prevents the known cause from returning unnoticed.
  for (const file of ["components/site-header.tsx", "components/site-footer.tsx", "views/home-page.tsx", "views/products-page.tsx", "views/product-detail-page.tsx"]) {
    const source = await readFile(new URL(`../app/${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /from\s+["']next\/link["']/, file);
  }
});

for (const path of ["/", "/zh", "/about", "/zh/about"]) {
  test(`${path} presents the product studio without registration claims`, async () => {
    const html = visibleHTML(await (await render(path)).text());
    for (const name of ["HeyDusk", "Mimi", "Momo", "FrameForge"]) assert.ok(html.includes(name));
    assert.match(html, path.startsWith("/zh") ? /独立 AI 产品工作室/ : /independent AI product studio/i);
    assert.doesNotMatch(html, /company registration in progress|公司注册办理中|currently being registered|正在中国办理注册/);
    assert.doesNotMatch(html, /independent AI product company|独立 AI 产品公司|product company for families|安静可靠的家庭软件/);
  });
}

test("Chinese dotted unknown URLs retain localized 404 recovery", async () => {
  const response = await render("/zh/missing-page.html");
  assert.equal(response.status, 404);
  const html = visibleHTML(await response.text());
  assert.match(html, /<html[^>]+lang="zh-CN"/);
  assert.ok(html.includes('href="/zh/products"'));
});
