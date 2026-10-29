import type { Locale } from "./i18n";
import type { ProductId } from "./product-catalog";

/** Prefer the locale's primary name; keep the other as a quiet secondary label. */
export const productDisplay: Record<
  ProductId,
  { en: { primary: string; secondary?: string }; zh: { primary: string; secondary?: string } }
> = {
  mimi: {
    en: { primary: "Mimi", secondary: "小咪" },
    zh: { primary: "小咪", secondary: "Mimi" },
  },
  momo: {
    en: { primary: "Momo" },
    zh: { primary: "Momo" },
  },
  frameforge: {
    en: { primary: "FrameForge", secondary: "小片场" },
    zh: { primary: "小片场", secondary: "FrameForge" },
  },
  "ferry-dock": {
    en: { primary: "Ferry Dock", secondary: "渡口" },
    zh: { primary: "渡口", secondary: "Ferry Dock" },
  },
};

export function formatProductName(id: ProductId, locale: Locale, mode: "short" | "full" = "short"): string {
  const names = productDisplay[id][locale];
  if (mode === "full" && names.secondary) return `${names.primary} / ${names.secondary}`;
  return names.primary;
}

export function productNameParts(id: ProductId, locale: Locale) {
  return productDisplay[id][locale];
}
