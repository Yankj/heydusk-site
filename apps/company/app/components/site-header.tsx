import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";
import { ThemeToggle } from "./theme-toggle";

const navigation = {
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  zh: [
    { href: "/", label: "首页" },
    { href: "/products", label: "产品" },
    { href: "/about", label: "关于我们" },
    { href: "/contact", label: "联系我们" },
  ],
};

const labels = {
  en: {
    home: "HeyDusk home",
    navigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    menu: "Menu",
    contact: "Get in touch",
    switchLanguage: "切换至简体中文",
    switchLabel: "中文",
  },
  zh: {
    home: "HeyDusk 首页",
    navigation: "主导航",
    mobileNavigation: "移动端导航",
    menu: "菜单",
    contact: "联系我们",
    switchLanguage: "Switch to English",
    switchLabel: "EN",
  },
};

type SiteHeaderProps = {
  locale?: Locale;
  currentPath?: string;
};

export function SiteHeader({ locale = "en", currentPath = "/" }: SiteHeaderProps) {
  const copy = labels[locale];
  const otherLocale: Locale = locale === "en" ? "zh" : "en";
  const languageHref = localizedPath(otherLocale, currentPath);
  const contactHref = localizedPath(locale, "/contact");

  return (
    <header className="site-header">
      <Link className="brand" href={localizedPath(locale, "/")} aria-label={copy.home}>
        <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
        <span>HeyDusk</span>
      </Link>

      <div className="header-actions">
        <nav className="primary-nav" aria-label={copy.navigation}>
          {navigation[locale].map((item) =>
            item.href.startsWith("https://") ? (
              <a key={item.href} href={item.href}>{item.label}</a>
            ) : (
              <Link key={item.href} href={localizedPath(locale, item.href)}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <form className="language-form" action={languageHref} method="get">
          <button
            className="language-switch"
            type="submit"
            aria-label={copy.switchLanguage}
          >
            {copy.switchLabel}
          </button>
        </form>

        <ThemeToggle locale={locale} />

        {/* Keep this contact action as a Link; the language form intentionally
            uses native navigation to avoid Vinext's broken RSC click handler. */}
        <Link className="header-contact" href={contactHref}>
          <span>{copy.contact}</span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="mobile-header-actions">
        <form className="language-form" action={languageHref} method="get">
          <button
            className="language-switch"
            type="submit"
            aria-label={copy.switchLanguage}
          >
            {copy.switchLabel}
          </button>
        </form>

        <ThemeToggle locale={locale} />

        <details className="mobile-menu">
          <summary>
            <span>{copy.menu}</span>
            <span className="menu-glyph" aria-hidden="true" />
          </summary>
          <nav aria-label={copy.mobileNavigation}>
            {navigation[locale].map((item) =>
              item.href.startsWith("https://") ? (
                <a key={item.href} href={item.href}>
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <Link key={item.href} href={localizedPath(locale, item.href)}>
                  {item.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ),
            )}
            <Link href={contactHref}>
              {copy.contact}
              <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
