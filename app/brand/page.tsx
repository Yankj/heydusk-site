import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The idea, principles, and Last Light identity behind HeyDusk.",
  openGraph: {
    title: "Brand — HeyDusk",
    description: "The idea, principles, and Last Light identity behind HeyDusk.",
    images: [],
  },
  twitter: {
    title: "Brand — HeyDusk",
    description: "The idea, principles, and Last Light identity behind HeyDusk.",
    images: [],
  },
};

const principles = [
  ["Useful before impressive", "Utility is the first proof of an idea."],
  ["Clarity through design", "Design should make the product easier to understand, not harder to notice."],
  ["Built for real life", "A product is finished by the context in which someone actually uses it."],
];

export default function BrandPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero brand-hero">
        <p className="eyebrow">The brand</p>
        <h1>Dusk is a threshold, not an ending.</h1>
        <p>
          HeyDusk takes its name from the moment between known and unknown—when
          one state gives way to another and the next shape begins to appear.
        </p>
      </section>

      <section className="page-section mark-story">
        <div className="mark-stage">
          <Image
            src="/heydusk-mark.svg"
            alt="HeyDusk Last Light symbol"
            width={512}
            height={512}
            unoptimized
          />
        </div>
        <div className="mark-copy">
          <p className="section-index">Last Light</p>
          <h2>One calm form. One continuous trace of light.</h2>
          <p>
            The symbol begins with a stable D. A ribbon of twilight and
            afterglow passes through it in one uninterrupted gesture—holding
            transition, direction, and a little warmth without illustrating a
            literal sunset.
          </p>
          <p>
            In black and white, the ribbon becomes a cut. In digital spaces, it
            becomes HeyDusk&apos;s quiet signature.
          </p>
        </div>
      </section>

      <section className="page-section principle-section">
        <p className="section-index">Working principles</p>
        <div className="principle-grid">
          {principles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-colors" aria-label="HeyDusk brand colors">
        <div className="swatch swatch-ink"><span>Ink</span></div>
        <div className="swatch swatch-twilight"><span>Twilight</span></div>
        <div className="swatch swatch-ember"><span>Ember</span></div>
        <div className="swatch swatch-afterglow"><span>Afterglow</span></div>
      </section>
      <SiteFooter />
    </main>
  );
}
