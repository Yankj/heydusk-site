import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "The person behind HeyDusk",
    title: "A formal studio with a personal point of view.",
    intro:
      "HeyDusk is independently built at the intersection of product, design, and AI. The studio is the public home for the work; this is the human layer behind it.",
    noteLabel: "A builder’s note",
    largeCopy:
      "I am interested in the point where a new capability stops being a demo and becomes something a person can genuinely use.",
    noteCopy: [
      "That work crosses disciplines: understanding a real need, shaping a product around it, designing the interaction, and doing enough of the implementation to make the idea accountable to reality.",
      "HeyDusk is the structure that lets those products share a standard without asking every experiment to share the same personality.",
    ],
    channelsLabel: "Personal channels",
    channels: [
      {
        number: "01",
        title: "Notes",
        copy: "Product thinking, field notes, and build logs. The journal opens next.",
        status: "Coming soon",
      },
      {
        number: "02",
        title: "GitHub",
        copy: "Code, experiments, and the practical trail behind the products.",
        status: "Visit ↗",
        href: "https://github.com/Yankj",
      },
      {
        number: "03",
        title: "Elsewhere",
        copy: "Selected social and media channels will be added after launch.",
        status: "To be aligned",
      },
    ],
    collaborate: "Collaborate",
    contactTitle: "Bring a useful problem.",
    contactCopy:
      "Product conversations, design collaboration, AI prototypes, and thoughtful experiments are all welcome.",
  },
  zh: {
    eyebrow: "HeyDusk 背后的人",
    title: "一个正式的工作室，一种个人的观察。",
    intro:
      "HeyDusk 独立构建于产品、设计与 AI 的交汇处。工作室是作品正式面向公众的家；这里则是它背后更有人味的一层。",
    noteLabel: "构建者手记",
    largeCopy:
      "我关心的是这样一个临界点：一项新能力不再只是演示，而开始成为一个人真正能够使用的东西。",
    noteCopy: [
      "这项工作跨越多个领域：理解真实需求，围绕它塑造产品，设计交互，并完成足够多的实现，让想法接受现实的检验。",
      "HeyDusk 提供了一种结构，让这些产品共享同一套标准，却不要求每一个实验都拥有相同的个性。",
    ],
    channelsLabel: "个人频道",
    channels: [
      {
        number: "01",
        title: "随笔",
        copy: "产品思考、现场笔记与构建日志。个人博客即将开放。",
        status: "即将推出",
      },
      {
        number: "02",
        title: "GitHub",
        copy: "代码、实验，以及产品背后的实践轨迹。",
        status: "访问 ↗",
        href: "https://github.com/Yankj",
      },
      {
        number: "03",
        title: "其他平台",
        copy: "精选自媒体与社交频道将在正式发布后陆续加入。",
        status: "待对齐",
      },
    ],
    collaborate: "合作",
    contactTitle: "带来一个值得解决的问题。",
    contactCopy: "欢迎聊产品、设计合作、AI 原型，以及经过认真思考的实验。",
  },
};

export function AboutPageView({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/about" />
      <section className="page-hero about-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className="page-section founder-note">
        <p className="section-index">{copy.noteLabel}</p>
        <div>
          <p className="large-copy">{copy.largeCopy}</p>
          {copy.noteCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="page-section personal-links" id="notes">
        <p className="section-index">{copy.channelsLabel}</p>
        <div className="personal-link-list">
          {copy.channels.map((channel) => {
            const body = (
              <>
                <span>{channel.number}</span>
                <h2>{channel.title}</h2>
                <p>{channel.copy}</p>
                <span className="link-status">{channel.status}</span>
              </>
            );

            return channel.href ? (
              <a href={channel.href} target="_blank" rel="noreferrer" key={channel.number}>
                {body}
              </a>
            ) : (
              <article key={channel.number}>{body}</article>
            );
          })}
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <p className="section-index">{copy.collaborate}</p>
        <div>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactCopy}</p>
          <a href="mailto:hello@heydusk.com">
            hello@heydusk.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
