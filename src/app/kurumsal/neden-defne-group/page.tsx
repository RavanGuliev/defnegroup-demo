import type { Metadata } from "next";
import { Boxes, FileSearch, Handshake, MapPinned, ShieldCheck, Workflow } from "lucide-react";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { pad2 } from "@/lib/data";

export const metadata: Metadata = {
  title: "Neden DEFNE GROUP",
  description: "Kurumların DEFNE GROUP'u tercih etme nedenleri.",
  alternates: { canonical: "/kurumsal/neden-defne-group" },
};

const reasons = [
  { icon: Boxes, title: "Geniş ürün portföyü", text: "Farklı ihtiyaçlar için birçok ürün grubunu tek bir tedarikçiden temin edin." },
  { icon: Workflow, title: "Tek noktadan yönetim", text: "İhtiyaç analizinden teslimata kadar tek muhatap, tek süreç." },
  { icon: FileSearch, title: "Şartnameye uygunluk", text: "Teknik şartnamenizi inceleyip uygun ürün ve alternatifleri sunuyoruz." },
  { icon: Handshake, title: "Projeye özel çözümler", text: "Standart ürünün yetmediği yerde ihtiyaca özel çözüm geliştiriyoruz." },
  { icon: ShieldCheck, title: "Şeffaf ve kayıtlı süreç", text: "Her talep numaralandırılır; durum adım adım takip edilir." },
  { icon: MapPinned, title: "Türkiye geneli hizmet", text: "Planlı lojistik ile farklı illerdeki kurumlara teslimat." },
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        kicker="Kurumsal"
        title="Neden DEFNE GROUP"
        text="Kurumların tedarik süreçlerinde güvenle çalışabileceği bir iş ortağı olmak için."
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }, { label: "Neden DEFNE GROUP" }]}
        icon="shield"
      />
      <KurumsalNav active="/kurumsal/neden-defne-group" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-px overflow-hidden rounded-[8px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 70} className="bg-white p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <r.icon className="size-9 text-primary" strokeWidth={1.5} aria-hidden />
                <span className="type-small text-muted">{pad2(i + 1)}</span>
              </div>
              <h2 className="type-h3 mt-8 text-ink">{r.title}</h2>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
