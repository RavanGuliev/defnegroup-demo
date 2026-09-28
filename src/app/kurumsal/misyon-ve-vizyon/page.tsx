import type { Metadata } from "next";
import { Compass, Target } from "lucide-react";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Misyon ve Vizyon",
  description: "DEFNE GROUP misyonu ve vizyonu.",
  alternates: { canonical: "/kurumsal/misyon-ve-vizyon" },
};

// Yekun misyon/vizyon mətni DEFNE GROUP tərəfindən təsdiqlənməlidir.
const blocks = [
  {
    icon: Target,
    kicker: "Misyonumuz",
    title: "Kurumların ihtiyacını doğru ürün ve doğru çözümle, zamanında karşılamak.",
    text: "Geniş ürün portföyümüz ve sektörel deneyimimizle, kamu ve özel sektör kurumlarının tedarik süreçlerini sadeleştirmek; her talebi şeffaf, ölçülebilir ve güvenilir biçimde sonuçlandırmak.",
  },
  {
    icon: Compass,
    kicker: "Vizyonumuz",
    title: "Türkiye genelinde kurumların ilk tercih ettiği tedarik ve proje çözüm ortağı olmak.",
    text: "Dijital altyapımızı, ürün bilgisini ve hizmet kalitemizi sürekli geliştirerek; kurumların ihtiyaçlarını önceden öngören, sürdürülebilir çözümler üreten bir yapı kurmak.",
  },
];

export default function MissionPage() {
  return (
    <>
      <PageHero
        kicker="Kurumsal"
        title="Misyon ve Vizyon"
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }, { label: "Misyon ve Vizyon" }]}
        icon="file-check"
      />
      <KurumsalNav active="/kurumsal/misyon-ve-vizyon" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal
              key={b.kicker}
              delay={i * 100}
              className={`rounded-[8px] p-8 sm:p-10 lg:p-12 ${i === 0 ? "bg-primary text-white" : "border border-line bg-light text-ink"}`}
            >
              <b.icon className={`size-10 ${i === 0 ? "text-white/80" : "text-accent"}`} strokeWidth={1.5} aria-hidden />
              <p className={`type-kicker mt-8 ${i === 0 ? "text-white/70" : "text-accent"}`}>{b.kicker}</p>
              <h2 className="mt-4 text-[clamp(22px,2vw,30px)] leading-[1.25] font-bold tracking-[-0.02em]">{b.title}</h2>
              <p className={`mt-5 text-[16px] leading-[1.7] ${i === 0 ? "text-white/80" : "text-muted"}`}>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
