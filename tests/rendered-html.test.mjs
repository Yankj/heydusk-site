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
