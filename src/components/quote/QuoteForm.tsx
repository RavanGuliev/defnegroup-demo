"use client";

import { useDb, useDict, useSite } from "@/components/SiteData";
import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Minus, Plus, Trash2, X } from "lucide-react";
import { useLang } from "@/i18n/client";
import { submitQuote } from "@/lib/api";
import { productHref } from "@/lib/data";
import Link from "../Link";
import { Media } from "../Media";
import { quoteUnits, useQuote } from "../QuoteProvider";

/*
 * Teklif sorğusu (sənəd, bölmə 6.2).
 * Göndəriş Laravel API-yə gedir (src/lib/api.ts): sorğu panelə yazılır, müraciət nömrəsi
 * serverdə yaradılır, DEFNE-yə bildiriş və müştəriyə təsdiq e-poçtu göndərilir.
 * Statuslar: Yeni Talep → İnceleniyor → Teklif Hazırlanıyor → Teklif Gönderildi → Sonuçlandı
 */

const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp";
const MAX_FILE_MB = 10;
const MAX_FILES = 5;

type Errors = Partial<Record<string, string>>;

export function QuoteList() {
  const { items, remove, update } = useQuote();
  const t = useDict().quote;
  const { getProduct, productGroup } = useDb();

  if (!items.length) {
    return (
      <div className="rounded-[8px] border border-dashed border-line bg-light p-8 text-center sm:p-12">
        <p className="type-h3 text-ink">{t.emptyTitle}</p>
        <p className="type-body mx-auto mt-3 max-w-[460px]">
          {t.emptyText}
        </p>
        <Link href="/urunler" className="btn-primary mt-6">
          {t.browse}
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-line rounded-[8px] border border-line bg-white">
      {items.map((item) => {
        const p = getProduct(item.slug);
        if (!p) return null;
        const cat = productGroup(p);
        return (
          <li key={item.slug} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 p-4 sm:grid-cols-[96px_minmax(0,1fr)_auto] sm:items-center sm:p-5">
            <div className="relative aspect-square overflow-hidden rounded-[6px] bg-light">
              <Media src={p.images?.[0]} alt="" icon={cat?.icon} variant="light" sizes="96px" iconClassName="size-8" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">{p.code}</p>
              <Link href={productHref(p)} className="mt-1 block font-semibold text-ink hover:text-primary">
                {p.name}
              </Link>
              <label className="mt-2 block">
                <span className="sr-only">{t.noteFor(p.name)}</span>
                <input
                  value={item.note}
                  onChange={(e) => update(item.slug, { note: e.target.value })}
                  placeholder={t.notePlaceholder}
                  className="w-full border-b border-line bg-transparent py-1.5 text-[14px] outline-none placeholder:text-muted/70 focus:border-primary"
                />
              </label>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-2 sm:col-span-1 sm:justify-end">
              <div className="inline-flex items-center rounded-[6px] border border-line">
                <button
                  type="button"
                  onClick={() => update(item.slug, { qty: Math.max(1, item.qty - 1) })}
                  aria-label={t.decrease}
                  className="inline-flex size-11 items-center justify-center text-charcoal hover:text-primary"
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <label>
                  <span className="sr-only">{t.qtyFor(p.name)}</span>
                  <input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={item.qty}
                    onChange={(e) => update(item.slug, { qty: Math.max(1, Number(e.target.value) || 1) })}
                    className="w-14 bg-transparent text-center text-[15px] font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => update(item.slug, { qty: item.qty + 1 })}
                  aria-label={t.increase}
                  className="inline-flex size-11 items-center justify-center text-charcoal hover:text-primary"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
              <label>
                <span className="sr-only">{t.unitFor(p.name)}</span>
                <select
                  value={item.unit ?? "Adet"}
                  onChange={(e) => update(item.slug, { unit: e.target.value })}
                  className="min-h-11 rounded-[6px] border border-line bg-white px-2 text-[14px] font-medium text-ink outline-none focus:border-primary"
                >
                  {quoteUnits.map((u) => (
                    <option key={u} value={u}>
                      {t.units[u] ?? u}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                aria-label={t.removeFrom(p.name)}
                className="inline-flex size-11 items-center justify-center text-muted hover:text-red-600"
              >
                <Trash2 className="size-5" aria-hidden />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function QuoteForm() {
  const { items, clear } = useQuote();
  const lang = useLang();
  const t = useDict().quote;
  const site = useSite();
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [requestNo, setRequestNo] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const today = new Date().toISOString().slice(0, 10);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFileError("");
    const next = [...files];
    for (const f of Array.from(list)) {
      const ext = "." + f.name.split(".").pop()?.toLowerCase();
      if (!ACCEPT.split(",").includes(ext)) {
        setFileError(t.badType(f.name));
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setFileError(t.tooBig(f.name, MAX_FILE_MB));
        continue;
      }
      if (next.length >= MAX_FILES) {
        setFileError(t.tooMany(MAX_FILES));
        break;
      }
      next.push(f);
    }
    setFiles(next);
    if (fileRef.current) fileRef.current.value = "";
  }

  function validate(fd: FormData) {
    const e: Errors = {};
    const req = ["adSoyad", "kurum", "eposta", "telefon", "il"];
    for (const k of req) if (!String(fd.get(k) ?? "").trim()) e[k] = t.required;
    const mail = String(fd.get("eposta") ?? "");
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.eposta = t.invalidEmail;
    if (!fd.get("kvkk")) e.kvkk = t.consentRequired;
    if (!items.length && !files.length && !String(fd.get("mesaj") ?? "").trim())
      e.mesaj = t.needContent;
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (String(fd.get("website") ?? "")) return; // bot tələsi
    const e = validate(fd);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      (ev.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    const res = await submitQuote(lang, fd, items, files);
    if (!res.ok) {
      setStatus("idle");
      if (res.network) {
        setErrors({ form: t.networkError });
        return;
      }
      setErrors(res.errors);
      const first = Object.keys(res.errors)[0];
      if (first === "dosyalar") setFileError(res.errors.dosyalar ?? "");
      else (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setRequestNo(res.data.request_no);
    setStatus("done");
    clear();
    setFiles([]);
    formRef.current?.reset();
    window.scrollTo({ top: (document.getElementById("teklif-formu")?.offsetTop ?? 0) - 100, behavior: "smooth" });
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-[8px] border border-primary/30 bg-primary-light p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto size-14 text-primary" aria-hidden />
        <p className="type-h3 mt-5 text-ink">{t.doneTitle}</p>
        <p className="mt-3 text-[15px] text-charcoal">
          {t.requestNo} <span className="font-bold tracking-wide whitespace-nowrap text-primary">{requestNo}</span>
        </p>
        <p className="type-body mx-auto mt-3 max-w-[520px]">
          {t.doneTextA} <strong className="text-ink">{t.doneStatus}</strong> {t.doneTextB}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/urunler" className="btn-primary">
            {t.backToProducts}
          </Link>
          <button type="button" onClick={() => setStatus("idle")} className="btn-outline">
            {t.newRequest}
          </button>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-hata`} className="mt-1.5 text-[13px] font-medium text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-hata` : undefined });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div>
        <label htmlFor="adSoyad" className="field-label">
          {t.name} <span className="text-red-700">*</span>
        </label>
        <input id="adSoyad" name="adSoyad" autoComplete="name" className="field-input" {...a11y("adSoyad")} />
        {err("adSoyad")}
      </div>
      <div>
        <label htmlFor="gorev" className="field-label">
          {t.title}
        </label>
        <input id="gorev" name="gorev" autoComplete="organization-title" className="field-input" />
      </div>
      <div>
        <label htmlFor="kurum" className="field-label">
          {t.org} <span className="text-red-700">*</span>
        </label>
        <input id="kurum" name="kurum" autoComplete="organization" className="field-input" {...a11y("kurum")} />
        {err("kurum")}
      </div>
      <div>
        <label htmlFor="eposta" className="field-label">
          {t.email} <span className="text-red-700">*</span>
        </label>
        <input id="eposta" name="eposta" type="email" autoComplete="email" className="field-input" {...a11y("eposta")} />
        {err("eposta")}
      </div>
      <div>
        <label htmlFor="telefon" className="field-label">
          {t.phone} <span className="text-red-700">*</span>
        </label>
        <input id="telefon" name="telefon" type="tel" autoComplete="tel" className="field-input" {...a11y("telefon")} />
        {err("telefon")}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="il" className="field-label">
            {t.city} <span className="text-red-700">*</span>
          </label>
          <input id="il" name="il" autoComplete="address-level1" className="field-input" {...a11y("il")} />
          {err("il")}
        </div>
        <div>
          <label htmlFor="ilce" className="field-label">
            {t.district}
          </label>
          <input id="ilce" name="ilce" autoComplete="address-level2" className="field-input" />
        </div>
      </div>
      <div>
        <label htmlFor="teslimTarihi" className="field-label">
          {t.deliveryDate}
        </label>
        <input id="teslimTarihi" name="teslimTarihi" type="date" min={today} className="field-input" />
      </div>
      <div>
        <label htmlFor="sonTeklifTarihi" className="field-label">
          {t.offerDeadline}
        </label>
        <input id="sonTeklifTarihi" name="sonTeklifTarihi" type="date" min={today} className="field-input" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="mesaj" className="field-label">
          {t.details}
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={5}
          placeholder={t.detailsPlaceholder}
          className="field-input resize-y"
          {...a11y("mesaj")}
        />
        {err("mesaj")}
      </div>

      <div className="sm:col-span-2">
        <p className="field-label" id="dosya-etiket">
          {t.attachments}
        </p>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
          aria-describedby="dosya-etiket dosya-bilgi"
          className="flex w-full flex-col items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-line bg-light px-6 py-8 text-center transition-colors hover:border-primary"
        >
          <FileUp className="size-7 text-primary" aria-hidden />
          <span className="text-[15px] font-semibold text-ink">{t.dropFiles}</span>
          <span id="dosya-bilgi" className="text-[13px] text-muted">
            {t.fileHint(MAX_FILES, MAX_FILE_MB)}
          </span>
        </button>
        <input ref={fileRef} type="file" multiple accept={ACCEPT} onChange={(e) => addFiles(e.target.files)} className="sr-only" tabIndex={-1} aria-hidden />
        {fileError && <p className="mt-2 text-[13px] font-medium text-red-700">{fileError}</p>}
        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between gap-3 rounded-[6px] border border-line bg-white px-4 py-2 text-[14px]">
                <span className="min-w-0 truncate">{f.name}</span>
                <span className="flex shrink-0 items-center gap-2 text-muted">
                  {(f.size / 1024 / 1024).toFixed(1)} MB
                  <button
                    type="button"
                    onClick={() => setFiles(files.filter((_, j) => j !== i))}
                    aria-label={t.removeFile(f.name)}
                    className="inline-flex size-9 items-center justify-center hover:text-red-600"
                  >
                    <X className="size-4" aria-hidden />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.55] text-charcoal">
          <input type="checkbox" name="kvkk" className="mt-1 size-[18px] shrink-0 accent-primary" {...a11y("kvkk")} />
          <span>
            <Link href="/kvkk" className="font-semibold text-primary underline-offset-4 hover:underline" target="_blank">
              {t.consentLink}
            </Link>
            {t.consentTail}
          </span>
        </label>
        {err("kvkk")}
      </div>

      {errors.form && (
        <p role="alert" className="rounded-[6px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-800 sm:col-span-2">
          {errors.form}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">
          {t.sentToA} <span className="font-semibold text-ink">{site.contact.quoteEmail}</span> {t.sentToB}
        </p>
        <button type="submit" disabled={status === "sending"} className="btn-primary min-h-[52px] px-8">
          {status === "sending" ? t.sending : t.submit(items.length)}
        </button>
      </div>
    </form>
  );
}
