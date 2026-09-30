import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Download, FileText, Package } from "lucide-react";
import { AddToQuoteButton } from "@/components/AddToQuoteButton";
import { ProductCard } from "@/components/cards";
import Link from "@/components/Link";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Breadcrumbs, CtaLink, FinalCta } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { db, groupHref, productHref, products, subHref } from "@/lib/data";
import { site } from "@/lib/site";

const copy = {
  tr: {
    code: "Ürün kodu",
    sampleNote: "Örnek ürün kaydıdır; onaylı ürün ailesi bilgileri ve görselleri eklendiğinde güncellenecektir.",
    quoteTitle: "Bu ürün için fiyat teklifi alın",
    quoteText: "Ürünü Teklif Listenize ekleyin; adet ve notlarınızla birlikte tek formda gönderin.",
    quoteNow: "Hemen Teklif İste",
    specs: "Teknik özellikler",
    specsOf: (n: string) => `${n} teknik özellikleri`,
    usage: "Kullanım alanı",
    variants: "Ölçü ve varyantlar",
    packaging: "Paketleme",
    sectors: "Sektörler",
    docs: "Belgeler ve dokümanlar",
    docSoon: "Doküman yakında eklenecek",
    noDocs: "Bu ürün için doküman talebinizi teklif formundan iletebilirsiniz.",
    certNote: "Sertifika ve uygunluk belgeleri yalnızca onaylı ve güncel olduklarında yayımlanır.",
    similarKicker: "Benzer ürünler",
    similar: "Bunlar da ilginizi çekebilir",
  },
  az: {
    code: "Məhsul kodu",
    sampleNote: "Nümunə məhsul qeydidir; təsdiqlənmiş məhsul ailəsi məlumatları və şəkilləri əlavə edildikdə yenilənəcək.",
    quoteTitle: "Bu məhsul üçün qiymət təklifi alın",
    quoteText: "Məhsulu Təklif Siyahınıza əlavə edin; say və qeydlərinizlə birlikdə bir formada göndərin.",
    quoteNow: "Dərhal Təklif İstə",
    specs: "Texniki xüsusiyyətlər",
    specsOf: (n: string) => `${n} texniki xüsusiyyətləri`,
    usage: "İstifadə sahəsi",
    variants: "Ölçü və variantlar",
    packaging: "Qablaşdırma",
    sectors: "Sektorlar",
    docs: "Sənədlər",
    docSoon: "Sənəd tezliklə əlavə ediləcək",
    noDocs: "Bu məhsul üçün sənəd tələbinizi təklif forması ilə göndərə bilərsiniz.",
    certNote: "Sertifikat və uyğunluq sənədləri yalnız təsdiqlənmiş və aktual olduqda dərc olunur.",
    similarKicker: "Oxşar məhsullar",
    similar: "Bunlar da maraqlı ola bilər",
  },
};

export function generateStaticParams() {
  return products.map((p) => {
    const [, , grup, alt, urun] = productHref(p).split("/");
    return { grup, alt, urun };
  });
}

export async function generateMetadata({ params }: PageProps<"/[lang]/urunler/[grup]/[alt]/[urun]">): Promise<Metadata> {
  const { urun } = await params;
  const p = db(await getLang()).getProduct(urun);
  if (!p) return {};
  return pageMeta(productHref(p), { title: `${p.name} (${p.code})`, description: p.summary });
}

