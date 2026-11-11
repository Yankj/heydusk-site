import Image from "next/image";
import type { Locale } from "../i18n";
import "./product-cover.css";

type ProductCoverId = "mimi" | "momo" | "frameforge";

/** Editorial still lifes, not product screenshots or representations of shipped UI. */
function MimiCover() {
  return (
    <div className="product-cover-stage product-cover-stage--mimi">
      <span className="mimi-cover-sun" />
      <div className="mimi-cover-note">
        <span>today</span>
        <i /><i /><i />
      </div>
      <div className="mimi-cover-paper mimi-cover-paper--back" />
      <div className="mimi-cover-paper mimi-cover-paper--front">
        <span className="mimi-cover-binding" />
        <Image className="mimi-cover-mark" src="/mimi/mimi-mark.svg" alt="" width={154} height={154} unoptimized />
        <span className="mimi-cover-name">mimi</span>
        <span className="mimi-cover-rule" />
      </div>
      <span className="mimi-cover-pencil" />
    </div>
  );
}

function MomoCover() {
  return (
    <div className="product-cover-stage product-cover-stage--momo">
      <span className="momo-cover-orbit" />
      <div className="momo-cover-book">
        <span className="momo-cover-book-line" />
        <span>b</span>
      </div>
      <div className="momo-cover-card">
        <span className="momo-cover-card-corner">Aa</span>
        <span className="momo-cover-letter">a</span>
        <span className="momo-cover-word">apple</span>
      </div>
      <div className="momo-cover-apple"><span /><i /></div>
      <span className="momo-cover-name">momo</span>
    </div>
  );
}

/** One scene interpreted as a pencil storyboard and a finished cinematic frame. */
function FilmScene({ sketch = false }: { sketch?: boolean }) {
  return (
    <svg className={sketch ? "film-scene film-scene--sketch" : "film-scene"} viewBox="0 0 320 180" fill="none" focusable="false" aria-hidden="true">
      <rect width="320" height="180" fill={sketch ? "#ede8da" : "#b6b7a0"} />
      <circle cx="224" cy="53" r="28" fill={sketch ? "none" : "#f4d8a0"} stroke={sketch ? "#999584" : "none"} strokeWidth="1.2" />
      <path d="M0 101L53 58L119 109L167 77L232 111L286 76L320 101V180H0Z" fill={sketch ? "none" : "#788473"} stroke={sketch ? "#aaa693" : "none"} />
      <path d="M0 129C44 110 76 122 115 128C162 137 192 103 230 109C267 115 292 135 320 121V180H0Z" fill={sketch ? "none" : "#46594e"} stroke={sketch ? "#777c6b" : "none"} />
      <path d="M164 123L190 124L243 180H132Z" fill={sketch ? "none" : "#bcad86"} stroke={sketch ? "#a29b87" : "none"} />
      <path d="M0 156C67 142 107 148 151 165L131 180H0ZM213 155C250 138 285 142 320 148V180H241Z" fill={sketch ? "none" : "#293d36"} stroke={sketch ? "#777c6b" : "none"} />
      <circle cx="181" cy="116" r="3.3" fill={sketch ? "#6c7261" : "#25352d"} />
      <path d="M177.8 121L184.2 121L186 137H176Z" fill={sketch ? "#6c7261" : "#25352d"} />
      <path d="M179 135L178 145M183 135L184 145" stroke={sketch ? "#6c7261" : "#25352d"} strokeWidth="2" />
      {sketch && <path d="M14 15H78M14 20H48M253 158L285 145M281 145H285V150" stroke="#aaa18d" strokeWidth="1" />}
    </svg>
  );
}

function FrameForgeCover() {
  return (
    <div className="product-cover-stage product-cover-stage--frameforge">
      <span className="frameforge-cover-guide" />
      <div className="frameforge-cover-board">
        <span className="frameforge-cover-board-label">Storyboard</span>
        <FilmScene sketch />
        <span className="frameforge-cover-pencil-line" />
        <span className="frameforge-cover-pencil-line frameforge-cover-pencil-line--short" />
      </div>
      <div className="frameforge-cover-film">
        <span className="frameforge-cover-perfs frameforge-cover-perfs--top" />
        <FilmScene />
        <span className="frameforge-cover-perfs frameforge-cover-perfs--bottom" />
      </div>
      <Image className="frameforge-cover-mark" src="/frameforge/mark-mono.svg" alt="" width={28} height={28} unoptimized />
    </div>
  );
}

export function ProductCover({ product, locale }: { product: ProductCoverId; locale: Locale }) {
  return (
    <div className={`product-cover product-cover--${product}`}>
      {product === "mimi" ? <MimiCover /> : product === "momo" ? <MomoCover /> : <FrameForgeCover />}
      <span className="visual-caption product-cover-caption">
        {product === "mimi"
          ? (locale === "zh" ? "小咪 · 家庭日常" : "Mimi · family life")
          : (locale === "zh" ? "工作流示意" : "Workflow illustration")}
      </span>
    </div>
  );
}
