// Public summaries only; product contracts and acceptance stay in product repos.
// Sources and review scope: docs/brand-product-system.md.
export const catalogReviewedOn = "2026-10-26";

export const products = [
  {
    id: "mimi",
    name: "mimi / 小咪",
    href: "https://mimi.heydusk.com",
    sourceHref: "https://github.com/Yankj/mimi/blob/db41ad37a8e528283fcef876623cd363c88e3618/docs/acceptance/family-companion/interaction-natural-input-v0.5.md",
    en: {
      direction: "Family & life",
      description: "A parenting companion for today's arrangements and long-term growth. Parents confirm arrangements and keep goals, completions and observations together.",
      stage: "iOS in development · local-first core",
      boundary: "Text entry currently uses local Chinese rules. Photos, voice, long-term memory and family sync are still planned; current-device and real-family acceptance remain open.",
      action: "Visit the mimi product site",
      source: "Source: current parenting interaction acceptance record",
    },
    zh: {
      direction: "家庭与生活",
      description: "围绕今日安排与长期成长的育儿助理。由家长确认安排，把目标、完成记录与观察放在一起回看。",
      stage: "iOS 开发中 · 本机核心流程",
      boundary: "当前文字输入使用本地中文规则；图片、语音、长期记忆与家庭同步仍待推进，同版真机和真实家庭验收尚未完成。",
      action: "查看小咪产品站",
      source: "来源：育儿交互验收记录",
    },
  },
  {
    id: "momo",
    name: "Momo",
    href: "https://word-island.kunjie-yan.chatgpt.site/",
    sourceHref: null,
    en: {
      direction: "Learning & growth",
      description: "Parent-guided English learning through a persistent classroom canvas. The ChatGPT + MCP classroom design contains 36 lessons; a separate web experience contains 48 activities.",
      stage: "In development / exploration",
      boundary: "The web experience is a separate entry. It does not establish MCP release, every-host compatibility, pronunciation assessment or multi-family service availability.",
      action: "View the separate web experience (48 activities)",
      source: "Source: private product documentation, checked by the maintainer",
    },
    zh: {
      direction: "学习与成长",
      description: "由家长陪伴的英语学习产品，以持久课堂画布组织学习。ChatGPT + MCP 课堂设计为 36 节；另有独立网页的 48 节活动。",
      stage: "开发探索中",
      boundary: "网页是独立入口，不代表 MCP 课堂已发布、所有宿主已验证，也不代表已支持真实发音评测或多家庭服务。",
      action: "查看独立网页（48 节活动）",
      source: "来源：维护者核对的私有产品文档",
    },
  },
  {
    id: "frameforge",
    name: "FrameForge / 小片场",
    href: "mailto:hello@heydusk.com?subject=FrameForge%20enquiry",
    sourceHref: null,
    en: {
      direction: "Creation & expression",
      description: "A video creation product for creators. Its current Codex plugin workflow uses persistent projects and the host browser, with science videos for ages 3–8 as the default content brief.",
      stage: "Codex plugin v0.2.2 · separate web experiments",
      boundary: "Children are the current content audience. The plugin and experimental web interface have separate workflows; this is not a one-click hosted production service.",
      action: "Ask about the plugin",
      source: "Source: private plugin README and version manifest, checked by the maintainer",
    },
    zh: {
      direction: "创作与表达",
      description: "面向创作者的视频创作产品。当前主线是 Codex 插件、持久工程与宿主浏览器，默认内容配置为面向 3–8 岁儿童的科普视频。",
      stage: "Codex 插件 v0.2.2 · Web 实验另列",
      boundary: "儿童是当前内容受众，使用者是创作者。插件与实验 Web 界面各有流程，尚不代表一键托管制作服务。",
      action: "咨询插件体验",
      source: "来源：维护者核对的私有插件说明与版本清单",
    },
  },
] as const;
