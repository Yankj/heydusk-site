import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProductsPageView } from "../views/products-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "HeyDusk products: mimi, a family-affairs assistant for iOS (closed beta).",
  alternates: localeAlternates("en", "/products"),
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk products: mimi, a family-affairs assistant for iOS (closed beta).",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk products: mimi, a family-affairs assistant for iOS (closed beta).",
    images: [],
  },
};

export default function ProductsPage() {
  return <ProductsPageView locale="en" />;
}
