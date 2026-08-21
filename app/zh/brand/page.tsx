import type { Metadata } from "next";
import { localeAlternates } from "../../i18n";
import { BrandPageView } from "../../views/brand-page";

const description = "了解 HeyDusk 背后的品牌理念、工作原则与“最后一束光”视觉识别。";

export const metadata: Metadata = {
  title: "品牌",
  description,
  alternates: localeAlternates("zh", "/brand"),
  openGraph: { title: "品牌 — HeyDusk", description, images: [] },
  twitter: { title: "品牌 — HeyDusk", description, images: [] },
};

export default function ChineseBrandPage() {
  return <BrandPageView locale="zh" />;
}
