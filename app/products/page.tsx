import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProductsPageView } from "../views/products-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
  alternates: localeAlternates("en", "/products"),
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "The HeyDusk product system: focused work across AI agents, useful software, and design tools.",
    images: [],
  },
};

export default function ProductsPage() {
  return <ProductsPageView locale="en" />;
}
