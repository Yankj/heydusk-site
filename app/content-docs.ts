import type { DocContent } from "./views/doc-page";
import type { Locale } from "./i18n";

// PLACEHOLDER: confirm this mailbox exists on heydusk.com before launch.
export const CONTACT_EMAIL = "hello@heydusk.com";

const draftEn = "DRAFT — placeholder text for review. Not yet legally reviewed and not in effect.";
const draftZh = "草案：以下为待审阅的占位文本，尚未经过法律审核，暂不生效。";

export const docs: Record<string, Record<Locale, DocContent>> = {
  about: {
    en: {
      eyebrow: "About",
      title: "理想三旬 · HeyDusk",
      intro: "We are a small, independent product company building AI software for family life.",
      sections: [
        { heading: "Who we are", body: ["HeyDusk is the brand of 理想三旬, a company currently being registered in China. We design and build our products end to end: research, interaction design, engineering, and operations."] },
        { heading: "Mission", body: ["To take the everyday mental load off families — school notices, appointments, the small things each child needs — and hold it reliably, so people can give their attention to each other."] },
        { heading: "How we work", body: ["Confirm before acting: our software proposes and people decide.", "Restraint: fewer, better-timed notifications, with quiet hours by default.", "Privacy by design: family and children’s information can be viewed, corrected, and deleted at any time."] },
        { heading: "The name", body: ["Dusk is the moment one state becomes another. We build for that transition — the point where a new capability becomes something a family can actually rely on."] },
      ],
    },
    zh: {
      eyebrow: "关于我们",
      title: "理想三旬 · HeyDusk",
      intro: "我们是一家小而独立的产品公司，用 AI 为家庭生活打造软件。",
      sections: [
        { heading: "我们是谁", body: ["HeyDusk 是理想三旬的品牌，公司目前正在中国办理注册。我们自主完成产品的全部环节：调研、交互设计、工程开发与运营。"] },
        { heading: "使命", body: ["把家庭日常的琐碎负担接过来，学校通知、看病预约、孩子需要的每一件小事，都稳稳记住，让家人把注意力留给彼此。"] },
        { heading: "做事方式", body: ["先确认，再行动：软件负责提议，人来做决定。", "克制：提醒更少、时机更准，默认夜间免打扰。", "隐私优先：家庭和孩子的信息随时可查看、更正和删除。"] },
        { heading: "名字的由来", body: ["暮色是一个状态走向另一个状态的时刻。我们为这个过渡而做：让新的能力，真正变成一个家庭可以依靠的东西。"] },
      ],
    },
  },
  contact: {
    en: {
      eyebrow: "Contact",
      title: "Get in touch.",
      intro: "For beta access, partnerships, press, or privacy requests, write to us by email.",
      sections: [
        { heading: "Email", body: [CONTACT_EMAIL] },
        { heading: "Beta access for mimi", body: ["mimi is in a small closed beta on iOS. Tell us a little about your family’s routine and we’ll reach out when a spot opens."] },
        { heading: "Privacy requests", body: ["To access, correct, or delete data related to you or your child, email us with the subject “Privacy request”."] },
      ],
    },
    zh: {
      eyebrow: "联系我们",
      title: "期待你的来信。",
      intro: "内测申请、商务合作、媒体采访或隐私相关请求，欢迎发邮件给我们。",
      sections: [
        { heading: "邮箱", body: [CONTACT_EMAIL] },
        { heading: "申请小咪 内测", body: ["小咪正在 iOS 上小范围内测。简单介绍一下你家的日常安排，有名额时我们会联系你。"] },
        { heading: "隐私请求", body: ["如需查阅、更正或删除与你或孩子相关的数据，请发邮件并在标题注明「隐私请求」。"] },
      ],
    },
  },
  privacy: {
    en: {
      eyebrow: "Legal",
      title: "Privacy Policy (draft)",
      intro: "How 理想三旬 / HeyDusk intends to handle information in mimi and on this website.",
      notice: draftEn,
      sections: [
        { heading: "1. What we collect", body: ["Account information, and the family information you choose to enter in mimi (text, voice, photos, schedules, and family profile details)."] },
        { heading: "2. Children’s information", body: ["mimi is used by parents and guardians. Information about children is entered and managed only by the parent account. [To be completed: legal basis, applicable laws (e.g. PIPL, COPPA, GDPR), consent flow.]"] },
        { heading: "3. How we use it", body: ["Only to provide the service: organizing entries, building schedules, and sending reminders you have enabled. We do not sell data or use it for advertising."] },
        { heading: "4. Third-party processors", body: ["[To be completed: AI model providers, cloud hosting and database providers, data location.]"] },
        { heading: "5. Your controls", body: ["You can view, edit, and delete memory in mimi, or clear it entirely. You can also request access or deletion by email."] },
        { heading: "6. Contact", body: [CONTACT_EMAIL] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "隐私政策（草案）",
      intro: "理想三旬 / HeyDusk 计划如何在小咪 与本网站中处理信息。",
      notice: draftZh,
      sections: [
        { heading: "一、我们收集的信息", body: ["账号信息，以及你在小咪 中主动录入的家庭信息（文字、语音、照片、日程和家庭档案）。"] },
        { heading: "二、儿童信息", body: ["小咪由家长或监护人使用，孩子的信息仅由家长账号录入和管理。【待补充：法律依据、适用法规（如《个人信息保护法》等）、监护人同意流程】"] },
        { heading: "三、信息用途", body: ["仅用于提供服务：整理记录、生成日程、发送你开启的提醒。我们不出售数据，也不用于广告。"] },
        { heading: "四、第三方处理方", body: ["【待补充：AI 模型服务商、云服务与数据库服务商、数据存储地】"] },
        { heading: "五、你的权利", body: ["你可以在小咪 中查看、修改、删除记忆，或一键清空；也可以发邮件申请查阅或删除。"] },
        { heading: "六、联系方式", body: [CONTACT_EMAIL] },
      ],
    },
  },
  terms: {
    en: {
      eyebrow: "Legal",
      title: "Terms of Service (draft)",
      intro: "Terms for using mimi and heydusk.com.",
      notice: draftEn,
      sections: [
        { heading: "1. Beta service", body: ["mimi is offered as a closed beta. Features may change, and the service may be interrupted."] },
        { heading: "2. Your responsibilities", body: ["Review confirm cards before accepting them. mimi is an assistant, not a substitute for your own judgment."] },
        { heading: "3. Provider", body: ["[To be completed after company registration: legal entity name, registered address, governing law.]"] },
        { heading: "4. Contact", body: [CONTACT_EMAIL] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "服务条款（草案）",
      intro: "使用小咪 与 heydusk.com 的条款。",
      notice: draftZh,
      sections: [
        { heading: "一、内测服务", body: ["小咪目前为内测服务，功能可能调整，服务也可能中断。"] },
        { heading: "二、使用者责任", body: ["接受确认卡前请仔细核对。小咪是助手，不能替代你自己的判断。"] },
        { heading: "三、服务提供方", body: ["【公司注册完成后补充：主体名称、注册地址、适用法律】"] },
        { heading: "四、联系方式", body: [CONTACT_EMAIL] },
      ],
    },
  },
};
