import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { pad2, sectors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "DEFNE GROUP; kamu kurumları ve özel sektör için ürün, çözüm ve proje tedariki sunar.",
  alternates: { canonical: "/kurumsal/hakkimizda" },
};

// Şirkət mətni DEFNE GROUP tərəfindən təqdim ediləcək — aşağıdakılar yalnız quruluş üçündür.
const values = [
  { title: "Güvenilirlik", text: "Taahhüt ettiğimiz ürünü, tarihi ve kaliteyi eksiksiz yerine getirmek." },
  { title: "Şeffaflık", text: "Teklif, onay ve teslimat süreçlerini açık ve kayıt altında yürütmek." },
  { title: "Çözüm odaklılık", text: "Ürünü değil, kurumun gerçek ihtiyacını merkeze almak." },
  { title: "Sürdürülebilirlik", text: "Uzun ömürlü, bakımı kolay ve sorumlu kaynaklı ürünleri tercih etmek." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Kurumsal"
        title="Hakkımızda"
        text="Kamu kurumları ve özel sektör için güvenilir tedarik ve proje çözümleri."
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }, { label: "Hakkımızda" }]}
        icon="building"
      />
      <KurumsalNav active="/kurumsal/hakkimizda" />

      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="type-kicker">01 — DEFNE GROUP</p>
            <h2 className="type-h2 mt-4 text-ink">Tedarik süreçlerini tek noktadan yönetiyoruz</h2>
            <p className="type-body mt-5">
              DEFNE GROUP; belediyelerden sağlık kurumlarına, eğitim kampüslerinden sanayi tesislerine kadar farklı sektörlerin ürün ve proje
              ihtiyaçlarını karşılayan bir tedarik ve çözüm ortağıdır.
            </p>
            <p className="type-body mt-4">
              İhtiyacın belirlenmesinden teknik çözüm seçimine, teklif ve onay sürecinden teslimata kadar her adımı aynı disiplinle yönetir;
              kurumlara tek muhatap üzerinden hızlı ve güvenilir hizmet sunarız.
            </p>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-night">
            <Media alt="DEFNE GROUP" icon="building" iconClassName="size-24" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          <p className="type-kicker">02 — İlkelerimiz</p>
          <h2 className="type-h2 mt-4 text-ink">Çalışma prensiplerimiz</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="rounded-[8px] border border-line bg-white p-6 sm:p-7">
                <p className="type-small text-primary">{pad2(i + 1)}</p>
                <h3 className="type-h3 mt-4 text-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-muted">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="leaf-motif bg-navy py-14 text-white sm:py-16 lg:py-[112px]">
        <div className="container-site">
          <p className="type-kicker text-[#6fd3a8]">03 — Hizmet alanı</p>
          <h2 className="type-h2 mt-4 max-w-[720px]">Kamu ve özel sektörde geniş bir yelpazeye hizmet veriyoruz.</h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((s) => (
              <li key={s.slug} className="flex items-center gap-3 border-t border-white/10 pt-4 text-[15px] font-semibold">
                <Icon name={s.icon} className="size-5 text-[#6fd3a8]" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
