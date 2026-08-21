import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link className="brand footer-brand" href="/" aria-label="HeyDusk home">
          <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
          <span>HeyDusk</span>
        </Link>
        <p>Thoughtful products for what comes next.</p>
      </div>

      <div className="footer-nav" aria-label="Footer navigation">
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/products">Products</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/brand">Brand</Link>
        </div>
        <div>
          <p className="footer-label">Personal</p>
          <Link href="/about">About</Link>
          <Link href="/about#notes">Notes</Link>
          <a href="https://github.com/Yankj" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <a href="mailto:hello@heydusk.com">hello@heydusk.com</a>
          <Link href="/about#contact">Collaborate</Link>
        </div>
      </div>

      <div className="footer-meta">
        <span>© {new Date().getFullYear()} HeyDusk</span>
        <span>Independent by design.</span>
      </div>
    </footer>
  );
}
