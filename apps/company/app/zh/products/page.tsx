import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { ProductsPageView } from "../../views/products-page";

const description = "理想三旬 HeyDusk 的产品：家庭事务助理小咪（内测中）。";

export const metadata: Metadata = {
  title: "产品",
  description,
  alternates: localeAlternates("zh", "/products"),
  openGraph: { title: "产品 — HeyDusk", description, images: [] },
  twitter: { title: "产品 — HeyDusk", description, images: [] },
};

export default function ChineseProductsPage() {
  return <ProductsPageView locale="zh" />;
}
