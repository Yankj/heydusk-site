import type { Metadata } from "next";
import { localeAlternates } from "../i18n";
import { AboutPageView } from "../views/about-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
  alternates: localeAlternates("en", "/about"),
  openGraph: {
    title: "About — HeyDusk",
    description:
      "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
    images: [],
  },
  twitter: {
    title: "About — HeyDusk",
    description:
      "The person, notes, and collaboration paths behind the independent product studio HeyDusk.",
    images: [],
  },
};

export default function AboutPage() {
  return <AboutPageView locale="en" />;
}
