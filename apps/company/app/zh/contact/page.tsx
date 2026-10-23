import type { Metadata } from "next";
import { docs } from "../../content-docs";
import { localeAlternates } from "../../i18n";
import { DocPageView } from "../../views/doc-page";

const doc = docs.contact.zh;

export const metadata: Metadata = {
  title: "联系我们",
  description: doc.intro,
  alternates: localeAlternates("zh", "/contact"),
  openGraph: { title: "联系我们 — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "联系我们 — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="zh" path="/contact" doc={doc} />;
}
