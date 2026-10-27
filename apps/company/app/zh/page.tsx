import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { HomePageView } from "../views/home-page";

const title = "理想三旬 HeyDusk — 独立 AI 产品工作室";
const description =
  "理想三旬（HeyDusk）围绕家庭与生活、学习与成长、创作与表达，打造 Mimi、Momo、FrameForge / 小片场等独立 AI 产品。";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: localeAlternates("zh", "/"),
  openGraph: { title, description, images: ["/og.png"] },
  twitter: { title, description, images: ["/og.png"] },
};

export default function ChineseHomePage() {
  return <HomePageView locale="zh" />;
}
