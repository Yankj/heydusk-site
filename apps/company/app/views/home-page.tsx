import Image from "next/image";
import "./studio-home.css";
import { YushengCoverFx } from "../components/yusheng-cover-fx";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["Calm software.", "A little room to live."],
    summary:
      "HeyDusk (理想三旬) is an independent AI product studio. We build focused products for family life, learning, and creative expression.",
    primaryAction: "Explore our products",
    secondaryAction: "Step into our worlds",
    artCaption: "Dusk Field / 01",
    disciplinesLabel: "What we focus on",
    disciplines: ["Family & life", "Learning & growth", "Creation & expression"],
    productIndex: "01 / Products",
    productTitle: "Independent products. Clear purpose.",
    productCopy:
      "For a more considered day, a shared moment of learning, or an idea worth making.",
    productLink: "Explore the product catalog",
    yushengIndex: "02 / Works · 余生所往",
    yushengTitle: "A life one might long for.",
    yushengIntro:
      "Walkable worlds in the spirit of Tao Yuanming: peach-blossom fields, a return to the garden, chrysanthemums by the east fence. The doors are open; walk in when you like, unhurried.",
    yushengLabel: "Worlds to walk",
    yushengEnter: "Enter 桃源",
    yushengSoon: "Coming soon",
    worlds: [
      { id: "taoyuan", index: "01", source: "桃花源记", title: "桃花源", blurb: "Follow the stream into the peach grove; across the stone bridge is a village you can walk, unhurried.", href: "https://life.heydusk.com/taoyuan", enter: "Enter 桃源", image: "/yusheng/taoyuan-overview.webp", alt: "A peach-blossom village beside a stream and a stone bridge." },
      { id: "guiyuan", index: "02", source: "归园田居", title: "归园田居", blurb: "A modest homestead of vegetable plots, mulberry and elm, a thatched roof and a well, with cooking smoke at dusk.", href: "https://life.heydusk.com/guiyuan", enter: "Enter 归园田居", image: "/yusheng/guiyuan-overview.webp", alt: "A thatched cottage among vegetable plots, a well, and chickens at evening." },
      { id: "caiju", index: "03", source: "饮酒 · 其五", title: "采菊东篱下", blurb: "Chrysanthemums along the east fence, a wine pot on the stone, and the southern hills at ease in the distance.", href: "https://life.heydusk.com/caiju", enter: "Enter 东篱", image: "/yusheng/caiju-overview.webp", alt: "Autumn chrysanthemums by a rustic fence, with distant hills beyond a poet’s cottage." },
    ],
    contactIndex: "Product questions, partnerships, and press",
    contactTitle: "We’d like to hear from you.",
    contactLink: "Contact us",
  },
  zh: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["安静可靠的软件，", "留一些空间给生活。"],
    summary:
      "理想三旬（HeyDusk）是独立 AI 产品工作室。我们围绕家庭生活、学习成长和创作表达，做有清晰用途的产品。",
    primaryAction: "查看产品",
    secondaryAction: "去作品里走走",
    artCaption: "暮色原野 / 01",
    disciplinesLabel: "我们关注",
    disciplines: ["家庭与生活", "学习与成长", "创作与表达"],
    productIndex: "01 / 产品",
    productTitle: "独立的产品，清楚的用途。",
    productCopy:
      "从一家人的日常，到一起学习的片刻，再到一个想做出来的故事。",
    productLink: "查看完整产品目录",
    yushengIndex: "02 / 作品 · 余生所往",
    yushengTitle: "向往的生活。",
    yushengIntro:
      "循陶渊明的意思，做了三处可以慢慢走的地方：桃花源、归园田居、采菊东篱下。门已开，进去走走停停即可。",
    yushengLabel: "可走的世界",
    yushengEnter: "进入桃源",
    yushengSoon: "即将开放",
    worlds: [
      { id: "taoyuan", index: "01", source: "桃花源记", title: "桃花源", blurb: "沿着溪水走进桃花林，石桥对面是可以慢慢走过的村落。不必赶路，只是走走停停。", href: "https://life.heydusk.com/taoyuan", enter: "进入桃源", image: "/yusheng/taoyuan-overview.webp", alt: "溪边桃花村落与一座石桥。" },
      { id: "guiyuan", index: "02", source: "归园田居", title: "归园田居", blurb: "菜畦、桑榆、茅檐与井。炊烟起时，把这一日过完。", href: "https://life.heydusk.com/guiyuan", enter: "进入田居", image: "/yusheng/guiyuan-overview.webp", alt: "茅草小屋、菜畦、水井与暮色中的鸡群。" },
      { id: "caiju", index: "03", source: "饮酒 · 其五", title: "采菊东篱下", blurb: "东篱把菊开好了，酒壶放在石上，南山就在眼前。", href: "https://life.heydusk.com/caiju", enter: "进入东篱", image: "/yusheng/caiju-overview.webp", alt: "秋菊依着东篱，远处是南山。" },
    ],
    contactIndex: "产品咨询、合作与媒体",
    contactTitle: "期待听到你的声音。",
    contactLink: "联系我们",
  },
};

