import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, localizedPath, type Locale } from "../i18n";
import { getProduct, type ProductId } from "../product-catalog";
import "./product-detail.css";

const labels = {
  en: {
    breadcrumbs: "Breadcrumb",
    allProducts: "All products",
    purpose: "What it is for",
    stage: "Current stage & scope",
    next: "Next step",
    back: "Back to all products",
  },
  zh: {
    breadcrumbs: "当前位置",
    allProducts: "全部产品",
    purpose: "产品用途",
    stage: "当前阶段与范围",
    next: "下一步",
    back: "返回全部产品",
  },
};

export function ProductDetailPageView({ locale, productId }: { locale: Locale; productId: ProductId }) {
  const product = getProduct(productId);
  const copy = product[locale];
  const detail = copy.detail;
  const label = labels[locale];
  const catalogHref = localizedPath(locale, "/products");
  const contactHref = `${localizedPath(locale, "/contact")}?product=${product.id}`;

  return (
    <main className="product-detail-page" lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath={product.path} />

      <div className="product-detail-content">
        <nav className="product-detail-breadcrumb" aria-label={label.breadcrumbs}>
          <a href={catalogHref}>{label.allProducts}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="product-detail-hero" aria-labelledby="product-title">
          <div className="product-detail-identity">
            {product.id === "mimi" ? <Image src="/mimi/mimi-icon.png" alt="" width={64} height={64} unoptimized /> : null}
            <p className="eyebrow">{copy.direction}</p>
          </div>
          <h1 id="product-title">{product.name}</h1>
          <p className="product-detail-headline">{detail.headline}</p>
          <p className="product-detail-summary">{copy.description}</p>
          <p className="product-detail-status">{copy.stage}</p>
          <div className="product-detail-actions">
            <a className="product-detail-primary" href="#product-purpose-title">
              {copy.action}<span aria-hidden="true">↓</span>
            </a>
            <a className="product-detail-secondary" href={contactHref}>{detail.contactAction}<span aria-hidden="true">→</span></a>
          </div>
          <p className="product-detail-entry-note">{detail.entryNote}</p>
        </section>

        <section className="product-detail-section" aria-labelledby="product-purpose-title">
          <div className="product-detail-section-heading">
            <p className="product-detail-label">01 / {label.purpose}</p>
            <h2 id="product-purpose-title">{detail.overviewTitle}</h2>
            <p>{detail.overviewIntro}</p>
          </div>
          <div className="product-detail-highlights">
            {detail.highlights.map((highlight, index) => (
              <article className="product-detail-highlight" key={highlight.title}>
                <span className="product-detail-number" aria-hidden="true">0{index + 1}</span>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="product-detail-section product-detail-scope" aria-labelledby="product-stage-title">
          <div className="product-detail-section-heading">
            <p className="product-detail-label">02 / {label.stage}</p>
            <h2 id="product-stage-title">{copy.stage}</h2>
          </div>
          <div className="product-detail-scope-copy">
            <p>{detail.stageIntro}</p>
            <ul>{detail.boundaries.map((boundary) => <li key={boundary}>{boundary}</li>)}</ul>
          </div>
        </section>

        <section className="product-detail-next" aria-labelledby="product-next-title">
          <p className="product-detail-label">03 / {label.next}</p>
          <h2 id="product-next-title">{detail.nextTitle}</h2>
          <p className="product-detail-next-copy">{detail.nextBody}</p>
          <div className="product-detail-actions">
            <a className="product-detail-primary" href="#product-purpose-title">
              {copy.action}<span aria-hidden="true">↑</span>
            </a>
            <a className="product-detail-secondary" href={contactHref}>{detail.contactAction}<span aria-hidden="true">→</span></a>
          </div>
          <p className="product-detail-entry-note">{detail.entryNote}</p>
          <a className="product-detail-back" href={catalogHref}><span aria-hidden="true">←</span>{label.back}</a>
        </section>
      </div>

      <SiteFooter locale={locale} />
    </main>
  );
}
