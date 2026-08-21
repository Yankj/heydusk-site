import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Independent product studio",
    title: ["Thoughtful products", "for what comes next."],
    summary:
      "HeyDusk builds focused digital products across AI, software, and design—turning emerging possibilities into useful, lasting tools.",
    primaryAction: "Explore our work",
    secondaryAction: "Our point of view",
    artCaption: "Dusk Field / 01",
    disciplinesLabel: "Studio disciplines",
    disciplines: ["AI agents", "Useful software", "Design systems"],
    productsIndex: "01 / Products",
    productsTitle: "Built around a clear job to do.",
    productsIntro:
      "We favor products with a focused purpose, a calm interface, and a reason to exist beyond novelty.",
    productArea: "Product area",
    products: [
      {
        index: "01",
        title: "Agent systems",
        description:
          "Practical AI agents designed around real workflows, clear boundaries, and useful outcomes.",
        meta: "AI · Workflows · Automation",
      },
      {
        index: "02",
        title: "Useful software",
        description:
          "Focused tools that remove friction, make complexity legible, and earn a place in everyday work.",
        meta: "Software · Productivity · Systems",
      },
      {
        index: "03",
        title: "Design tools",
        description:
          "Interfaces, components, and creative infrastructure where form is part of how the product thinks.",
        meta: "Design · Interaction · Craft",
      },
    ],
    productsLink: "View the product system",
    projectsIndex: "02 / Useful projects",
    projectsTitle: "Small experiments. Real utility.",
    projectsIntro:
      "Not every useful idea needs to become a company. Labs is where focused agents, prototypes, and design experiments earn their right to grow.",
    projectsLink: "Enter the project room",
    projects: [
      ["Agents", "Tools built to complete a job, not extend a conversation."],
      ["Experiments", "Small releases for testing a useful idea in the real world."],
      ["Systems", "Reusable design and product infrastructure for everything that follows."],
    ],
    brandIndex: "03 / Brand",
    brandTitle:
      "Dusk is not darkness. It is the moment one state becomes another.",
    markAlt: "HeyDusk Last Light symbol",
    brandCopy:
      "The Last Light mark holds that transition in one gesture: a calm form crossed by a continuous trace of light.",
    brandLink: "Read the brand idea",
    personalIndex: "04 / Personal",
    personalTitle: "Independent by design.",
    personalCopy:
      "HeyDusk has a formal public face and a human one behind it. The personal space collects the ideas, field notes, side projects, and conversations that shape the work.",
    personalLink: "Meet the person behind HeyDusk",
    contactIndex: "A conversation can be a beginning.",
    contactTitle: "Have something worth building?",
  },
  zh: {
    eyebrow: "独立产品工作室",
    title: ["审慎思考，认真构建", "面向接下来的世界。"],
    summary:
      "HeyDusk 专注于 AI、软件与设计领域，将正在发生的新可能，转化为真正有用、值得长期使用的数字产品。",
    primaryAction: "浏览我们的作品",
    secondaryAction: "了解品牌主张",
    artCaption: "暮色原野 / 01",
    disciplinesLabel: "工作室方向",
    disciplines: ["AI 智能体", "实用软件", "设计系统"],
    productsIndex: "01 / 产品",
    productsTitle: "围绕一个清晰的任务而生。",
    productsIntro:
      "我们偏爱目标明确、界面克制，并且价值不止于新奇的产品。",
    productArea: "产品方向",
    products: [
      {
        index: "01",
        title: "智能体系统",
        description:
          "围绕真实工作流程、清晰边界与有效结果设计的实用型 AI 智能体。",
        meta: "AI · 工作流 · 自动化",
      },
      {
        index: "02",
        title: "实用软件",
        description:
          "减少摩擦、理清复杂性，并能自然融入日常工作的专注型工具。",
        meta: "软件 · 效率 · 系统",
      },
      {
        index: "03",
        title: "设计工具",
        description:
          "让形式参与产品思考的界面、组件与创作基础设施。",
        meta: "设计 · 交互 · 工艺",
      },
    ],
    productsLink: "查看产品体系",
    projectsIndex: "02 / 实用项目",
    projectsTitle: "小规模实验，真实效用。",
    projectsIntro:
      "并非每一个有用的想法都要成为一家公司。Labs 让智能体、原型和设计实验先在真实世界里证明自己，再决定是否继续生长。",
    projectsLink: "进入项目室",
    projects: [
      ["智能体", "为完成任务而构建，而不是只延长一次对话。"],
      ["实验", "以小规模发布，在真实世界里验证一个有用的想法。"],
      ["系统", "为后续产品提供可复用的设计与产品基础设施。"],
    ],
    brandIndex: "03 / 品牌",
    brandTitle: "暮色不是黑暗，而是一个状态走向另一个状态的时刻。",
    markAlt: "HeyDusk 最后一束光标志",
    brandCopy:
      "“最后一束光”标志用一个动作保存这种过渡：平静的形体，被一条连续的微光穿过。",
    brandLink: "阅读品牌理念",
    personalIndex: "04 / 个人",
    personalTitle: "独立，是一种设计选择。",
    personalCopy:
      "HeyDusk 有正式的品牌外观，也有背后的个人视角。个人空间收集塑造这些作品的想法、现场笔记、支线项目与持续对话。",
    personalLink: "认识 HeyDusk 背后的人",
    contactIndex: "一次对话，也许就是开始。",
    contactTitle: "有值得构建的东西吗？",
  },
};

