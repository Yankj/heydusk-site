import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";
import { products } from "../product-catalog";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro: "Family & life, learning & growth, creation & expression: three directions, plus a small everyday tool, with independent products and workflows. Directions can overlap; each product develops at its own pace.",
    reviewed: "Product documentation checked",
    source: "Summary sources and boundaries",
    note: "Each product has its own focus and stage. Open its details to see what it offers, what is still being developed, and the next available step.",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro: "家庭与生活、学习与成长、创作与表达：三个方向，外加一款日常小工具，各有独立产品与流程。方向可以交叉，每款产品按自己的节奏推进。",
    reviewed: "产品文档核对日期",
    source: "摘要来源与边界",
    note: "每款产品有自己的用途与发展阶段。打开详情，了解当前阶段、仍在推进的能力和适合你的下一步。",
  },
};

export function ProductsPageView({ locale }: { locale: Locale }) {
  const copy = content[locale];
  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/products" />
      <section className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>

      </section>
      <section className="page-section product-lines" aria-label={copy.eyebrow}>
        {products.map((product, index) => {
          const item = product[locale];
          return (
            <article className="product-line" key={product.id}>
              <a className="line-number" href={localizedPath(locale, product.path)} aria-label={`${locale === "zh" ? "了解" : "Explore"} ${product.name}`}>{product.id === "mimi" ? <Image src="/mimi/mimi-icon.png" alt="" width={72} height={72} unoptimized /> : `0${index + 1}`}</a>
              <div><p className="line-kicker">{item.direction}</p><h2><a href={localizedPath(locale, product.path)}>{product.name}</a></h2></div>
              <div className="line-copy">
                <p>{item.description}</p>
                <ul><li>{item.stage}</li></ul>
                <p className="catalog-boundary">{item.boundary}</p>

                <a className="section-link" href={localizedPath(locale, product.path)}>{locale === "zh" ? "了解产品与咨询方式" : "Explore product and enquiries"} <span aria-hidden="true">→</span></a>
              </div>
            </article>
          );
        })}
        <p className="catalog-note">{copy.note}</p>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
