/*
 * DEFNE GROUP Laravel API (defnegroup-api) ilə əlaqə.
 * NEXT_PUBLIC_API_URL (məs. http://127.0.0.1:8000/api/v1) təyin edilməyibsə formlar
 * simulyasiya rejimində işləyir — demo üçün.
 */
import type { Locale } from "@/i18n/config";

export const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

/** Saytdakı forma sahəsi → API sahəsi */
const fieldMap: Record<string, string> = {
  adSoyad: "name",
  gorev: "title",
  kurum: "organization",
  eposta: "email",
  telefon: "phone",
  il: "city",
  ilce: "district",
  teslimTarihi: "delivery_date",
  sonTeklifTarihi: "offer_deadline",
  mesaj: "message",
  konu: "subject",
  kvkk: "kvkk",
  website: "website",
};
const reverseMap = Object.fromEntries(Object.entries(fieldMap).map(([k, v]) => [v, k]));

export type ApiResult<T> = { ok: true; data: T } | { ok: false; errors: Record<string, string>; network?: boolean };

async function postForm<T>(path: string, lang: Locale, form: FormData): Promise<ApiResult<T>> {
  const body = new FormData();
  for (const [key, value] of form.entries()) {
    const k = fieldMap[key];
    if (k && value !== "") body.append(k, key === "kvkk" ? "1" : value);
  }
  for (const [key, value] of form.entries()) if (!fieldMap[key]) body.append(key, value);

  try {
    const res = await fetch(`${apiUrl}${path}?lang=${lang}`, { method: "POST", body, headers: { Accept: "application/json" } });
    const json = await res.json().catch(() => ({}));
    if (res.ok) return { ok: true, data: json as T };
    // Laravel validasiya xətaları: { errors: { email: ["..."], "files.0": ["..."] } }
    const errors: Record<string, string> = {};
    for (const [k, msgs] of Object.entries((json.errors ?? {}) as Record<string, string[]>)) {
      const site = reverseMap[k] ?? (k.startsWith("files") ? "dosyalar" : k.startsWith("items") ? "mesaj" : k);
      errors[site] ??= msgs[0];
    }
    return { ok: false, errors, network: !Object.keys(errors).length };
  } catch {
    return { ok: false, errors: {}, network: true };
  }
}

export type QuoteItemPayload = { slug: string; qty: number; unit?: string; note?: string };

function makeRequestNo() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `DG-${ymd}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

/** Təklif sorğusu: məhsullar JSON, fayllar `files[]` kimi göndərilir. */
export async function submitQuote(lang: Locale, form: FormData, items: QuoteItemPayload[], files: File[]): Promise<ApiResult<{ request_no: string }>> {
  if (!apiUrl) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, data: { request_no: makeRequestNo() } };
  }
  form.set("items", JSON.stringify(items.map(({ slug, qty, unit, note }) => ({ slug, qty, unit: unit ?? "Adet", note: note || undefined }))));
  files.forEach((f) => form.append("files[]", f));
  return postForm(`/quote-requests`, lang, form);
}

export async function submitContact(lang: Locale, form: FormData): Promise<ApiResult<{ ok: true }>> {
  if (!apiUrl) {
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true, data: { ok: true } };
  }
  return postForm(`/contact-messages`, lang, form);
}
