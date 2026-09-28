import type { Metadata } from "next";
import { Download, Eye, FileText } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { catalogs, getCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kataloglar",
  description: "DEFNE GROUP ürün katalogları, teknik dokümanlar ve kurumsal tanıtım dosyaları.",
  alternates: { canonical: "/kataloglar" },
};

function formatDate(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}

export default function CatalogsPage() {
  return (
    <>
      <PageHero
        kicker="Kataloglar"
        title="Kataloglar ve dokümanlar"
        text="Ürün kataloglarımızı ve teknik dokümanlarımızı inceleyin veya indirin."
        crumbs={[{ label: "Kataloglar" }]}
        icon="clipboard"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <ul className="container-site grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catalogs.map((c, i) => {
            const cat = c.categorySlug ? getCategory(c.categorySlug) : undefined;
            const ready = !!c.file;
            return (
              <Reveal as="li" key={c.slug} delay={(i % 4) * 60}>
                <article className="flex h-full flex-col overflow-hidden rounded-[8px] border border-line bg-white">
                  {/* Üz qabığı / ön baxış */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-light p-6">
                    <div className="leaf-motif absolute inset-4 flex flex-col justify-between rounded-[4px] bg-navy p-5 text-white shadow-[0_18px_40px_-20px_rgba(16,36,63,0.6)]">
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
                      <FileText className="size-4" aria-hidden /> PDF · Güncelleme: {formatDate(c.updatedAt)}
                    </p>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                      {ready ? (
                        <>
                          <a href={c.file} target="_blank" rel="noopener" className="btn-outline min-h-11 px-3">
                            <Eye className="size-4" aria-hidden /> İncele
                          </a>
                          <a href={c.file} download className="btn-primary min-h-11 px-3">
                            <Download className="size-4" aria-hidden /> İndir
                          </a>
                        </>
                      ) : (
                        <>
                          <button type="button" disabled className="btn-outline min-h-11 px-3 opacity-50">
                            <Eye className="size-4" aria-hidden /> İncele
                          </button>
                          <button type="button" disabled className="btn-primary min-h-11 px-3">
                            <Download className="size-4" aria-hidden /> İndir
                          </button>
                        </>
                      )}
                    </div>
                    {!ready && <p className="mt-2 text-center text-[12px] text-muted">Dosya yakında eklenecek</p>}
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
