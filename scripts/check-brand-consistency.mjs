// Small local consistency check; product contracts remain in their own repos.
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = (p) => readFile(path.join(root, p), 'utf8');
const failures = [], checks = [], notRun = [];
const check = (ok, label) => { checks.push(label); if (!ok) failures.push(label); };
const catalog = await read('apps/company/app/product-catalog.ts');
const strategy = await read('docs/brand-product-system.md');
const homepage = await read('apps/company/app/views/home-page.tsx');
const productSite = JSON.parse(await read('apps/mimi/content.json'));
const template = await read('apps/mimi/src/index.html');
check((catalog.match(/id: "/g) || []).length === 3, 'three independent catalog products');
for (const name of ['mimi', 'Momo', 'FrameForge']) {
  check(catalog.includes(name) && homepage.includes(name) && strategy.includes(name), `${name}: catalog, home and strategy agree`);
}
check(catalog.includes('name: "FrameForge / 小片场"'), 'FrameForge and 小片场 share one entry');
const reviewed = catalog.match(/catalogReviewedOn = "([\d-]+)"/)?.[1];
check(Boolean(reviewed && strategy.includes(reviewed)), 'catalog and strategy share a review date');
for (const source of [catalog, strategy, homepage, await read('apps/company/app/content-docs.ts')]) {
  check(!/https:\/\/github\.com\/Yankj\/(?:momo-word-island|agent-frameforge)/i.test(source), 'no private source links in public summaries');
}
const publicEntries = [...catalog.matchAll(/href: "([^"]+)"/g)].map((m) => m[1]);
check(publicEntries.length === 3 && publicEntries.every((s) => s === 'https://mimi.heydusk.com' || s === 'https://word-island.kunjie-yan.chatgpt.site/' || s.startsWith('mailto:hello@heydusk.com')), 'only existing public or contact entries');
check(productSite.description.includes('今日安排') && productSite.description.includes('长期成长') && template.includes('id="growth"'), 'mimi presents both current cores');
check(productSite.roadmap.some(([state]) => state === '待验证') && productSite.roadmap.some(([state]) => state === '规划中'), 'mimi separates verification and planning');
check(!/拍一张通知|家里的事它都记着|成长陪伴是之后的第二层/.test(JSON.stringify(productSite) + template), 'superseded mimi claims absent');
check(productSite.company === 'https://heydusk.com' && productSite.contactEmail === 'hello@heydusk.com', 'company backlink and existing contact preserved');
const docs = await read('apps/company/app/content-docs.ts');
check(docs.includes('Not yet legally reviewed and not in effect') && docs.includes('尚未经过法律审核，暂不生效'), 'both policy locales remain drafts');
for (const [repo, sources] of Object.entries({
  mimi: ['docs/design/family-companion/parenting-core.md', 'docs/acceptance/family-companion/interaction-natural-input-v0.5.md', 'docs/acceptance/family-companion/ios-parenting-usable-gaps-2026-10-25.md'],
  'momo-word-island': ['docs/product-capabilities.md'],
  'agent-frameforge': ['plugins/frameforge-director/README.md', 'plugins/frameforge-director/.codex-plugin/plugin.json'],
})) {
  const sibling = path.resolve(root, '..', repo);
  try { await access(sibling); } catch { notRun.push(`${repo}: sibling checkout absent`); continue; }
  for (const source of sources) {
    try { await access(path.join(sibling, source)); checks.push(`${repo}: ${source} exists`); }
    catch { failures.push(`${repo}: missing source ${source}`); }
  }
  const entry = await readFile(path.join(sibling, 'README.md'), 'utf8');
  check(entry.includes('heydusk-site/blob/main/docs/brand-product-system.md'), `${repo}: central brand backlink`);
}
console.log(JSON.stringify({ checks: checks.length, failures, notRun, scope: 'local content and source links; no live availability or product acceptance' }, null, 2));
if (failures.length) process.exitCode = 1;
