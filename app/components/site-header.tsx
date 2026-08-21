import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/brand", label: "Brand" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="HeyDusk home">
        <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
        <span>HeyDusk</span>
      </Link>

      <div className="header-actions">
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="header-contact" href="/about#contact">
          <span>Let&apos;s talk</span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>

      <details className="mobile-menu">
        <summary>
          <span>Menu</span>
          <span className="menu-glyph" aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link href="/about#contact">
            Let&apos;s talk
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </details>
    </header>
  );
}
