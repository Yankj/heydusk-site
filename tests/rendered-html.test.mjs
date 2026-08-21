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
  assert.match(html, /Thoughtful products/);
  assert.match(html, /for what comes next/);
  assert.match(html, /Independent product studio/);
  assert.match(html, /Selected|Products/);
  assert.match(html, /href="\/zh"/);
  assert.match(html, /切换至简体中文/);
  assert.match(html, /heydusk-mark\.svg/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

for (const [pathname, title, visibleCopy] of [
  ["/products", "Products — HeyDusk", "Products with a clear job to do"],
  ["/projects", "Projects — HeyDusk", "Experiments that can survive"],
  ["/brand", "Brand — HeyDusk", "Dusk is a threshold"],
  ["/about", "About — HeyDusk", "A formal studio with a personal point of view"],
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
  assert.match(html, /审慎思考/);
  assert.match(html, /面向接下来的世界/);
  assert.match(html, /独立产品工作室/);
  assert.match(html, /lang="zh-CN"/);
  assert.match(html, /href="\/zh\/products"/);
  assert.match(html, /Switch to English/);
  assert.match(html, /<link rel="alternate"[^>]+hreflang="en"/i);
});

for (const [pathname, title, visibleCopy] of [
  ["/zh/products", "产品 — HeyDusk", "为一个清晰的任务而生"],
  ["/zh/projects", "项目 — HeyDusk", "经得起现实检验的实验"],
  ["/zh/brand", "品牌 — HeyDusk", "暮色是一道门槛"],
  ["/zh/about", "关于 — HeyDusk", "一个正式的工作室"],
]) {
  test(`server-renders ${pathname} in Simplified Chinese`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title}<\\/title>`, "i"));
    assert.match(html, new RegExp(visibleCopy, "i"));
    assert.match(html, /lang="zh-CN"/);
    assert.match(html, /href="\/products"|href="\/projects"|href="\/brand"|href="\/about"/);
  });
}
