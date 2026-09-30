import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/cards";
import Link from "@/components/Link";
import { CtaLink, FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref, db, pad2, sectors } from "@/lib/data";

const copy = {
  tr: {
    kicker: "Sektör",
    solutionsKicker: "Çözümler",
    solutionsTitle: "Bu sektöre özel çözüm alanları",
    productsKicker: "Ürünler",
    productsTitle: "Sık tercih edilen ürünler",
    allInSector: "Bu sektördeki tüm ürünler",
  },
  az: {
    kicker: "Sektor",
    solutionsKicker: "Həllər",
    solutionsTitle: "Bu sektora xüsusi həll sahələri",
    productsKicker: "Məhsullar",
    productsTitle: "Tez-tez seçilən məhsullar",
    allInSector: "Bu sektordakı bütün məhsullar",
  },
};

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/sektorler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = db(await getLang()).getSector(slug);
  if (!s) return {};
  return pageMeta(`/sektorler/${s.slug}`, { title: s.name, description: s.description });
}

export default async function SectorPage({ params }: PageProps<"/[lang]/sektorler/[slug]">) {
  const { slug } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  const { getSector, productsInSector, solutions } = db(lang);
  const sector = getSector(slug);
  if (!sector) notFound();
  const sols = solutions.filter((s) => s.sectorSlugs.includes(sector.slug));
  const prods = productsInSector(sector.slug).slice(0, 8);

  return (
    <>
      <PageHero kicker={t.kicker} title={sector.name} text={sector.description} crumbs={[{ label: nav.sectors, href: "/sektorler" }, { label: sector.name }]} icon={sector.icon} />

      {sols.length > 0 && (
        <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
          <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <p className="type-kicker">01 — {t.solutionsKicker}</p>
              <h2 className="type-h2 mt-4 text-ink">{t.solutionsTitle}</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {sols.map((s, i) => (
                <li key={s.slug}>
                  <Link href={`/cozum-alanlari/${s.slug}`} className="group flex items-center gap-5 py-5">
                    <span className="type-small w-8 text-primary">{pad2(i + 1)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="type-h3 block text-ink group-hover:text-primary">{s.name}</span>
                      <span className="mt-1 block text-[14px] text-muted">{s.description}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {prods.length > 0 && (
        <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-[112px]">
          <div className="container-site">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="type-kicker">02 — {t.productsKicker}</p>
                <h2 className="type-h2 mt-4 text-ink">{t.productsTitle}</h2>
              </div>
              <CtaLink href={`${allProductsHref}?sektor=${sector.slug}`}>{t.allInSector}</CtaLink>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {prods.map((p) => (
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
