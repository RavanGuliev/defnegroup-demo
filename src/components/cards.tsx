import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, pad2, productHref, productsInCategory, type Category, type Product } from "@/lib/data";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { Media } from "./Media";

/* Məhsul qrupu kartı — referans saytdakı 4:3 qaranlıq şəkil kartı */
export function CategoryCard({ category, index, priority }: { category: Category; index: number; priority?: boolean }) {
  const count = productsInCategory(category.slug).length;
  return (
    <Link
      href={`/urunler/${category.slug}`}
      className="group relative flex aspect-[4/3] flex-col overflow-hidden rounded-[6px] border border-line/60 bg-night text-white transition-[border-color,box-shadow] duration-300 hover:border-white/30 hover:shadow-[0_18px_40px_-24px_rgba(16,36,63,0.6)]"
    >
      <Media src={category.image} alt={category.name} icon={category.icon} priority={priority} />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(19,23,28,0.88)_0%,rgba(19,23,28,0.3)_50%,rgba(19,23,28,0.05)_100%)]" aria-hidden />
      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
      <div className="relative flex h-full flex-col p-3.5 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold tracking-[0.16em] text-[#6fd3a8] uppercase sm:text-[11px]">{pad2(index + 1)}</p>
          {count > 0 && <p className="text-[10px] font-medium tracking-[0.12em] text-white/70 uppercase sm:text-[11px]">{pad2(count)} ürün</p>}
        </div>
        <div className="mt-auto">
          <h3 className="max-w-[18ch] text-[14px] leading-[1.2] font-semibold tracking-[-0.01em] uppercase sm:text-[16px] lg:text-[17px]">
            {category.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 hidden text-[13px] leading-[1.5] text-white/72 sm:block">{category.short}</p>
          <span className="mt-2.5 inline-flex min-h-9 items-center gap-1.5 text-[13px] font-semibold sm:mt-3 sm:text-[14px]">
            Ürünleri Gör
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const cat = getCategory(product.categorySlug);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(16,36,63,0.45)]">
      <Link href={productHref(product)} className="relative block aspect-[4/3] overflow-hidden bg-light" tabIndex={-1} aria-hidden>
        <Media src={product.images?.[0]} alt="" icon={cat?.icon} variant="light" iconClassName="size-14" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">Yeni</span>
          )}
          {index !== undefined && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-ink">{pad2(index + 1)}</span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">{product.code}</p>
        <h3 className="mt-2 text-[16px] leading-[1.3] font-semibold tracking-[-0.01em] text-ink sm:text-[17px]">
          <Link href={productHref(product)} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 mb-4 line-clamp-2 text-[14px] leading-[1.55] text-muted">{product.summary}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 border-t border-line pt-3">
          <Link href={productHref(product)} className="group/l inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-primary">
            İncele <ArrowRight className="size-4 transition-transform group-hover/l:translate-x-1" aria-hidden />
          </Link>
          <AddToQuoteButton slug={product.slug} size="sm" />
        </div>
      </div>
    </article>
  );
}
