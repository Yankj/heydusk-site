"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { localizedPath, type Locale } from "../i18n";
import { ThemeToggle } from "./theme-toggle";

const navigation = {
  en: [{ href: "/", label: "Home" }, { href: "/products", label: "Products" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }],
  zh: [{ href: "/", label: "首页" }, { href: "/products", label: "产品" }, { href: "/about", label: "关于我们" }, { href: "/contact", label: "联系我们" }],
};
const labels = {
  en: { home: "HeyDusk home", navigation: "Primary navigation", mobileNavigation: "Mobile navigation", menu: "Menu", contact: "Get in touch", switchLanguage: "中文 — 切换至简体中文", switchLabel: "中文", skip: "Skip to content" },
  zh: { home: "HeyDusk 首页", navigation: "主导航", mobileNavigation: "移动端导航", menu: "菜单", contact: "联系我们", switchLanguage: "EN — Switch to English", switchLabel: "EN", skip: "跳到正文" },
};

function subscribeToQuery(listener: () => void) {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
}
function contactProductSnapshot(): string | null {
  const product = new URLSearchParams(window.location.search).get("product");
  return product === "mimi" || product === "momo" || product === "frameforge" || product === "ferry-dock" ? product : null;
}
function serverContactProduct(): null { return null; }

// This editorial site uses full-document navigation. It works without JavaScript
// and does not depend on Vinext's client RSC navigation handler.
export function SiteHeader({ locale = "en", currentPath = "/" }: { locale?: Locale; currentPath?: string }) {
  const copy = labels[locale];
  const menu = useRef<HTMLDetailsElement>(null);
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const languageHref = localizedPath(otherLocale, currentPath);
  const product = useSyncExternalStore(subscribeToQuery, contactProductSnapshot, serverContactProduct);
  const current = (path: string): "page" | "location" | undefined => currentPath === path ? "page" : path === "/products" && currentPath.startsWith("/products/") ? "location" : undefined;

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (menu.current?.open && event.target instanceof Node && !menu.current.contains(event.target)) menu.current.open = false;
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
        event.preventDefault();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, []);

  const languageSwitch = <form className="language-form" action={languageHref} method="get">{currentPath === "/contact" && product ? <input type="hidden" name="product" value={product} /> : null}<button className="language-switch" type="submit" aria-label={copy.switchLanguage}>{copy.switchLabel}</button></form>;

  return (
    <>
      <a className="skip-link" href="#page-content">{copy.skip}</a>
      <header className="site-header">
        <a className="brand" href={localizedPath(locale, "/")} aria-label={copy.home}><Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized /><span>HeyDusk</span></a>
        <div className="header-actions">
          <nav className="primary-nav" aria-label={copy.navigation}>{navigation[locale].map((item) => <a key={item.href} href={localizedPath(locale, item.href)} aria-current={current(item.href)}>{item.label}</a>)}</nav>
          {languageSwitch}<ThemeToggle locale={locale} />
          <a className="header-contact" href={localizedPath(locale, "/contact")}><span>{copy.contact}</span><span className="contact-arrow" aria-hidden="true">↗</span></a>
        </div>
        <div className="mobile-header-actions">
          {languageSwitch}<ThemeToggle locale={locale} />
          <details ref={menu} className="mobile-menu">
            <summary><span>{copy.menu}</span><span className="menu-glyph" aria-hidden="true" /></summary>
            <nav aria-label={copy.mobileNavigation}>{navigation[locale].map((item) => <a key={item.href} href={localizedPath(locale, item.href)} aria-current={current(item.href)}>{item.label}<span aria-hidden="true">→</span></a>)}</nav>
          </details>
        </div>
      </header>
      <span id="page-content" tabIndex={-1} />
    </>
  );
}
