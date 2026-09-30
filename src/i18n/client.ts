"use client";

import { useParams } from "next/navigation";
import { defaultLocale, hasLocale, type Locale } from "./config";

/** Client komponentlərdə cari dil. */
export function useLang(): Locale {
  const { lang } = useParams<{ lang?: string }>();
  return hasLocale(lang) ? lang : defaultLocale;
}
