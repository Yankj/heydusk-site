import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { CatPageView } from "../../views/cat-page";

const description = "cat remembers everything about your kids and never lets anything slip. Closed beta on iOS.";

export const metadata: Metadata = {
  title: "cat — family assistant",
  description,
  alternates: localeAlternates("en", "/products/cat"),
  openGraph: { title: "cat — family assistant — HeyDusk", description, images: [] },
  twitter: { title: "cat — family assistant — HeyDusk", description, images: [] },
};

export default function Page() {
  return <CatPageView locale="en" />;
}