export function HomePageView({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image
            className="hero-art-image"
            src="/dusk-field-v2.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 820px) 100vw, 72vw"
          />
          <span className="hero-art-caption">{copy.artCaption}</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">
            {copy.title.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero-summary">{copy.summary}</p>
          <div className="hero-actions">
            <Link className="text-link" href={localizedPath(locale, "/products")}>
              {copy.primaryAction} <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link text-link-muted" href={localizedPath(locale, "/brand")}>
              {copy.secondaryAction} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-index" aria-label={copy.disciplinesLabel}>
          {copy.disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}
        </div>
      </section>

      <section className="section product-overview" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="section-index">{copy.productsIndex}</p>
          <h2 id="products-title">{copy.productsTitle}</h2>
          <p>{copy.productsIntro}</p>
        </div>

        <div className="product-grid">
          {copy.products.map((area) => (
            <article className="product-card" key={area.index}>
              <div className="card-topline">
                <span>{area.index}</span>
                <span>{copy.productArea}</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <span className="card-meta">{area.meta}</span>
            </article>
          ))}
        </div>

        <Link className="section-link" href={localizedPath(locale, "/products")}>
          {copy.productsLink} <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="dark-section" aria-labelledby="projects-title">
        <div className="dark-section-inner">
          <div className="dark-intro">
            <p className="section-index">{copy.projectsIndex}</p>
            <h2 id="projects-title">{copy.projectsTitle}</h2>
            <p>{copy.projectsIntro}</p>
            <Link className="section-link section-link-light" href={localizedPath(locale, "/projects")}>
              {copy.projectsLink} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="project-list">
            {copy.projects.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-preview" aria-labelledby="brand-title">
        <div className="brand-statement">
          <p className="section-index">{copy.brandIndex}</p>
          <h2 id="brand-title">{copy.brandTitle}</h2>
        </div>
        <div className="brand-detail">
          <Image src="/heydusk-mark.svg" alt={copy.markAlt} width={512} height={512} unoptimized />
          <div>
            <p>{copy.brandCopy}</p>
            <Link className="section-link" href={localizedPath(locale, "/brand")}>
              {copy.brandLink} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section personal-preview" aria-labelledby="personal-title">
        <div>
          <p className="section-index">{copy.personalIndex}</p>
          <h2 id="personal-title">{copy.personalTitle}</h2>
        </div>
        <div className="personal-copy">
          <p>{copy.personalCopy}</p>
          <Link className="section-link" href={localizedPath(locale, "/about")}>
            {copy.personalLink} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <p className="section-index">{copy.contactIndex}</p>
        <h2 id="contact-title">{copy.contactTitle}</h2>
        <a className="contact-link" href="mailto:hello@heydusk.com">
          hello@heydusk.com <span aria-hidden="true">↗</span>
        </a>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
