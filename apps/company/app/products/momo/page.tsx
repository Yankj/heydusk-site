import type { Metadata } from "next";
import { localeAlternates, localizedPath } from "../../i18n";
import { getProduct } from "../../product-catalog";
import { ProductDetailPageView } from "../../views/product-detail-page";

const product = getProduct("momo");
const copy = product.en.detail;

export const metadata: Metadata = {
  title: copy.pageTitle,
  description: copy.metaDescription,
  alternates: localeAlternates("en", product.path),
  openGraph: {
    title: `${copy.pageTitle} — HeyDusk`,
    description: copy.metaDescription,
    url: localizedPath("en", product.path),
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    images: [],
  },
  twitter: {
    title: `${copy.pageTitle} — HeyDusk`,
    description: copy.metaDescription,
    images: [],
  },
};

export default function ProductPage() {
  return <ProductDetailPageView locale="en" productId="momo" />;
}
