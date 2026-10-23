import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro: "We ship few products and take each one seriously. Here is what HeyDusk is building today.",
    catKicker: "Family assistant · iOS",
    catTitle: "cat",
    catCopy: "A family-affairs brain that remembers everything about your kids and never lets anything slip. Capture by photo, voice, or text; confirm; done.",
    status: "Closed beta",
    catLink: "View product page",
    nextKicker: "In exploration",
    nextTitle: "More to come",
    nextCopy: "Future products will be announced here only when they are ready to be useful.",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro: "我们做的产品不多，但每一款都认真对待。以下是理想三旬目前在做的产品。",
    catKicker: "家庭事务助理 · iOS",
    catTitle: "cat",
    catCopy: "一个家庭事务大脑：记住孩子的一切，一件不落。拍照、语音或文字记录，确认后自动排进日程。",
    status: "内测中",
    catLink: "查看产品页",
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
          <span className="line-number"><Image src="/cat/cat-front.webp" alt="" width={72} height={72} unoptimized /></span>
          <div>
            <p className="line-kicker">{copy.catKicker}</p>
            <h2>{copy.catTitle}</h2>
          </div>
          <div className="line-copy">
            <p>{copy.catCopy}</p>
            <ul><li>{copy.status}</li></ul>
            <Link className="section-link" href={localizedPath(locale, "/products/cat")}>{copy.catLink} <span aria-hidden="true">↗</span></Link>
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
