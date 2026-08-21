import Image from "next/image";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { localeLanguageTag, type Locale } from "../i18n";

const content = {
  en: {
    eyebrow: "The brand",
    title: "Dusk is a threshold, not an ending.",
    intro:
      "HeyDusk takes its name from the moment between known and unknown—when one state gives way to another and the next shape begins to appear.",
    markAlt: "HeyDusk Last Light symbol",
    markName: "Last Light",
    markTitle: "One calm form. One continuous trace of light.",
    markCopy: [
      "The symbol begins with a stable D. A ribbon of twilight and afterglow passes through it in one uninterrupted gesture—holding transition, direction, and a little warmth without illustrating a literal sunset.",
      "In black and white, the ribbon becomes a cut. In digital spaces, it becomes HeyDusk’s quiet signature.",
    ],
    principlesLabel: "Working principles",
    principles: [
      ["Useful before impressive", "Utility is the first proof of an idea."],
      [
        "Clarity through design",
        "Design should make the product easier to understand, not harder to notice.",
      ],
      [
        "Built for real life",
        "A product is finished by the context in which someone actually uses it.",
      ],
    ],
    colorsLabel: "HeyDusk brand colors",
    colors: ["Ink", "Twilight", "Ember", "Afterglow"],
  },
  zh: {
    eyebrow: "品牌",
    title: "暮色是一道门槛，而不是终点。",
    intro:
      "HeyDusk 得名于已知与未知之间的那个时刻：一个状态让位于另一个状态，下一种形态开始显现。",
    markAlt: "HeyDusk 最后一束光标志",
    markName: "最后一束光",
    markTitle: "一个平静的形体，一条连续的微光。",
    markCopy: [
      "标志从一个稳定的 D 开始。一条暮色与余晖组成的光带，以不间断的动作从中穿过；它保存了过渡、方向和一点温度，却没有直接描画一轮夕阳。",
      "在黑白环境中，光带成为一道切口；在数字空间里，它成为 HeyDusk 安静而明确的签名。",
    ],
    principlesLabel: "工作原则",
    principles: [
      ["先有用，再惊艳", "实用性是一个想法最先需要给出的证明。"],
      ["用设计带来清晰", "设计应该让产品更容易被理解，而不是更费力地被注意。"],
      ["为真实生活而构建", "一个产品最终由人们真正使用它的情境来完成。"],
    ],
    colorsLabel: "HeyDusk 品牌色",
    colors: ["墨色", "暮光", "余烬", "余晖"],
  },
};

export function BrandPageView({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <main lang={localeLanguageTag[locale]}>
      <SiteHeader locale={locale} currentPath="/brand" />
      <section className="page-hero brand-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.intro}</p>
      </section>

      <section className="page-section mark-story">
        <div className="mark-stage">
          <Image src="/heydusk-mark.svg" alt={copy.markAlt} width={512} height={512} unoptimized />
        </div>
        <div className="mark-copy">
          <p className="section-index">{copy.markName}</p>
          <h2>{copy.markTitle}</h2>
          {copy.markCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="page-section principle-section">
        <p className="section-index">{copy.principlesLabel}</p>
        <div className="principle-grid">
          {copy.principles.map(([title, description], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-colors" aria-label={copy.colorsLabel}>
        {copy.colors.map((color, index) => (
          <div className={`swatch ${["swatch-ink", "swatch-twilight", "swatch-ember", "swatch-afterglow"][index]}`} key={color}>
            <span>{color}</span>
          </div>
        ))}
      </section>
      <SiteFooter locale={locale} />
    </main>
  );
}
