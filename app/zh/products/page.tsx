import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { ProductsPageView } from "../../views/products-page";

const description = "HeyDusk 的产品体系：聚焦 AI 智能体、实用软件与设计工具。";

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
