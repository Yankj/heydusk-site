import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";

export type DocSection = { heading: string; body: string[] };
export type DocContent = {
  eyebrow: string;
  title: string;
  intro: string;
  notice?: string;
  sections: DocSection[];
};

export function DocPageView({ locale, path, doc }: { locale: Locale; path: string; doc: DocContent }) {
  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath={path} />
      <section className="page-hero">
        <p className="eyebrow">{doc.eyebrow}</p>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
      </section>
      <section className="page-section doc-body">
        {doc.notice ? <p className="doc-notice" role="note">{doc.notice}</p> : null}
        {doc.sections.map((s) => (
          <article key={s.heading} className="doc-section">
            <h2>{s.heading}</h2>
            {s.body.map((p) => (/^[^\s@]+@[^\s@]+$/.test(p) ? <p key={p}><a className="section-link" href={`mailto:${p}`}>{p}</a></p> : <p key={p}>{p}</p>))}
          </article>
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
