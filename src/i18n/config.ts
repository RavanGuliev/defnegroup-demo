/*
 * Sayt iki dillidir: Türkçe (əsas) və Azərbaycan dili.
 * Ünvanlar dil prefiksi ilə açılır: /tr/... və /az/... — slug-lar hər iki dildə eynidir.
 */
export const locales = ["tr", "az"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const hasLocale = (s: string | undefined): s is Locale => !!s && (locales as readonly string[]).includes(s);

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  tr: { short: "TR", name: "Türkçe", htmlLang: "tr", og: "tr_TR" },
  az: { short: "AZ", name: "Azərbaycanca", htmlLang: "az", og: "az_AZ" },
};

/** "/urunler" → "/az/urunler". Xarici, hash və artıq prefiksli ünvanlara toxunmur. */
export function withLocale(lang: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const first = href.split(/[/?#]/)[1];
  if (hasLocale(first)) return href;
  if (href === "/") return `/${lang}`;
  return href.startsWith("/?") || href.startsWith("/#") ? `/${lang}${href.slice(1)}` : `/${lang}${href}`;
}

/** "/az/urunler" → "/urunler" */
export function stripLocale(pathname: string) {
  const first = pathname.split("/")[1];
  if (!hasLocale(first)) return pathname;
  return pathname.slice(first.length + 1) || "/";
}
