import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { pad2, solutions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Çözüm Alanları",
  description: "İhtiyaca göre bütüncül tedarik çözümleri: barınak donatımı, kent donatısı, afet tedariki, hijyen programları ve personel donatımı.",
  alternates: { canonical: "/cozum-alanlari" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        kicker="Çözüm Alanları"
        title="İhtiyacınızdan yola çıkan bütüncül çözümler"
        text="Ürün gruplarını tek tek değil; kurumunuzun ihtiyacına göre planlanmış, teknik ve lojistik olarak bütünleşik projeler olarak sunuyoruz."
        crumbs={[{ label: "Çözüm Alanları" }]}
        icon="clipboard"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-5 md:grid-cols-2">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 80}>
              <Link
                href={`/cozum-alanlari/${s.slug}`}
                className="group grid h-full overflow-hidden rounded-[8px] border border-line bg-white transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(16,36,63,0.5)] sm:grid-cols-[200px_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/9] bg-night sm:aspect-auto">
                  <Media alt={s.name} icon={s.icon} iconClassName="size-16" />
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                </div>
                <div className="flex flex-col p-6 sm:p-7">
                  <p className="type-small text-primary">{pad2(i + 1)}</p>
                  <h2 className="type-h3 mt-3 text-ink">{s.name}</h2>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted italic">“{s.need}”</p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-charcoal">{s.description}</p>
                  <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-[14px] font-semibold text-ink group-hover:text-primary">
                    Çözümü incele <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}

