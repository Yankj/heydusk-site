import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro: "We ship few products and take each one seriously. Here is what HeyDusk is building today.",
    catKicker: "Family assistant · iOS",
    catTitle: "mimi",
    catCopy: "A family-affairs brain. Capture by photo, voice, or text — “let mimi remember that.” Nothing changes until you confirm.",
    status: "Closed beta",
    catLink: "Visit mimi.heydusk.com",
    nextKicker: "In exploration",
    nextTitle: "More to come",
    nextCopy: "Future products will be announced here only when they are ready to be useful.",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro: "我们做的产品不多，但每一款都认真对待。以下是理想三旬目前在做的产品。",
    catKicker: "家庭事务助理 · iOS",
    catTitle: "mimi",
    catCopy: "家庭事务大脑。拍照、语音或文字交给小咪，「让小咪记一下」「看看小咪的计划」。你确认之前，什么都不改。",
    status: "内测中",
    catLink: "访问 mimi.heydusk.com",
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
            <a className="section-link" href="https://mimi.heydusk.com">{copy.catLink} <span aria-hidden="true">↗</span></a>
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
