import { ArrowRight } from "lucide-react";
import { GroupCard, ProductCard } from "@/components/cards";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SolutionsAccordion } from "@/components/home/SolutionsAccordion";
import { FairsSection } from "@/components/home/FairsSection";
import { LocationSection } from "@/components/home/LocationSection";
import { Icon } from "@/components/Icon";
import Link from "@/components/Link";
import { Reveal } from "@/components/Reveal";
import { CtaLink, FinalCta, SectionHeading } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { allProductsHref, pad2 } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    trustAria: "Neden DEFNE GROUP",
    groupsKicker: "Ürünlerimiz",
    groupsText: "Kamu ve özel sektörün farklı ihtiyaçlarına yönelik ürün gruplarımızı inceleyin.",
    groupsMeta: (n: number) => `${n} ana ürün grubu`,
    searchByCode: "Ürün adı veya kodu ile ara",
    solutionsTitle: "İhtiyaca göre bütüncül çözümler",
    solutionsText: "Tek tek ürün yerine; ihtiyacınızı analiz ediyor, ürün, teknik çözüm ve teslimatı tek bir proje olarak planlıyoruz.",
    allSolutions: "Tüm çözüm alanları",
    sectorsTitle: "Hizmet verdiğimiz sektörler",
    sectorsText: "Her sektörün mevzuatına, satın alma sürecine ve kullanım koşullarına uygun tedarik yaklaşımı.",
    allSectors: "Tüm sektörler",
    processKicker: "Çalışma Sürecimiz",
    processTitle: "İhtiyaçtan teslimata dört adım",
    processText: "Her talebi aynı disiplinle, kayıt altında ve şeffaf şekilde yönetiyoruz.",
    featuredKicker: "Öne Çıkanlar",
    featuredTitle: "Seçilmiş ürünler",
    featuredText: "Yeni, çok talep gören ve stratejik ürünlerimizden bir seçki.",
    allProducts: "Tüm ürünler",
    fairsKicker: "Sektörel görünürlük",
    fairsTitle: "Fuarlar",
    fairsText: "Sektördeki etkinliklerden ve saha buluşmalarından seçmeler.",
    fairsOpenGallery: "Galeriyi aç",
    fairsClose: "Galeriyi kapat",
    fairsPrev: "Önceki fotoğraf",
    fairsNext: "Sonraki fotoğraf",
    locationKicker: "Konum",
    locationTitle: "Merkezimizi ziyaret edin",
    locationText: "Ürün, tedarik ve teklif talepleriniz için merkezimizi ziyaret edebilir veya bize doğrudan ulaşabilirsiniz.",
    locationAddress: "Adres",
    locationHours: "Çalışma saatleri",
    locationPhone: "Doğrudan arayın",
    locationDirections: "Yol tarifi al",
    locationViewMap: "Haritada görüntüle",
    locationContactKicker: "İletişim",
    locationContactLink: "Bize ulaşın",
  },
  en: {
    trustAria: "Why DEFNE GROUP",
    groupsKicker: "Our Products",
    groupsText: "Explore our product groups serving the diverse needs of the public and private sectors.",
    groupsMeta: (n: number) => `${n} main product groups`,
    searchByCode: "Search by product name or code",
    solutionsTitle: "Complete solutions built around your needs",
    solutionsText: "Instead of individual products, we analyse your needs and plan the product, technical solution and delivery as a single project.",
    allSolutions: "All solution areas",
    sectorsTitle: "Sectors we serve",
    sectorsText: "A supply approach aligned with each sector’s regulations, procurement process and conditions of use.",
    allSectors: "All sectors",
    processKicker: "Our Process",
    processTitle: "Four steps from need to delivery",
    processText: "We manage every request with the same discipline, fully documented and transparent.",
    featuredKicker: "Highlights",
    featuredTitle: "Featured products",
    featuredText: "A selection of our new, in-demand and strategic products.",
    allProducts: "All products",
    fairsKicker: "Industry presence",
    fairsTitle: "Trade Fairs",
    fairsText: "Highlights from industry events and on-site meetings.",
    fairsOpenGallery: "Open gallery",
    fairsClose: "Close gallery",
    fairsPrev: "Previous image",
    fairsNext: "Next image",
    locationKicker: "Location",
    locationTitle: "Visit our office",
    locationText: "For product, supply and quotation requests, you can visit our office or contact us directly.",
    locationAddress: "Address",
    locationHours: "Working hours",
    locationPhone: "Call us directly",
    locationDirections: "Get directions",
    locationViewMap: "View on map",
    locationContactKicker: "Contact",
    locationContactLink: "Contact us",
  },
};

