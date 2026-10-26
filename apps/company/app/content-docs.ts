import type { DocContent } from "./views/doc-page";
import type { Locale } from "./i18n";

// Existing contact entry; mailbox delivery is not verified by local site checks.
export const CONTACT_EMAIL = "hello@heydusk.com";

const draftEn = "DRAFT — placeholder text for review. Not yet legally reviewed and not in effect.";
const draftZh = "草案：以下为待审阅的占位文本，尚未经过法律审核，暂不生效。";

export const docs: Record<string, Record<Locale, DocContent>> = {
  about: {
    en: {
      eyebrow: "About",
      title: "理想三旬 · HeyDusk",
      intro: "A small, independent AI product company working across family life, learning, and creative expression.",
      sections: [
        { heading: "Who we are", body: ["HeyDusk / 理想三旬 is the parent brand behind our independent products. We work from product research and interaction design through engineering. Legal entity details will be stated separately when confirmed."] },
        { heading: "Three directions", body: ["Family & life: mimi / 小咪, focused on parents’ daily arrangements and children’s long-term growth.", "Learning & growth: Momo, exploring parent-guided English learning.", "Creation & expression: FrameForge / 小片场, a video creation product for creators. Its current content brief focuses on science for ages 3–8.", "These directions can overlap. They organize our work; each product keeps its own audience, workflow and delivery form."] },
        { heading: "How we work", body: ["Start with a concrete need and keep the product focused.", "Describe implemented, unverified and planned capabilities clearly.", "Each product defines its own data handling and user controls. Product-specific statements are not a shared privacy policy."] },
        { heading: "The name", body: ["Dusk is the moment one state becomes another. We build for that transition: turning new capabilities into useful tools for daily life, learning, and making things."] },
      ],
    },
    zh: {
      eyebrow: "关于我们",
      title: "理想三旬 · HeyDusk",
      intro: "一家小而独立的 AI 产品公司，围绕家庭生活、学习成长与创作表达展开。",
      sections: [
        { heading: "我们是谁", body: ["HeyDusk / 理想三旬是独立产品背后的母品牌。我们从产品研究、交互设计做到工程实现。法律主体信息将在确认后另行说明。"] },
        { heading: "三个方向", body: ["家庭与生活：mimi / 小咪，围绕家长的今日安排与孩子的长期成长。", "学习与成长：Momo，探索由家长陪伴的英语学习。", "创作与表达：FrameForge / 小片场，服务创作者的视频创作产品，当前内容配置重点是面向 3–8 岁儿童的科普。", "方向可以交叉，用来组织工作；每款产品保留自己的使用者、流程与交付形态。"] },
        { heading: "做事方式", body: ["从具体需要出发，让产品有清楚的用途。", "分清已实现、待验证与规划中的能力。", "各产品分别说明数据处理与用户控制；具体产品的承诺不自动成为共同隐私政策。"] },
        { heading: "名字的由来", body: ["暮色是一个状态走向另一个状态的时刻。我们为这个过渡而做：让新的能力成为生活、学习与创作中用得上的工具。"] },
      ],
    },
  },
  contact: {
    en: {
      eyebrow: "Contact",
      title: "Get in touch.",
      intro: "For product questions, partnerships, press, or privacy requests, use our existing email contact.",
      sections: [
        { heading: "Email", body: [CONTACT_EMAIL] },
        { heading: "Product enquiries", body: ["Please name the product you are asking about: mimi, Momo, or FrameForge / 小片场. Access and supported workflows depend on each product’s current stage; an enquiry does not reserve a beta place."] },
        { heading: "Privacy requests", body: ["Name the relevant product and the type of request. Please do not include children’s records or sensitive account information in your initial email."] },
      ],
    },
    zh: {
      eyebrow: "联系我们",
      title: "期待你的来信。",
      intro: "产品咨询、商务合作、媒体或隐私相关请求，可使用现有邮件联系入口。",
      sections: [
        { heading: "邮箱", body: [CONTACT_EMAIL] },
        { heading: "产品咨询", body: ["请说明你关注的是 mimi、Momo 还是 FrameForge / 小片场。体验方式和可用流程以各产品阶段为准，来信不等于已获得内测名额。"] },
        { heading: "隐私请求", body: ["请注明相关产品与请求类型；首次来信请勿附上儿童记录或敏感账号信息。"] },
      ],
    },
  },
  privacy: {
    en: {
      eyebrow: "Legal",
      title: "Privacy Policy (draft)",
      intro: "A draft for the HeyDusk company website. Product-specific notices must be reviewed separately.",
      notice: draftEn,
      sections: [
        { heading: "1. Scope", body: ["This placeholder concerns heydusk.com. It is not a common policy for mimi, Momo or FrameForge / 小片场; family and children’s data statements belong to the relevant product."] },
        { heading: "2. Website and contact data", body: ["[To be confirmed: hosting logs, any cookies or analytics, email handling, purposes, retention and deletion process.]"] },
        { heading: "3. Providers and user requests", body: ["[To be confirmed: responsible legal entity, processors, data locations, applicable rights and request process.]"] },
        { heading: "4. Product notices", body: ["Each product must describe its actual data flows and available controls before making an effective policy. This draft does not establish legal compliance or additional product capabilities."] },
        { heading: "5. Contact", body: [CONTACT_EMAIL] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "隐私政策（草案）",
      intro: "HeyDusk 公司网站的草案；各产品的数据说明须分别核对与审核。",
      notice: draftZh,
      sections: [
        { heading: "一、适用范围", body: ["此占位草案仅针对 heydusk.com，不是 mimi、Momo 或 FrameForge / 小片场的共同政策。家庭与儿童数据的说明属于相关产品。"] },
        { heading: "二、网站与联系数据", body: ["【待确认：托管日志、Cookie 或统计工具、邮件处理、用途、保留期限与删除流程】"] },
        { heading: "三、处理方与用户请求", body: ["【待确认：责任法律主体、处理方、数据所在地、适用权利与请求流程】"] },
        { heading: "四、产品说明", body: ["各产品须根据实际数据流与可用控制分别形成并审核政策。本草案不代表法律合规结论，也不表示新增产品能力。"] },
        { heading: "五、联系方式", body: [CONTACT_EMAIL] },
      ],
    },
  },
  terms: {
    en: {
      eyebrow: "Legal",
      title: "Terms of Service (draft)",
      intro: "Draft terms for heydusk.com, separate from individual product terms.",
      notice: draftEn,
      sections: [
        { heading: "1. Website information", body: ["This website introduces the parent brand and its product catalog. Product stages are dated summaries and do not grant access or promise availability."] },
        { heading: "2. Product terms", body: ["Access, supported hosts, data handling and responsibilities must be stated by each product. This website does not supply a common product service agreement."] },
        { heading: "3. Provider", body: ["[To be confirmed and legally reviewed: legal entity name, registered address and governing law.]"] },
        { heading: "4. Contact", body: [CONTACT_EMAIL] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "服务条款（草案）",
      intro: "heydusk.com 的条款草案，与各产品的条款分别处理。",
      notice: draftZh,
      sections: [
        { heading: "一、网站信息", body: ["本网站介绍母品牌与产品目录。产品阶段是注明日期的摘要，不授予使用权限或承诺可用性。"] },
        { heading: "二、产品条款", body: ["体验权限、支持宿主、数据处理和使用责任由各产品分别说明；本站不提供共同的产品服务协议。"] },
        { heading: "三、服务提供方", body: ["【待确认并经法律审核：主体名称、注册地址、适用法律】"] },
        { heading: "四、联系方式", body: [CONTACT_EMAIL] },
      ],
    },
  },
};