export default async function ProductPage({ params }: PageProps<"/[lang]/urunler/[grup]/[alt]/[urun]">) {
  const { grup, alt, urun } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const dict = getDict(lang);
  const { getProduct, getSector, getSub, productGroup, subName, products } = db(lang);
  const product = getProduct(urun);
  // Hər məhsulun bir əsas səhifəsi var — başqa yoldan açılmır
  if (!product || productHref(product) !== `/urunler/${grup}/${alt}/${urun}`) notFound();
  const group = productGroup(product);
  const sub = getSub(product.subCode)!;

  const similar = products
    .filter((p) => p.slug !== product.slug && (p.subCode === product.subCode || p.sectorSlugs.some((s) => product.sectorSlugs.includes(s))))
    .slice(0, 4);

  // Qiymət göstərilmir (sənəd, bölmə 6.1) — Product strukturlaşdırılmış məlumatı offer-siz
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    mpn: product.code,
    description: product.description,
    category: `${group.name} > ${subName(sub)}`,
    brand: { "@type": "Organization", name: site.name },
    url: `${site.url}/${lang}${productHref(product)}`,
    additionalProperty: product.specs.map((s) => ({ "@type": "PropertyValue", name: s.label, value: s.value })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />

      <section className="bg-white pt-8 pb-14 sm:pt-10 lg:pt-14 lg:pb-20">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: dict.nav.productGroups, href: "/urunler" },
              { label: group.name, href: groupHref(group) },
              { label: subName(sub), href: subHref(sub) },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.images} name={product.name} icon={group.icon} />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={subHref(sub)} className="type-kicker hover:underline">
                  {sub.code} · {subName(sub)}
                </Link>
                {product.sample && (
                  <span className="rounded-full bg-light px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">{dict.cards.sample}</span>
                )}
                {product.isNew && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase">Yeni</span>}
              </div>
              <h1 className="type-h1-inner mt-4 text-ink">{product.name}</h1>
              <p className="mt-3 text-[14px] text-muted">
                {t.code}: <span className="font-semibold text-ink">{product.code}</span>
              </p>
              <p className="type-body mt-6">{product.description}</p>
              {product.sample && (
                <p className="mt-4 rounded-[6px] bg-light px-4 py-3 text-[13px] text-muted">
                  {t.sampleNote}
                </p>
              )}

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {product.features.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-[15px] text-charcoal">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-[8px] border border-line bg-light p-5 sm:p-6">
                <p className="text-[15px] font-semibold text-ink">{t.quoteTitle}</p>
                <p className="mt-1 text-[14px] text-muted">{t.quoteText}</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <AddToQuoteButton slug={product.slug} className="sm:flex-1" />
                  <Link href="/teklif-listem#teklif-formu" className="btn-outline sm:flex-1">
                    {t.quoteNow}
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
            <h2 className="type-h3 text-ink">{t.specs}</h2>
            <table className="mt-5 w-full border-collapse overflow-hidden rounded-[8px] bg-white text-left text-[15px]">
              <caption className="sr-only">{t.specsOf(product.name)}</caption>
              <tbody>
                {[
                  { label: t.code, value: product.code },
                  ...product.specs,
                  { label: t.usage, value: product.usageAreas.join(", ") },
                  { label: t.variants, value: product.variants.join(" · ") },
                  { label: t.packaging, value: product.packaging },
                  { label: t.sectors, value: product.sectorSlugs.map((s) => getSector(s)?.name).join(", ") },
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

            <h3 className="mt-10 text-[15px] font-semibold text-ink">{t.variants}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <li key={v} className="rounded-full border border-line bg-white px-4 py-2 text-[14px] text-charcoal">
                  {v}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-h3 text-ink">{t.docs}</h2>
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
                    <button type="button" disabled title={t.docSoon} className="inline-flex min-h-11 items-center gap-1.5 text-[13px] font-semibold text-muted">
                      <Download className="size-4" aria-hidden /> {dict.common.download}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-[8px] border border-dashed border-line bg-white p-5 text-[14px] text-muted">
                {t.noDocs}
              </p>
            )}
            <div className="mt-8 flex items-start gap-3 rounded-[8px] bg-white p-5 text-[14px] text-muted">
              <Package className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              {t.certNote}
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="container-site">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-kicker">{t.similarKicker}</p>
                <h2 className="type-h2 mt-4 text-ink">{t.similar}</h2>
              </div>
              <CtaLink href={subHref(sub)}>{subName(sub)}</CtaLink>
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
