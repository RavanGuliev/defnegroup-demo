import { Suspense } from "react";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { FinalCta } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "DEFNE GROUP tüm ürünler: ürün adı veya ürün kodu ile arayın; ürün grubu, alt kategori, sektör ve kullanım alanına göre filtreleyin.",
    kicker: "Ürün arama",
    text: "Ürün adı veya kodu ile arayın; ürün grubu ve alt kategoriye göre filtreleyin.",
    meta: (n: number) => `${n} ürün`,
  },
  en: {
    description: "All DEFNE GROUP products: search by product name or code; filter by product group, subcategory, sector and area of use.",
    kicker: "Product search",
    text: "Search by product name or code; filter by product group and subcategory.",
    meta: (n: number) => `${n} ${n === 1 ? "product" : "products"}`,
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta(allProductsHref, { title: (await getDictionary(lang)).common.allProducts, description: (await pageCopy("pages.urunler.tumUrunler", copy, lang)).description });
}

/* Ümumi axtarış və məhsul filtri — qrupları gəzmədən ad və kodla axtarış */
export default async function AllProductsPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.urunler.tumUrunler", copy, lang));
  const d = (await getDictionary(lang));
  return (
    <>
      <CatalogHeader
        kicker={t.kicker}
        title={d.common.allProducts}
        text={t.text}
        crumbs={[{ label: d.nav.productGroups, href: "/urunler" }, { label: d.common.allProducts }]}
        meta={t.meta((await getDb(lang)).products.length)}
      />
      <section className="bg-white py-8 sm:py-10 lg:py-14">
        <div className="container-site">
          <Suspense>
            <ProductExplorer />
          </Suspense>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
