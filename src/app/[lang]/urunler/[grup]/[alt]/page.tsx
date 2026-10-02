import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "@/components/Link";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { EmptyState, FinalCta } from "@/components/ui";
import { pageMeta } from "@/i18n/server";
import { groupHref, subHref } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    kicker: "Alt kategori",
    metaDescription: (g: string, s: string) => `${g} grubunda ${s} ürünleri.`,
    subsOf: (g: string) => `${g} alt kategorileri`,
    emptyTitle: "Bu alt kategorinin ürünleri hazırlanıyor",
    emptyText: "Ürün bilgileri ve görselleri onaylandıktan sonra burada yayımlanacak. İhtiyacınızı şimdiden teklif formundan iletebilirsiniz.",
  },
  en: {
    kicker: "Subcategory",
    metaDescription: (g: string, s: string) => `${s} products in the ${g} group.`,
    subsOf: (g: string) => `${g} subcategories`,
    emptyTitle: "Products in this subcategory are being prepared",
    emptyText: "Product information and images will be published here once approved. You can already send your request using the quote form.",
  },
};

export async function generateStaticParams() {
  return (await getDb("tr")).subcategories.map((s) => ({ grup: s.groupSlug, alt: s.slug }));
}

async function resolve(params: PageProps<"/[lang]/urunler/[grup]/[alt]">["params"]) {
  const { grup, alt } = await params;
  const d = (await getDb());
  const group = d.getGroup(grup);
  const sub = group && d.getSubBySlug(group.code, alt);
  return group && sub ? { group, sub, d } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/urunler/[grup]/[alt]">): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const name = r.d.subName(r.sub);
  return pageMeta(subHref(r.sub), {
    title: `${name} | ${r.group.name}`,
    description: (await pageCopy("pages.urunler.grup.alt", copy, r.d.lang)).metaDescription(r.group.name, name),
    // Adı təsdiqlənməyən alt bölmə hazırlıq statusundadır — indekslənmir
    ...(r.sub.pending && { robots: { index: false, follow: true } }),
  });
}

/* Alt bölmə səhifəsi — bu bölməyə aid məhsullar; sektor/istifadə filtrləri köməkçidir */
export default async function SubcategoryPage({ params }: PageProps<"/[lang]/urunler/[grup]/[alt]">) {
  const r = await resolve(params);
  if (!r) notFound();
  const { group, sub } = r;
  const { productsInSub, subName, subsOfGroup, lang } = r.d;
  const t = (await pageCopy("pages.urunler.grup.alt", copy, lang));
  const dict = (await getDictionary(lang));
  const list = productsInSub(sub.code);
  const siblings = subsOfGroup(group.code);

  return (
    <>
      <CatalogHeader
        kicker={`${sub.code} — ${t.kicker}`}
        title={subName(sub)}
        crumbs={[{ label: dict.nav.productGroups, href: "/urunler" }, { label: group.name, href: groupHref(group) }, { label: subName(sub) }]}
        meta={sub.pending ? dict.cards.preparing : dict.cards.productCount(list.length)}
      >
        <nav aria-label={t.subsOf(group.name)} className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.code}>
                <Link
                  href={subHref(s)}
                  aria-current={s.code === sub.code ? "page" : undefined}
                  className={`inline-flex min-h-10 items-center rounded-[6px] border px-3 text-left text-[14px] leading-[1.3] font-medium transition-colors ${
                    s.code === sub.code ? "border-primary bg-primary text-white" : "border-line bg-white text-charcoal hover:border-ink"
                  }`}
                >
                  <span className="mr-1.5 text-[12px] opacity-70">{s.code}</span>
                  {subName(s)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </CatalogHeader>

      <section className="bg-white py-8 sm:py-10 lg:py-14">
        <div className="container-site">
          {list.length ? (
            <Suspense>
              <ProductExplorer locked baseProducts={list} />
            </Suspense>
          ) : (
            <EmptyState
              title={t.emptyTitle}
              text={t.emptyText}
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href={groupHref(group)} className="btn-outline">
                    {group.name}
                  </Link>
                  <Link href="/teklif-listem#teklif-formu" className="btn-primary">
                    {dict.common.createQuoteRequest}
                  </Link>
                </div>
              }
            />
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
