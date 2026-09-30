import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { GroupCard, ProductCard } from "@/components/cards";
import { Icon } from "@/components/Icon";
import Link from "@/components/Link";
import { CtaLink, FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { db, pad2, productGroupCode, solutions } from "@/lib/data";

const copy = {
  tr: {
    kicker: "Çözüm Alanı",
    request: "Bu Çözüm İçin Teklif İsteyin",
    need: "İhtiyaç",
    needText: "Bu ihtiyaçla gelen kurumlar için süreci; analizden ürün seçimine, tekliften teslimata kadar tek muhatap olarak yönetiyoruz.",
    sectors: "Uygun sektörler",
    scope: "Kapsam",
    groupsKicker: "Ürün grupları",
    groupsTitle: "Bu çözümde yer alan ürünler",
    allGroups: "Tüm ürün grupları",
    process: "Süreç",
  },
  az: {
    kicker: "Həll Sahəsi",
    request: "Bu Həll üçün Təklif İstəyin",
    need: "Ehtiyac",
    needText: "Bu ehtiyacla müraciət edən qurumlar üçün prosesi təhlildən məhsul seçiminə, təklifdən çatdırılmaya qədər vahid əlaqə nöqtəsi kimi idarə edirik.",
    sectors: "Uyğun sektorlar",
    scope: "Əhatə",
    groupsKicker: "Məhsul qrupları",
    groupsTitle: "Bu həllə daxil olan məhsullar",
    allGroups: "Bütün məhsul qrupları",
    process: "Proses",
  },
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/cozum-alanlari/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = db(await getLang()).getSolution(slug);
  if (!s) return {};
  return pageMeta(`/cozum-alanlari/${s.slug}`, { title: s.name, description: s.description });
}

export default async function SolutionPage({ params }: PageProps<"/[lang]/cozum-alanlari/[slug]">) {
  const { slug } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  const { getGroupByCode, getSector, getSolution, processSteps, products } = db(lang);
  const s = getSolution(slug);
  if (!s) notFound();
  const cats = s.groupCodes.map(getGroupByCode).filter((g) => !!g);
  const prods = products.filter((p) => s.groupCodes.includes(productGroupCode(p))).slice(0, 4);

  return (
    <>
      <PageHero kicker={t.kicker} title={s.name} text={s.description} crumbs={[{ label: nav.solutions, href: "/cozum-alanlari" }, { label: s.name }]} icon={s.icon}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/teklif-listem#teklif-formu" className="btn-primary">
            {t.request}
          </Link>
        </div>
      </PageHero>

      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="type-kicker">01 — {t.need}</p>
            <h2 className="type-h2 mt-4 text-ink">“{s.need}”</h2>
            <p className="type-body mt-5">
              {t.needText}
            </p>
            <div className="mt-8">
              <p className="type-small text-muted">{t.sectors}</p>
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
            <p className="type-kicker">02 — {t.scope}</p>
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
              <p className="type-kicker">03 — {t.groupsKicker}</p>
              <h2 className="type-h2 mt-4 text-ink">{t.groupsTitle}</h2>
            </div>
            <CtaLink href="/urunler">{t.allGroups}</CtaLink>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {cats.map((g) => (
              <GroupCard key={g.code} group={g} />
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
          <p className="type-kicker">04 — {t.process}</p>
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
