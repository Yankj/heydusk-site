import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-heydusk-locale", pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en");
  requestHeaders.set("x-heydusk-path", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/((?!_next/).*)"] };
