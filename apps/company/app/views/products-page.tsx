import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";
import { catalogReviewedOn, products } from "../product-catalog";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro: "Family & life, learning & growth, creation & expression: three directions, with independent products and workflows. Directions can overlap; each product develops at its own pace.",
    reviewed: "Product documentation checked",
    source: "Summary sources and boundaries",
    note: "Stages below describe documented development, not public availability or completed real-world acceptance. Live availability of linked experiences was not verified in this review. Contact us for access questions.",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro: "家庭与生活、学习与成长、创作与表达：三个方向，各有独立产品与流程。方向可以交叉，每款产品按自己的节奏推进。",
    reviewed: "产品文档核对日期",
    source: "摘要来源与边界",
    note: "以下阶段反映文档中的开发状态，不等于公开可用或已完成真实使用验收。本轮未核验链接产品的线上可用性，使用与体验事宜请联系我们。",
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
        <p className="catalog-note">{copy.reviewed}: <time dateTime={catalogReviewedOn}>{catalogReviewedOn}</time></p>
      </section>
      <section className="page-section product-lines" aria-label={copy.eyebrow}>
        {products.map((product, index) => {
          const item = product[locale];
          return (
            <article className="product-line" key={product.id}>
              <span className="line-number">{product.id === "mimi" ? <Image src="/mimi/mimi-icon.png" alt="" width={72} height={72} unoptimized /> : `0${index + 1}`}</span>
              <div><p className="line-kicker">{item.direction}</p><h2>{product.name}</h2></div>
              <div className="line-copy">
                <p>{item.description}</p>
                <ul><li>{item.stage}</li></ul>
                <p className="catalog-boundary">{item.boundary}</p>
                <p className="catalog-note">{product.sourceHref ? <a href={product.sourceHref}>{item.source} ↗</a> : item.source}</p>
                <a className="section-link" href={product.href}>{item.action} <span aria-hidden="true">↗</span></a>
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
