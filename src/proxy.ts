import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

/*
 * Dil prefiksi olmayan ünvanları uyğun dilə yönləndirir: brauzer dili Azərbaycan dilidirsə
 * /az, əks halda /tr. Köhnə demo ünvanları next.config.ts-dəki redirect-lərlə əvvəlcədən həll olunur.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return;

  const prefersAz = /^az\b/i.test(request.headers.get("accept-language") ?? "");
  const lang = prefersAz ? "az" : defaultLocale;
  request.nextUrl.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};
