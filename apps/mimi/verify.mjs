// Post-build checks: tokens resolved, one h1, local links and anchors exist,
// and no retired material (old film, deck, catpaw-era copy) leaks back in.
import {readFile, stat, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const failures = [];
let checked = 0;
const html = (await readdir(dist)).filter((n) => n.endsWith('.html'));
for (const file of html) {
  const text = await readFile(path.join(dist, file), 'utf8');
  if (text.includes('{{')) failures.push(`${file}: unresolved token`);
  if ((text.match(/<h1\b/g) || []).length !== 1) failures.push(`${file}: h1 count`);
  for (const [, raw] of text.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|#)/.test(raw)) continue;
    const link = raw.split('#')[0].replace(/^\//, '') || 'index.html';
    checked++;
    try { await stat(path.join(dist, link)); } catch { failures.push(`${file}: missing ${link}`); }
  }
  for (const [, id] of text.matchAll(/href="#([^"]+)"/g)) if (!text.includes(`id="${id}"`)) failures.push(`${file}: missing anchor #${id}`);
  for (const banned of [/catpaw/i, /deck/i, /\.mp4/, /\.pdf/, /80 秒/, /美团/]) if (banned.test(text)) failures.push(`${file}: retired content ${banned}`);
}
const assets = await readdir(path.join(dist, 'assets'));
for (const a of assets) if (/\.(mp4|pdf)$/.test(a)) failures.push(`asset should be removed: ${a}`);
console.log(JSON.stringify({pages: html.length, localLinksChecked: checked, failures}, null, 2));
if (failures.length) process.exit(1);
