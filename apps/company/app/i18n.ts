import type { Metadata } from "next";

export type Locale = "en" | "zh";

export const localeLanguageTag: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

export function localizedPath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  if (path === "/") return "/zh";
  return `/zh${path}`;
}

export function localeAlternates(
  locale: Locale,
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localizedPath(locale, path),
    languages: {
      en: localizedPath("en", path),
      "zh-CN": localizedPath("zh", path),
      "x-default": localizedPath("en", path),
    },
  };
}
