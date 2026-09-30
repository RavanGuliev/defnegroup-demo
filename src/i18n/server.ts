import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { hasLocale, locales, type Locale } from "./config";

/** Server komponentlərdə cari dil (root layout-dakı [lang] seqmentindən). */
export async function getLang(): Promise<Locale> {
  const l = await rootLang();
  if (!hasLocale(l)) notFound();
  return l;
}

/** Səhifə metadata-sı: dilə uyğun canonical + hreflang alternativləri. */
export async function pageMeta(path: string, meta: Omit<Metadata, "alternates"> = {}): Promise<Metadata> {
  const lang = await getLang();
  const p = path === "/" ? "" : path;
  return {
    ...meta,
    alternates: {
      canonical: `/${lang}${p}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${p}`])), "x-default": `/tr${p}` },
    },
  };
}
