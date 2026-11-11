"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Locale } from "../i18n";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribe(listener: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
function prefersReduced() { return window.matchMedia(motionQuery).matches; }
function staticOnServer() { return true; }

/** One observer for three cover illustrations. No animation loops or scroll handlers. */
export function WorldMotionControl({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribe, prefersReduced, staticOnServer);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-world-motion]"));
    const visible = new Set<Element>();
    const update = () => nodes.forEach(node => {
      node.dataset.running = String(!paused && !reduced && !document.hidden && visible.has(node));
    });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      update();
    }, { threshold: 0.05 });
    nodes.forEach(node => observer.observe(node));
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      nodes.forEach(node => { node.dataset.running = "false"; });
    };
  }, [paused, reduced]);

  return <button className="world-motion-control" type="button" disabled={reduced} aria-pressed={!paused && !reduced} onClick={() => setPaused(value => !value)}>
    <span className="world-motion-glyph" aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span>
    {reduced ? (locale === "zh" ? "静态画面 · 跟随系统" : "Still images · system preference") : paused ? (locale === "zh" ? "播放画面动效" : "Play scene motion") : (locale === "zh" ? "暂停画面动效" : "Pause scene motion")}
  </button>;
}
