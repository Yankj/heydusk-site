import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "heydusk.com" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the HeyDusk homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Calm software/);
  assert.match(html, /理想三旬/);
  assert.match(html, /href="https:\/\/mimi\.heydusk\.com"/);
  assert.doesNotMatch(html, /href="\/(?:zh\/)?(?:products\/cat|brand|projects)"/);
  assert.match(html, /Selected|Products/);
  assert.match(html, /action="\/zh"/);
  assert.match(html, /切换至简体中文/);
  assert.match(html, /<form[^>]+action="\/zh"[^>]+method="get"/);
  assert.match(html, /class="theme-toggle"/);
  assert.match(html, /src="\/dusk-field-v2\.webp"/);
  assert.doesNotMatch(html, /\/_next\/image/);
  assert.match(html, /<link rel="icon" href="\/heydusk-favicon\.ico"/);
  assert.match(html, /<link rel="shortcut icon" href="\/heydusk-favicon\.ico"/);
  assert.doesNotMatch(html, /href="\/favicon\.ico/);
  assert.match(html, /heydusk-mark\.svg/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

for (const [pathname, title, visibleCopy] of [
  ["/products", "Products — HeyDusk", "Products with a clear job to do"],
  ["/about", "About — HeyDusk", "Who we are"],
  ["/contact", "Contact — HeyDusk", "hello@heydusk.com"],
  ["/privacy", "Privacy Policy \\(draft\\) — HeyDusk", "DRAFT"],
  ["/terms", "Terms of Service \\(draft\\) — HeyDusk", "DRAFT"],
]) {
  test(`server-renders ${pathname} with route-specific metadata`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}<\\/title>`, "i"));
    assert.match(html, new RegExp(visibleCopy, "i"));
    assert.doesNotMatch(html, /og\.png/);
  });
}

test("server-renders the Simplified Chinese homepage and localized navigation", async () => {
  const response = await render("/zh");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /安静可靠的软件/);
  assert.match(html, /理想三旬/);
  assert.match(html, /lang="zh-CN"/);
  assert.match(html, /href="\/zh\/products"/);
  assert.match(html, /Switch to English/);
  assert.match(html, /<form[^>]+action="\/"[^>]+method="get"/);
  assert.match(html, /切换至夜间模式/);
  assert.match(html, /<link rel="alternate"[^>]+hreflang="en"/i);
});

for (const [pathname, title, visibleCopy] of [
  ["/zh/products", "产品 — HeyDusk", "为一个清晰的任务而生"],
  ["/zh/about", "关于我们 — HeyDusk", "我们是谁"],
  ["/zh/privacy", "隐私政策（草案） — HeyDusk", "草案"],
]) {
  test(`server-renders ${pathname} in Simplified Chinese`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}<\\/title>`, "i"));
    assert.match(html, new RegExp(visibleCopy, "i"));
    assert.match(html, /lang="zh-CN"/);
    assert.match(html, /href="\/(?:zh\/)?(?:products|projects|brand|about)/);
  });
}

for (const path of ["/products", "/zh/products"]) {
  test(`${path} keeps product stages, public entries and review date together`, async () => {
    const html = await (await render(path)).text();
    for (const name of ["mimi / 小咪", "Momo", "FrameForge / 小片场", "2026-10-26"]) assert.ok(html.includes(name));
    assert.match(html, /href="https:\/\/word-island\.kunjie-yan\.chatgpt\.site\//);
    assert.match(html, /href="mailto:hello@heydusk\.com\?subject=FrameForge/);
    assert.doesNotMatch(html, /github\.com\/Yankj\/(?:momo-word-island|agent-frameforge)/);
    assert.doesNotMatch(html, /Closed beta|内测中/);
  });
}

for (const path of ["/", "/zh", "/about", "/zh/about"]) {
  test(`${path} presents a broader parent brand without registration claims`, async () => {
    const html = await (await render(path)).text();
    assert.match(html, /Momo/);
    assert.match(html, /FrameForge/);
    assert.doesNotMatch(html, /company registration in progress|公司注册办理中|currently being registered|正在中国办理注册/);
    assert.doesNotMatch(html, /product company for families|安静可靠的家庭软件/);
  });
}
