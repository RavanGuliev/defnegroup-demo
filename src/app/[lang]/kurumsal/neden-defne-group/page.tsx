import { Boxes, FileSearch, Handshake, MapPinned, ShieldCheck, Workflow } from "lucide-react";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { pad2 } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "Kurumların DEFNE GROUP'u tercih etme nedenleri.",
    text: "Kurumların tedarik süreçlerinde güvenle çalışabileceği bir iş ortağı olmak için.",
    reasons: [
      { title: "Geniş ürün portföyü", text: "Farklı ihtiyaçlar için birçok ürün grubunu tek bir tedarikçiden temin edin." },
      { title: "Tek noktadan yönetim", text: "İhtiyaç analizinden teslimata kadar tek muhatap, tek süreç." },
      { title: "Şartnameye uygunluk", text: "Teknik şartnamenizi inceleyip uygun ürün ve alternatifleri sunuyoruz." },
      { title: "Projeye özel çözümler", text: "Standart ürünün yetmediği yerde ihtiyaca özel çözüm geliştiriyoruz." },
      { title: "Şeffaf ve kayıtlı süreç", text: "Her talep numaralandırılır; durum adım adım takip edilir." },
      { title: "Türkiye geneli hizmet", text: "Planlı lojistik ile farklı illerdeki kurumlara teslimat." },
    ],
  },
  en: {
    description: "Why institutions choose DEFNE GROUP.",
    text: "To be a partner institutions can rely on in their supply processes.",
    reasons: [
      { title: "Broad product portfolio", text: "Source many product groups for different needs from a single supplier." },
      { title: "Single-point management", text: "One point of contact and one process, from needs analysis to delivery." },
      { title: "Specification compliance", text: "We review your technical specification and offer suitable products and alternatives." },
      { title: "Project-specific solutions", text: "Where a standard product is not enough, we develop a solution tailored to the need." },
      { title: "Transparent, documented process", text: "Every request is numbered and its status is tracked step by step." },
      { title: "Service across Türkiye", text: "Delivery to institutions in different regions with planned logistics." },
    ],
  },
};

const icons = [Boxes, Workflow, FileSearch, Handshake, ShieldCheck, MapPinned];

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/neden-defne-group", { title: (await getDictionary(lang)).nav.why, description: (await pageCopy("pages.kurumsal.nedenDefneGroup", copy, lang)).description });
}

export default async function WhyPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.kurumsal.nedenDefneGroup", copy, lang));
  const nav = (await getDictionary(lang)).nav;
  return (
    <>
      <PageHero kicker={nav.corporate} title={nav.why} text={t.text} crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.why }]} icon="shield" image={(await getDb(lang)).images.nedenDefne ?? undefined} />
      <KurumsalNav active="/kurumsal/neden-defne-group" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-px overflow-hidden rounded-[8px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {t.reasons.map((r, i) => {
            const RIcon = icons[i];
            return (
              <Reveal key={r.title} delay={(i % 3) * 70} className="bg-white p-7 sm:p-9">
                <div className="flex items-start justify-between">
                  <RIcon className="size-9 text-primary" strokeWidth={1.5} aria-hidden />
                  <span className="type-small text-muted">{pad2(i + 1)}</span>
                </div>
                <h2 className="type-h3 mt-8 text-ink">{r.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-muted">{r.text}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
