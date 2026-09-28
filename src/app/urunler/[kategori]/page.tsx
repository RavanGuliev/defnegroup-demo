import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { CtaLink, FinalCta } from "@/components/ui";
import { categories, getCategory, pad2, productsInCategory, solutions } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/urunler/[kategori]">): Promise<Metadata> {
  const { kategori } = await params;
  const c = getCategory(kategori);
  if (!c) return {};
  return { title: c.name, description: c.description, alternates: { canonical: `/urunler/${c.slug}` } };
}

export default async function CategoryPage({ params }: PageProps<"/urunler/[kategori]">) {
  const { kategori } = await params;
  const category = getCategory(kategori);
  if (!category) notFound();
  const list = productsInCategory(category.slug);
  const index = categories.findIndex((c) => c.slug === category.slug);
  const related = solutions.filter((s) => s.categorySlugs.includes(category.slug));

  return (
    <>
      <CatalogHeader
        kicker={`${pad2(index + 1)} — Ürün grubu`}
        title={category.name}
        text={category.description}
        crumbs={[{ label: "Ürünler", href: "/urunler" }, { label: category.name }]}
        activeSlug={category.slug}
        meta={`${pad2(list.length)} ürün`}
      />
      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container-site">
          <Suspense>
            <ProductExplorer lockedCategory={category.slug} baseProducts={list} />
          </Suspense>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-20">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="type-kicker">İlgili çözümler</p>
              <h2 className="type-h2 mt-4 text-ink">Bu ürün grubunu içeren çözüm alanları</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/cozum-alanlari/${s.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-[17px] font-semibold text-ink group-hover:text-primary">{s.name}</span>
                      <span className="mt-1 block text-[14px] text-muted">{s.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="container-site mt-10">
            <CtaLink href="/urunler">Tüm ürün gruplarını keşfedin</CtaLink>
          </div>
        </section>
      )}
      <FinalCta />
    </>
  );
}
