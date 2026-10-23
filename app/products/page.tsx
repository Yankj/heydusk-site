import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProductsPageView } from "../views/products-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "HeyDusk products: cat, a family-affairs assistant for iOS (closed beta).",
  alternates: localeAlternates("en", "/products"),
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk products: cat, a family-affairs assistant for iOS (closed beta).",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk products: cat, a family-affairs assistant for iOS (closed beta).",
    images: [],
  },
};

export default function ProductsPage() {
  return <ProductsPageView locale="en" />;
}
