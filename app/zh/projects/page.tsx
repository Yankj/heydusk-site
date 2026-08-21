import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { ProjectsPageView } from "../../views/projects-page";

const description = "来自 HeyDusk 的实用实验、原型、智能体与设计系统。";

export const metadata: Metadata = {
  title: "项目",
  description,
  alternates: localeAlternates("zh", "/projects"),
  openGraph: { title: "项目 — HeyDusk", description, images: [] },
  twitter: { title: "项目 — HeyDusk", description, images: [] },
};

export default function ChineseProjectsPage() {
  return <ProjectsPageView locale="zh" />;
}
