import Image from "next/image";
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
      "Three concrete directions guide our work. They can overlap; each product keeps its own audience, workflow, and development stage.",
    principlesLabel: "Our directions",
    principles: [
      { index: "01", path: "/products/mimi", title: "Family & life", description: "Mimi / 小咪 supports parents with today’s arrangements and long-term growth.", meta: "Mimi" },
      { index: "02", path: "/products/momo", title: "Learning & growth", description: "Momo explores parent-guided English learning through a persistent classroom canvas.", meta: "Momo" },
      { index: "03", path: "/products/frameforge", title: "Creation & expression", description: "FrameForge / 小片场 helps creators shape video projects; children’s science is its current content focus.", meta: "FrameForge" },
    ],
    productIndex: "02 / Products",
    productTitle: "Independent products. Clear purpose.",
    productCopy:
      "Mimi, Momo, and FrameForge / 小片场 develop as separate products. Explore what each does, its current stage, and how to ask questions.",
    productLink: "Explore the product catalog",
    status: "Different stages · documented in the catalog",
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
      "三个具体方向组织我们的工作。方向可以交叉；每款产品保留自己的使用者、流程与发展阶段。",
    principlesLabel: "我们的方向",
    principles: [
      { index: "01", path: "/products/mimi", title: "家庭与生活", description: "Mimi / 小咪围绕家长的今日安排与孩子的长期成长展开。", meta: "Mimi" },
      { index: "02", path: "/products/momo", title: "学习与成长", description: "Momo 以持久课堂画布，探索由家长陪伴的英语学习。", meta: "Momo" },
      { index: "03", path: "/products/frameforge", title: "创作与表达", description: "FrameForge / 小片场服务视频创作者，当前内容重点是儿童科普。", meta: "FrameForge" },
    ],
    productIndex: "02 / 产品",
    productTitle: "独立的产品，清楚的用途。",
    productCopy:
      "Mimi、Momo、FrameForge / 小片场各自独立推进。目录列明每款产品的用途、当前阶段与咨询方式。",
    productLink: "查看完整产品目录",
    status: "各自推进 · 阶段详见产品目录",
    contactIndex: "产品咨询、合作与媒体",
    contactTitle: "期待听到你的声音。",
    contactLink: "联系我们",
  },
};

export function HomePageView({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const l = (p: string) => localizedPath(locale, p);

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image className="hero-art-image" src="/dusk-field-v2.webp" alt="" fill priority unoptimized sizes="(max-width: 820px) 100vw, 72vw" />
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
        <div className="section-heading">
          <p className="section-index">{copy.missionIndex}</p>
          <h2 id="mission-title">{copy.missionTitle}</h2>
          <p>{copy.missionIntro}</p>
        </div>
        <div className="product-grid" aria-label={copy.principlesLabel}>
          {copy.principles.map((p) => (
            <a className="product-card direction-card" href={l(p.path)} key={p.index}>
              <div className="card-topline"><span>{p.index}</span><span>{p.meta}</span></div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <span className="card-action">{locale === "zh" ? "了解产品" : "Explore product"} <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="dark-section" aria-labelledby="product-title">
        <div className="dark-section-inner feature-product">
          <div className="dark-intro">
            <p className="section-index">{copy.productIndex}</p>
            <h2 id="product-title">{copy.productTitle}</h2>
            <p>{copy.productCopy}</p>
            <p className="status-pill">{copy.status}</p>
            <a className="section-link section-link-light" href={l("/products")}>{copy.productLink} <span aria-hidden="true">→</span></a>
          </div>
          <div className="feature-product-art">
            <div className="featured-product-links">
              <a href={l("/products/mimi")}><Image src="/mimi/mimi-app-icon.png" alt="" width={64} height={64} unoptimized /><span>Mimi / 小咪</span><span aria-hidden="true">→</span></a>
              <a href={l("/products/momo")}><span>Momo</span><span aria-hidden="true">→</span></a>
              <a href={l("/products/frameforge")}><span>FrameForge / 小片场</span><span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <p className="section-index">{copy.contactIndex}</p>
        <h2 id="contact-title">{copy.contactTitle}</h2>
        <a className="contact-link" href={l("/contact")}>{copy.contactLink} <span aria-hidden="true">↗</span></a>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
