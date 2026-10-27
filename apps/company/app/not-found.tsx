import { headers } from "next/headers";
import type { Metadata } from "next";
import { SiteHeader } from "./components/site-header";
import { SiteFooter } from "./components/site-footer";
import { localizedPath, type Locale } from "./i18n";

export const metadata: Metadata = { title: "Page not found / 页面未找到", robots: { index: false, follow: false } };

export default async function NotFound() {
  const requestHeaders = await headers();
  const locale: Locale = requestHeaders.get("x-heydusk-locale") === "zh" ? "zh" : "en";
  const path = requestHeaders.get("x-heydusk-path") || "/not-found";
  const currentPath = locale === "zh" ? path.replace(/^\/zh(?=\/|$)/, "") || "/" : path;
  return <main lang={locale === "zh" ? "zh-CN" : "en"}>
    <SiteHeader locale={locale} currentPath={currentPath} />
    <section className="page-hero not-found-page">
      <p className="eyebrow">404</p>
      <h1>{locale === "zh" ? "这条路暂时没有页面。" : "This page could not be found."}</h1>
      <p>{locale === "zh" ? "链接可能已更新，也可能输入有误。可以从产品目录重新出发，或联系我们。" : "The link may have changed or the address may be incomplete. Start again with our products, or get in touch."}</p>
      <div className="hero-actions"><a className="text-link" href={localizedPath(locale, "/")}>{locale === "zh" ? "返回首页" : "Back to home"} →</a><a className="text-link" href={localizedPath(locale, "/products")}>{locale === "zh" ? "浏览产品" : "Explore products"} →</a><a className="text-link" href={localizedPath(locale, "/contact")}>{locale === "zh" ? "联系我们" : "Contact us"} →</a></div>
    </section><SiteFooter locale={locale} />
  </main>;
}
