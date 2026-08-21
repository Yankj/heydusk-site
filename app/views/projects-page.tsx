import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "Useful projects",
    title: "Experiments that can survive contact with reality.",
    intro:
      "Labs is the practical side of HeyDusk: small releases, working prototypes, and design investigations that begin with a real use.",
    projectTypesLabel: "Project types",
    room: "The project room",
    roomIntro:
      "The archive will grow as individual projects become ready for a public explanation, demo, or release.",
    projects: [
      {
        number: "01",
        title: "Working agents",
        status: "Applied AI",
        description:
          "Narrow agents that research, organize, transform, or complete a defined piece of work.",
      },
      {
        number: "02",
        title: "Product experiments",
        status: "Prototypes",
        description:
          "Small, testable releases used to discover whether an idea deserves to become a product.",
      },
      {
        number: "03",
        title: "Design infrastructure",
        status: "Systems",
        description:
          "Reusable interaction patterns, identity systems, and tools that make the next build more coherent.",
      },
    ],
    adjacent: "Something adjacent?",
    ctaTitle: "Some of the best projects begin as a useful edge case.",
    ctaLink: "Start a conversation",
  },
  zh: {
    eyebrow: "实用项目",
    title: "经得起现实检验的实验。",
    intro:
      "Labs 是 HeyDusk 更实践的一面：从真实用途出发的小型发布、可运行原型与设计探索。",
    projectTypesLabel: "项目类型",
    room: "项目室",
    roomIntro:
      "当每个项目准备好被完整说明、演示或发布时，这份档案会持续生长。",
    projects: [
      {
        number: "01",
        title: "可工作的智能体",
        status: "应用型 AI",
        description: "聚焦于研究、整理、转化或完成一项明确工作的窄域智能体。",
      },
      {
        number: "02",
        title: "产品实验",
        status: "原型",
        description: "通过小而可测试的发布，判断一个想法是否值得成为产品。",
      },
      {
        number: "03",
        title: "设计基础设施",
        status: "系统",
        description: "让下一次构建更一致的可复用交互模式、识别系统与工具。",
      },
    ],
    adjacent: "有一些相邻的想法？",
    ctaTitle: "有些最好的项目，起点只是一个有价值的边缘场景。",
    ctaLink: "开始一次对话",
  },
};

export function ProjectsPageView({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/projects" />
      <section className="page-hero page-hero-dark">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className="page-section project-room" aria-label={copy.projectTypesLabel}>
        <div className="project-room-head">
          <p className="section-index">{copy.room}</p>
          <p>{copy.roomIntro}</p>
        </div>
        <div className="project-room-list">
          {copy.projects.map((project) => (
            <article key={project.number}>
              <span>{project.number}</span>
              <div>
                <p>{project.status}</p>
                <h2>{project.title}</h2>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section project-cta">
        <div>
          <p className="section-index">{copy.adjacent}</p>
          <h2>{copy.ctaTitle}</h2>
        </div>
        <Link className="section-link" href={localizedPath(locale, "/about#contact")}>
          {copy.ctaLink} <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
