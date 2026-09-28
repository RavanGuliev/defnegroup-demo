import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { CategoryCard, ProductCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import { CtaLink, FinalCta, PageHero } from "@/components/ui";
import { categories, getCategory, getSector, getSolution, pad2, processSteps, products, solutions } from "@/lib/data";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cozum-alanlari/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return { title: s.name, description: s.description, alternates: { canonical: `/cozum-alanlari/${s.slug}` } };
}

export default async function SolutionPage({ params }: PageProps<"/cozum-alanlari/[slug]">) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const cats = s.categorySlugs.map(getCategory).filter((c) => !!c);
  const prods = products.filter((p) => s.categorySlugs.includes(p.categorySlug)).slice(0, 4);

  return (
    <>
      <PageHero kicker="Çözüm Alanı" title={s.name} text={s.description} crumbs={[{ label: "Çözüm Alanları", href: "/cozum-alanlari" }, { label: s.name }]} icon={s.icon}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teklif-listem#teklif-formu" className="btn-primary">
            Bu Çözüm İçin Teklif İsteyin
          </Link>
        </div>
      </PageHero>

      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="type-kicker">01 — İhtiyaç</p>
            <h2 className="type-h2 mt-4 text-ink">“{s.need}”</h2>
            <p className="type-body mt-5">
              Bu ihtiyaçla gelen kurumlar için süreci; analizden ürün seçimine, tekliften teslimata kadar tek muhatap olarak yönetiyoruz.
            </p>
            <div className="mt-8">
              <p className="type-small text-muted">Uygun sektörler</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.sectorSlugs.map((x) => {
                  const sec = getSector(x);
                  return sec ? (
                    <li key={x}>
                      <Link href={`/sektorler/${x}`} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-[13px] font-semibold text-charcoal hover:border-primary hover:text-primary">
                        {sec.name}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
          <div className="rounded-[8px] border border-line bg-light p-6 sm:p-8">
            <p className="type-kicker">02 — Kapsam</p>
            <ul className="mt-6 divide-y divide-line">
              {s.scope.map((x, i) => (
                <li key={x} className="flex items-center gap-4 py-4">
                  <span className="type-small w-8 text-primary">{pad2(i + 1)}</span>
                  <span className="flex-1 text-[16px] font-semibold text-ink">{x}</span>
                  <Check className="size-5 text-primary" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="type-kicker">03 — Ürün grupları</p>
              <h2 className="type-h2 mt-4 text-ink">Bu çözümde yer alan ürünler</h2>
            </div>
            <CtaLink href="/urunler">Tüm ürünler</CtaLink>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {cats.map((c) => (
              <CategoryCard key={c.slug} category={c} index={categories.indexOf(c)} />
            ))}
          </div>
          {prods.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {prods.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-site">
          <p className="type-kicker">04 — Süreç</p>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((p, i) => (
              <li key={p.title} className="border-t-2 border-primary pt-5">
                <Icon name={p.icon} className="size-6 text-primary" />
                <p className="mt-4 text-[17px] font-semibold text-ink">
                  {pad2(i + 1)}. {p.title}
                </p>
                <p className="mt-2 text-[14px] leading-[1.6] text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
