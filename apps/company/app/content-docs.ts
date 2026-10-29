import type { DocContent } from "./views/doc-page";
import type { Locale } from "./i18n";

// Existing contact entry; mailbox delivery is not verified by local site checks.
export const CONTACT_EMAIL = "hello@heydusk.com";

const draftEn = "DRAFT — This page describes the current information website of HeyDusk, an independent AI product studio. Formal legal wording and provider details remain under review. It is not a commercial product service agreement or a shared product policy.";
const draftZh = "草案：本页说明独立 AI 产品工作室 HeyDusk / 理想三旬当前信息网站的实际用途，正式法律文本与提供方资料仍待审核。它不是商业产品服务协议或各产品共同的政策。";

export const docs: Record<string, Record<Locale, DocContent>> = {
  about: {
    en: {
      eyebrow: "About",
      title: "HeyDusk / 理想三旬",
      intro: "An independent AI product studio working across family life, learning, and creative expression.",
      sections: [
        { heading: "Who we are", body: ["HeyDusk / 理想三旬 is an independent AI product studio and the parent brand behind Mimi, Momo and FrameForge / 小片场. Our work connects product research, interaction design and engineering. Each product starts with a particular audience and a concrete use."] },
        { heading: "Three directions", body: ["Family & life: Mimi / 小咪, focused on parents’ daily arrangements and children’s long-term growth.", "Learning & growth: Momo, exploring parent-guided English learning.", "Creation & expression: FrameForge / 小片场, a video creation product for creators. Its current focus is science content for ages 3–8.", "These directions can overlap. They organize our work; each product keeps its own audience, workflow and delivery form."] },
        { heading: "How we work", body: ["Start with a concrete need and keep the product focused.", "Describe the current scope and planned capabilities clearly.", "Product-specific data handling and user controls need their own explanations; they are not a shared privacy policy."] },
        { heading: "Explore and enquire", body: ["The current site offers product introductions and email enquiries for all three products. Read about each direction, then contact hello@heydusk.com with questions. An enquiry does not grant product access or reserve a trial place."] },
        { heading: "The name", body: ["Dusk is the moment one state becomes another. We build for that transition: turning new capabilities into useful tools for daily life, learning, and making things."] },
      ],
    },
    zh: {
      eyebrow: "关于我们",
      title: "HeyDusk / 理想三旬",
      intro: "独立 AI 产品工作室，围绕家庭生活、学习成长与创作表达展开。",
      sections: [
        { heading: "我们是谁", body: ["HeyDusk / 理想三旬是独立 AI 产品工作室，也是 Mimi、Momo 与 FrameForge / 小片场背后的母品牌。我们把产品研究、交互设计与工程实现连接起来，从具体的使用者和实际用途出发。"] },
        { heading: "三个方向", body: ["家庭与生活：Mimi / 小咪，围绕家长的今日安排与孩子的长期成长。", "学习与成长：Momo，探索由家长陪伴的英语学习。", "创作与表达：FrameForge / 小片场，服务创作者的视频创作产品，当前重点是面向 3–8 岁儿童的科普内容。", "方向可以交叉，用来组织工作；每款产品保留自己的使用者、流程与交付形态。"] },
        { heading: "做事方式", body: ["从具体需要出发，让产品有清楚的用途。", "分清当前范围与规划中的能力。", "具体产品的数据处理与用户控制需要分别说明，不构成共同隐私政策。"] },
        { heading: "了解与咨询", body: ["当前网站为三款产品提供介绍与邮件咨询入口。你可以先了解各个方向，再通过 hello@heydusk.com 咨询。来信不代表获得产品使用权限或预留体验名额。"] },
        { heading: "名字的由来", body: ["暮色是一个状态走向另一个状态的时刻。我们为这个过渡而做：让新的能力成为生活、学习与创作中用得上的工具。"] },
      ],
    },
  },
  contact: {
    en: {
      eyebrow: "Contact",
      title: "Get in touch.",
      intro: "For product questions, partnerships, press, or questions about this website, write to hello@heydusk.com.",
      sections: [
        { heading: "Product enquiries", body: ["Tell us whether you are interested in Mimi, Momo, FrameForge / 小片场 or Ferry Dock / 渡口, and what you hope to do. All four currently offer product introductions and enquiries through the shared email address above.", "An email is an enquiry. It does not reserve a trial place or activate a product."] },
        { heading: "Privacy questions", body: ["Please say whether your question concerns this website or a particular product. Leave children’s records, passwords and sensitive account details out of your first message."] },
        { heading: "If your email app does not open", body: ["Your browser or device may need an email app configured. Select or copy the address above, then compose a message in the email service you normally use."] },
      ],
    },
    zh: {
      eyebrow: "联系我们",
      title: "期待你的来信。",
      intro: "产品咨询、商务合作、媒体或本站相关问题，欢迎来信 hello@heydusk.com。",
      sections: [
        { heading: "产品咨询", body: ["请说明你关注的是 Mimi、Momo、FrameForge / 小片场还是 Ferry Dock / 渡口，以及希望完成什么。四款产品当前都提供介绍与邮件咨询，统一使用上方邮箱。", "来信属于咨询，不代表预留了体验名额或开通了产品。"] },
        { heading: "隐私问题", body: ["请说明问题涉及本站还是某款产品。首次来信请勿附上儿童记录、密码或敏感账号信息。"] },
        { heading: "邮件客户端没有打开时", body: ["浏览器或设备可能需要先配置邮件客户端。你也可以选中或复制上方地址，在平时使用的邮箱中自行撰写邮件。"] },
      ],
    },
  },
  privacy: {
    en: {
      eyebrow: "Legal",
      title: "Privacy Policy (draft)",
      intro: "How the current HeyDusk website handles information. Independent products need their own privacy notices.",
      notice: draftEn,
      sections: [
        { heading: "1. Scope", body: ["heydusk.com introduces the independent AI product studio HeyDusk and its products. This notice covers browsing this website, not using Mimi, Momo or FrameForge / 小片场. Any handling of family or children’s data needs a product-specific explanation."] },
        { heading: "2. The current website", body: ["This is an information site. It does not provide website accounts, take payments, or submit a contact form to a backend. Browsing a product description does not open a product account."] },
        { heading: "3. Theme preference and clipboard", body: ["When you choose a light or dark theme, the site saves that preference in your browser’s local storage as heydusk-theme. It is used to apply your choice on later visits. You can remove it through your browser’s site data controls.", "Choosing Copy email address writes the published contact address to your clipboard if your browser allows it. It does not send an enquiry."] },
        { heading: "4. Email contact", body: ["Email links use mailto: to ask your device to open your own email app. You choose whether to compose and send a message there; this website does not send it. Messages you send are handled by your email provider and the receiving mailbox, outside this website.", "Please avoid including children’s records, passwords or sensitive account details in an initial enquiry."] },
        { heading: "5. Hosting and details under review", body: ["The hosting platform may process basic request and operational logs. Provider log retention, storage locations, the responsible provider’s details and email retention arrangements still need confirmation. This page does not specify retention periods or a formal procedure for data-rights requests while those details are under review."] },
        { heading: "6. Questions", body: ["For questions about this website or a product’s privacy information, name the website or product concerned when you write. A privacy statement or control for one product should not be assumed to apply to another.", CONTACT_EMAIL] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "隐私政策（草案）",
      intro: "说明当前 HeyDusk 网站如何处理信息。独立产品需要各自的隐私说明。",
      notice: draftZh,
      sections: [
        { heading: "一、适用范围", body: ["heydusk.com 用于介绍独立 AI 产品工作室 HeyDusk / 理想三旬及其产品。本说明适用于浏览本站，不适用于使用 Mimi、Momo 或 FrameForge / 小片场。家庭与儿童数据的处理需要相关产品单独说明。"] },
        { heading: "二、当前网站的用途", body: ["本站是信息展示网站，不提供网站账号、支付功能或向后端提交信息的联系表单。浏览产品介绍不会开通产品账号。"] },
        { heading: "三、主题偏好与剪贴板", body: ["你选择日间或夜间主题时，网站会将偏好以 heydusk-theme 保存到当前浏览器的本地存储中，用于之后访问时应用你的选择。你可以通过浏览器的站点数据设置清除它。", "点击「复制邮箱地址」时，若浏览器允许，本站会把公开的联系地址写入剪贴板；这个操作不会发送咨询。"] },
        { heading: "四、邮件联系", body: ["邮件链接通过 mailto: 请求设备打开你自己的邮件客户端。是否撰写和发送，由你在邮件客户端中决定；本站不会代为发送。你发出的邮件由所用邮箱服务与接收邮箱在本站之外处理。", "首次来信请勿附上儿童记录、密码或敏感账号信息。"] },
        { heading: "五、托管与仍待审核的信息", body: ["托管平台可能处理基本请求与运行日志。平台日志的保留期限、存储地区、责任提供方资料以及邮件保留安排仍需确认。相关信息审核完成前，本页不设定保留期限或正式的数据权利请求流程。"] },
        { heading: "六、相关问题", body: ["咨询本站或产品隐私信息时，请注明涉及的网站或产品。一款产品的隐私说明或控制方式不应被视为适用于另一款产品。", CONTACT_EMAIL] },
      ],
    },
  },
  terms: {
    en: {
      eyebrow: "Legal",
      title: "Terms of Service (draft)",
      intro: "A guide to using the current heydusk.com information site, separate from each product’s terms.",
      notice: draftEn,
      sections: [
        { heading: "1. Using this website", body: ["This website introduces HeyDusk, an independent AI product studio, and its product catalog. It provides information pages, with no website account, checkout or contact-form backend."] },
        { heading: "2. Product introductions and enquiries", body: ["Product pages explain each product’s audience, purpose and current scope. The current public route for Mimi, Momo and FrameForge is to read the introduction and enquire through hello@heydusk.com. A listing, product link or email enquiry does not grant access, create a subscription or reserve a trial place."] },
        { heading: "3. Independent product terms", body: ["Mimi, Momo and FrameForge / 小片场 have different workflows and delivery forms. Any product service needs its own explanation of access, supported environments, data handling and responsibilities. This information website does not supply a commercial product service agreement."] },
        { heading: "4. Contacting us", body: ["The email link asks your device to open your own email app. You are responsible for composing and sending your message there. The website does not submit or confirm delivery of a message.", CONTACT_EMAIL] },
        { heading: "5. Draft status", body: ["These draft terms describe the current information site. The provider’s legal identity and any formal terms, including applicable law, still await confirmation and review. This page should not be read as a finalized agreement for an individual product."] },
      ],
    },
    zh: {
      eyebrow: "法律",
      title: "服务条款（草案）",
      intro: "说明如何使用当前 heydusk.com 信息网站，与各产品的条款分别处理。",
      notice: draftZh,
      sections: [
        { heading: "一、使用本站", body: ["本网站用于介绍独立 AI 产品工作室 HeyDusk / 理想三旬与产品目录，提供信息页面，没有网站账号、结账流程或联系表单后端。"] },
        { heading: "二、产品介绍与咨询", body: ["产品页面说明各产品的受众、用途与当前范围。Mimi、Momo 与 FrameForge 当前对外提供产品介绍，并统一通过 hello@heydusk.com 接受咨询。出现在目录中、打开产品链接或发送咨询，都不代表获得使用权限、建立订阅或预留体验名额。"] },
        { heading: "三、独立产品条款", body: ["Mimi、Momo 与 FrameForge / 小片场的流程和交付形态不同。产品服务的体验权限、支持环境、数据处理和使用责任需要分别说明；本信息网站不提供商业产品服务协议。"] },
        { heading: "四、邮件联系", body: ["邮件链接请求设备打开你自己的邮件客户端，邮件由你在那里撰写、发送。本站不提交邮件，也不确认邮件已经送达。", CONTACT_EMAIL] },
        { heading: "五、草案状态", body: ["本草案描述当前信息网站的用途。提供方的法律主体与正式条款，包括适用法律，仍待确认和审核。本页不应被视为某款产品已经定稿的服务协议。"] },
      ],
    },
  },
};
