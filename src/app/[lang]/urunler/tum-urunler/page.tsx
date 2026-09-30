import { Suspense } from "react";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { FinalCta } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref, db } from "@/lib/data";

const copy = {
  tr: {
    description: "DEFNE GROUP tüm ürünler: ürün adı veya ürün kodu ile arayın; ürün grubu, alt kategori, sektör ve kullanım alanına göre filtreleyin.",
    kicker: "Ürün arama",
    text: "Ürün adı veya kodu ile arayın; ürün grubu ve alt kategoriye göre filtreleyin.",
    meta: (n: number) => `${n} ürün`,
  },
  az: {
    description: "DEFNE GROUP bütün məhsullar: məhsul adı və ya kodu ilə axtarın; məhsul qrupu, alt kateqoriya, sektor və istifadə sahəsinə görə filtrləyin.",
    kicker: "Məhsul axtarışı",
    text: "Məhsul adı və ya kodu ilə axtarın; məhsul qrupu və alt kateqoriyaya görə filtrləyin.",
    meta: (n: number) => `${n} məhsul`,
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta(allProductsHref, { title: getDict(lang).common.allProducts, description: copy[lang].description });
}

/* Ümumi axtarış və məhsul filtri — qrupları gəzmədən ad və kodla axtarış */
export default async function AllProductsPage() {
  const lang = await getLang();
  const t = copy[lang];
  const d = getDict(lang);
  return (
    <>
      <CatalogHeader
        kicker={t.kicker}
        title={d.common.allProducts}
        text={t.text}
        crumbs={[{ label: d.nav.productGroups, href: "/urunler" }, { label: d.common.allProducts }]}
        meta={t.meta(db(lang).products.length)}
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
