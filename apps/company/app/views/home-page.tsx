import Image from "next/image";
import { RevealOnScroll } from "../components/reveal-on-scroll";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["Calm software", "for life, learning, and creation."],
    summary:
      "HeyDusk (理想三旬) is an independent AI product studio. We build focused products for family life, learning, and creative expression.",
    primaryAction: "See our products",
    secondaryAction: "About the studio",
    artCaption: "Dusk Field / 01",
    disciplinesLabel: "What we focus on",
    disciplines: ["Family & life", "Learning & growth", "Creation & expression"],
    missionIndex: "01 / Directions",
    missionTitle: "Make room for everyday life, learning, and expression.",
    missionIntro:
      "Three concrete directions guide our work. They can overlap; each keeps its own audience and pace. Products live in the next section.",
    principlesLabel: "Our directions",
    principles: [
      { index: "01", dusk: "02", path: "/products/mimi", title: "Family & life", description: "Everyday arrangements and long-term growth for parents and children.", tone: "ember" },
      { index: "02", dusk: "03", path: "/products/momo", title: "Learning & growth", description: "Shared attention for learning together, with a parent alongside.", tone: "twilight" },
      { index: "03", dusk: "04", path: "/products/frameforge", title: "Creation & expression", description: "Room for video projects to take shape, revise, and land.", tone: "afterglow" },
    ],
    productIndex: "02 / Products",
    productTitle: "Independent products. Clear purpose.",
    productCopy:
      "Each product keeps its own workflow and stage. Open a page for the current scope, then enquire by email.",
    productLink: "Explore the product catalog",
    status: "Different stages · documented in the catalog",
    toolNote: "Everyday tool · early alpha",
    contactIndex: "Product questions, partnerships, and press",
    contactTitle: "We’d like to hear from you.",
    contactLink: "Contact us",
  },
  zh: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["安静可靠的软件，", "照顾生活、学习与创作。"],
    summary:
      "理想三旬（HeyDusk）是独立 AI 产品工作室。我们围绕家庭生活、学习成长和创作表达，做有清晰用途的产品。",
    primaryAction: "查看产品",
    secondaryAction: "了解工作室",
    artCaption: "暮色原野 / 01",
    disciplinesLabel: "我们关注",
    disciplines: ["家庭与生活", "学习与成长", "创作与表达"],
    missionIndex: "01 / 方向",
    missionTitle: "让日常更从容，让学习与表达更有着落。",
    missionIntro:
      "三个具体方向组织我们的工作。方向可以交叉，各自保留节奏。具体产品在下一节。",
    principlesLabel: "我们的方向",
    principles: [
      { index: "01", dusk: "02", path: "/products/mimi", title: "家庭与生活", description: "照顾今日安排，也看见长期成长。", tone: "ember" },
      { index: "02", dusk: "03", path: "/products/momo", title: "学习与成长", description: "家长陪在身边，一起把注意力放在学习上。", tone: "twilight" },
      { index: "03", dusk: "04", path: "/products/frameforge", title: "创作与表达", description: "给视频项目慢慢成形、反复推敲的空间。", tone: "afterglow" },
    ],
    productIndex: "02 / 产品",
    productTitle: "独立的产品，清楚的用途。",
    productCopy:
      "每款产品保留自己的流程与阶段。打开详情查看当前范围，再通过邮件咨询。",
    productLink: "查看完整产品目录",
    status: "各自推进 · 阶段详见产品目录",
    toolNote: "日常工具 · 早期 alpha",
    contactIndex: "产品咨询、合作与媒体",
    contactTitle: "期待听到你的声音。",
    contactLink: "联系我们",
  },
};

const featured = [
  { id: "mimi" as const, path: "/products/mimi", en: "Mimi / 小咪", zh: "小咪 / Mimi" },
  { id: "momo" as const, path: "/products/momo", en: "Momo", zh: "Momo" },
  { id: "frameforge" as const, path: "/products/frameforge", en: "FrameForge / 小片场", zh: "小片场 / FrameForge" },
];
// Brand tokens kept as literals for catalog/home/strategy consistency checks: Momo, FrameForge, Ferry Dock.


export function HomePageView({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const l = (p: string) => localizedPath(locale, p);

  return (
    <main lang={localeLanguageTag[locale]}>
      <RevealOnScroll />
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
            <a className="text-link" href={l("/products")}>{copy.primaryAction} <span aria-hidden="true">→</span></a>
            <a className="text-link text-link-muted" href={l("/about")}>{copy.secondaryAction} <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="hero-index" aria-label={copy.disciplinesLabel}>
          {copy.disciplines.map((d) => <span key={d}>{d}</span>)}
        </div>
      </section>

      <section className="section product-overview" aria-labelledby="mission-title">
        <div className="section-heading" data-reveal>
          <p className="section-index">{copy.missionIndex}</p>
          <h2 id="mission-title">{copy.missionTitle}</h2>
          <p>{copy.missionIntro}</p>
        </div>
        <div className="product-grid" aria-label={copy.principlesLabel}>
          {copy.principles.map((p) => (
            <a className={`product-card direction-card direction-card--${p.tone}`} href={l(p.path)} data-reveal key={p.index}>
              <div className="card-topline">
                <span>{p.index}</span>
                <span className="dusk-series-label">Dusk / {p.dusk}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="dark-section" aria-labelledby="product-title" id="products-spotlight">
        <div className="dark-section-inner feature-product">
          <div className="dark-intro" data-reveal>
            <p className="section-index">{copy.productIndex}</p>
            <h2 id="product-title">{copy.productTitle}</h2>
            <p>{copy.productCopy}</p>
            <p className="status-pill">{copy.status}</p>
            <a className="section-link section-link-light" href={l("/products")}>{copy.productLink} <span aria-hidden="true">→</span></a>
          </div>
          <div className="feature-product-art" data-reveal>
            <div className="featured-product-links" aria-label={copy.productTitle}>
              {featured.map((item) => (
                <a href={l(item.path)} key={item.id} data-product={item.id}>
                  {item.id === "mimi" ? (
                    <Image src="/mimi/mimi-app-icon-128.webp" alt="" width={64} height={64} sizes="64px" unoptimized />
                  ) : (
                    <span className={`product-mark product-mark-${item.id === "frameforge" ? "frameforge" : "momo"}`} aria-hidden="true" />
                  )}
                  <span>{item[locale]}</span>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
            <p className="featured-tool-note">
              <a href={l("/products/ferry-dock")}>
                <span className="product-mark product-mark-ferry" aria-hidden="true" />
                <span>{locale === "zh" ? "渡口 / Ferry Dock" : "Ferry Dock / 渡口"}</span>
              </a>
              <span className="featured-tool-meta">{copy.toolNote}</span>
            </p>
          </div>
        </div>
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
