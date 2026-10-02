"use client";

import { useDb, useDict } from "@/components/SiteData";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ClipboardList, Menu, Search, X } from "lucide-react";
import { localeLabels, locales, stripLocale } from "@/i18n/config";
import { useLang } from "@/i18n/client";
import { homeNav, mainNav, navVisible, type NavItem } from "@/lib/site";
import Link from "./Link";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteProvider";
import { SearchOverlay } from "./SearchOverlay";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

/* Dil seçimi — eyni səhifənin digər dildəki ünvanına keçir */
function LanguageSwitch({ className = "", overHero }: { className?: string; overHero?: boolean }) {
  const lang = useLang();
  const path = stripLocale(usePathname());
  return (
    <div role="group" aria-label={useDict().common.language} className={`inline-flex items-center rounded-full border p-0.5 ${overHero ? "border-white/30" : "border-line"} ${className}`}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${path === "/" ? "" : path}`}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          title={localeLabels[l].name}
          className={`inline-flex min-h-9 min-w-10 items-center justify-center rounded-full px-2 text-[12px] font-bold tracking-wide transition-colors ${
            l === lang ? "bg-primary text-white" : overHero ? "text-white/80 hover:text-white" : "text-charcoal hover:text-primary"
          }`}
        >
          {localeLabels[l].short}
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const t = useDict();
  const fullPath = usePathname();
  const pathname = stripLocale(fullPath);
  const { count } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const overHero = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Səhifə dəyişəndə mobil menyunu bağla (render zamanı tənzimləmə)
  const [lastPath, setLastPath] = useState(fullPath);
  if (lastPath !== fullPath) {
    setLastPath(fullPath);
    setMenuOpen(false);
    setOpenSub(null);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const tone = overHero ? "text-white" : "text-ink";
  const itemActive = (item: NavItem) => isActive(pathname, item.href) || !!item.children?.some((c) => isActive(pathname, c.href));
  const db = useDb();
  const counts = { projects: db.projects.length, certificates: db.certificates.length };
  const subItems = (item: NavItem) => item.children?.filter((c) => navVisible(c, counts)) ?? [];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          overHero ? "border-b border-transparent bg-transparent" : "border-b border-line bg-white/95 backdrop-blur"
        }`}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <Logo tone={overHero ? "light" : "dark"} className={`nav:shrink-0 ${overHero ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : ""}`} />

          <nav aria-label={t.common.mainMenu} className={`hidden items-center gap-[clamp(20px,2.2vw,36px)] nav:flex ${tone}`}>
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className={`relative inline-flex items-center gap-1 py-2 text-[15px] font-medium whitespace-nowrap transition-colors ${
                      overHero ? "text-white/85 hover:text-white" : "text-charcoal hover:text-primary"
                    }`}
                  >
                    {t.nav[item.key]}
                    <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden />
                    {itemActive(item) && <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-primary" />}
                  </Link>
                  <div className="invisible absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-[8px] border border-line bg-white p-2 text-ink shadow-[0_18px_40px_-20px_rgba(16,36,63,0.35)]">
                      {subItems(item).map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`flex min-h-11 items-center rounded-[6px] px-3 text-[15px] font-medium transition-colors hover:bg-light hover:text-primary ${
                              pathname === c.href ? "text-primary" : ""
                            }`}
                          >
                            {t.nav[c.key]}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex items-center py-2 text-[15px] font-medium whitespace-nowrap transition-colors ${
                    overHero ? "text-white/85 hover:text-white" : "text-charcoal hover:text-primary"
                  }`}
                >
                  {t.nav[item.key]}
                  {isActive(pathname, item.href) && <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-primary" />}
                </Link>
              ),
            )}
          </nav>

          <div className={`flex shrink-0 items-center gap-1 sm:gap-2 ${tone}`}>
            <div className="hidden sm:block">
              <LanguageSwitch overHero={overHero} />
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t.common.searchProducts}
              className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <Link
              href="/teklif-listem"
              aria-label={t.common.quoteListAria(count)}
              className="relative inline-flex min-h-11 items-center gap-2 rounded-full px-2.5 transition-colors hover:bg-current/10"
            >
              <ClipboardList className="size-5" aria-hidden />
              <span className="hidden text-[13px] font-semibold min-[1500px]:inline">{t.common.quoteList}</span>
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] leading-5 font-bold ${
                  count > 0 ? "bg-primary text-white" : overHero ? "bg-white/20 text-white" : "bg-line text-charcoal"
                }`}
              >
                {count}
              </span>
            </Link>
            <Link href="/teklif-listem#teklif-formu" className="btn-primary ml-1 hidden min-h-11 px-5 sm:inline-flex">
              {t.common.getQuote}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.common.closeMenu : t.common.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobil-menu"
              className="inline-flex size-11 items-center justify-center nav:hidden"
            >
              {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
            </button>
          </div>
        </div>

      </header>

      {/* Mobil menyu — ayrıca sadələşdirilmiş görünüş (sənəd, bölmə 4.1 və 8.1) */}
      <div
        id="mobil-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-[72px] bottom-0 z-[49] overflow-y-auto border-t border-line bg-white nav:hidden lg:top-[84px]"
      >
        <nav aria-label={t.common.mobileMenu} className="container-site flex min-h-full flex-col py-4">
          <ul className="divide-y divide-line">
            {[homeNav, ...mainNav].map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenSub(openSub === item.href ? null : item.href)}
                      aria-expanded={openSub === item.href}
                      className="flex min-h-14 w-full items-center justify-between text-left text-[17px] font-semibold text-ink"
                    >
                      {t.nav[item.key]}
                      <ChevronDown className={`size-5 transition-transform ${openSub === item.href ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {openSub === item.href && (
                      <ul className="mb-3 border-l-2 border-primary pl-4">
                        {!item.children.some((c) => c.href === item.href) && (
                          <li>
                            <Link href={item.href} className="flex min-h-11 items-center text-[15px] text-muted">
                              {t.common.overview}
                            </Link>
                          </li>
                        )}
                        {subItems(item).map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="flex min-h-11 items-center text-[15px] text-charcoal">
                              {t.nav[c.key]}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex min-h-14 items-center text-[17px] font-semibold ${
                      isActive(pathname, item.href) ? "text-primary" : "text-ink"
                    }`}
                  >
                    {t.nav[item.key]}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8 pb-4">
            <div className="sm:hidden">
              <LanguageSwitch />
            </div>
            <Link href="/teklif-listem#teklif-formu" className="btn-primary w-full">
              {t.common.createQuoteRequest}
            </Link>
            <Link href="/teklif-listem" className="btn-outline w-full">
              {t.common.quoteList} ({count})
            </Link>
          </div>
        </nav>
      </div>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
