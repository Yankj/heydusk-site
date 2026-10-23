import type { Metadata } from "next";
import { docs } from "../../content-docs";
import { localeAlternates } from "../../i18n";
import { DocPageView } from "../../views/doc-page";

const doc = docs.about.zh;

export const metadata: Metadata = {
  title: "关于我们",
  description: doc.intro,
  alternates: localeAlternates("zh", "/about"),
  openGraph: { title: "关于我们 — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "关于我们 — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="zh" path="/about" doc={doc} />;
}
