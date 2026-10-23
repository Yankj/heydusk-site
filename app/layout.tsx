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
  const title = "HeyDusk (理想三旬) — Calm software for families";
  const description =
    "HeyDusk (理想三旬) builds calm, trustworthy AI software for family life. Our first product is cat.";

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
      template: "%s — HeyDusk",
    },
    description,
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
      <body>{children}</body>
    </html>
  );
}
