import type { Metadata } from "next";
import { docs } from "../../content-docs";
import { localeAlternates } from "../../i18n";
import { DocPageView } from "../../views/doc-page";

const doc = docs.privacy.zh;

export const metadata: Metadata = {
  title: "隐私政策（草案）",
  description: doc.intro,
  alternates: localeAlternates("zh", "/privacy"),
  openGraph: { title: "隐私政策（草案） — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "隐私政策（草案） — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="zh" path="/privacy" doc={doc} />;
}
