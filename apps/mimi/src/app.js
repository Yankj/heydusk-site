const $ = (s) => document.querySelector(s);
const all = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[ch]));

// Theme
const themeButton = $('#theme-toggle');
let saved; try { saved = localStorage.getItem('mimi-theme'); } catch {}
const sys = matchMedia('(prefers-color-scheme: dark)');
const setTheme = (t) => { document.documentElement.dataset.theme = t; themeButton.textContent = t === 'dark' ? '浅色' : '深色'; };
setTheme(saved || (sys.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => { saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; setTheme(saved); try { localStorage.setItem('mimi-theme', saved); } catch {} });
sys.addEventListener('change', (e) => { if (!saved) setTheme(e.matches ? 'dark' : 'light'); });

// Mobile menu
const menu = $('#menu-toggle'), nav = $('#main-nav');
const closeMenu = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '菜单'; };
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.textContent = open ? '关闭' : '菜单'; });
nav.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// Confirm-card demo (client-side only, nothing is stored)
const panel = $('#demo-panel');
const scenarios = window.MIMI_SCENARIOS || [];
const render = (s) => {
  panel.innerHTML = `<p class="bubble user"><span class="mode">${esc(s.mode)}</span>${esc(s.input)}</p>
<div class="bubble mimi"><img src="assets/cat-thinking.webp" alt="" width="40" height="40"><p>${esc(s.reply)}</p></div>
<div class="confirm-cards">${s.cards.map(([t, d]) => `<div class="confirm"><span class="tag">待你确认</span><strong>${esc(t)}</strong><p>${esc(d)}</p><div class="confirm-actions"><button type="button" class="button primary small-btn" data-confirm>确认</button><button type="button" class="button small-btn" data-skip>先不要</button></div></div>`).join('')}</div>`;
};
const tabs = all('[data-scenario]');
const select = (tab, focus) => {
  tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
  panel.setAttribute('aria-labelledby', tab.id);
  const s = scenarios.find((x) => x.id === tab.dataset.scenario); if (s) render(s);
  if (focus) tab.focus();
};
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', (e) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (d) { e.preventDefault(); select(tabs[(i + d + tabs.length) % tabs.length], true); }
  });
});
panel.addEventListener('click', (e) => {
  const card = e.target.closest('.confirm'); if (!card) return;
  if (e.target.closest('[data-confirm]')) { card.classList.add('done'); card.querySelector('.tag').textContent = '已确认 · 已放进今天'; card.querySelector('.confirm-actions').remove(); }
  if (e.target.closest('[data-skip]')) { card.classList.add('skipped'); card.querySelector('.tag').textContent = '没有改动'; card.querySelector('.confirm-actions').remove(); }
});
