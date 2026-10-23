import type { Metadata } from "next";
import { docs } from "../content-docs";
import { localeAlternates } from "../i18n";
import { DocPageView } from "../views/doc-page";

const doc = docs.privacy.en;

export const metadata: Metadata = {
  title: "Privacy Policy (draft)",
  description: doc.intro,
  alternates: localeAlternates("en", "/privacy"),
  openGraph: { title: "Privacy Policy (draft) — HeyDusk", description: doc.intro, images: [] },
  twitter: { title: "Privacy Policy (draft) — HeyDusk", description: doc.intro, images: [] },
};

export default function Page() {
  return <DocPageView locale="en" path="/privacy" doc={doc} />;
}
