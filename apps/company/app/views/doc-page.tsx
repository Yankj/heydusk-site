import { EmailContact } from "../components/email-contact";
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

export function DocPageView({ locale, path, doc }: { locale: Locale; path: string; doc: DocContent }) {
  const links = locale === "zh"
    ? [{ path: "/products", label: "查看产品" }, { path: "/about", label: "关于 HeyDusk" }, { path: "/contact", label: "联系我们" }]
    : [{ path: "/products", label: "Explore products" }, { path: "/about", label: "About HeyDusk" }, { path: "/contact", label: "Contact us" }];

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath={path} />
      <section className="page-hero">
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
      </section>
      <section className="page-section doc-body" aria-label={locale === "zh" ? "详细说明" : "Details"}>
        {doc.notice ? <p className="doc-notice" role="note">{doc.notice}</p> : null}
        {path === "/contact" ? <EmailContact locale={locale} /> : null}
        {doc.sections.map((s) => (
          <article key={s.heading} className="doc-section">
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
