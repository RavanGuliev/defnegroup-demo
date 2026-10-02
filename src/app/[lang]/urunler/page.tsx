import { ArrowRight, Search } from "lucide-react";
import { GroupCard } from "@/components/cards";
import Link from "@/components/Link";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { FinalCta } from "@/components/ui";
import { withLocale } from "@/i18n/config";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "DEFNE GROUP ürün grupları: 17 ana ürün grubu ve alt kategorileri. Ürün adı veya kodu ile tüm ürünlerde arama yapın.",
    kicker: "Portföy",
    text: "Kamu kurumları ve özel sektör için ürün gruplarımızı inceleyin; alt kategorilerden ürünlere ulaşın ve ihtiyacınız olanları Teklif Listenize ekleyin.",
    meta: (g: number, s: number, p: number) => `${g} ana ürün grubu · ${s} alt kategori · ${p} ürün`,
    search: "Ürün adı veya ürün kodu ile ara",
  },
  en: {
    description: "DEFNE GROUP product groups: 17 main product groups and their subcategories. Search all products by name or code.",
    kicker: "Portfolio",
    text: "Explore our product groups for public institutions and the private sector; move from subcategories to products and add what you need to your Quote List.",
    meta: (g: number, s: number, p: number) => `${g} main product groups · ${s} subcategories · ${p} products`,
    search: "Search by product name or product code",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/urunler", { title: (await getDictionary(lang)).nav.productGroups, description: (await pageCopy("pages.urunler", copy, lang)).description });
}

/* Ürün Grupları girişi — bütün 17 qrup təsdiqlənmiş sıra ilə şəkilli kartlarda */
export default async function ProductGroupsPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.urunler", copy, lang));
  const d = (await getDictionary(lang));
  const { groups, subcategories, products } = (await getDb(lang));

  return (
    <>
      <CatalogHeader
        kicker={t.kicker}
        title={d.nav.productGroups}
        text={t.text}
        crumbs={[{ label: d.nav.productGroups }]}
        meta={t.meta(groups.length, subcategories.length, products.length)}
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <form action={withLocale(lang, allProductsHref)} role="search" className="relative flex-1 sm:max-w-[480px]">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="grup-ara" className="sr-only">
              {t.search}
            </label>
            <input id="grup-ara" name="q" type="search" placeholder={t.search} className="field-input min-h-12 bg-white pl-12" />
          </form>
          <Link href={allProductsHref} className="btn-outline">
            {d.common.allProducts} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </CatalogHeader>

      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <ul className="container-site grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {groups.map((g, i) => (
            <li key={g.code}>
              <GroupCard group={g} priority={i < 4} />
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
