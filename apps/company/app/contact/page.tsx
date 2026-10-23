import type { Metadata } from "next";
import { docs } from "../content-docs";
import { localeAlternates } from "../i18n";
import { DocPageView } from "../views/doc-page";

const doc = docs.contact.en;

export const metadata: Metadata = {
  title: "Contact",
  description: doc.intro,
  alternates: localeAlternates("en", "/contact"),
  openGraph: { title: "Contact — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "Contact — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="en" path="/contact" doc={doc} />;
}
