import type { Metadata } from "next";
import { localeAlternates } from "../../../i18n";
import { CatPageView } from "../../../views/cat-page";

const description = "cat 记住孩子的一切，一件不落。iOS 内测中。";

export const metadata: Metadata = {
  title: "cat · 家庭事务助理",
  description,
  alternates: localeAlternates("zh", "/products/cat"),
  openGraph: { title: "cat · 家庭事务助理 — HeyDusk", description, images: [] },
  twitter: { title: "cat · 家庭事务助理 — HeyDusk", description, images: [] },
};

export default function Page() {
  return <CatPageView locale="zh" />;
}
