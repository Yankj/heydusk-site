import { permanentRedirect } from "next/navigation";

// Visitors who type /en or /en/ should land on the English home `/`,
// not a branded 404. The same rule is also declared in proxy.ts and vercel.json.
export default function EnglishHomeAlias() {
  permanentRedirect("/");
}
