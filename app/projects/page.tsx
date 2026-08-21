import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProjectsPageView } from "../views/projects-page";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Useful experiments, prototypes, agents, and design systems from HeyDusk.",
  alternates: localeAlternates("en", "/projects"),
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

export default function ProjectsPage() {
  return <ProjectsPageView locale="en" />;
}
