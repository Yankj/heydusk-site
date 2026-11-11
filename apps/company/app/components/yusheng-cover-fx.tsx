import type { CSSProperties } from "react";
import "./yusheng-cover-fx.css";

const scenes = {
  taoyuan: { smoke: { x: "24%", y: "24%", size: ".8%" }, particles: 5, kind: "petal", fog: true },
  guiyuan: { smoke: { x: "44.4%", y: "23.2%", size: "1.7%" }, particles: 2, kind: "leaf", fog: false },
  caiju: { smoke: null, particles: 7, kind: "leaf", fog: true },
} as const;

/** Coordinates map to the uncropped 16:9 original, not to the surrounding card. */
export function YushengCoverFx({ worldId }: { worldId: string }) {
  const scene = scenes[worldId as keyof typeof scenes];
  if (!scene) return null;
  return (
    <span className={`world-atmosphere world-atmosphere--${worldId}`} data-world-motion data-running="false" aria-hidden="true">
      {scene.smoke && Array.from({ length: 3 }, (_, i) => <i key={`smoke-${i}`} className="world-smoke" style={{ left: scene.smoke.x, top: scene.smoke.y, width: scene.smoke.size, "--phase": `${-i * 3.3}s` } as CSSProperties} />)}
      {scene.fog && <i className="world-mist" />}
      {Array.from({ length: scene.particles }, (_, i) => <i key={`drift-${i}`} className={`world-drift world-drift--${scene.kind}`} style={{ left: `${8 + (i * 17) % 82}%`, "--phase": `${-i * 3.7}s`, "--duration": `${16 + i * 1.7}s`, "--travel": `${22 + (i % 3) * 13}px`, "--turn": `${150 + i * 32}deg`, "--size": `${4 + i % 3}px` } as CSSProperties} />)}
    </span>
  );
}
