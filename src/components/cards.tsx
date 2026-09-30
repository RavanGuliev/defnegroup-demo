"use client";

import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/client";
import { getDict } from "@/i18n/dictionaries";
import {
  db,
  groupHref,
  pad2,
  productHref,
  subHref,
  type Group,
  type Product,
  type Subcategory,
} from "@/lib/data";
import { AddToQuoteButton } from "./AddToQuoteButton";
import Link from "./Link";
import { Media } from "./Media";

/*
 * Əsas qrup kartı — şəkil, tam ad (üç nöqtə ilə kəsilmir) və “Alt Kategorileri İncele”.
 * Kartın özü də qrup səhifəsinə aparır; saylar məlumatdan avtomatik hesablanır.
 */
export function GroupCard({ group, priority }: { group: Group; priority?: boolean }) {
  const lang = useLang();
  const t = getDict(lang).cards;
  const { subsOfGroup, productsInGroup } = db(lang);
  const subCount = subsOfGroup(group.code).length;
  const productCount = productsInGroup(group.code).length;
  return (
    <Link
      href={groupHref(group)}
      className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_18px_40px_-28px_rgba(16,36,63,0.45)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-night">
        <Media src={group.image} alt={group.name} icon={group.icon} priority={priority} iconClassName="size-14 sm:size-16" />
        <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] text-ink">{group.code}</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[18px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink sm:text-[19px]">{group.name}</h3>
        <p className="mt-3 text-[13px] font-medium text-charcoal">
          {t.subCount(subCount)}
          {productCount > 0 && ` · ${t.productCount(productCount)}`}
        </p>
        <span className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-[14px] font-semibold text-primary">
          {t.exploreSubs}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/* Alt bölmə kartı — adı hələ təsdiqlənməyən bölmə “Hazırlanıyor” statusu ilə göstərilir */
export function SubcategoryCard({ sub }: { sub: Subcategory }) {
  const lang = useLang();
  const t = getDict(lang).cards;
  const { productsInSub, subName } = db(lang);
  const count = productsInSub(sub.code).length;
  return (
    <Link
      href={subHref(sub)}
      className="group flex h-full min-h-[132px] flex-col rounded-[6px] border border-line bg-white p-4 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_18px_40px_-28px_rgba(16,36,63,0.45)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[12px] font-bold tracking-[0.12em] text-primary">{sub.code}</span>
        {sub.pending ? (
          <span className="rounded-full bg-light px-2.5 py-0.5 text-[11px] font-semibold text-muted">{t.preparing}</span>
        ) : (
          count > 0 && <span className="text-[12px] font-medium text-muted">{t.productCount(count)}</span>
        )}
      </div>
      <h3 className={`mt-3 text-[18px] leading-[1.3] font-semibold tracking-[-0.01em] ${sub.pending ? "text-muted" : "text-ink group-hover:text-primary"}`}>
        {subName(sub)}
      </h3>
      <span className="mt-auto inline-flex min-h-10 items-center gap-1.5 pt-3 text-[14px] font-semibold text-ink group-hover:text-primary">
        {count > 0 ? t.seeProducts : t.inspect}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const lang = useLang();
  const t = getDict(lang).cards;
  const group = db(lang).productGroup(product);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(16,36,63,0.45)]">
      <Link href={productHref(product)} className="relative block aspect-[4/3] overflow-hidden bg-light" tabIndex={-1} aria-hidden>
        <Media src={product.images?.[0]} alt="" icon={group.icon} variant="light" iconClassName="size-14" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.sample && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">{t.sample}</span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">{t.isNew}</span>
          )}
          {index !== undefined && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-ink">{pad2(index + 1)}</span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">{product.code}</p>
        <h3 className="mt-2 text-[18px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink">
          <Link href={productHref(product)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 mb-4 text-[14px] leading-[1.55] text-muted">{product.summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 border-t border-line pt-3">
          <Link href={productHref(product)} className="group/l inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-ink hover:text-primary">
            {t.inspectProduct} <ArrowRight className="size-4 transition-transform group-hover/l:translate-x-1" aria-hidden />
          </Link>
          <AddToQuoteButton slug={product.slug} size="sm" />
        </div>
      </div>
    </article>
  );
}
