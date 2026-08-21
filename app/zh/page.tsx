import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { HomePageView } from "../views/home-page";

const title = "HeyDusk — 面向接下来的世界";
const description =
  "HeyDusk 是一家独立产品工作室，专注于 AI、软件与设计。";

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
