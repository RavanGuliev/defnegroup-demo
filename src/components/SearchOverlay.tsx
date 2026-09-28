"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { getCategory, productHref, searchProducts } from "@/lib/data";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = q.trim() ? searchProducts(q).slice(0, 8) : [];

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Ürün arama" className="fixed inset-0 z-[80] bg-night/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="container-site py-5 sm:py-8">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
              router.push(`/urunler?q=${encodeURIComponent(q)}`);
            }}
            className="flex items-center gap-3 border-b-2 border-ink pb-3"
          >
            <Search className="size-6 shrink-0 text-muted" aria-hidden />
            <label htmlFor="site-search" className="sr-only">
              Ürün adı, ürün kodu veya anahtar kelime
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ürün adı, ürün kodu veya anahtar kelime"
              className="min-h-12 w-full bg-transparent text-lg font-medium text-ink outline-none placeholder:text-muted/70 sm:text-2xl"
              autoComplete="off"
            />
            <button type="button" onClick={onClose} aria-label="Aramayı kapat" className="inline-flex size-11 shrink-0 items-center justify-center">
              <X className="size-6" aria-hidden />
            </button>
          </form>

          {q.trim() && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {results.length === 0 ? (
                <p className="py-6 text-muted">
                  “{q}” için sonuç bulunamadı.{" "}
                  <Link href="/teklif-listem#teklif-formu" onClick={onClose} className="font-semibold text-primary underline-offset-4 hover:underline">
                    Teknik şartnamenizi gönderin
                  </Link>
                  , size özel teklif hazırlayalım.
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link href={productHref(p)} onClick={onClose} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                        <span className="min-w-0">
                          <span className="block truncate font-semibold text-ink group-hover:text-primary">{p.name}</span>
                          <span className="mt-0.5 block text-[13px] text-muted">
                            {p.code} · {getCategory(p.categorySlug)?.name}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
