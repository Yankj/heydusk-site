import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { BrandPageView } from "../views/brand-page";

export const metadata: Metadata = {
  title: "Brand",
  description: "The idea, principles, and Last Light identity behind HeyDusk.",
  alternates: localeAlternates("en", "/brand"),
  openGraph: {
    title: "Brand — HeyDusk",
    description: "The idea, principles, and Last Light identity behind HeyDusk.",
    images: [],
  },
  twitter: {
    title: "Brand — HeyDusk",
    description: "The idea, principles, and Last Light identity behind HeyDusk.",
    images: [],
  },
};

export default function BrandPage() {
  return <BrandPageView locale="en" />;
}
