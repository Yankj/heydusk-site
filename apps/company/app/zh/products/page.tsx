import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { ProductsPageView } from "../../views/products-page";

const description = "理想三旬 HeyDusk 的独立产品目录：Mimi 育儿助理、Momo 英语学习、FrameForge / 小片场视频创作；列明当前阶段与咨询方式。";

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
