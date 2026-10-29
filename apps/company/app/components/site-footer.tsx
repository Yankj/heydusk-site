import Image from "next/image";
import { formatProductName } from "../display-names";
import { localizedPath, type Locale } from "../i18n";
import type { ProductId } from "../product-catalog";

const footerCopy = {
  en: {
    home: "HeyDusk home",
    navigation: "Footer navigation",
    statement: "HeyDusk / 理想三旬 · independent AI products for family life, learning, and creative expression.",
    company: "Studio",
    about: "About",
    contact: "Contact",
    products: "Products",
    allProducts: "All products",
    legal: "Legal",
    privacy: "Privacy Policy (draft)",
    terms: "Terms of Service (draft)",
    note: "Independent products",
  },
  zh: {
    home: "HeyDusk 首页",
    navigation: "页脚导航",
    statement: "理想三旬（HeyDusk）独立 AI 产品工作室。家庭与生活、学习与成长、创作与表达。",
    company: "工作室",
    about: "关于我们",
    contact: "联系我们",
    products: "产品",
    allProducts: "全部产品",
    legal: "法律",
    privacy: "隐私政策（草案）",
    terms: "服务条款（草案）",
    note: "独立产品，各自推进",
  },
};

const footerProducts: ProductId[] = ["mimi", "momo", "frameforge", "ferry-dock"];

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const copy = footerCopy[locale];
  const l = (path: string) => localizedPath(locale, path);

  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <a className="brand footer-brand" href={l("/")} aria-label={copy.home}>
          <Image src="/heydusk-mark.svg" alt="" width={32} height={30} unoptimized />
          <span>HeyDusk</span>
        </a>
        <p>{copy.statement}</p>
      </div>

      <div className="footer-nav" aria-label={copy.navigation}>
        <div>
          <p className="footer-label">{copy.products}</p>
          {footerProducts.map((id) => (
            <a href={l(`/products/${id}`)} key={id}>{formatProductName(id, locale, "full")}</a>
          ))}
          <a href={l("/products")}>{copy.allProducts}</a>
        </div>
        <div>
          <p className="footer-label">{copy.company}</p>
          <a href={l("/about")}>{copy.about}</a>
          <a href={l("/contact")}>{copy.contact}</a>
        </div>
        <div>
          <p className="footer-label">{copy.legal}</p>
          <a href={l("/privacy")}>{copy.privacy}</a>
          <a href={l("/terms")}>{copy.terms}</a>
        </div>
      </div>

      <div className="footer-meta">
        <span>© 2026 理想三旬 / HeyDusk · {copy.note}</span>
        <a href={l("/contact")}>hello@heydusk.com</a>
      </div>
    </footer>
  );
}
