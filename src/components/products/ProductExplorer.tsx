"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products as allProducts, searchProducts, sectors, usageAreas, type Product } from "@/lib/data";
import { ProductCard } from "../cards";
import { EmptyState } from "../ui";
import Link from "next/link";

type Filters = {
  categories: string[];
  sectors: string[];
  usage: string[];
  withDocs: boolean;
  onlyNew: boolean;
};

const empty: Filters = { categories: [], sectors: [], usage: [], withDocs: false, onlyNew: false };

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function ProductExplorer({ lockedCategory, baseProducts }: { lockedCategory?: string; baseProducts?: Product[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [f, setF] = useState<Filters>(() => ({
    ...empty,
    categories: params.get("kategori")?.split(",").filter(Boolean) ?? [],
    sectors: params.get("sektor")?.split(",").filter(Boolean) ?? [],
    onlyNew: params.get("yeni") === "1",
  }));
  const [drawer, setDrawer] = useState(false);

  // Filtr vəziyyətini URL-də saxla (paylaşıla bilən keçid)
  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (f.categories.length) sp.set("kategori", f.categories.join(","));
    if (f.sectors.length) sp.set("sektor", f.sectors.join(","));
    if (f.onlyNew) sp.set("yeni", "1");
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [q, f.categories, f.sectors, f.onlyNew, pathname, router]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const results = useMemo(() => {
    let list = baseProducts ?? allProducts;
    list = searchProducts(q, list);
    if (!lockedCategory && f.categories.length) list = list.filter((p) => f.categories.includes(p.categorySlug));
    if (f.sectors.length) list = list.filter((p) => p.sectorSlugs.some((s) => f.sectors.includes(s)));
    if (f.usage.length) list = list.filter((p) => p.usageAreas.some((u) => f.usage.includes(u)));
    if (f.withDocs) list = list.filter((p) => p.documents.length > 0);
    if (f.onlyNew) list = list.filter((p) => p.isNew);
    return list;
  }, [q, f, lockedCategory, baseProducts]);

  const activeCount =
    (lockedCategory ? 0 : f.categories.length) + f.sectors.length + f.usage.length + (f.withDocs ? 1 : 0) + (f.onlyNew ? 1 : 0);

  const panel = (
    <div className="space-y-8">
      {!lockedCategory && (
        <FilterGroup title="Kategori">
          {categories.map((c) => (
            <Check key={c.slug} label={c.name} checked={f.categories.includes(c.slug)} onChange={() => setF({ ...f, categories: toggle(f.categories, c.slug) })} />
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Sektör">
        {sectors.map((s) => (
          <Check key={s.slug} label={s.name} checked={f.sectors.includes(s.slug)} onChange={() => setF({ ...f, sectors: toggle(f.sectors, s.slug) })} />
        ))}
      </FilterGroup>
      <FilterGroup title="Kullanım alanı">
        {usageAreas.map((u) => (
          <Check key={u} label={u} checked={f.usage.includes(u)} onChange={() => setF({ ...f, usage: toggle(f.usage, u) })} />
        ))}
      </FilterGroup>
      <FilterGroup title="Belge ve sertifika">
        <Check label="Teknik dokümanı olan ürünler" checked={f.withDocs} onChange={() => setF({ ...f, withDocs: !f.withDocs })} />
      </FilterGroup>
      <FilterGroup title="Durum">
        <Check label="Yeni ürünler" checked={f.onlyNew} onChange={() => setF({ ...f, onlyNew: !f.onlyNew })} />
      </FilterGroup>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <label htmlFor="urun-ara" className="sr-only">
            Ürün adı, ürün kodu veya anahtar kelime ile ara
          </label>
          <input
            id="urun-ara"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ürün adı, ürün kodu veya anahtar kelime"
            className="field-input min-h-[52px] pl-12"
          />
        </div>
        <button type="button" onClick={() => setDrawer(true)} className="btn-outline min-h-[52px] lg:hidden" aria-haspopup="dialog">
          <SlidersHorizontal className="size-4" aria-hidden /> Filtrele {activeCount > 0 && <span className="rounded-full bg-primary px-2 text-[11px] text-white">{activeCount}</span>}
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block" aria-label="Filtreler">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <div className="mb-6 flex items-center justify-between">
              <p className="type-small text-ink">Filtreler</p>
              {activeCount > 0 && (
                <button type="button" onClick={() => setF(empty)} className="text-[13px] font-semibold text-primary hover:underline">
                  Temizle
                </button>
              )}
            </div>
            {panel}
          </div>
        </aside>

        <div>
          <p className="mb-5 text-[14px] text-muted" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span> ürün listeleniyor
          </p>
          {results.length ? (
            <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 lg:gap-5">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Aradığınız ürünü bulamadınız mı?"
              text="Teknik şartnamenizi gönderin, size özel çözüm ve teklif hazırlayalım."
              action={
                <Link href="/teklif-listem#teklif-formu" className="btn-primary">
                  Şartname Gönderin
                </Link>
              }
            />
          )}
        </div>
      </div>

      {/* Mobil filtr paneli — məhsul sahəsini bağlamır, ayrıca açılır (sənəd, bölmə 8.1) */}
      {drawer && (
        <div role="dialog" aria-modal="true" aria-label="Filtreler" className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-night/50" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(92vw,380px)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-[17px] font-bold text-ink">Filtreler</p>
              <button type="button" onClick={() => setDrawer(false)} aria-label="Filtreleri kapat" className="inline-flex size-11 items-center justify-center">
                <X className="size-6" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{panel}</div>
            <div className="grid grid-cols-2 gap-3 border-t border-line p-4">
              <button type="button" onClick={() => setF(empty)} className="btn-outline">
                Temizle
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="btn-primary">
                {results.length} ürünü göster
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

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center gap-3 text-[14px] text-charcoal hover:text-ink">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-[18px] shrink-0 accent-primary" />
      {label}
    </label>
  );
}
