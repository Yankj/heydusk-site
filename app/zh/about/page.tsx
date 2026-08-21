import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { AboutPageView } from "../../views/about-page";

const description = "认识独立产品工作室 HeyDusk 背后的人、思考、个人频道与合作方式。";

export const metadata: Metadata = {
  title: "关于",
  description,
  alternates: localeAlternates("zh", "/about"),
  openGraph: { title: "关于 — HeyDusk", description, images: [] },
  twitter: { title: "关于 — HeyDusk", description, images: [] },
};

export default function ChineseAboutPage() {
  return <AboutPageView locale="zh" />;
}
