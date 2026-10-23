import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProductsPageView } from "../views/products-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "HeyDusk company product catalog. First product: mimi (product site: mimi.heydusk.com).",
  alternates: localeAlternates("en", "/products"),
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk company product catalog. First product: mimi (product site: mimi.heydusk.com).",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "HeyDusk company product catalog. First product: mimi (product site: mimi.heydusk.com).",
    images: [],
  },
};

export default function ProductsPage() {
  return <ProductsPageView locale="en" />;
}
