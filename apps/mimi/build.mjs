// Renders src/index.html + content.json into dist/. No dependencies.
import {readFile, writeFile, mkdir, cp, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => readFile(path.join(root, p), 'utf8');
const c = JSON.parse(await read('content.json'));
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const beta = `mailto:${c.contactEmail}?subject=${encodeURIComponent(c.betaSubject)}`;

const panel = (s) => `<p class="bubble user"><span class="mode">${esc(s.mode)}</span>${esc(s.input)}</p>
<div class="bubble mimi"><img src="assets/cat-thinking.webp" alt="" width="40" height="40"><p>${esc(s.reply)}</p></div>
<div class="confirm-cards">${s.cards.map(([t, d]) => `<div class="confirm"><span class="tag">待你确认</span><strong>${esc(t)}</strong><p>${esc(d)}</p><div class="confirm-actions"><button type="button" class="button primary small-btn" data-confirm>确认</button><button type="button" class="button small-btn" data-skip>先不要</button></div></div>`).join('')}</div>`;

const tokens = {
  BETA: beta,
  EMAIL: c.contactEmail,
  PHRASES: c.phrases.map((p) => `<article><h3>${esc(p.say)}</h3><p>${esc(p.text)}</p></article>`).join(''),
  TABS: c.scenarios.map((s, i) => `<button type="button" role="tab" id="tab-${s.id}" data-scenario="${s.id}" aria-selected="${i === 0}" ${i ? 'tabindex="-1"' : ''}><b>${esc(s.mode)}</b><span>${esc(s.title)}</span></button>`).join(''),
  PANEL: panel(c.scenarios[0]),
  TODAY: c.today.map(([t, w, why]) => `<li><time>${esc(t)}</time><div><strong>${esc(w)}</strong><small>${esc(why)}</small></div></li>`).join(''),
  PROMISES: c.promises.map(([h, p]) => `<article class="card"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join(''),
  PRIVACY: c.privacy.map(([h, p]) => `<article class="card"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join(''),
  ROADMAP: c.roadmap.map(([h, p]) => `<li><strong>${esc(h)}</strong><p>${esc(p)}</p></li>`).join(''),
  FAQ: c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join(''),
};

const nav = `<a class="skip" href="#main">跳到正文</a><header class="site-header"><div class="header-inner wrap"><a href="/" class="logo" aria-label="mimi 小咪 首页"><img src="assets/mark.png" width="34" height="34" alt=""><span class="wordmark">mimi</span><span class="zh">小咪</span></a><nav id="main-nav" class="main-nav" aria-label="主导航"><a href="#how">怎么用</a><a href="#today">今天</a><a href="#family">我们家</a><a href="#privacy">隐私</a><a href="#faq">常见问题</a></nav><div class="header-actions"><a href="${beta}" class="button primary">申请内测</a><button id="theme-toggle" class="theme-toggle" type="button" aria-label="切换颜色模式">深色</button><button id="menu-toggle" class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav">菜单</button></div></div></header>`;
const footer = `<footer class="site-footer"><div class="wrap footer-inner"><div><a class="logo" href="/"><img src="assets/mark.png" alt="" width="30" height="30"><span class="wordmark">mimi</span><span class="zh">小咪</span></a><p>${esc(c.tagline)}</p></div><div class="footer-links"><a href="${beta}">${c.contactEmail}</a><a href="#privacy">隐私与孩子</a><a href="${c.company}">${esc(c.companyName)} 出品 ↗</a></div></div><div class="wrap footer-bottom"><span>© 2026 ${esc(c.companyName)}</span><span>页面示例均为虚构内容</span></div></footer>`;

let body = await read('src/index.html');
for (const [k, v] of Object.entries(tokens)) body = body.replaceAll(`{{${k}}}`, v);
if (/\{\{\w+\}\}/.test(body)) throw new Error('unreplaced token: ' + body.match(/\{\{\w+\}\}/)[0]);

const title = `${c.name} · ${c.tagline.replace(/。$/, '')}`;
const jsonld = JSON.stringify({'@context': 'https://schema.org', '@type': 'SoftwareApplication', name: c.name, description: c.description, operatingSystem: 'iOS', applicationCategory: 'LifestyleApplication', url: c.url, publisher: {'@type': 'Organization', name: c.companyName, url: c.company}});
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(title)}</title><meta name="description" content="${esc(c.description)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:type" content="website"><meta property="og:url" content="${c.url}/"><meta property="og:image" content="${c.url}/assets/family-moment.jpg"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${c.url}/"><link rel="icon" href="favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="apple-touch-icon.png"><link rel="stylesheet" href="styles.css"><script>try{const t=localStorage.getItem('mimi-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}</script><script type="application/ld+json">${jsonld}</script><script>window.MIMI_SCENARIOS=${JSON.stringify(c.scenarios)}</script><script src="app.js" defer></script></head><body>${nav}<main id="main">${body}</main>${footer}</body></html>`;

await rm(path.join(root, 'dist'), {recursive: true, force: true});
await mkdir(path.join(root, 'dist'), {recursive: true});
await cp(path.join(root, 'public'), path.join(root, 'dist'), {recursive: true});
await writeFile(path.join(root, 'dist/index.html'), html);
for (const f of ['styles.css', 'app.js']) await cp(path.join(root, 'src', f), path.join(root, 'dist', f));
await writeFile(path.join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${c.url}/sitemap.xml\n`);
await writeFile(path.join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${c.url}/</loc></url></urlset>`);
console.log('Built dist/index.html');
