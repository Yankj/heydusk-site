import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Useful experiments, prototypes, agents, and design systems from HeyDusk.",
  openGraph: {
    title: "Projects — HeyDusk",
    description:
      "Useful experiments, prototypes, agents, and design systems from HeyDusk.",
    images: [],
  },
  twitter: {
    title: "Projects — HeyDusk",
    description:
      "Useful experiments, prototypes, agents, and design systems from HeyDusk.",
    images: [],
  },
};

const projectTypes = [
  {
    number: "01",
    title: "Working agents",
    status: "Applied AI",
    description:
      "Narrow agents that research, organize, transform, or complete a defined piece of work.",
  },
  {
    number: "02",
    title: "Product experiments",
    status: "Prototypes",
    description:
      "Small, testable releases used to discover whether an idea deserves to become a product.",
  },
  {
    number: "03",
    title: "Design infrastructure",
    status: "Systems",
    description:
      "Reusable interaction patterns, identity systems, and tools that make the next build more coherent.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero page-hero-dark">
        <p className="eyebrow">Useful projects</p>
        <h1>Experiments that can survive contact with reality.</h1>
        <p>
          Labs is the practical side of HeyDusk: small releases, working
          prototypes, and design investigations that begin with a real use.
        </p>
      </section>

      <section className="page-section project-room" aria-label="Project types">
        <div className="project-room-head">
          <p className="section-index">The project room</p>
          <p>
            The archive will grow as individual projects become ready for a
            public explanation, demo, or release.
          </p>
        </div>
        <div className="project-room-list">
          {projectTypes.map((project) => (
            <article key={project.number}>
              <span>{project.number}</span>
              <div>
                <p>{project.status}</p>
                <h2>{project.title}</h2>
              </div>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section project-cta">
        <div>
          <p className="section-index">Something adjacent?</p>
          <h2>Some of the best projects begin as a useful edge case.</h2>
        </div>
        <Link className="section-link" href="/about#contact">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
