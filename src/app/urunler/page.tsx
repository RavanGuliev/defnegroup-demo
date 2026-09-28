import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { ProductExplorer } from "@/components/products/ProductExplorer";
import { FinalCta } from "@/components/ui";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "DEFNE GROUP ürün kataloğu: ürün adı, ürün kodu veya anahtar kelime ile arayın; kategori, sektör ve kullanım alanına göre filtreleyin.",
  alternates: { canonical: "/urunler" },
};

export default function ProductsPage() {
  return (
    <>
      <CatalogHeader
        kicker="Portföy"
        title="Ürün Kataloğu"
        text="Kamu kurumları ve özel sektör için ürün gruplarımızı inceleyin; ihtiyacınız olan ürünleri Teklif Listenize ekleyin."
        crumbs={[{ label: "Ürünler" }]}
        meta={`${categories.length} ürün grubu`}
      />
      <section className="bg-white py-10 sm:py-14 lg:py-20">
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
