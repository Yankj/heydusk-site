import type { Metadata } from "next";
import { localeAlternates, localizedPath } from "../../../i18n";
import { getProduct } from "../../../product-catalog";
import { ProductDetailPageView } from "../../../views/product-detail-page";

const product = getProduct("frameforge");
const copy = product.zh.detail;

export const metadata: Metadata = {
  title: copy.pageTitle,
  description: copy.metaDescription,
  alternates: localeAlternates("zh", product.path),
  openGraph: {
    title: `${copy.pageTitle} — HeyDusk`,
    description: copy.metaDescription,
    url: localizedPath("zh", product.path),
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [],
  },
  twitter: {
    title: `${copy.pageTitle} — HeyDusk`,
    description: copy.metaDescription,
    images: [],
  },
};

export default function ProductPage() {
  return <ProductDetailPageView locale="zh" productId="frameforge" />;
}
