import type { Metadata } from "next";
import { docs } from "../content-docs";
import { localeAlternates } from "../i18n";
import { DocPageView } from "../views/doc-page";

const doc = docs.about.en;

export const metadata: Metadata = {
  title: "About",
  description: doc.intro,
  alternates: localeAlternates("en", "/about"),
  openGraph: { title: "About — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "About — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="en" path="/about" doc={doc} />;
}
