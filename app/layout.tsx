import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "heydusk.com";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "HeyDusk — Thoughtful products for what comes next";
  const description =
    "HeyDusk is an independent product studio working across AI, software, and design.";
  const faviconUrl = "/favicon.ico?v=2";
  const faviconSvgUrl = "/favicon.svg?v=2";

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: "%s — HeyDusk",
    },
    description,
    icons: {
      icon: [
        { url: faviconUrl, sizes: "32x32", type: "image/x-icon" },
        { url: faviconSvgUrl, sizes: "any", type: "image/svg+xml" },
      ],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: "website",
      url: origin,
      siteName: "HeyDusk",
      title,
      description,
      images: [`${origin}/og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#101116" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
