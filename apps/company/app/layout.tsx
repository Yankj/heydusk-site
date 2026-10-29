import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  const metadataOrigin = "https://heydusk.com";
  const title = "HeyDusk · 理想三旬 — independent AI products";
  const description =
    "HeyDusk builds independent AI products across family life, learning and creative expression — Mimi, Momo, FrameForge / 小片场 — plus an early everyday tool, Ferry Dock / 渡口.";

  return {
    metadataBase: new URL(metadataOrigin),
    title: {
      default: title,
      template: "%s — HeyDusk",
    },
    description,
    openGraph: {
      type: "website",
      url: metadataOrigin,
      siteName: "HeyDusk",
      title,
      description,
      images: [`${metadataOrigin}/og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${metadataOrigin}/og.png`],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const language = requestHeaders.get("x-heydusk-locale") === "zh" ? "zh-CN" : "en";
  return (
    <html lang={language} className={inter.variable}>
      <head>
        <link
          rel="icon"
          href="/heydusk-favicon.ico"
          type="image/x-icon"
          sizes="32x32"
        />
        <link
          rel="shortcut icon"
          href="/heydusk-favicon.ico"
          type="image/x-icon"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