export async function generateMetadata() {
  return pageMeta("/");
}

export default async function HomePage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.home", copy, lang));
  const d = (await getDictionary(lang));
  const { groups, processSteps, products, sectors, solutions, trustItems, site } = (await getDb(lang));
  // Ana səhifədə seçilmiş qruplar; tam siyahı “Tüm 17 Ürün Grubunu Gör” ilə açılır
  const featuredGroups = groups.filter((g) => g.featured).slice(0, 8);
  // Seçilmiş məhsullar — gələcəkdə admin panelindən seçiləcək
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <HeroCarousel />

      {/* Güvən zolağı — təsdiqlənməmiş rəqəmlər YOXDUR (sənəd, bölmə 4.3) */}
      <section aria-label={t.trustAria} className="border-b border-line bg-white">
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
            kicker={t.groupsKicker}
            title={d.nav.productGroups}
            text={t.groupsText}
            aside={
              <Link href="/urunler" className="group inline-flex flex-col items-start lg:items-end">
                <span className="type-small text-muted">{t.groupsMeta(groups.length)}</span>
                <span className="cta-text">
                  {d.common.seeAllGroups(groups.length)}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            }
          />
          <div className="section-stack grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredGroups.map((g, i) => (
              <Reveal key={g.code} delay={(i % 4) * 60} className="h-full">
                <GroupCard group={g} priority={i < 4} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <CtaLink href="/urunler">{d.common.seeAllGroups(groups.length)}</CtaLink>
            <CtaLink href={allProductsHref}>{t.searchByCode}</CtaLink>
          </Reveal>
        </div>
      </section>

      {/* 02 — Çözüm alanları: məhsul təkrarı deyil, ehtiyaca verilən kompleks həll */}
      <section className="section-home bg-white">
        <div className="container-site">
          <SectionHeading
            index="02"
            kicker={d.nav.solutions}
            title={t.solutionsTitle}
            text={t.solutionsText}
            aside={<CtaLink href="/cozum-alanlari">{t.allSolutions}</CtaLink>}
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
            kicker={d.nav.sectors}
            title={t.sectorsTitle}
            text={t.sectorsText}
            aside={<CtaLink href="/sektorler">{t.allSectors}</CtaLink>}
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

      {/* 04 — Fuarlar: paneldə şəkil əlavə olunduqda (Site → Fuar Galerisi) */}
      {site.fairPhotos.length > 0 && (
        <FairsSection
          photos={site.fairPhotos}
          heading={<SectionHeading index="04" kicker={t.fairsKicker} title={t.fairsTitle} text={t.fairsText} />}
          t={{ title: t.fairsTitle, openGallery: t.fairsOpenGallery, close: t.fairsClose, prev: t.fairsPrev, next: t.fairsNext }}
        />
      )}

      {/* 05 — İş süreci */}
      <section className="section-home leaf-motif relative bg-navy text-white">
        <div className="container-site">
          <SectionHeading
            index="05"
            kicker={t.processKicker}
            title={t.processTitle}
            text={t.processText}
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
                <p className="type-small mt-6 text-[#5fd09d]">{d.common.step} {pad2(i + 1)}</p>
                <h3 className="mt-2 text-[19px] leading-[1.3] font-semibold">{s.title}</h3>
                <p className="mt-3 max-w-[280px] text-[14px] leading-[1.65] text-white/65">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Seçilmiş ürünler */}
      <section className="section-home bg-white">
        <div className="container-site">
          <SectionHeading
            index="06"
            kicker={t.featuredKicker}
            title={t.featuredTitle}
            text={t.featuredText}
            aside={<CtaLink href={allProductsHref}>{t.allProducts}</CtaLink>}
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

      {/* 07 — Konum: paneldə ünvan / xəritə doldurulduqda (Site Ayarları) */}
      <LocationSection
        index="07"
        lang={lang}
        contact={site.contact}
        show={site.showLocation}
        t={{
          kicker: t.locationKicker,
          title: t.locationTitle,
          text: t.locationText,
          address: t.locationAddress,
          hours: t.locationHours,
          phone: t.locationPhone,
          directions: t.locationDirections,
          viewMap: t.locationViewMap,
          contactKicker: t.locationContactKicker,
          contactLink: t.locationContactLink,
        }}
      />

      <FinalCta />
    </>
  );
}
