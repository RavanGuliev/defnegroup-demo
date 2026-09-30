"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/client";
import { getDict } from "@/i18n/dictionaries";
import Link from "./Link";

// Backend mərhələsində API-yə bağlanacaq.
export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const d = getDict(useLang());
  const q = d.quote;
  const t = d.contactForm;

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    if (String(fd.get("website") ?? "")) return;
    const e: Record<string, string> = {};
    for (const k of ["adSoyad", "eposta", "mesaj"]) if (!String(fd.get(k) ?? "").trim()) e[k] = q.required;
    const mail = String(fd.get("eposta") ?? "");
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.eposta = q.invalidEmail;
    if (!fd.get("kvkk")) e.kvkk = q.consentRequired;
    setErrors(e);
    if (Object.keys(e).length) {
      (ev.currentTarget.elements.namedItem(Object.keys(e)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-[8px] border border-primary/30 bg-primary-light p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <p className="type-h3 mt-4 text-ink">{t.doneTitle}</p>
        <p className="type-body mt-2">{t.doneText}</p>
      </div>
    );
  }

  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-hata` : undefined });
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-hata`} className="mt-1.5 text-[13px] font-medium text-red-700">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div>
        <label htmlFor="c-adSoyad" className="field-label">
          {q.name} <span className="text-red-700">*</span>
        </label>
        <input id="c-adSoyad" name="adSoyad" autoComplete="name" className="field-input" {...a11y("adSoyad")} />
        {err("adSoyad")}
      </div>
      <div>
        <label htmlFor="c-kurum" className="field-label">
          {q.org}
        </label>
        <input id="c-kurum" name="kurum" autoComplete="organization" className="field-input" />
      </div>
      <div>
        <label htmlFor="c-eposta" className="field-label">
          {q.email} <span className="text-red-700">*</span>
        </label>
        <input id="c-eposta" name="eposta" type="email" autoComplete="email" className="field-input" {...a11y("eposta")} />
        {err("eposta")}
      </div>
      <div>
        <label htmlFor="c-telefon" className="field-label">
          {q.phone}
        </label>
        <input id="c-telefon" name="telefon" type="tel" autoComplete="tel" className="field-input" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-konu" className="field-label">
          {t.subject}
        </label>
        <select id="c-konu" name="konu" className="field-input">
          {t.subjects.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-mesaj" className="field-label">
          {t.message} <span className="text-red-700">*</span>
        </label>
        <textarea id="c-mesaj" name="mesaj" rows={5} className="field-input resize-y" {...a11y("mesaj")} />
        {err("mesaj")}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.55] text-charcoal">
          <input type="checkbox" name="kvkk" className="mt-1 size-[18px] shrink-0 accent-primary" {...a11y("kvkk")} />
          <span>
            <Link href="/kvkk" target="_blank" className="font-semibold text-primary underline-offset-4 hover:underline">
              {q.consentLink}
            </Link>
            {t.consentTail}
          </span>
        </label>
        {err("kvkk")}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary min-h-[52px] w-full px-8 sm:w-auto">
          {status === "sending" ? q.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
