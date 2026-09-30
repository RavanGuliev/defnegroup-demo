import { notFound } from "next/navigation";
import { ProductCard, SubcategoryCard } from "@/components/cards";
import Link from "@/components/Link";
import { Media } from "@/components/Media";
import { CatalogHeader } from "@/components/products/CatalogHeader";
import { CtaLink, FinalCta } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { db, groupHref, groups } from "@/lib/data";

const copy = {
  tr: {
    kicker: "Ürün grubu",
    preparing: "Bu grubun alt kategori içerikleri ve görselleri hazırlanıyor. İhtiyacınızı teklif formundan iletebilirsiniz.",
    linked: "Diğer gruplardan ilgili ürünler",
    linkedText: "Bu ürünlerin ana kaydı ilgili ürün grubundadır.",
    relatedKicker: "İlgili çözümler",
    related: "Bu ürün grubunu içeren çözüm alanları",
    allGroups: "Tüm ürün grupları",
  },
  az: {
    kicker: "Məhsul qrupu",
    preparing: "Bu qrupun alt kateqoriya məzmunu və şəkilləri hazırlanır. Ehtiyacınızı təklif forması ilə göndərə bilərsiniz.",
    linked: "Digər qruplardan əlaqəli məhsullar",
    linkedText: "Bu məhsulların əsas qeydi aid olduğu məhsul qrupundadır.",
    relatedKicker: "Əlaqəli həllər",
    related: "Bu məhsul qrupunu əhatə edən həll sahələri",
    allGroups: "Bütün məhsul qrupları",
  },
};

export function generateStaticParams() {
  return groups.map((g) => ({ grup: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/urunler/[grup]">) {
  const { grup } = await params;
  const g = db(await getLang()).getGroup(grup);
  if (!g) return {};
  return pageMeta(groupHref(g), { title: g.name });
}

/* Əsas qrup səhifəsi — yalnız bu qrupa aid alt bölmə kartları; qarışıq məhsul siyahısı deyil */
export default async function GroupPage({ params }: PageProps<"/[lang]/urunler/[grup]">) {
  const { grup } = await params;
  const lang = await getLang();
  const t = copy[lang];
  const d = getDict(lang);
  const { getGroup, subsOfGroup, productsInGroup, linkedProductsForGroup, solutions } = db(lang);
  const group = getGroup(grup);
  if (!group) notFound();
  const subs = subsOfGroup(group.code);
  const productCount = productsInGroup(group.code).length;
  const linked = linkedProductsForGroup(group.code);
  const related = solutions.filter((s) => s.groupCodes.includes(group.code));
  const preparing = productCount === 0 && subs.every((s) => s.pending);

  return (
    <>
      <CatalogHeader
        kicker={`${group.code} — ${t.kicker}`}
        title={group.name}
        crumbs={[{ label: d.nav.productGroups, href: "/urunler" }, { label: group.name }]}
        meta={`${d.cards.subCount(subs.length)}${productCount ? ` · ${d.cards.productCount(productCount)}` : ""}`}
        media={<Media src={group.image} alt={group.name} icon={group.icon} sizes="360px" iconClassName="size-20" />}
      />

      <section className="bg-white py-10 sm:py-12 lg:py-16">
        <div className="container-site">
          <h2 className="type-h3 text-ink">{d.common.subCategories}</h2>
          {preparing && (
            <p className="mt-2 max-w-[640px] text-[15px] text-muted">
              {t.preparing}
            </p>
          )}
          <ul className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {subs.map((s) => (
              <li key={s.code}>
                <SubcategoryCard sub={s} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {linked.length > 0 && (
        <section className="border-t border-line bg-white py-10 sm:py-12 lg:py-16">
          <div className="container-site">
            <h2 className="type-h3 text-ink">{t.linked}</h2>
            <p className="mt-2 text-[15px] text-muted">{t.linkedText}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {linked.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-line bg-studio py-12 sm:py-14 lg:py-16">
          <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
            <div>
              <p className="type-kicker">{t.relatedKicker}</p>
              <h2 className="type-h3 mt-3 text-ink">{t.related}</h2>
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link href={`/cozum-alanlari/${s.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-[17px] font-semibold text-ink group-hover:text-primary">{s.name}</span>
                      <span className="mt-1 block text-[14px] text-muted">{s.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="container-site mt-8">
            <CtaLink href="/urunler">{t.allGroups}</CtaLink>
          </div>
        </section>
      )}
      <FinalCta />
    </>
  );
}
