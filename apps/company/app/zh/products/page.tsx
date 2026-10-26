import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { ProductsPageView } from "../../views/products-page";

const description = "理想三旬 HeyDusk 的独立产品目录：mimi 育儿助理、Momo 英语学习、FrameForge / 小片场视频创作；列明实际阶段与已有入口。";

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
