import { Boxes, FileSearch, Handshake, MapPinned, ShieldCheck, Workflow } from "lucide-react";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { pad2 } from "@/lib/data";

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
  az: {
    description: "Qurumların DEFNE GROUP-u seçmə səbəbləri.",
    text: "Qurumların təchizat proseslərində etibarla işləyə biləcəyi tərəfdaş olmaq üçün.",
    reasons: [
      { title: "Geniş məhsul portfeli", text: "Müxtəlif ehtiyaclar üçün bir çox məhsul qrupunu bir təchizatçıdan əldə edin." },
      { title: "Bir mərkəzdən idarəetmə", text: "Ehtiyac təhlilindən çatdırılmaya qədər vahid əlaqə nöqtəsi, vahid proses." },
      { title: "Şərtnaməyə uyğunluq", text: "Texniki şərtnamənizi araşdırıb uyğun məhsul və alternativləri təqdim edirik." },
      { title: "Layihəyə xüsusi həllər", text: "Standart məhsulun kifayət etmədiyi yerdə ehtiyaca uyğun həll hazırlayırıq." },
      { title: "Şəffaf və qeydiyyatlı proses", text: "Hər sorğu nömrələnir; status addım-addım izlənilir." },
      { title: "Türkiyə üzrə xidmət", text: "Planlı logistika ilə müxtəlif bölgələrdəki qurumlara çatdırılma." },
    ],
  },
};

const icons = [Boxes, Workflow, FileSearch, Handshake, ShieldCheck, MapPinned];

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/neden-defne-group", { title: getDict(lang).nav.why, description: copy[lang].description });
}

export default async function WhyPage() {
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  return (
    <>
      <PageHero kicker={nav.corporate} title={nav.why} text={t.text} crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.why }]} icon="shield" />
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
