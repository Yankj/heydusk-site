import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";

const footerCopy = {
  en: {
    home: "HeyDusk home",
    navigation: "Footer navigation",
    statement: "Thoughtful products for what comes next.",
    explore: "Explore",
    products: "Products",
    projects: "Projects",
    brand: "Brand",
    personal: "Personal",
    about: "About",
    notes: "Notes",
    contact: "Contact",
    collaborate: "Collaborate",
    signature: "Independent by design.",
  },
  zh: {
    home: "HeyDusk 首页",
    navigation: "页脚导航",
    statement: "为下一阶段，构建值得长期使用的产品。",
    explore: "探索",
    products: "产品",
    projects: "项目",
    brand: "品牌",
    personal: "个人",
    about: "关于",
    notes: "随笔",
    contact: "联系",
    collaborate: "合作",
    signature: "独立，是一种设计选择。",
  },
};

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = footerCopy[locale];

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link
          className="brand footer-brand"
          href={localizedPath(locale, "/")}
          aria-label={copy.home}
        >
          <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
          <span>HeyDusk</span>
        </Link>
        <p>{copy.statement}</p>
      </div>

      <div className="footer-nav" aria-label={copy.navigation}>
        <div>
          <p className="footer-label">{copy.explore}</p>
          <Link href={localizedPath(locale, "/products")}>{copy.products}</Link>
          <Link href={localizedPath(locale, "/projects")}>{copy.projects}</Link>
          <Link href={localizedPath(locale, "/brand")}>{copy.brand}</Link>
        </div>
        <div>
          <p className="footer-label">{copy.personal}</p>
          <Link href={localizedPath(locale, "/about")}>{copy.about}</Link>
          <Link href={localizedPath(locale, "/about#notes")}>{copy.notes}</Link>
          <a href="https://github.com/Yankj" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div>
          <p className="footer-label">{copy.contact}</p>
          <a href="mailto:hello@heydusk.com">hello@heydusk.com</a>
          <Link href={localizedPath(locale, "/about#contact")}>{copy.collaborate}</Link>
        </div>
      </div>

      <div className="footer-meta">
        <span>© {new Date().getFullYear()} HeyDusk</span>
        <span>{copy.signature}</span>
      </div>
    </footer>
  );
}
