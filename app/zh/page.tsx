import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { HomePageView } from "../views/home-page";

const title = "理想三旬 HeyDusk — 安静可靠的家庭软件";
const description =
  "理想三旬（HeyDusk）用 AI 为家庭打造安静、可信赖的软件。第一款产品：小咪。";

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
