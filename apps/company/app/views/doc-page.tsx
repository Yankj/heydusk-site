import { EmailContact } from "../components/email-contact";
import { RevealOnScroll } from "../components/reveal-on-scroll";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localizedPath, localeLanguageTag, type Locale } from "../i18n";

export type DocSection = { heading: string; body: string[] };
export type DocContent = {
  eyebrow: string;
  title: string;
  intro: string;
  notice?: string;
  sections: DocSection[];
};

const aboutProcess = {
  en: {
    label: "How we work",
    steps: [
      { title: "A concrete need", body: "Start from a particular audience and a job to do." },
      { title: "Clear scope", body: "Say what is confirmed now, and what is still planned." },
      { title: "Enquire by email", body: "Introductions first; an enquiry does not grant access." },
    ],
  },
  zh: {
    label: "我们如何做产品",
    steps: [
      { title: "具体需要", body: "从明确的使用者和用途出发。" },
      { title: "清楚范围", body: "分清此刻能确认的，与仍在规划的。" },
      { title: "邮件咨询", body: "先介绍，再咨询；来信不等于开通权限。" },
    ],
  },
};

export function DocPageView({ locale, path, doc }: { locale: Locale; path: string; doc: DocContent }) {
  const links = locale === "zh"
    ? [{ path: "/products", label: "查看产品" }, { path: "/about", label: "关于 HeyDusk" }, { path: "/contact", label: "联系我们" }]
    : [{ path: "/products", label: "Explore products" }, { path: "/about", label: "About HeyDusk" }, { path: "/contact", label: "Contact us" }];
  const process = path === "/about" ? aboutProcess[locale] : null;

  return (
    <main lang={localeLanguageTag[locale]}>
      {path === "/about" || path === "/contact" ? <RevealOnScroll /> : null}
      <SiteHeader locale={locale} currentPath={path} />
      <section className={`page-hero${path === "/about" ? " page-hero--about" : ""}`}>
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
      </section>
      {process ? (
        <section className="about-process" aria-label={process.label} data-reveal>
          <p className="section-index">01 / {process.label}</p>
          <div className="about-process-grid">
            {process.steps.map((step, index) => (
              <article key={step.title} className="about-process-card">
                <span className="about-process-index" aria-hidden="true">0{index + 1}</span>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
      <section className="page-section doc-body" aria-label={locale === "zh" ? "详细说明" : "Details"}>
        {doc.notice ? <p className="doc-notice" role="note">{doc.notice}</p> : null}
        {path === "/contact" ? <EmailContact locale={locale} /> : null}
        {doc.sections.map((s) => (
          <article key={s.heading} className="doc-section" data-reveal={path === "/about" ? "" : undefined}>
            <h2>{s.heading}</h2>
            {s.body.map((p) => (/^[^\s@]+@[^\s@]+$/.test(p) ? <p key={p}><a className="section-link" href={`mailto:${p}`}>{p}</a></p> : <p key={p}>{p}</p>))}
          </article>
        ))}
        <nav className="doc-page-links" aria-label={locale === "zh" ? "相关页面" : "Related pages"}>
          {links.filter((link) => link.path !== path).map((link) => (
            <a className="section-link" key={link.path} href={localizedPath(locale, link.path)}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
