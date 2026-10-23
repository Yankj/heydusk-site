import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro: "We ship few products and take each one seriously. Here is what HeyDusk is building today.",
    catKicker: "Product site · mimi.heydusk.com",
    catTitle: "mimi / 小咪",
    catCopy: "Family-affairs brain for iOS. Short intro here; full product story, privacy, and beta CTA live on the product site.",
    status: "Closed beta · opens in a new tab",
    catLink: "Go to mimi product site",
    nextKicker: "In exploration",
    nextTitle: "More to come",
    nextCopy: "Future products will be announced here only when they are ready to be useful.",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro: "我们做的产品不多，但每一款都认真对待。以下是理想三旬目前在做的产品。",
    catKicker: "产品站 · mimi.heydusk.com",
    catTitle: "mimi / 小咪",
    catCopy: "面向家庭事务的 iOS 助理。这里只作目录介绍；完整产品故事、隐私说明和内测申请在产品站。",
    status: "内测中 · 新标签打开产品站",
    catLink: "前往小咪产品站",
    nextKicker: "探索中",
    nextTitle: "更多产品",
    nextCopy: "新产品只会在真正有用时，才在这里发布。",
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
      <section className="page-section product-lines">
        <article className="product-line">
          <span className="line-number"><Image src="/mimi/mimi-icon.png" alt="" width={72} height={72} unoptimized style={{ borderRadius: 16 }} /></span>
          <div>
            <p className="line-kicker">{copy.catKicker}</p>
            <h2>{copy.catTitle}</h2>
          </div>
          <div className="line-copy">
            <p>{copy.catCopy}</p>
            <ul><li>{copy.status}</li></ul>
            <a className="section-link" href="https://mimi.heydusk.com" target="_blank" rel="noopener">{copy.catLink} <span aria-hidden="true">↗</span></a>
          </div>
        </article>
        <article className="product-line">
          <span className="line-number">02</span>
          <div>
            <p className="line-kicker">{copy.nextKicker}</p>
            <h2>{copy.nextTitle}</h2>
          </div>
          <div className="line-copy"><p>{copy.nextCopy}</p></div>
        </article>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
