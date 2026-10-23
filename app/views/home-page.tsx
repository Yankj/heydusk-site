import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["Calm software", "for the things families carry."],
    summary:
      "HeyDusk is a small product company building AI software that helps families remember, plan, and follow through — quietly, with the parent always in control.",
    primaryAction: "Meet mimi, our first product",
    secondaryAction: "About the company",
    artCaption: "Dusk Field / 01",
    disciplinesLabel: "What we focus on",
    disciplines: ["Family life", "Applied AI", "Privacy by design"],
    missionIndex: "01 / Mission",
    missionTitle: "Give families back the mental load, one small task at a time.",
    missionIntro:
      "Parents keep hundreds of details in their heads: school notices, appointments, what each child needs this week. We build tools that hold those details reliably, so people can spend their attention on each other.",
    principlesLabel: "Principles",
    principles: [
      { index: "01", title: "Confirm before acting", description: "Our products propose; people decide. Nothing important changes without an explicit confirmation.", meta: "Trust" },
      { index: "02", title: "Restraint over noise", description: "Fewer, better-timed reminders. Quiet hours are respected by default.", meta: "Attention" },
      { index: "03", title: "Your data stays yours", description: "Family information can be viewed, corrected, and deleted at any time. Children’s data gets the highest level of care.", meta: "Privacy" },
    ],
    productIndex: "02 / Products",
    productTitle: "mimi — a family-affairs brain.",
    productCopy:
      "“Let mimi remember that.” Snap a notice, say a sentence, or type a note — mimi turns it into a card you confirm. Nothing changes until you say yes. Closed beta on iOS.",
    productLink: "Visit mimi.heydusk.com",
    status: "Closed beta · iOS",
    contactIndex: "Partnerships, press, and beta access",
    contactTitle: "We’d like to hear from you.",
    contactLink: "Contact us",
  },
  zh: {
    eyebrow: "理想三旬 · HeyDusk",
    title: ["安静可靠的软件，", "替家庭记住要紧的事。"],
    summary:
      "理想三旬（HeyDusk）是一家小而专注的产品公司，用 AI 帮助家庭记事、安排与落实。克制、可信，决定权始终在家长手里。",
    primaryAction: "认识我们的第一款产品：小咪",
    secondaryAction: "了解公司",
    artCaption: "暮色原野 / 01",
    disciplinesLabel: "我们关注",
    disciplines: ["家庭生活", "应用型 AI", "隐私优先"],
    missionIndex: "01 / 使命",
    missionTitle: "把家长脑子里的琐事，一件件稳稳接住。",
    missionIntro:
      "学校通知、看病预约、孩子这周要带的东西……家长每天要记住成百上千个细节。我们做的工具，就是可靠地记住这些，让家人把注意力留给彼此。",
    principlesLabel: "我们的原则",
    principles: [
      { index: "01", title: "先确认，再行动", description: "产品负责提议，人来做决定。任何重要变更，都要经过你的明确确认。", meta: "可信" },
      { index: "02", title: "克制，而不打扰", description: "提醒更少、时机更准。默认尊重夜间免打扰时段。", meta: "专注" },
      { index: "03", title: "数据属于你", description: "家庭信息随时可查看、修改和删除。孩子的数据，我们以最高标准对待。", meta: "隐私" },
    ],
    productIndex: "02 / 产品",
    productTitle: "小咪，记住孩子的一切，一件不落。",
    productCopy:
      "「让小咪记一下」——拍一张通知、说一句话或打几个字，整理成待你确认的卡片。确认之前，什么都不改。iOS 版正在小范围内测。",
    productLink: "访问 mimi.heydusk.com",
    status: "内测中 · iOS",
    contactIndex: "合作、媒体与内测申请",
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
            <a className="text-link" href="https://mimi.heydusk.com">{copy.primaryAction} <span aria-hidden="true">↗</span></a>
            <Link className="text-link text-link-muted" href={l("/about")}>{copy.secondaryAction} <span aria-hidden="true">→</span></Link>
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
            <article className="product-card" key={p.index}>
              <div className="card-topline"><span>{p.index}</span><span>{p.meta}</span></div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </article>
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
            <a className="section-link section-link-light" href="https://mimi.heydusk.com">{copy.productLink} <span aria-hidden="true">↗</span></a>
          </div>
          <div className="feature-product-art">
            <Image src="/mimi/mimi-app-icon.png" alt="小咪 mimi" width={280} height={280} unoptimized />
          </div>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <p className="section-index">{copy.contactIndex}</p>
        <h2 id="contact-title">{copy.contactTitle}</h2>
        <Link className="contact-link" href={l("/contact")}>{copy.contactLink} <span aria-hidden="true">↗</span></Link>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
