import type { Metadata } from "next";
import { docs } from "../content-docs";
import { localeAlternates } from "../i18n";
import { DocPageView } from "../views/doc-page";

const doc = docs.terms.en;

export const metadata: Metadata = {
  title: "Terms of Service (draft)",
  description: doc.intro,
  alternates: localeAlternates("en", "/terms"),
  openGraph: { title: "Terms of Service (draft) — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "Terms of Service (draft) — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="en" path="/terms" doc={doc} />;
}
