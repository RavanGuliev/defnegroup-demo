import { Icon } from "@/components/Icon";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Media } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { pad2 } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";
import { RichText } from "@/components/RichText";

// Şirkət mətni DEFNE GROUP tərəfindən təqdim ediləcək — aşağıdakılar yalnız quruluş üçündür.
const copy = {
  tr: {
    description: "DEFNE GROUP; kamu kurumları ve özel sektör için ürün, çözüm ve proje tedariki sunar.",
    heroText: "Kamu kurumları ve özel sektör için güvenilir tedarik ve proje çözümleri.",
    title: "Tedarik süreçlerini tek noktadan yönetiyoruz",
    p1: "DEFNE GROUP; belediyelerden sağlık kurumlarına, eğitim kampüslerinden sanayi tesislerine kadar farklı sektörlerin ürün ve proje ihtiyaçlarını karşılayan bir tedarik ve çözüm ortağıdır.",
    body: "",
    p2: "İhtiyacın belirlenmesinden teknik çözüm seçimine, teklif ve onay sürecinden teslimata kadar her adımı aynı disiplinle yönetir; kurumlara tek muhatap üzerinden hızlı ve güvenilir hizmet sunarız.",
    valuesKicker: "İlkelerimiz",
    valuesTitle: "Çalışma prensiplerimiz",
    values: [
      { title: "Güvenilirlik", text: "Taahhüt ettiğimiz ürünü, tarihi ve kaliteyi eksiksiz yerine getirmek." },
      { title: "Şeffaflık", text: "Teklif, onay ve teslimat süreçlerini açık ve kayıt altında yürütmek." },
      { title: "Çözüm odaklılık", text: "Ürünü değil, kurumun gerçek ihtiyacını merkeze almak." },
      { title: "Sürdürülebilirlik", text: "Uzun ömürlü, bakımı kolay ve sorumlu kaynaklı ürünleri tercih etmek." },
    ],
    sectorsKicker: "Hizmet alanı",
    sectorsTitle: "Kamu ve özel sektörde geniş bir yelpazeye hizmet veriyoruz.",
  },
  en: {
    description: "DEFNE GROUP provides product, solution and project supply for public institutions and the private sector.",
    heroText: "Reliable supply and project solutions for public institutions and the private sector.",
    title: "We manage supply processes from a single point",
    p1: "DEFNE GROUP is a supply and solutions partner meeting the product and project needs of diverse sectors, from municipalities to healthcare institutions and from education campuses to industrial facilities.",
    body: "",
    p2: "We manage every step with the same discipline — from defining the need and selecting the technical solution to quotation, approval and delivery — and provide institutions with fast, reliable service through a single point of contact.",
    valuesKicker: "Our Principles",
    valuesTitle: "Our working principles",
    values: [
      { title: "Reliability", text: "Delivering the product, date and quality we commit to in full." },
      { title: "Transparency", text: "Running quotation, approval and delivery processes openly and with full records." },
      { title: "Solution focus", text: "Putting the institution’s real need, not the product, at the centre." },
      { title: "Sustainability", text: "Favouring long-lasting, easy-to-maintain and responsibly sourced products." },
    ],
    sectorsKicker: "Scope of service",
    sectorsTitle: "We serve a broad spectrum across the public and private sectors.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/hakkimizda", { title: (await getDictionary(lang)).nav.about, description: (await pageCopy("pages.kurumsal.hakkimizda", copy, lang)).description });
}

export default async function AboutPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.kurumsal.hakkimizda", copy, lang));
  const nav = (await getDictionary(lang)).nav;
  const { sectors } = (await getDb(lang));
  return (
    <>
      <PageHero
        kicker={nav.corporate}
        title={nav.about}
        text={t.heroText}
        crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.about }]}
        icon="building"
        image={(await getDb(lang)).images.hakkimizda ?? undefined}
      />
      <KurumsalNav active="/kurumsal/hakkimizda" />

      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="type-kicker">01 — DEFNE GROUP</p>
            <h2 className="type-h2 mt-4 text-ink">{t.title}</h2>
            {t.body ? (
              <RichText html={t.body} className="mt-5" />
            ) : (
              <>
                <p className="type-body mt-5">{t.p1}</p>
                <p className="type-body mt-4">{t.p2}</p>
              </>
            )}
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-night">
            <Media src={(await getDb(lang)).images.hakkimizdaSection ?? undefined} alt="DEFNE GROUP" icon="building" iconClassName="size-24" />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-studio py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          <p className="type-kicker">02 — {t.valuesKicker}</p>
          <h2 className="type-h2 mt-4 text-ink">{t.valuesTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {t.values.map((v, i) => (
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
          <p className="type-kicker text-[#6fd3a8]">03 — {t.sectorsKicker}</p>
          <h2 className="type-h2 mt-4 max-w-[720px]">{t.sectorsTitle}</h2>
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
