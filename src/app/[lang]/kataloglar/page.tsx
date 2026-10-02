import { Download, Eye, FileText } from "lucide-react";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import { getLang, pageMeta } from "@/i18n/server";
import { EmptyState } from "@/components/ui";
import { isFinal } from "@/lib/site";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "DEFNE GROUP ürün katalogları, teknik dokümanlar ve kurumsal tanıtım dosyaları.",
    title: "Kataloglar ve dokümanlar",
    text: "Ürün kataloglarımızı ve teknik dokümanlarımızı inceleyin veya indirin.",
    updated: "Güncelleme",
    soon: "Dosya yakında eklenecek",
    emptyTitle: "Kataloglar hazırlanıyor",
    emptyText: "Onaylı katalog ve teknik dokümanlarımız yakında bu sayfada yayımlanacaktır. İhtiyacınız olan doküman için bizimle iletişime geçebilirsiniz.",
  },
  en: {
    description: "DEFNE GROUP product catalogues, technical documents and corporate presentation files.",
    title: "Catalogues and documents",
    text: "View or download our product catalogues and technical documents.",
    updated: "Updated",
    soon: "File will be added soon",
    emptyTitle: "Catalogues are being prepared",
    emptyText: "Our approved catalogues and technical documents will be published on this page soon. Contact us for any document you need.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kataloglar", { title: (await getDictionary(lang)).nav.catalogs, description: (await pageCopy("pages.kataloglar", copy, lang)).description });
}

function formatDate(ym: string, lang: Locale) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString(lang === "en" ? "en-GB" : "tr-TR", { month: "long", year: "numeric" });
}

export default async function CatalogsPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.kataloglar", copy, lang));
  const d = (await getDictionary(lang));
  const data = (await getDb(lang));
  // Son yayında faylı olmayan (pasiv düyməli) kartlar gizlədilir
  const catalogs = isFinal ? data.catalogs.filter((c) => !!c.file) : data.catalogs;
  const { getGroupByCode } = data;
  return (
    <>
      <PageHero
        kicker={d.nav.catalogs}
        title={t.title}
        text={t.text}
        crumbs={[{ label: d.nav.catalogs }]}
        icon="clipboard"
        image={(await getDb(lang)).images.kataloglar ?? undefined}
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        {catalogs.length === 0 && (
          <div className="container-site">
            <EmptyState title={t.emptyTitle} text={t.emptyText} />
          </div>
        )}
        <ul className="container-site grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catalogs.map((c, i) => {
            const cat = c.groupCode ? getGroupByCode(c.groupCode) : undefined;
            const ready = !!c.file;
            return (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 60}>
                <article className="flex h-full flex-col overflow-hidden rounded-[8px] border border-line bg-white">
                  {/* Üz qabığı / ön baxış */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-light p-6">
                    {/* Paneldən yüklənmiş üz qabığı varsa o göstərilir */}
                    {c.cover && <Media src={c.cover} alt={c.name} variant="light" sizes="300px" />}
                    <div className="leaf-motif absolute inset-4 [.relative:has(img)>&]:hidden flex flex-col justify-between rounded-[4px] bg-navy p-5 text-white shadow-[0_18px_40px_-20px_rgba(16,36,63,0.6)]">
                      <span className="text-[11px] font-extrabold tracking-[0.2em]">DEFNE GROUP</span>
                      <div>
                        <span className="block h-0.5 w-8 bg-primary" />
                        <span className="mt-3 block text-[17px] leading-[1.25] font-bold">{c.name}</span>
                        <span className="mt-2 block text-[11px] tracking-[0.14em] text-white/60 uppercase">{c.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="type-small text-primary">{c.type}</p>
                    <h2 className="mt-2 text-[17px] leading-[1.3] font-semibold text-ink">{c.name}</h2>
                    {cat && <p className="mt-1 text-[13px] text-muted">{cat.name}</p>}
                    <p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted">
                      <FileText className="size-4" aria-hidden /> PDF · {t.updated}: {formatDate(c.updatedAt, lang)}
                    </p>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                      {ready ? (
                        <>
                          <a href={c.file} target="_blank" rel="noopener" className="btn-outline min-h-11 px-3">
                            <Eye className="size-4" aria-hidden /> {d.common.inspect}
                          </a>
                          <a href={c.file} download className="btn-primary min-h-11 px-3">
                            <Download className="size-4" aria-hidden /> {d.common.download}
                          </a>
                        </>
                      ) : (
                        <>
                          <button type="button" disabled className="btn-outline min-h-11 px-3 opacity-50">
                            <Eye className="size-4" aria-hidden /> {d.common.inspect}
                          </button>
                          <button type="button" disabled className="btn-primary min-h-11 px-3">
                            <Download className="size-4" aria-hidden /> {d.common.download}
                          </button>
                        </>
                      )}
                    </div>
                    {!ready && <p className="mt-2 text-center text-[12px] text-muted">{t.soon}</p>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
