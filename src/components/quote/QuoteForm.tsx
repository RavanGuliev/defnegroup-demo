"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { CheckCircle2, FileUp, Minus, Plus, Trash2, X } from "lucide-react";
import { getCategory, getProduct, productHref } from "@/lib/data";
import { site } from "@/lib/site";
import { Media } from "../Media";
import { useQuote } from "../QuoteProvider";

/*
 * Teklif sorğusu (sənəd, bölmə 6.2).
 * Bu mərhələdə yalnız frontend: göndəriş simulyasiya olunur və unikal müraciət nömrəsi
 * brauzerdə yaradılır. Backend mərhələsində `submitQuote` API-yə bağlanacaq:
 * teklif@defnegroup.com-a e-poçt, admin panelində qeyd və təsdiq e-poçtu.
 * Statuslar: Yeni Talep → İnceleniyor → Teklif Hazırlanıyor → Teklif Gönderildi → Sonuçlandı
 */

const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp";
const MAX_FILE_MB = 10;
const MAX_FILES = 5;

type Errors = Partial<Record<string, string>>;

function makeRequestNo() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `DG-${ymd}-${rand}`;
}

// TODO(backend): POST /api/teklif — nömrə server tərəfində yaradılmalıdır
async function submitQuote(data: FormData): Promise<{ requestNo: string }> {
  void data;
  await new Promise((r) => setTimeout(r, 900));
  return { requestNo: makeRequestNo() };
}

