import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Download, FileText, Package } from "lucide-react";
import { AddToQuoteButton } from "@/components/AddToQuoteButton";
import { ProductCard } from "@/components/cards";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Breadcrumbs, CtaLink, FinalCta } from "@/components/ui";
import { getCategory, getProduct, getSector, productHref, products } from "@/lib/data";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ kategori: p.categorySlug, urun: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/urunler/[kategori]/[urun]">): Promise<Metadata> {
  const { urun } = await params;
  const p = getProduct(urun);
  if (!p) return {};
  return { title: `${p.name} (${p.code})`, description: p.summary, alternates: { canonical: productHref(p) } };
}

export default async function ProductPage({ params }: PageProps<"/urunler/[kategori]/[urun]">) {
  const { kategori, urun } = await params;
  const product = getProduct(urun);
  if (!product || product.categorySlug !== kategori) notFound();
  const category = getCategory(product.categorySlug)!;

  const similar = products
    .filter((p) => p.slug !== product.slug && (p.categorySlug === product.categorySlug || p.sectorSlugs.some((s) => product.sectorSlugs.includes(s))))
    .slice(0, 4);

  // Qiymət göstərilmir (sənəd, bölmə 6.1) — Product strukturlaşdırılmış məlumatı offer-siz
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    mpn: product.code,
    description: product.description,
    category: category.name,
    brand: { "@type": "Organization", name: site.name },
    url: `${site.url}${productHref(product)}`,
    additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <section className="bg-white pt-8 pb-14 sm:pt-10 lg:pt-14 lg:pb-20">
        <div className="container-site">
          <Breadcrumbs items={[{ label: "Ürünler", href: "/urunler" }, { label: category.name, href: `/urunler/${category.slug}` }, { label: product.name }]} />

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.images} name={product.name} icon={category.icon} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/urunler/${category.slug}`} className="type-kicker hover:underline">
                  {category.name}
                </Link>
                {product.isNew && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase">Yeni</span>}
              </div>
              <h1 className="mt-4 text-[clamp(28px,3.2vw,44px)] leading-[1.1] font-bold tracking-[-0.03em] text-ink">{product.name}</h1>
              <p className="mt-3 text-[14px] text-muted">
                Ürün kodu: <span className="font-semibold text-ink">{product.code}</span>
              </p>
              <p className="type-body mt-6">{product.description}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {product.features.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-[15px] text-charcoal">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[8px] border border-line bg-light p-5 sm:p-6">
                <p className="text-[15px] font-semibold text-ink">Bu ürün için fiyat teklifi alın</p>
                <p className="mt-1 text-[14px] text-muted">Ürünü Teklif Listenize ekleyin; adet ve notlarınızla birlikte tek formda gönderin.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <AddToQuoteButton slug={product.slug} className="sm:flex-1" />
                  <Link href="/teklif-listem#teklif-formu" className="btn-outline sm:flex-1">
                    Hemen Teklif İste
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="type-h3 text-ink">Teknik özellikler</h2>
            <table className="mt-5 w-full border-collapse overflow-hidden rounded-[8px] bg-white text-left text-[15px]">
              <caption className="sr-only">{product.name} teknik özellikleri</caption>
              <tbody>
                {[
                  { label: "Ürün kodu", value: product.code },
                  ...product.specs,
                  { label: "Kullanım alanı", value: product.usageAreas.join(", ") },
                  { label: "Ölçü ve varyantlar", value: product.variants.join(" · ") },
                  { label: "Paketleme", value: product.packaging },
                  { label: "Sektörler", value: product.sectorSlugs.map((s) => getSector(s)?.name).join(", ") },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-line last:border-b-0">
                    <th scope="row" className="w-[40%] px-5 py-4 align-top font-semibold text-ink">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-charcoal">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-10 text-[15px] font-semibold text-ink">Ölçü ve varyantlar</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <li key={v} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] text-charcoal">
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-h3 text-ink">Belgeler ve dokümanlar</h2>
            {product.documents.length ? (
              <ul className="mt-5 divide-y divide-line rounded-[8px] border border-line bg-white">
                {product.documents.map((d) => (
                  <li key={d.name} className="flex items-center gap-4 p-4 sm:p-5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[6px] bg-primary-light text-primary">
                      <FileText className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{d.name}</span>
                      <span className="text-[13px] text-muted">{d.type}</span>
                    </span>
                    <button type="button" disabled title="Doküman yakında eklenecek" className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-muted">
                      <Download className="size-4" aria-hidden /> İndir
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-[8px] border border-dashed border-line bg-white p-5 text-[14px] text-muted">
                Bu ürün için doküman talebinizi teklif formundan iletebilirsiniz.
              </p>
            )}
            <div className="mt-8 flex items-start gap-3 rounded-[8px] bg-white p-5 text-[14px] text-muted">
              <Package className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              Sertifika ve uygunluk belgeleri yalnızca onaylı ve güncel olduklarında yayımlanır.
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="container-site">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-kicker">Benzer ürünler</p>
                <h2 className="type-h2 mt-4 text-ink">Bunlar da ilginizi çekebilir</h2>
              </div>
              <CtaLink href={`/urunler/${category.slug}`}>{category.name}</CtaLink>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {similar.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
      <FinalCta />
    </>
  );
}
