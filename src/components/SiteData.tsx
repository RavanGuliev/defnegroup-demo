"use client";

import { createContext, useContext, useMemo } from "react";
import { getDict, type Dictionary } from "@/i18n/dictionaries";
import { makeDb, mergeCopy, pick, type Db, type RawData } from "@/lib/store";

/*
 * Serverdə API-dən yüklənmiş məlumat client komponentlərə (header, kartlar, formlar, axtarış)
 * bu provider ilə ötürülür; funksiyalar (axtarış, keçidlər) brauzerdə yenidən qurulur.
 */
type Value = { db: Db; dict: Dictionary; raw: RawData };
const Ctx = createContext<Value | null>(null);

export function SiteDataProvider({ raw, children }: { raw: RawData; children: React.ReactNode }) {
  const value = useMemo(() => ({ db: makeDb(raw), dict: mergeCopy(getDict(raw.lang), raw.content), raw }), [raw]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function useValue() {
  const v = useContext(Ctx);
  if (!v) throw new Error("SiteDataProvider tapılmadı");
  return v;
}

export const useDb = () => useValue().db;
export const useDict = () => useValue().dict;
export const useSite = () => useValue().db.site;

/** Client səhifələr üçün səhifə mətni + paneldəki dəyişikliklər. */
export function usePageCopy<T>(path: string, base: Record<"tr" | "en", T>): T {
  const { raw } = useValue();
  return useMemo(() => mergeCopy(base[raw.lang], pick(raw.content, path), path), [raw, path, base]);
}
