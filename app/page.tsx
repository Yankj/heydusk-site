import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const productAreas = [
  {
    index: "01",
    title: "Agent systems",
    description:
      "Practical AI agents designed around real workflows, clear boundaries, and useful outcomes.",
    meta: "AI · Workflows · Automation",
  },
  {
    index: "02",
    title: "Useful software",
    description:
      "Focused tools that remove friction, make complexity legible, and earn a place in everyday work.",
    meta: "Software · Productivity · Systems",
  },
  {
    index: "03",
    title: "Design tools",
    description:
      "Interfaces, components, and creative infrastructure where form is part of how the product thinks.",
    meta: "Design · Interaction · Craft",
  },
];

const projects = [
  ["Agents", "Tools built to complete a job, not extend a conversation."],
  ["Experiments", "Small releases for testing a useful idea in the real world."],
  ["Systems", "Reusable design and product infrastructure for everything that follows."],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true">
          <Image
            className="hero-art-image"
            src="/dusk-field-v2.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 820px) 100vw, 72vw"
          />
          <span className="hero-art-caption">Dusk Field / 01</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">Independent product studio</p>
          <h1 id="hero-title">
            <span>Thoughtful products</span>
            <span>for what comes next.</span>
          </h1>
          <p className="hero-summary">
            HeyDusk builds focused digital products across AI, software, and
            design—turning emerging possibilities into useful, lasting tools.
          </p>
          <div className="hero-actions">
            <Link className="text-link" href="/products">
              Explore our work <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link text-link-muted" href="/brand">
              Our point of view <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-index" aria-label="Studio disciplines">
          <span>AI agents</span>
          <span>Useful software</span>
          <span>Design systems</span>
        </div>
      </section>

      <section className="section product-overview" aria-labelledby="products-title">
        <div className="section-heading">
          <p className="section-index">01 / Products</p>
          <h2 id="products-title">Built around a clear job to do.</h2>
          <p>
            We favor products with a focused purpose, a calm interface, and a
            reason to exist beyond novelty.
          </p>
        </div>

        <div className="product-grid">
          {productAreas.map((area) => (
            <article className="product-card" key={area.index}>
              <div className="card-topline">
                <span>{area.index}</span>
                <span>Product area</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <span className="card-meta">{area.meta}</span>
            </article>
          ))}
        </div>

        <Link className="section-link" href="/products">
          View the product system <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="dark-section" aria-labelledby="projects-title">
        <div className="dark-section-inner">
          <div className="dark-intro">
            <p className="section-index">02 / Useful projects</p>
            <h2 id="projects-title">Small experiments. Real utility.</h2>
            <p>
              Not every useful idea needs to become a company. Labs is where
              focused agents, prototypes, and design experiments earn their
              right to grow.
            </p>
            <Link className="section-link section-link-light" href="/projects">
              Enter the project room <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="project-list">
            {projects.map(([title, description], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-preview" aria-labelledby="brand-title">
        <div className="brand-statement">
          <p className="section-index">03 / Brand</p>
          <h2 id="brand-title">
            Dusk is not darkness. It is the moment one state becomes another.
          </h2>
        </div>
        <div className="brand-detail">
          <Image
            src="/heydusk-mark.svg"
            alt="HeyDusk Last Light symbol"
            width={512}
            height={512}
            unoptimized
          />
          <div>
            <p>
              The Last Light mark holds that transition in one gesture: a calm
              form crossed by a continuous trace of light.
            </p>
            <Link className="section-link" href="/brand">
              Read the brand idea <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section personal-preview" aria-labelledby="personal-title">
        <div>
          <p className="section-index">04 / Personal</p>
          <h2 id="personal-title">Independent by design.</h2>
        </div>
        <div className="personal-copy">
          <p>
            HeyDusk has a formal public face and a human one behind it. The
            personal space collects the ideas, field notes, side projects, and
            conversations that shape the work.
          </p>
          <Link className="section-link" href="/about">
            Meet the person behind HeyDusk <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <p className="section-index">A conversation can be a beginning.</p>
        <h2 id="contact-title">Have something worth building?</h2>
        <a className="contact-link" href="mailto:hello@heydusk.com">
          hello@heydusk.com <span aria-hidden="true">↗</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
