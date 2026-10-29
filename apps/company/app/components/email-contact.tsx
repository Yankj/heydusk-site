"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { CONTACT_EMAIL } from "../content-docs";
import type { Locale } from "../i18n";
import "./email-contact.css";

type ContactProduct = "mimi" | "momo" | "frameforge" | "ferry-dock";
type Feedback = "idle" | "email" | "copying" | "copied" | "failed";

const productNames: Record<ContactProduct, string> = {
  mimi: "Mimi",
  momo: "Momo",
  frameforge: "FrameForge",
  "ferry-dock": "Ferry Dock",
};

const copy = {
  en: {
    heading: "Email",
    address: "Email address",
    open: "Open your email app",
    copy: "Copy email address",
    copying: "Copying…",
    explanation: "This opens your own email app. Compose and send your message there; this website does not send it.",
    manual: "You can also select the address and copy it manually.",
    product: "Product enquiry:",
    pick: "Choose a product (optional)",
    subject: "enquiry",
    feedback: {
      idle: "",
      email: "Your device handles the email link. If no email app opens, copy the address and use your preferred email service.",
      copying: "Copying the email address…",
      copied: "Email address copied. Paste it into your email app.",
      failed: "Automatic copying is unavailable. Select the email address above and copy it manually.",
    },
  },
  zh: {
    heading: "邮件联系",
    address: "邮箱地址",
    open: "打开邮件客户端",
    copy: "复制邮箱地址",
    copying: "正在复制…",
    explanation: "这会请求打开你自己的邮件客户端。请在那里撰写并发送邮件，本站不会代为发送。",
    manual: "你也可以选中地址，手动复制。",
    product: "产品咨询：",
    pick: "选择产品（可选）",
    subject: "产品咨询",
    feedback: {
      idle: "",
      email: "邮件链接由你的设备处理。如果没有打开邮件客户端，请复制地址，在常用邮箱中撰写邮件。",
      copying: "正在复制邮箱地址…",
      copied: "邮箱地址已复制，可粘贴到你的邮件客户端。",
      failed: "未能自动复制。请选中上方邮箱地址，手动复制。",
    },
  },
};

function subscribeToProduct(listener: () => void) {
  window.addEventListener("popstate", listener);
  return () => window.removeEventListener("popstate", listener);
}

function getProductSnapshot(): ContactProduct | null {
  const product = new URLSearchParams(window.location.search).get("product");
  return product === "mimi" || product === "momo" || product === "frameforge" || product === "ferry-dock"
    ? product
    : null;
}

function getServerProductSnapshot(): undefined {
  return undefined;
}

export function EmailContact({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const id = useId();
  const addressRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const product = useSyncExternalStore<ContactProduct | null | undefined>(
    subscribeToProduct,
    getProductSnapshot,
    getServerProductSnapshot,
  );
  const productName = product ? productNames[product] : null;
  const subject = productName ? `${productName} ${text.subject}` : null;
  const emailHref = `mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  async function copyAddress() {
    setFeedback("copying");

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setFeedback("copied");
    } catch {
      setFeedback("failed");
      addressRef.current?.focus();
      addressRef.current?.select();
    }
  }

  return (
    <article className="email-contact" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{text.heading}</h2>
      <p className="email-contact-pick-label" id={`${id}-pick`}>{text.pick}</p>
      <div className="email-contact-products" role="group" aria-labelledby={`${id}-pick`}>
        {(["mimi", "momo", "frameforge", "ferry-dock"] as ContactProduct[]).map((id) => {
          const href = `?product=${id}`;
          const active = product === id;
          return (
            <a
              key={id}
              className={active ? "email-contact-product-chip is-active" : "email-contact-product-chip"}
              href={href}
              aria-current={active ? "true" : undefined}
            >
              {productNames[id]}
            </a>
          );
        })}
        {product ? (
          <a className="email-contact-product-chip email-contact-product-clear" href="?">
            {locale === "zh" ? "清除" : "Clear"}
          </a>
        ) : null}
      </div>
      <label className="email-contact-label" htmlFor={`${id}-address`}>{text.address}</label>
      <input
        className="email-contact-address"
        id={`${id}-address`}
        ref={addressRef}
        type="text"
        value={CONTACT_EMAIL}
        readOnly
        spellCheck={false}
        aria-describedby={`${id}-manual`}
        onFocus={(event) => event.currentTarget.select()}
      />
      <p className="email-contact-manual" id={`${id}-manual`}>{text.manual}</p>
      {productName ? <p className="email-contact-product">{text.product} {productName}</p> : null}
      <div className="email-contact-actions">
        <a className="email-contact-open" href={emailHref} onClick={() => setFeedback("email")}>
          {text.open} <span aria-hidden="true">↗</span>
        </a>
        {product !== undefined ? (
          <button
            className="email-contact-copy"
            type="button"
            onClick={copyAddress}
            disabled={feedback === "copying"}
          >
            {feedback === "copying" ? text.copying : text.copy}
          </button>
        ) : null}
      </div>
      <p className="email-contact-explanation">{text.explanation}</p>
      <p className="email-contact-status" role="status" aria-live="polite" aria-atomic="true">
        {text.feedback[feedback]}
      </p>
    </article>
  );
}
