"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ClipboardList, Menu, Search, X } from "lucide-react";
import { mainNav } from "@/lib/site";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteProvider";
import { SearchOverlay } from "./SearchOverlay";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
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
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
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

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          overHero ? "border-b border-transparent bg-transparent" : "border-b border-line bg-white/95 backdrop-blur"
        }`}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
          <Logo tone={overHero ? "light" : "dark"} className={overHero ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]" : ""} />

          <nav aria-label="Ana menü" className={`hidden items-center gap-[clamp(14px,1.4vw,26px)] nav:flex ${tone}`}>
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    className={`relative inline-flex items-center gap-1 py-2 text-[14px] font-medium tracking-wide transition-colors ${
                      overHero ? "text-white/85 hover:text-white" : "text-charcoal hover:text-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden />
                    {isActive(pathname, item.href) && <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-primary" />}
                  </Link>
                  <div className="invisible absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-[8px] border border-line bg-white p-2 text-ink shadow-[0_18px_40px_-20px_rgba(16,36,63,0.35)]">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`flex min-h-11 items-center rounded-[6px] px-3 text-[14px] font-medium transition-colors hover:bg-light hover:text-primary ${
                              pathname === c.href ? "text-primary" : ""
                            }`}
                          >
                            {c.label}
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
                  className={`relative inline-flex items-center py-2 text-[14px] font-medium tracking-wide whitespace-nowrap transition-colors ${
                    overHero ? "text-white/85 hover:text-white" : "text-charcoal hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive(pathname, item.href) && <span className="absolute inset-x-0 bottom-0.5 h-0.5 bg-primary" />}
                </Link>
              ),
            )}
          </nav>

          <div className={`flex shrink-0 items-center gap-1 sm:gap-2 ${tone}`}>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Ürün ara"
              className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-current/10"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <Link
              href="/teklif-listem"
              aria-label={`Teklif Listem, ${count} ürün`}
              className="relative inline-flex min-h-11 items-center gap-2 rounded-full px-2.5 transition-colors hover:bg-current/10"
            >
              <ClipboardList className="size-5" aria-hidden />
              <span className="hidden text-[13px] font-semibold xl:inline">Teklif Listem</span>
              <span
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] leading-5 font-bold ${
                  count > 0 ? "bg-primary text-white" : overHero ? "bg-white/20 text-white" : "bg-line text-charcoal"
                }`}
              >
                {count}
              </span>
            </Link>
            <Link href="/teklif-listem#teklif-formu" className="btn-primary ml-1 hidden min-h-11 px-5 sm:inline-flex">
              Teklif Talebi
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
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
        <nav aria-label="Mobil menü" className="container-site flex min-h-full flex-col py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenSub(openSub === item.href ? null : item.href)}
                      aria-expanded={openSub === item.href}
                      className="flex min-h-14 w-full items-center justify-between text-left text-[17px] font-semibold text-ink"
                    >
                      {item.label}
                      <ChevronDown className={`size-5 transition-transform ${openSub === item.href ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {openSub === item.href && (
                      <ul className="mb-3 border-l-2 border-primary pl-4">
                        <li>
                          <Link href={item.href} className="flex min-h-11 items-center text-[15px] text-muted">
                            Genel bakış
                          </Link>
                        </li>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="flex min-h-11 items-center text-[15px] text-charcoal">
                              {c.label}
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
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8 pb-4">
            <Link href="/teklif-listem#teklif-formu" className="btn-primary w-full">
              Teklif Talebi Oluşturun
            </Link>
            <Link href="/teklif-listem" className="btn-outline w-full">
              Teklif Listem ({count})
            </Link>
          </div>
        </nav>
      </div>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