export function QuoteList() {
  const { items, remove, update } = useQuote();

  if (!items.length) {
    return (
      <div className="rounded-[8px] border border-dashed border-line bg-light p-8 text-center sm:p-12">
        <p className="type-h3 text-ink">Teklif Listeniz boş</p>
        <p className="type-body mx-auto mt-3 max-w-[460px]">
          Ürün sayfalarından “Teklif Listesine Ekle” ile ürün ekleyebilir ya da doğrudan aşağıdaki formla şartnamenizi gönderebilirsiniz.
        </p>
        <Link href="/urunler" className="btn-primary mt-6">
          Ürünleri İnceleyin
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-line rounded-[8px] border border-line bg-white">
      {items.map((item) => {
        const p = getProduct(item.slug);
        if (!p) return null;
        const cat = getCategory(p.categorySlug);
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
                <span className="sr-only">{p.name} için not</span>
                <input
                  value={item.note}
                  onChange={(e) => update(item.slug, { note: e.target.value })}
                  placeholder="Not ekleyin (ölçü, renk, varyant…)"
                  className="w-full border-b border-line bg-transparent py-1.5 text-[14px] outline-none placeholder:text-muted/70 focus:border-primary"
                />
              </label>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
              <div className="inline-flex items-center rounded-[6px] border border-line">
                <button
                  type="button"
                  onClick={() => update(item.slug, { qty: Math.max(1, item.qty - 1) })}
                  aria-label="Adedi azalt"
                  className="inline-flex size-11 items-center justify-center text-charcoal hover:text-primary"
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <label>
                  <span className="sr-only">{p.name} adet</span>
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
                  aria-label="Adedi artır"
                  className="inline-flex size-11 items-center justify-center text-charcoal hover:text-primary"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                aria-label={`${p.name} ürününü listeden çıkar`}
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
        setFileError(`${f.name}: desteklenmeyen dosya türü.`);
        continue;
      }
      if (f.size > MAX_FILE_MB * 1024 * 1024) {
        setFileError(`${f.name}: en fazla ${MAX_FILE_MB} MB olabilir.`);
        continue;
      }
      if (next.length >= MAX_FILES) {
        setFileError(`En fazla ${MAX_FILES} dosya ekleyebilirsiniz.`);
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
    for (const k of req) if (!String(fd.get(k) ?? "").trim()) e[k] = "Bu alan zorunludur.";
    const mail = String(fd.get("eposta") ?? "");
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.eposta = "Geçerli bir e-posta adresi girin.";
    if (!fd.get("kvkk")) e.kvkk = "Devam etmek için onay vermeniz gerekir.";
    if (!items.length && !files.length && !String(fd.get("mesaj") ?? "").trim())
      e.mesaj = "Teklif Listenize ürün ekleyin, dosya yükleyin veya talebinizi yazın.";
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
    fd.set("urunler", JSON.stringify(items));
    files.forEach((f) => fd.append("dosyalar", f));
    setStatus("sending");
    const res = await submitQuote(fd);
    setRequestNo(res.requestNo);
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
        <p className="type-h3 mt-5 text-ink">Talebiniz alındı</p>
        <p className="mt-3 text-[15px] text-charcoal">
          Müracaat numaranız: <span className="font-bold tracking-wide whitespace-nowrap text-primary">{requestNo}</span>
        </p>
        <p className="type-body mx-auto mt-3 max-w-[520px]">
          Onay e-postası adresinize gönderildi. Talebiniz <strong className="text-ink">Yeni Talep</strong> durumuyla kaydedildi; ekibimiz
          inceleyerek sizinle iletişime geçecektir.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/urunler" className="btn-primary">
            Ürünlere Dön
          </Link>
          <button type="button" onClick={() => setStatus("idle")} className="btn-outline">
            Yeni Talep Oluştur
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
          Ad Soyad <span className="text-red-700">*</span>
        </label>
        <input id="adSoyad" name="adSoyad" autoComplete="name" className="field-input" {...a11y("adSoyad")} />
        {err("adSoyad")}
      </div>
      <div>
        <label htmlFor="gorev" className="field-label">
          Görev / Unvan
        </label>
        <input id="gorev" name="gorev" autoComplete="organization-title" className="field-input" />
      </div>
      <div>
        <label htmlFor="kurum" className="field-label">
          Kurum / Firma <span className="text-red-700">*</span>
        </label>
        <input id="kurum" name="kurum" autoComplete="organization" className="field-input" {...a11y("kurum")} />
        {err("kurum")}
      </div>
      <div>
        <label htmlFor="eposta" className="field-label">
          E-posta <span className="text-red-700">*</span>
        </label>
        <input id="eposta" name="eposta" type="email" autoComplete="email" className="field-input" {...a11y("eposta")} />
        {err("eposta")}
      </div>
      <div>
        <label htmlFor="telefon" className="field-label">
          Telefon <span className="text-red-700">*</span>
        </label>
        <input id="telefon" name="telefon" type="tel" autoComplete="tel" className="field-input" {...a11y("telefon")} />
        {err("telefon")}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="il" className="field-label">
            İl <span className="text-red-700">*</span>
          </label>
          <input id="il" name="il" autoComplete="address-level1" className="field-input" {...a11y("il")} />
          {err("il")}
        </div>
        <div>
          <label htmlFor="ilce" className="field-label">
            İlçe
          </label>
          <input id="ilce" name="ilce" autoComplete="address-level2" className="field-input" />
        </div>
      </div>
      <div>
        <label htmlFor="teslimTarihi" className="field-label">
          Talep edilen teslim tarihi
        </label>
        <input id="teslimTarihi" name="teslimTarihi" type="date" min={today} className="field-input" />
      </div>
      <div>
        <label htmlFor="sonTeklifTarihi" className="field-label">
          Son teklif verme tarihi
        </label>
        <input id="sonTeklifTarihi" name="sonTeklifTarihi" type="date" min={today} className="field-input" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="mesaj" className="field-label">
          Talep detayı
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          rows={5}
          placeholder="İhtiyacınızı, miktarları, teknik şartları veya listede olmayan ürünleri yazabilirsiniz."
          className="field-input resize-y"
          {...a11y("mesaj")}
        />
        {err("mesaj")}
      </div>

      <div className="sm:col-span-2">
        <p className="field-label" id="dosya-etiket">
          Dosya ekleri
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
          <span className="text-[15px] font-semibold text-ink">Dosya seçin veya buraya sürükleyin</span>
          <span id="dosya-bilgi" className="text-[13px] text-muted">
            Teknik şartname, ürün listesi, PDF, Word, Excel veya görsel · en fazla {MAX_FILES} dosya, her biri {MAX_FILE_MB} MB
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
                    aria-label={`${f.name} dosyasını kaldır`}
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
              KVKK Aydınlatma Metni
            </Link>
            ’ni okudum; kişisel verilerimin teklif talebimin yanıtlanması amacıyla işlenmesini kabul ediyorum.
          </span>
        </label>
        {err("kvkk")}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-muted">
          Talebiniz <span className="font-semibold text-ink">{site.contact.quoteEmail}</span> adresine iletilir.
        </p>
        <button type="submit" disabled={status === "sending"} className="btn-primary min-h-[52px] px-8">
          {status === "sending" ? "Gönderiliyor…" : `Teklif Talebini Gönder${items.length ? ` (${items.length} ürün)` : ""}`}
        </button>
      </div>
    </form>
  );
}
