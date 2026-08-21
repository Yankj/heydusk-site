import type { Metadata } from "next";
import { localeAlternates } from "./i18n";
import { HomePageView } from "./views/home-page";

export const metadata: Metadata = {
  alternates: localeAlternates("en", "/"),
};

export default function Home() {
  return <HomePageView locale="en" />;
}
