import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
    images: [],
  },
};

const areas = [
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
];

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <p className="eyebrow">Products</p>
        <h1>Products with a clear job to do.</h1>
        <p>
          HeyDusk is building a focused portfolio across AI, software, and
          design. Individual products will be introduced here as they are ready
          to earn attention.
        </p>
      </section>

      <section className="page-section product-lines" aria-label="Product areas">
        {areas.map((area) => (
          <article className="product-line" key={area.number}>
            <span className="line-number">{area.number}</span>
            <div>
              <p className="line-kicker">{area.kicker}</p>
              <h2>{area.title}</h2>
            </div>
            <div className="line-copy">
              <p>{area.copy}</p>
              <ul aria-label={`${area.title} themes`}>
                {area.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="page-section launch-principle">
        <p className="section-index">A launch principle</p>
        <blockquote>
          A product should become public when its purpose is clearer than its
          promise.
        </blockquote>
        <Link className="section-link" href="/brand">
          See how HeyDusk thinks <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
