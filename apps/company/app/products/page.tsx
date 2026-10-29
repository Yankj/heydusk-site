import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { ProductsPageView } from "../views/products-page";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Independent products from HeyDusk: Mimi for family life, Momo for English learning, FrameForge / 小片场 for video creators, and Ferry Dock / 渡口 for sending text from phone to computer. Current stages and entry points.",
  alternates: localeAlternates("en", "/products"),
  openGraph: {
    title: "Products — HeyDusk",
    description:
      "Independent products from HeyDusk: Mimi for family life, Momo for English learning, FrameForge / 小片场 for video creators, and Ferry Dock / 渡口 for sending text from phone to computer. Current stages and entry points.",
    images: [],
  },
  twitter: {
    title: "Products — HeyDusk",
    description:
      "Independent products from HeyDusk: Mimi for family life, Momo for English learning, FrameForge / 小片场 for video creators, and Ferry Dock / 渡口 for sending text from phone to computer. Current stages and entry points.",
    images: [],
  },
};

export default function ProductsPage() {
  return <ProductsPageView locale="en" />;
}
