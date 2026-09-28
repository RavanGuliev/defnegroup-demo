"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

/*
 * Teklif Listem — qeydiyyat olmadan məhsul siyahısı (sənəd, bölmə 6.2).
 * Siyahı brauzerdə (localStorage) saxlanır və açıq tablar arasında sinxron qalır;
 * göndəriş backend mərhələsində API-yə bağlanacaq.
 */

export type QuoteItem = { slug: string; qty: number; note: string };

const KEY = "defne-teklif-listem";
const EMPTY: QuoteItem[] = [];
const listeners = new Set<() => void>();
let cache: QuoteItem[] | null = null;

function read(): QuoteItem[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as QuoteItem[]) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: QuoteItem[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

type QuoteCtx = {
  items: QuoteItem[];
  count: number;
  has: (slug: string) => boolean;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  update: (slug: string, patch: Partial<Omit<QuoteItem, "slug">>) => void;
  clear: () => void;
};

const Ctx = createContext<QuoteCtx | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);

  const add = useCallback((slug: string, qty = 1) => {
    const prev = read();
    write(
      prev.some((i) => i.slug === slug)
        ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { slug, qty, note: "" }],
    );
  }, []);
  const remove = useCallback((slug: string) => write(read().filter((i) => i.slug !== slug)), []);
  const update = useCallback(
    (slug: string, patch: Partial<Omit<QuoteItem, "slug">>) => write(read().map((i) => (i.slug === slug ? { ...i, ...patch } : i))),
    [],
  );
  const clear = useCallback(() => write(EMPTY), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      has: (slug: string) => items.some((i) => i.slug === slug),
      add,
      remove,
      update,
      clear,
    }),
    [items, add, remove, update, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
