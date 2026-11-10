type Drift = {
  x: string;
  delay: string;
  duration: string;
  drift: string;
  spin: string;
  size: string;
  tint?: string;
};

function marks(items: Drift[], className: string) {
  return items.map((item, index) => (
    <i
      className={className}
      key={`${className}-${index}`}
      style={{
        left: item.x,
        animationDelay: item.delay,
        animationDuration: item.duration,
        ["--drift" as string]: item.drift,
        ["--spin" as string]: item.spin,
        width: item.size,
        height: `calc(${item.size} * 0.72)`,
        ...(item.tint ? { ["--tint" as string]: item.tint } : {}),
      }}
    />
  ));
}

const guiyuanSmoke = [
  { delay: "0s", duration: "8.5s", drift: "14px", scale: "1.15" },
  { delay: "1.6s", duration: "9.4s", drift: "22px", scale: "1.35" },
  { delay: "3.2s", duration: "8.8s", drift: "8px", scale: "1.2" },
  { delay: "4.8s", duration: "10s", drift: "26px", scale: "1.45" },
  { delay: "6.1s", duration: "9.1s", drift: "16px", scale: "1.25" },
];

const taoyuanSmoke = [
  { delay: "0.4s", duration: "10s", drift: "10px", scale: "1.1" },
  { delay: "3.5s", duration: "11s", drift: "16px", scale: "1.2" },
  { delay: "6.6s", duration: "10.4s", drift: "7px", scale: "1.05" },
];

const guiyuanLeaves: Drift[] = [
  { x: "6%", delay: "0s", duration: "13s", drift: "36px", spin: "210deg", size: "9px", tint: "#8a9a4a" },
  { x: "18%", delay: "2.4s", duration: "15s", drift: "48px", spin: "260deg", size: "8px", tint: "#c4a45a" },
  { x: "28%", delay: "5.1s", duration: "12.5s", drift: "24px", spin: "190deg", size: "7px", tint: "#6f7d3d" },
  { x: "72%", delay: "1.3s", duration: "14s", drift: "40px", spin: "240deg", size: "8px", tint: "#9aaa55" },
  { x: "86%", delay: "6.8s", duration: "13.5s", drift: "22px", spin: "200deg", size: "7px", tint: "#c09a48" },
  { x: "58%", delay: "8.2s", duration: "16s", drift: "32px", spin: "230deg", size: "6px", tint: "#7d8c44" },
];

const caijuLeaves: Drift[] = [
  { x: "8%", delay: "0s", duration: "11s", drift: "54px", spin: "280deg", size: "11px", tint: "#d06a28" },
  { x: "16%", delay: "1.2s", duration: "13s", drift: "40px", spin: "240deg", size: "9px", tint: "#e09a3a" },
  { x: "24%", delay: "2.8s", duration: "10.5s", drift: "62px", spin: "310deg", size: "10px", tint: "#c44a1c" },
  { x: "38%", delay: "0.7s", duration: "14s", drift: "28px", spin: "200deg", size: "8px", tint: "#e8b45a" },
  { x: "52%", delay: "3.6s", duration: "12s", drift: "46px", spin: "260deg", size: "9px", tint: "#d47830" },
  { x: "66%", delay: "1.9s", duration: "13.5s", drift: "36px", spin: "220deg", size: "8px", tint: "#c85c20" },
  { x: "78%", delay: "4.4s", duration: "11.5s", drift: "50px", spin: "300deg", size: "10px", tint: "#e0a040" },
  { x: "88%", delay: "6s", duration: "15s", drift: "24px", spin: "190deg", size: "7px", tint: "#b84818" },
  { x: "12%", delay: "7.2s", duration: "12.2s", drift: "58px", spin: "270deg", size: "9px", tint: "#da8030" },
  { x: "44%", delay: "8.5s", duration: "13.8s", drift: "42px", spin: "250deg", size: "8px", tint: "#efc56a" },
  { x: "70%", delay: "5.5s", duration: "14.4s", drift: "30px", spin: "215deg", size: "7px", tint: "#c96a24" },
  { x: "32%", delay: "9.4s", duration: "11.8s", drift: "48px", spin: "290deg", size: "10px", tint: "#e09032" },
];

const taoyuanPetals: Drift[] = [
  { x: "4%", delay: "0s", duration: "12s", drift: "48px", spin: "200deg", size: "8px", tint: "#f2b6c4" },
  { x: "11%", delay: "1.5s", duration: "14s", drift: "36px", spin: "240deg", size: "7px", tint: "#e89aaa" },
  { x: "22%", delay: "3.2s", duration: "11.5s", drift: "52px", spin: "180deg", size: "6px", tint: "#f6c8d0" },
  { x: "48%", delay: "0.8s", duration: "13s", drift: "30px", spin: "220deg", size: "7px", tint: "#eea8b6" },
  { x: "63%", delay: "2.4s", duration: "15s", drift: "44px", spin: "260deg", size: "8px", tint: "#f3b0be" },
  { x: "86%", delay: "4.1s", duration: "12.6s", drift: "28px", spin: "190deg", size: "7px", tint: "#e890a4" },
  { x: "94%", delay: "6.3s", duration: "13.4s", drift: "38px", spin: "230deg", size: "6px", tint: "#f8d0d6" },
  { x: "36%", delay: "7.7s", duration: "14.2s", drift: "42px", spin: "210deg", size: "7px", tint: "#f0a8b8" },
  { x: "74%", delay: "5.6s", duration: "11.8s", drift: "34px", spin: "250deg", size: "6px", tint: "#eaa0b0" },
  { x: "17%", delay: "9s", duration: "13.8s", drift: "50px", spin: "200deg", size: "8px", tint: "#f4c0c8" },
];

export function YushengCoverFx({ worldId }: { worldId: string }) {
  return (
    <span className={`yusheng-fx yusheng-fx--${worldId}`} aria-hidden="true">
      {worldId === "guiyuan"
        ? guiyuanSmoke.map((puff, index) => (
            <i
              className="yusheng-smoke"
              key={`smoke-${index}`}
              style={{
                animationDelay: puff.delay,
                animationDuration: puff.duration,
                ["--drift" as string]: puff.drift,
                ["--scale" as string]: puff.scale,
              }}
            />
          ))
        : null}
      {worldId === "taoyuan"
        ? taoyuanSmoke.map((puff, index) => (
            <i
              className="yusheng-smoke yusheng-smoke--far"
              key={`smoke-${index}`}
              style={{
                animationDelay: puff.delay,
                animationDuration: puff.duration,
                ["--drift" as string]: puff.drift,
                ["--scale" as string]: puff.scale,
              }}
            />
          ))
        : null}
      {worldId === "guiyuan" ? marks(guiyuanLeaves, "yusheng-leaf") : null}
      {worldId === "caiju" ? marks(caijuLeaves, "yusheng-leaf") : null}
      {worldId === "taoyuan" ? marks(taoyuanPetals, "yusheng-petal") : null}
    </span>
  );
}
