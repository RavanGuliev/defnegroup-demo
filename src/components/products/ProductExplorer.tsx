"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useLang } from "@/i18n/client";
import { getDict } from "@/i18n/dictionaries";
import { db, productGroupCode, type Product } from "@/lib/data";
import { ProductCard } from "../cards";
import { EmptyState } from "../EmptyState";
import Link from "../Link";

type Filters = {
  groups: string[];
  subs: string[];
  sectors: string[];
  usage: string[];
  withDocs: boolean;
  onlyNew: boolean;
};

const empty: Filters = { groups: [], subs: [], sectors: [], usage: [], withDocs: false, onlyNew: false };

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

/*
 * Ürün listesi: ad/kod araması + filtrler. `locked` verildikdə (alt bölmə səhifəsi) kateqoriya
 * filtri gizlənir — sektor və istifadə sahəsi filtrləri köməkçidir, alt bölmə quruluşunu əvəz etmir.
 */
export function ProductExplorer({ locked, baseProducts }: { locked?: boolean; baseProducts?: Product[] }) {
  const lang = useLang();
  const t = getDict(lang).explorer;
  const { groups, productsInSub, sectors, subName, subsOfGroup, usageAreas } = db(lang);
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [f, setF] = useState<Filters>(() => ({
    ...empty,
    groups: params.get("kategori")?.split(",").filter(Boolean) ?? [],
    subs: params.get("alt")?.split(",").filter(Boolean) ?? [],
    sectors: params.get("sektor")?.split(",").filter(Boolean) ?? [],
    onlyNew: params.get("yeni") === "1",
  }));
  const [drawer, setDrawer] = useState(false);

  // Filtr vəziyyətini URL-də saxla (paylaşıla bilən keçid)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (f.groups.length) sp.set("kategori", f.groups.join(","));
    if (f.subs.length) sp.set("alt", f.subs.join(","));
    if (f.sectors.length) sp.set("sektor", f.sectors.join(","));
    if (f.onlyNew) sp.set("yeni", "1");
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [q, f.groups, f.subs, f.sectors, f.onlyNew, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const results = useMemo(() => {
    const data = db(lang);
    let list = baseProducts ?? data.products;
    list = data.searchProducts(q, list);
    if (!locked && (f.groups.length || f.subs.length))
      list = list.filter(
        (p) => f.groups.includes(productGroupCode(p)) || f.subs.includes(p.subCode) || !!p.crossGroups?.some((g) => f.groups.includes(g)),
      );
    if (f.sectors.length) list = list.filter((p) => p.sectorSlugs.some((s) => f.sectors.includes(s)));
    if (f.usage.length) list = list.filter((p) => p.usageAreas.some((u) => f.usage.includes(u)));
    if (f.withDocs) list = list.filter((p) => p.documents.length > 0);
    if (f.onlyNew) list = list.filter((p) => p.isNew);
    return list;
  }, [q, f, locked, baseProducts, lang]);

  const activeCount =
    (locked ? 0 : f.groups.length + f.subs.length) + f.sectors.length + f.usage.length + (f.withDocs ? 1 : 0) + (f.onlyNew ? 1 : 0);

  const panel = (
    <div className="space-y-8">
      {!locked && (
        <FilterGroup title={t.group}>
          {groups.map((g) => {
            const subs = subsOfGroup(g.code);
            const selected = f.subs.filter((c) => c.startsWith(`${g.code}.`)).length;
            return (
              <details key={g.code} open={selected > 0 || undefined} className="group/d border-b border-line/70 last:border-b-0">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 py-1 text-[14px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-1.5 text-[12px] text-primary">{g.code}</span>
                    {g.name}
                    {selected > 0 && <span className="ml-1.5 rounded-full bg-primary px-1.5 text-[11px] text-white">{selected}</span>}
                  </span>
                  <ChevronDown className="size-4 shrink-0 text-muted transition-transform group-open/d:rotate-180" aria-hidden />
                </summary>
                <div className="pb-2 pl-1">
                  <Check label={t.wholeGroup} checked={f.groups.includes(g.code)} onChange={() => setF({ ...f, groups: toggle(f.groups, g.code) })} />
                  {subs.map((s) => (
                    <Check
                      key={s.code}
                      label={`${s.code} ${subName(s)}`}
                      count={productsInSub(s.code).length}
                      checked={f.subs.includes(s.code)}
                      onChange={() => setF({ ...f, subs: toggle(f.subs, s.code) })}
                    />
                  ))}
                </div>
              </details>
            );
          })}
        </FilterGroup>
      )}
      <FilterGroup title={t.sector}>
        {sectors.map((s) => (
          <Check key={s.slug} label={s.name} checked={f.sectors.includes(s.slug)} onChange={() => setF({ ...f, sectors: toggle(f.sectors, s.slug) })} />
        ))}
      </FilterGroup>
      <FilterGroup title={t.usage}>
        {usageAreas.map((u) => (
          <Check key={u} label={u} checked={f.usage.includes(u)} onChange={() => setF({ ...f, usage: toggle(f.usage, u) })} />
        ))}
      </FilterGroup>
      <FilterGroup title={t.docs}>
        <Check label={t.withDocs} checked={f.withDocs} onChange={() => setF({ ...f, withDocs: !f.withDocs })} />
      </FilterGroup>
      <FilterGroup title={t.status}>
        <Check label={t.onlyNew} checked={f.onlyNew} onChange={() => setF({ ...f, onlyNew: !f.onlyNew })} />
      </FilterGroup>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="urun-ara" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="urun-ara"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="field-input min-h-[52px] pl-12"
          />
        </div>
        <button type="button" onClick={() => setDrawer(true)} className="btn-outline min-h-[52px] lg:hidden" aria-haspopup="dialog">
          <SlidersHorizontal className="size-4" aria-hidden /> {t.filter} {activeCount > 0 && <span className="rounded-full bg-primary px-2 text-[11px] text-white">{activeCount}</span>}
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block" aria-label={t.filters}>
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <div className="mb-6 flex items-center justify-between">
              <p className="type-small text-ink">{t.filters}</p>
              {activeCount > 0 && (
                <button type="button" onClick={() => setF(empty)} className="text-[13px] font-semibold text-primary hover:underline">
                  {t.clear}
                </button>
              )}
            </div>
            {panel}
          </div>
        </aside>

        <div>
          <p className="mb-5 text-[14px] text-muted" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span> {t.listing}
          </p>
          {results.length ? (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 lg:gap-5">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={q.trim() ? t.noResultsFor(q.trim()) : t.noResults}
              text={t.noResultsText}
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  {(q.trim() || activeCount > 0) && (
                    <button
                      type="button"
                      onClick={() => {
                        setQ("");
                        setF(empty);
                      }}
                      className="btn-outline"
                    >
                      {t.clearAll}
                    </button>
                  )}
                  <Link href="/teklif-listem#teklif-formu" className="btn-primary">
                    {getDict(lang).cta.send}
                  </Link>
                </div>
              }
            />
          )}
        </div>
      </div>

      {/* Mobil filtr paneli — məhsul sahəsini bağlamır, ayrıca açılır (sənəd, bölmə 8.1) */}
      {drawer && (
        <div role="dialog" aria-modal="true" aria-label={t.filters} className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-night/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(92vw,380px)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-[17px] font-bold text-ink">{t.filters}</p>
              <button type="button" onClick={() => setDrawer(false)} aria-label={t.closeFilters} className="inline-flex size-11 items-center justify-center">
                <X className="size-6" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
              <button type="button" onClick={() => setF(empty)} className="btn-outline">
                {t.clear}
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="btn-primary">
                {t.showN(results.length)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[13px] font-bold tracking-[0.08em] text-ink uppercase">{title}</legend>
      <div className="space-y-0.5">{children}</div>
    </fieldset>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-3 py-1 text-[14px] leading-[1.4] text-charcoal hover:text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-[18px] shrink-0 accent-primary" />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-[12px] text-muted">{count}</span>}
    </label>
  );
}
