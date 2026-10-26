"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Locale } from "../i18n";

type Theme = "light" | "dark";

const themeStorageKey = "heydusk-theme";

const themeListeners = new Set<() => void>();
let inMemoryTheme: Theme | null = null;

const copy = {
  en: {
    light: "Switch to day mode",
    dark: "Switch to night mode",
  },
  zh: {
    light: "切换至日间模式",
    dark: "切换至夜间模式",
  },
};

export function ThemeToggle({ locale = "en" }: { locale?: Locale }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  function changeTheme() {
    persistTheme(nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={copy[locale][nextTheme]}
      onClick={changeTheme}
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
    </button>
  );
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : inMemoryTheme;
  } catch {
    return inMemoryTheme;
  }
}

function getThemeSnapshot(): Theme {
  const storedTheme = getStoredTheme();
  if (storedTheme) return storedTheme;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(listener: () => void) {
  themeListeners.add(listener);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = () => {
    if (!getStoredTheme()) listener();
  };

  mediaQuery.addEventListener("change", handleSystemThemeChange);
  return () => {
    themeListeners.delete(listener);
    mediaQuery.removeEventListener("change", handleSystemThemeChange);
  };
}

function persistTheme(theme: Theme) {
  inMemoryTheme = theme;
  document.documentElement.dataset.theme = theme;
  try { window.localStorage.setItem(themeStorageKey, theme); } catch { /* Theme still works for this page when storage is unavailable. */ }
  themeListeners.forEach((listener) => listener());
}
