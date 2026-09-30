import { ArrowRight, Search } from "lucide-react";
import { GroupCard } from "@/components/cards";
import Link from "@/components/Link";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { FinalCta } from "@/components/ui";
import { withLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref, db } from "@/lib/data";

const copy = {
  tr: {
    description: "DEFNE GROUP ürün grupları: 17 ana ürün grubu ve alt kategorileri. Ürün adı veya kodu ile tüm ürünlerde arama yapın.",
    kicker: "Portföy",
    text: "Kamu kurumları ve özel sektör için ürün gruplarımızı inceleyin; alt kategorilerden ürünlere ulaşın ve ihtiyacınız olanları Teklif Listenize ekleyin.",
    meta: (g: number, s: number, p: number) => `${g} ana ürün grubu · ${s} alt kategori · ${p} ürün`,
    search: "Ürün adı veya ürün kodu ile ara",
  },
  az: {
    description: "DEFNE GROUP məhsul qrupları: 17 əsas məhsul qrupu və alt kateqoriyaları. Bütün məhsullarda ad və ya kodla axtarış edin.",
    kicker: "Portfel",
    text: "Dövlət qurumları və özəl sektor üçün məhsul qruplarımıza baxın; alt kateqoriyalardan məhsullara keçin və ehtiyacınız olanları Təklif Siyahınıza əlavə edin.",
    meta: (g: number, s: number, p: number) => `${g} əsas məhsul qrupu · ${s} alt kateqoriya · ${p} məhsul`,
    search: "Məhsul adı və ya məhsul kodu ilə axtar",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/urunler", { title: getDict(lang).nav.productGroups, description: copy[lang].description });
}

/* Ürün Grupları girişi — bütün 17 qrup təsdiqlənmiş sıra ilə şəkilli kartlarda */
export default async function ProductGroupsPage() {
  const lang = await getLang();
  const t = copy[lang];
  const d = getDict(lang);
  const { groups, subcategories, products } = db(lang);

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
