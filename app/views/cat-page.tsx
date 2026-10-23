import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "cat · by HeyDusk",
    title: "Remembers everything about your kids. Never lets anything slip.",
    intro: "cat is a family-affairs assistant for iPhone. Tell it what’s happening — it organizes, confirms with you, and reminds at the right moment.",
    status: "Closed beta on iOS · not yet on the App Store",
    cta: "Request beta access",
    featuresIndex: "What cat does",
    features: [
      { img: "/cat/cat-writing.webp", title: "Capture any way", copy: "Snap a school notice, say a sentence, or type a note. cat turns it into a clear confirm card." },
      { img: "/cat/cat-thinking.webp", title: "今天 · Today", copy: "One calm view of your child’s day: classes, appointments, things to bring." },
      { img: "/cat/cat-done.webp", title: "Confirm before any change", copy: "cat proposes; you decide. Nothing is added, changed, or removed without your confirmation." },
      { img: "/cat/cat-front.webp", title: "我们家 · Our family", copy: "A family profile and memory you can view, edit, and delete at any time." },
    ],
    remindersIndex: "Restrained reminders",
    remindersTitle: "One or two a day. Silent from 21:00 to 08:00.",
    remindersCopy: "cat reminds you about what matters and stays quiet the rest of the time. Growth notes and companionship features come later, on top of a reliable core.",
    privacyIndex: "Children’s data",
    privacyTitle: "Built to protect what is most personal.",
    privacy: [
      "Only the parent account can see and manage the family’s information.",
      "Every memory shows where it came from, and can be corrected or deleted.",
      "“Clear memory” removes stored family memory on request.",
      "We do not sell family data or use it for advertising.",
    ],
    privacyLink: "Read the draft privacy policy",
    slogan: "A step ahead. Things handled.",
  },
  zh: {
    eyebrow: "cat · 理想三旬出品",
    title: "记住孩子的一切，一件不落。",
    intro: "cat 是一款 iPhone 上的家庭事务助理。告诉它家里发生的事，它来整理、跟你确认，并在合适的时候提醒你。",
    status: "iOS 内测中 · 尚未上架 App Store",
    cta: "申请内测",
    featuresIndex: "cat 能做什么",
    features: [
      { img: "/cat/cat-writing.webp", title: "怎么方便怎么记", copy: "拍一张学校通知、说一句话或打几个字，cat 都会整理成一张清楚的确认卡。" },
      { img: "/cat/cat-thinking.webp", title: "今天", copy: "孩子一天的安排一屏看清：上课、预约、要带的东西。" },
      { img: "/cat/cat-done.webp", title: "改动前先确认", copy: "cat 只负责提议，决定权在你。任何新增、修改、删除，都要你点头。" },
      { img: "/cat/cat-front.webp", title: "我们家", copy: "家庭档案和记忆随时可查看、修改、删除。" },
    ],
    remindersIndex: "克制的提醒",
    remindersTitle: "每天一到两条，21:00–08:00 不打扰。",
    remindersCopy: "只在要紧的事上提醒你，其余时间保持安静。成长陪伴类功能会在可靠的基础能力之上逐步加入。",
    privacyIndex: "孩子的数据",
    privacyTitle: "最私密的信息，最认真地保护。",
    privacy: [
      "只有家长账号能查看和管理家庭信息。",
      "每条记忆都标明来源，可随时更正或删除。",
      "「清空记忆」可按需清除已保存的家庭记忆。",
      "我们不出售家庭数据，也不用于广告。",
    ],
    privacyLink: "阅读隐私政策（草案）",
    slogan: "先你一步，把事办妥。",
  },
};

export function CatPageView({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const l = (p: string) => localizedPath(locale, p);
  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/products/cat" />
      <section className="page-hero cat-hero">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
          <p className="status-pill">{copy.status}</p>
          <div className="hero-actions">
            <Link className="text-link" href={l("/contact")}>{copy.cta} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <Image className="cat-hero-art" src="/cat/cat-front.webp" alt="cat" width={360} height={360} priority unoptimized />
      </section>

      <section className="page-section">
        <p className="section-index">{copy.featuresIndex}</p>
        <div className="feature-grid">
          {copy.features.map((f) => (
            <article className="product-card feature-card" key={f.title}>
              <Image src={f.img} alt="" width={96} height={96} unoptimized />
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section launch-principle">
        <p className="section-index">{copy.remindersIndex}</p>
        <blockquote>{copy.remindersTitle}</blockquote>
        <p className="doc-lead">{copy.remindersCopy}</p>
      </section>

      <section className="dark-section">
        <div className="dark-section-inner">
          <div className="dark-intro">
            <p className="section-index">{copy.privacyIndex}</p>
            <h2>{copy.privacyTitle}</h2>
            <Link className="section-link section-link-light" href={l("/privacy")}>{copy.privacyLink} <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="project-list">
            {copy.privacy.map((item, i) => (
              <article key={item}><span>0{i + 1}</span><p>{item}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band">
        <p className="section-index">cat</p>
        <h2>{copy.slogan}</h2>
        <Link className="contact-link" href={l("/contact")}>{copy.cta} <span aria-hidden="true">↗</span></Link>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
