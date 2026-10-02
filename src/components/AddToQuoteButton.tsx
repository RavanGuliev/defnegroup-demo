"use client";

import { useDict } from "@/components/SiteData";
import { Check, Plus } from "lucide-react";
import Link from "./Link";
import { useQuote } from "./QuoteProvider";

export function AddToQuoteButton({ slug, size = "md", className = "" }: { slug: string; size?: "sm" | "md"; className?: string }) {
  const { has, add } = useQuote();
  const inList = has(slug);
  const t = useDict().quoteButton;

  if (size === "sm") {
    return inList ? (
      <Link
        href="/teklif-listem"
        className={`inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-primary ${className}`}
      >
        <Check className="size-4" aria-hidden /> {t.inList}
      </Link>
    ) : (
      <button
        type="button"
        onClick={() => add(slug)}
        className={`inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-primary ${className}`}
      >
        <Plus className="size-4" aria-hidden /> {t.add}
      </button>
    );
  }

  return inList ? (
    <Link href="/teklif-listem" className={`btn-outline border-primary text-primary ${className}`}>
      <Check className="size-4" aria-hidden /> {t.inListLong}
    </Link>
  ) : (
    <button type="button" onClick={() => add(slug)} className={`btn-primary ${className}`}>
      <Plus className="size-4" aria-hidden /> {t.add}
    </button>
  );
}
