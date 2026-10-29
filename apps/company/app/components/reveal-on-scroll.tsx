"use client";

import { useEffect } from "react";

/** Lightweight scroll narrative: marks [data-reveal] elements when they enter view. Respects prefers-reduced-motion. */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("reveal-ready");
      document.querySelectorAll("[data-reveal]").forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }
    root.classList.add("reveal-ready");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.18 },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
  return null;
}
