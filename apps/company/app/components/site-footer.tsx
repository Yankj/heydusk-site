import Image from "next/image";
import Link from "next/link";
import { localizedPath, type Locale } from "../i18n";

const footerCopy = {
  en: {
    home: "HeyDusk home",
    navigation: "Footer navigation",
    statement: "HeyDusk / 理想三旬 · independent AI products for family life, learning, and creative expression.",
    company: "Company",
    about: "About",
    contact: "Contact",
    products: "Products",
    mimi: "mimi product site ↗",
    allProducts: "All products",
    legal: "Legal",
    privacy: "Privacy Policy (draft)",
    terms: "Terms of Service (draft)",
    note: "Independent products",
  },
  zh: {
    home: "HeyDusk 首页",
    navigation: "页脚导航",
    statement: "理想三旬（HeyDusk）独立 AI 产品公司。家庭与生活、学习与成长、创作与表达。",
    company: "公司",
    about: "关于我们",
    contact: "联系我们",
    products: "产品",
    mimi: "小咪产品站 ↗",
    allProducts: "全部产品",
    legal: "法律",
    privacy: "隐私政策（草案）",
    terms: "服务条款（草案）",
    note: "独立产品，各自推进",
  },
};

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = footerCopy[locale];
  const l = (path: string) => localizedPath(locale, path);

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Link className="brand footer-brand" href={l("/")} aria-label={copy.home}>
          <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
          <span>HeyDusk</span>
        </Link>
        <p>{copy.statement}</p>
      </div>

      <div className="footer-nav" aria-label={copy.navigation}>
        <div>
          <p className="footer-label">{copy.products}</p>
          <a href="https://mimi.heydusk.com">{copy.mimi}</a>
          <Link href={l("/products")}>{copy.allProducts}</Link>
        </div>
        <div>
          <p className="footer-label">{copy.company}</p>
          <Link href={l("/about")}>{copy.about}</Link>
          <Link href={l("/contact")}>{copy.contact}</Link>
        </div>
        <div>
          <p className="footer-label">{copy.legal}</p>
          <Link href={l("/privacy")}>{copy.privacy}</Link>
          <Link href={l("/terms")}>{copy.terms}</Link>
        </div>
      </div>

      <div className="footer-meta">
        <span>© 2026 理想三旬 / HeyDusk · {copy.note}</span>
        <a href="mailto:hello@heydusk.com">hello@heydusk.com</a>
      </div>
    </footer>
  );
}
