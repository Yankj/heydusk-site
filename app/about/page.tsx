import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
  openGraph: {
    title: "About — HeyDusk",
    description:
      "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
    images: [],
  },
  twitter: {
    title: "About — HeyDusk",
    description:
      "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
    images: [],
  },
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero about-hero">
        <p className="eyebrow">The person behind HeyDusk</p>
        <h1>A formal studio with a personal point of view.</h1>
        <p>
          HeyDusk is independently built at the intersection of product,
          design, and AI. The studio is the public home for the work; this is
          the human layer behind it.
        </p>
      </section>

      <section className="page-section founder-note">
        <p className="section-index">A builder&apos;s note</p>
        <div>
          <p className="large-copy">
            I am interested in the point where a new capability stops being a
            demo and becomes something a person can genuinely use.
          </p>
          <p>
            That work crosses disciplines: understanding a real need, shaping
            a product around it, designing the interaction, and doing enough of
            the implementation to make the idea accountable to reality.
          </p>
          <p>
            HeyDusk is the structure that lets those products share a standard
            without asking every experiment to share the same personality.
          </p>
        </div>
      </section>

      <section className="page-section personal-links" id="notes">
        <p className="section-index">Personal channels</p>
        <div className="personal-link-list">
          <article>
            <span>01</span>
            <h2>Notes</h2>
            <p>Product thinking, field notes, and build logs. The journal opens next.</p>
            <span className="link-status">Coming soon</span>
          </article>
          <a href="https://github.com/Yankj" target="_blank" rel="noreferrer">
            <span>02</span>
            <h2>GitHub</h2>
            <p>Code, experiments, and the practical trail behind the products.</p>
            <span className="link-status">Visit ↗</span>
          </a>
          <article>
            <span>03</span>
            <h2>Elsewhere</h2>
            <p>Selected social and media channels will be added after launch.</p>
            <span className="link-status">To be aligned</span>
          </article>
        </div>
      </section>

      <section className="contact-panel" id="contact">
        <p className="section-index">Collaborate</p>
        <div>
          <h2>Bring a useful problem.</h2>
          <p>
            Product conversations, design collaboration, AI prototypes, and
            thoughtful experiments are all welcome.
          </p>
          <a href="mailto:hello@heydusk.com">
            hello@heydusk.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
