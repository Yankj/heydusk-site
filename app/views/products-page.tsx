import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Products",
    title: "Products with a clear job to do.",
    intro:
      "HeyDusk is building a focused portfolio across AI, software, and design. Individual products will be introduced here as they are ready to earn attention.",
    areasLabel: "Product areas",
    areas: [
      {
        number: "01",
        title: "Agent systems",
        kicker: "AI that has a job to do",
        copy: "We design agents around a real workflow, a clear definition of done, and the human judgment that still matters.",
        tags: ["Workflow design", "Human-in-the-loop", "Applied AI"],
      },
      {
        number: "02",
        title: "Useful software",
        kicker: "Focused tools over crowded platforms",
        copy: "Compact software for recurring problems—designed to become quieter and more valuable the longer it is used.",
        tags: ["Productivity", "Knowledge work", "Systems"],
      },
      {
        number: "03",
        title: "Design tools",
        kicker: "Clarity is a product feature",
        copy: "Tools and infrastructure that help people make, understand, and communicate complex things with less friction.",
        tags: ["Interaction", "Creative tools", "Design systems"],
      },
    ],
    themes: "themes",
    principle: "A launch principle",
    quote: "A product should become public when its purpose is clearer than its promise.",
    brandLink: "See how HeyDusk thinks",
  },
  zh: {
    eyebrow: "产品",
    title: "为一个清晰的任务而生。",
    intro:
      "HeyDusk 正在 AI、软件与设计之间构建一组聚焦的产品。每一个产品都会在真正值得被看见时，在这里正式亮相。",
    areasLabel: "产品方向",
    areas: [
      {
        number: "01",
        title: "智能体系统",
        kicker: "真正承担任务的 AI",
        copy: "我们围绕真实工作流、明确的完成标准，以及依然不可替代的人类判断来设计智能体。",
        tags: ["工作流设计", "人在回路", "应用型 AI"],
      },
      {
        number: "02",
        title: "实用软件",
        kicker: "专注型工具，而非拥挤的平台",
        copy: "为反复出现的问题构建紧凑的软件；使用得越久，它越安静，也越有价值。",
        tags: ["效率", "知识工作", "系统"],
      },
      {
        number: "03",
        title: "设计工具",
        kicker: "清晰本身就是产品能力",
        copy: "帮助人们以更少摩擦去创造、理解并表达复杂事物的工具与基础设施。",
        tags: ["交互", "创作工具", "设计系统"],
      },
    ],
    themes: "相关主题",
    principle: "发布原则",
    quote: "当一个产品的用途比它的承诺更清晰时，才应该走向公众。",
    brandLink: "了解 HeyDusk 的思考方式",
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

      <section className="page-section product-lines" aria-label={copy.areasLabel}>
        {copy.areas.map((area) => (
          <article className="product-line" key={area.number}>
            <span className="line-number">{area.number}</span>
            <div>
              <p className="line-kicker">{area.kicker}</p>
              <h2>{area.title}</h2>
            </div>
            <div className="line-copy">
              <p>{area.copy}</p>
              <ul aria-label={`${area.title} ${copy.themes}`}>
                {area.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="page-section launch-principle">
        <p className="section-index">{copy.principle}</p>
        <blockquote>{copy.quote}</blockquote>
        <Link className="section-link" href={localizedPath(locale, "/brand")}>
          {copy.brandLink} <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
