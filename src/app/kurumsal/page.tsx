import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Compass, Info, ThumbsUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { pad2 } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kurumsal",
  description: "DEFNE GROUP hakkında: misyon ve vizyonumuz, çalışma prensiplerimiz, belgelerimiz.",
  alternates: { canonical: "/kurumsal" },
};

const cards = [
  { href: "/kurumsal/hakkimizda", title: "Hakkımızda", text: "Kim olduğumuzu ve nasıl çalıştığımızı tanıyın.", icon: Info },
  { href: "/kurumsal/misyon-ve-vizyon", title: "Misyon ve Vizyon", text: "Bizi yönlendiren amaç ve hedefler.", icon: Compass },
  { href: "/kurumsal/neden-defne-group", title: "Neden DEFNE GROUP", text: "Kurumların bizi tercih etme nedenleri.", icon: ThumbsUp },
  { href: "/kurumsal/belgeler-ve-sertifikalar", title: "Belgeler ve Sertifikalar", text: "Onaylı belge ve sertifikalarımız.", icon: Award },
];

export default function KurumsalPage() {
  return (
    <>
      <PageHero
        kicker="Kurumsal"
        title="Güvenilir tedarik, sorumlu iş ortaklığı"
        text="DEFNE GROUP; kamu kurumları ve özel sektörün tedarik süreçlerini tek noktadan, şeffaf ve kayıt altında yönetmek için çalışır."
        crumbs={[{ label: "Kurumsal" }]}
        icon="landmark"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-4 sm:grid-cols-2 lg:gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={(i % 2) * 80}>
              <Link href={c.href} className="group flex h-full items-start gap-5 rounded-[8px] border border-line bg-white p-6 transition-colors hover:border-primary sm:p-8">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <c.icon className="size-6" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="type-small text-muted">{pad2(i + 1)}</span>
                  <span className="type-h3 mt-2 block text-ink">{c.title}</span>
                  <span className="mt-2 block text-[15px] text-muted">{c.text}</span>
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
