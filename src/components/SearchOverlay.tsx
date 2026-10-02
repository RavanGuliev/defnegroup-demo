"use client";

import { useDb, useDict } from "@/components/SiteData";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { withLocale } from "@/i18n/config";
import { useLang } from "@/i18n/client";
import { allProductsHref, groupHref, productHref } from "@/lib/data";
import Link from "./Link";

const LIMIT = 6;

/** Axtarılan sözləri nəticədə qalın göstərir (böyük/kiçik hərfə həssas deyil). */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return text;
  const esc = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${esc.join("|")})`, "gi"));
  return parts.map((part, i) =>
    i % 2 ? (
      <mark key={i} className="bg-transparent font-bold text-primary">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-line bg-white px-1 font-sans text-[11px] font-medium text-muted">
    {children}
  </kbd>
);

/*
 * Başlıqdakı axtarış: ortada sadə panel (mobildə tam ekran).
 * Boşdursa məhsul qrupları, yazanda ilk nəticələr; ↑ ↓ ilə seçim, Enter ilə açılır.
 */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const lang = useLang();
  const t = useDict();
  const { groups, getSub, productGroup, searchProducts, subName } = useDb();
  const query = q.trim();
  const all = query ? searchProducts(query) : [];
  const results = all.slice(0, LIMIT);
  const terms = query.split(/\s+/).filter((s) => s.length > 1);
  const quick = (groups.some((g) => g.featured) ? groups.filter((g) => g.featured) : groups).slice(0, 8);
  const seeAllHref = `${allProductsHref}?q=${encodeURIComponent(query)}`;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(withLocale(lang, href));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.search.dialog}
      className="fixed inset-0 z-[80] flex items-start justify-center bg-night/40 backdrop-blur-[2px] sm:px-4 sm:pt-[12vh]"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden bg-white shadow-[0_24px_64px_-12px_rgba(16,36,63,0.35)] sm:h-auto sm:max-h-[72vh] sm:max-w-[640px] sm:rounded-[12px] sm:border sm:border-line"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (results[active]) go(productHref(results[active]));
            else if (query) go(seeAllHref);
          }}
          className="flex items-center gap-3 border-b border-line px-4 sm:px-5"
        >
          <Search className="size-5 shrink-0 text-muted" aria-hidden />
          <label htmlFor="site-search" className="sr-only">
            {t.explorer.searchPlaceholder}
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="text"
            inputMode="search"
            enterKeyHint="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={t.explorer.searchPlaceholder}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="site-search-results"
            aria-activedescendant={results[active] ? `sr-${results[active].slug}` : undefined}
            className="h-16 w-full bg-transparent text-[16px] text-ink placeholder:text-muted/70 sm:text-[17px]"
            autoComplete="off"
            spellCheck={false}
            // Qlobal :focus-visible çərçivəsi burada lazım deyil — fokus panelin özündədir
            style={{ outline: "none" }}
          />
          {q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                inputRef.current?.focus();
              }}
              aria-label={t.explorer.clear}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-light hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t.search.close}
            className="hidden shrink-0 rounded-[6px] border border-line px-2 py-1 text-[11px] font-semibold tracking-wide text-muted transition-colors hover:text-ink sm:inline-flex"
          >
            ESC
          </button>
          <button type="button" onClick={onClose} aria-label={t.search.close} className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center text-ink sm:hidden">
            <X className="size-5" aria-hidden />
          </button>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3">
          {!query && (
            <div className="px-2 py-2 sm:px-3">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">{t.search.groups}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {quick.map((g) => (
                  <li key={g.code}>
                    <Link
                      href={groupHref(g)}
                      onClick={onClose}
                      className="inline-flex min-h-9 items-center rounded-full border border-line px-3.5 text-[13px] text-charcoal transition-colors hover:border-primary hover:text-primary"
                    >
                      {g.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-light text-muted">
                <Search className="size-5" aria-hidden />
              </span>
              <p className="mt-4 text-[15px] font-semibold text-ink">{t.search.noResults(query)}</p>
              <p className="mx-auto mt-1.5 max-w-sm text-[14px] text-muted">
                <Link href="/teklif-listem#teklif-formu" onClick={onClose} className="font-semibold text-primary underline-offset-4 hover:underline">
                  {t.search.sendSpec}
                </Link>
                {t.search.sendSpecTail}
              </p>
            </div>
          )}

          {results.length > 0 && (
            <ul id="site-search-results" role="listbox" aria-label={t.search.dialog}>
              {results.map((p, i) => {
                const sub = getSub(p.subCode);
                return (
                  <li key={p.slug} id={`sr-${p.slug}`} role="option" aria-selected={i === active}>
                    <Link
                      href={productHref(p)}
                      onClick={onClose}
                      onMouseMove={() => setActive(i)}
                      className={`group flex min-h-14 items-center gap-3 rounded-[8px] px-3 py-2.5 transition-colors ${i === active ? "bg-light" : ""}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] text-ink">
                          <Highlight text={p.name} terms={terms} />
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] text-muted">
                          <span className="tabular-nums">{p.code}</span> · {productGroup(p)?.name}
                          {sub && ` › ${subName(sub)}`}
                        </span>
                      </span>
                      <ArrowRight className={`size-4 shrink-0 transition-all ${i === active ? "translate-x-0.5 text-primary" : "text-line"}`} aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {query && results.length > 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-line bg-light/60 px-4 py-3 sm:px-5">
            <Link href={seeAllHref} onClick={onClose} className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
              {t.search.seeAll(all.length)}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <span className="hidden items-center gap-3 text-[11px] text-muted sm:flex">
              <span className="flex items-center gap-1">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> {t.search.navigate}
              </span>
              <span className="flex items-center gap-1">
                <Kbd>
                  <CornerDownLeft className="size-3" aria-hidden />
                </Kbd>{" "}
                {t.search.select}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