const featured = [
  { id: "mimi" as const, path: "/products/mimi", en: "Mimi / 小咪", zh: "小咪 / Mimi", category: { en: "Family & life", zh: "家庭与生活" }, description: { en: "A place for the day's arrangements and the small steps of growing up.", zh: "把今日安排和成长中的小事，放进一家人的日常。" } },
  { id: "momo" as const, path: "/products/momo", en: "Momo", zh: "Momo", category: { en: "Learning & growth", zh: "学习与成长" }, description: { en: "English activities for children, with a parent learning alongside.", zh: "家长陪在身边，在看、听、说的互动中一起学英语。" } },
  { id: "frameforge" as const, path: "/products/frameforge", en: "FrameForge / 小片场", zh: "小片场 / FrameForge", category: { en: "Creation & expression", zh: "创作与表达" }, description: { en: "Video-making tools for creators, from the first idea to the work taking shape.", zh: "面向创作者的视频创作工具，让想法一步步成为作品。" } },
];
// Brand tokens kept as literals for catalog/home/strategy consistency checks: Momo, FrameForge, Ferry Dock.


export function HomePageView({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const l = (p: string) => localizedPath(locale, p);

  return (
    <main className="studio-home" lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image
            className="hero-art-image"
            src="/dusk-field-v2.webp"
            alt=""
            fill
            priority
            unoptimized
            sizes="(max-width: 820px) 100vw, 72vw"
          />
          <span className="hero-art-caption">{copy.artCaption}</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">{copy.title.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-summary">{copy.summary}</p>
          <div className="hero-actions">
            <a className="text-link" href="#products-spotlight">{copy.primaryAction} <span aria-hidden="true">→</span></a>
            <a className="text-link text-link-muted" href="#yusheng-suowang">{copy.secondaryAction} <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero-index" aria-label={copy.disciplinesLabel}>
          {copy.disciplines.map((d) => <span key={d}>{d}</span>)}
        </div>
      </section>

      <section className="section studio-products" aria-labelledby="product-title" id="products-spotlight">
        <div className="studio-section-head">
          <p className="section-index">{copy.productIndex}</p>
          <div><h2 id="product-title">{copy.productTitle}</h2><p>{copy.productCopy}</p></div>
          <a className="text-link" href={l("/products")}>{locale === "zh" ? "全部产品" : "All products"} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="studio-product-grid">
          {featured.map((item) => (
            <a className={`product-card studio-product studio-product--${item.id}`} href={l(item.path)} key={item.id} data-product={item.id}>
              <div className="studio-product-visual" aria-hidden="true">
                {item.id === "mimi" ? <Image src="/mimi/mimi-app-icon.svg" alt="" width={160} height={160} unoptimized /> : item.id === "momo" ?
                  <div className="learning-visual"><span>Aa</span><span>Bb</span><span>Cc</span><small>{locale === "zh" ? "看见 · 听见 · 一起说" : "Look · listen · say it together"}</small></div> :
                  <div className="creation-visual"><span>01<span>{locale === "zh" ? "想法" : "Idea"}</span></span><i /><span>02<span>{locale === "zh" ? "分镜" : "Storyboard"}</span></span><i /><span>03<span>{locale === "zh" ? "成片" : "Film"}</span></span></div>}
                <span className="visual-caption">{item.id === "mimi" ? (locale === "zh" ? "小咪 · 家庭日常" : "Mimi · family life") : (locale === "zh" ? "工作流示意" : "Workflow illustration")}</span>
              </div>
              <div className="studio-product-body">
                <div className="studio-product-meta"><span>{item.category[locale]}</span><span className="studio-stage">{locale === "zh" ? "开发中" : "In development"}</span></div>
                <h3>{item[locale]} <span aria-hidden="true">↗</span></h3>
                <p>{item.description[locale]}</p>
                <span className="studio-product-action">{locale === "zh" ? "了解产品与当前进展" : "Explore the product and its progress"} <span aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>
        <a className="studio-tool" href={l("/products/ferry-dock")}>
          <Image src="/ferry-dock/logo-mono.svg" alt="" width={32} height={32} unoptimized />
          <div><h3>{locale === "zh" ? "渡口 / Ferry Dock" : "Ferry Dock / 渡口"}</h3><p>{locale === "zh" ? "把手机上的一段文字，送到电脑上。" : "A small bridge for text, from your phone to your computer."}</p></div>
          <span className="studio-stage">{locale === "zh" ? "小工具 · 早期 alpha" : "Small tool · early alpha"}</span><span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section yusheng" id="yusheng-suowang" aria-labelledby="yusheng-title">
        <div className="section-heading" data-reveal>
          <p className="section-index">{copy.yushengIndex}</p>
          <h2 id="yusheng-title">{copy.yushengTitle}</h2>
          <p>{copy.yushengIntro}</p>
        </div>
        <div className="yusheng-grid" aria-label={copy.yushengLabel}>
          {copy.worlds.map((world) => {
            const body = (
              <>
                <div className="yusheng-card-art">
                  <div className="yusheng-card-art-inner">
                    <Image src={world.image} alt={world.alt} width={1280} height={720} sizes="(max-width: 820px) 100vw, 30vw" unoptimized />
                    <YushengCoverFx worldId={world.id} />
                  </div>
                </div>
                <div className="card-topline">
                  <span>{world.index} / {world.source}</span>
                  <span className="yusheng-card-state">{world.href ? (locale === "zh" ? "已开放" : "Open") : copy.yushengSoon}</span>
                </div>
                <h3>{world.title}</h3>
                <p>{world.blurb}</p>
                {world.href ? (
                  <span className="yusheng-card-action">{world.enter || copy.yushengEnter} <span aria-hidden="true">↗</span></span>
                ) : (
                  <span className="yusheng-card-action yusheng-card-action--quiet">{copy.yushengSoon}</span>
                )}
              </>
            );
            return world.href ? (
              <a className="yusheng-card" href={world.href} rel="noopener noreferrer" data-reveal key={world.id}>
                {body}
              </a>
            ) : (
              <article className="yusheng-card yusheng-card--soon" data-reveal key={world.id}>
                {body}
              </article>
            );
          })}
        </div>
      </section>

      <section className="studio-note section" aria-labelledby="studio-note-title">
        <p className="section-index">{locale === "zh" ? "03 / 工作室" : "03 / The studio"}</p>
        <div><h2 id="studio-note-title">{locale === "zh" ? "做具体的事，留长久的余地。" : "Focused work. Room to grow."}</h2><p>{locale === "zh" ? "理想三旬是一个独立 AI 产品工作室。我们关心技术怎样进入真实的日常，也为一些没有效率指标的好奇心留出位置。产品各有用途，作品各有性格。" : "HeyDusk is an independent AI product studio. We care about how technology fits into everyday life, and make room for curiosity that has no productivity target. Each product has a purpose; each work, a character."}</p><a className="text-link" href={l("/about")}>{locale === "zh" ? "认识理想三旬" : "Meet the studio"} <span aria-hidden="true">→</span></a></div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title" data-reveal>
        <p className="section-index">{copy.contactIndex}</p>
        <h2 id="contact-title">{copy.contactTitle}</h2>
        <a className="contact-link" href={l("/contact")}>{copy.contactLink} <span aria-hidden="true">↗</span></a>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
