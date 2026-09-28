import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryCard, ProductCard } from "@/components/cards";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SolutionsAccordion } from "@/components/home/SolutionsAccordion";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CtaLink, FinalCta, SectionHeading } from "@/components/ui";
import { categories, pad2, processSteps, products, sectors, solutions, trustItems } from "@/lib/data";

export default function HomePage() {
  // Ana səhifədə yalnız 6–8 əsas qrup (sənəd, bölmə 5)
  const featuredCategories = categories.filter((c) => c.featured).slice(0, 8);
  // Seçilmiş məhsullar — gələcəkdə admin panelindən seçiləcək
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <HeroCarousel />

      {/* Güvən zolağı — təsdiqlənməmiş rəqəmlər YOXDUR (sənəd, bölmə 4.3) */}
      <section aria-label="Neden DEFNE GROUP" className="border-b border-line bg-white">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {trustItems.map((t, i) => (
            <li
              key={t.title}
              className={`flex items-center gap-3 py-5 sm:gap-4 sm:py-7 ${i % 2 === 1 ? "border-l border-line pl-4 sm:pl-6" : ""} ${
                i >= 2 ? "border-t border-line lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary sm:size-12">
                <Icon name={t.icon} className="size-5 sm:size-6" />
              </span>
              <span className="text-[13px] leading-[1.35] font-semibold text-ink sm:text-[15px]">{t.title}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 01 — Ürün grupları */}
      <section className="section-home-first bg-light">
        <div className="container-site">
          <SectionHeading
            index="01"
            kicker="Ürünlerimiz"
            title="Ürün Grupları"
            text="Kamu ve özel sektörün farklı ihtiyaçlarına yönelik ürün gruplarımızı inceleyin."
            aside={
              <Link href="/urunler" className="group inline-flex flex-col items-start lg:items-end">
                <span className="type-small text-muted">{categories.length} ürün grubu</span>
                <span className="cta-text">
                  Tüm ürün grupları
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            }
          />
          <div className="section-stack grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {featuredCategories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 4) * 60}>
                <CategoryCard category={c} index={i} priority={i < 4} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="type-small text-muted">Ürün adı, kodu veya anahtar kelime ile arayın</p>
            <CtaLink href="/urunler">Tüm ürünleri keşfet</CtaLink>
          </Reveal>
        </div>
      </section>

      {/* 02 — Çözüm alanları: məhsul təkrarı deyil, ehtiyaca verilən kompleks həll */}
      <section className="section-home bg-white">
        <div className="container-site">
          <SectionHeading
            index="02"
            kicker="Çözüm Alanları"
            title="İhtiyaca göre bütüncül çözümler"
            text="Tek tek ürün yerine; ihtiyacınızı analiz ediyor, ürün, teknik çözüm ve teslimatı tek bir proje olarak planlıyoruz."
            aside={<CtaLink href="/cozum-alanlari">Tüm çözüm alanları</CtaLink>}
          />
          <Reveal className="section-stack">
            <SolutionsAccordion solutions={solutions} />
          </Reveal>
        </div>
      </section>

      {/* 03 — Sektörler */}
      <section className="section-home border-t border-line bg-studio">
        <div className="container-site">
          <SectionHeading
            index="03"
            kicker="Sektörler"
            title="Hizmet verdiğimiz sektörler"
            text="Her sektörün mevzuatına, satın alma sürecine ve kullanım koşullarına uygun tedarik yaklaşımı."
            aside={<CtaLink href="/sektorler">Tüm sektörler</CtaLink>}
          />
          <ul className="section-stack grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-line bg-line lg:grid-cols-4">
            {sectors.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 4) * 60} className="bg-white">
                <Link href={`/sektorler/${s.slug}`} className="group flex h-full min-h-[170px] flex-col p-4 transition-colors hover:bg-light sm:min-h-[200px] sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full border border-line text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <span className="type-small text-muted">{pad2(i + 1)}</span>
                  </div>
                  <h3 className="mt-auto pt-6 text-[15px] leading-[1.3] font-semibold text-ink sm:pt-8 sm:text-[17px]">{s.name}</h3>
                  <p className="mt-2 hidden text-[14px] leading-[1.55] text-muted sm:block">{s.description}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — İş süreci */}
      <section className="section-home leaf-motif relative bg-navy text-white">
        <div className="container-site">
          <SectionHeading
            index="04"
            kicker="Çalışma Sürecimiz"
            title="İhtiyaçtan teslimata dört adım"
            text="Her talebi aynı disiplinle, kayıt altında ve şeffaf şekilde yönetiyoruz."
            light
          />
          <ol className="section-stack grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative lg:pr-8">
                <div className="flex items-center gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#5fd09d]">
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  {i < processSteps.length - 1 && <span className="hidden h-px flex-1 bg-white/15 lg:block" aria-hidden />}
                </div>
                <p className="type-small mt-6 text-[#5fd09d]">Adım {pad2(i + 1)}</p>
                <h3 className="mt-2 text-[19px] leading-[1.3] font-semibold">{s.title}</h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-[1.65] text-white/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Seçilmiş ürünler */}
      <section className="section-home bg-white">
        <div className="container-site">
          <SectionHeading
            index="05"
            kicker="Öne Çıkanlar"
            title="Seçilmiş ürünler"
            text="Yeni, çok talep gören ve stratejik ürünlerimizden bir seçki."
            aside={<CtaLink href="/urunler">Tüm ürünler</CtaLink>}
          />
          <div className="section-stack grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 60} className={i >= 4 ? "hidden min-[480px]:block" : ""}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
