"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useQuote } from "./QuoteProvider";

export function AddToQuoteButton({ slug, size = "md", className = "" }: { slug: string; size?: "sm" | "md"; className?: string }) {
  const { has, add } = useQuote();
  const inList = has(slug);

  if (size === "sm") {
    return inList ? (
      <Link
        href="/teklif-listem"
        className={`inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-primary ${className}`}
      >
        <Check className="size-4" aria-hidden /> Listede
      </Link>
    ) : (
      <button
        type="button"
        onClick={() => add(slug)}
        className={`inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-primary ${className}`}
      >
        <Plus className="size-4" aria-hidden /> Teklif Listesine Ekle
      </button>
    );
  }

  return inList ? (
    <Link href="/teklif-listem" className={`btn-outline border-primary text-primary ${className}`}>
      <Check className="size-4" aria-hidden /> Teklif Listenizde — Listeye Git
    </Link>
  ) : (
    <button type="button" onClick={() => add(slug)} className={`btn-primary ${className}`}>
      <Plus className="size-4" aria-hidden /> Teklif Listesine Ekle
    </button>
  );
}
