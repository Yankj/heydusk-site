import type { Metadata } from "next";
import { docs } from "../../content-docs";
import { localeAlternates } from "../../i18n";
import { DocPageView } from "../../views/doc-page";

const doc = docs.terms.zh;

export const metadata: Metadata = {
  title: "服务条款（草案）",
  description: doc.intro,
  alternates: localeAlternates("zh", "/terms"),
  openGraph: { title: "服务条款（草案） — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "服务条款（草案） — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="zh" path="/terms" doc={doc} />;
}
