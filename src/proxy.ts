import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/config";

/*
 * Dil prefiksi olmayan ünvanları uyğun dilə yönləndirir: brauzer dili Azərbaycan dilidirsə
 * /en, əks halda /tr (Türk brauzerləri və digərləri). Köhnə demo ünvanları next.config.ts-dəki redirect-lərlə əvvəlcədən həll olunur.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1])) return;

  const prefersEn = /^en\b/i.test(request.headers.get("accept-language") ?? "");
  const lang = prefersEn ? "en" : defaultLocale;
  request.nextUrl.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\.[a-z0-9]+$).*)"],
};
