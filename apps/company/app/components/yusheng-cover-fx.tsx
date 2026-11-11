import type { CSSProperties } from "react";
import "./yusheng-cover-fx.css";

const scenes = {
  taoyuan: { smoke: { x: "24%", y: "24%", size: ".8%" }, particles: 5, kind: "petal", fog: true },
  guiyuan: { smoke: { x: "44.4%", y: "23.2%", size: "1.7%" }, particles: 2, kind: "leaf", fog: false },
  caiju: { smoke: null, particles: 0, kind: "leaf", fog: true },
} as const;

/** Coordinates map to the uncropped 16:9 original, not to the surrounding card. */
export function YushengCoverFx({ worldId }: { worldId: string }) {
  const scene = scenes[worldId as keyof typeof scenes];
  if (!scene) return null;
  return (
    <span className={`world-atmosphere world-atmosphere--${worldId}`} data-world-motion data-running="false" aria-hidden="true">
      {scene.smoke && Array.from({ length: 5 }, (_, i) => <i key={`smoke-${i}`} className="world-smoke" style={{ left: scene.smoke.x, top: scene.smoke.y, width: scene.smoke.size, "--phase": `${-i * 2.4}s` } as CSSProperties} />)}
      {scene.fog && <i className="world-mist" />}
      {worldId === "taoyuan" && <span className="world-water" aria-hidden="true"><i /><i /><i /></span>}
      {worldId === "guiyuan" && <span className="world-hen-scene"><span className="world-hen-ground" /><span className="world-hen"><span /></span></span>}
      {worldId === "caiju" && <>
        {[[965, 120], [1028, 104], [1088, 71], [1116, 49], [1142, 84]].map(([x, y], i) => <span key={`sky-${i}`} className="world-sky-detail" style={{ left: `${(x - 22) / 12.8}%`, top: `${(y - 22) / 7.2}%`, "--sky-patch": `url('/yusheng/caiju-sky-${i}.webp')`, "--phase": `${-i * 3.1}s`, "--duration": `${17 + i * 1.9}s`, "--leaf-angle": `${i * 57}deg` } as CSSProperties}><span className="world-sky-patch" /><span className="world-painted-leaf" /></span>)}
        <span className="world-lantern" aria-hidden="true" />
      </>}
      {Array.from({ length: scene.particles }, (_, i) => <i key={`drift-${i}`} className={`world-drift world-drift--${scene.kind}`} style={{ left: `${8 + (i * 17) % 82}%`, "--phase": `${-i * 3.7}s`, "--duration": `${16 + i * 1.7}s`, "--travel": `${22 + (i % 3) * 13}px`, "--turn": `${150 + i * 32}deg`, "--size": `${4 + i % 3}px` } as CSSProperties} />)}
    </span>
  );
}
