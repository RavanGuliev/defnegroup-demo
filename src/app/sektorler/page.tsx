import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { pad2, sectors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sektörler",
  description: "Belediyeler, valilikler ve kamu kurumları, güvenlik birimleri, sağlık, eğitim, otel-restoran, sanayi ve sosyal hizmet kurumları için tedarik.",
  alternates: { canonical: "/sektorler" },
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        kicker="Sektörler"
        title="Her sektörün diline uygun tedarik"
        text="Kurumunuzun mevzuatını, satın alma sürecini ve kullanım koşullarını bilen bir ekip ile çalışın."
        crumbs={[{ label: "Sektörler" }]}
        icon="landmark"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <ul className="container-site grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {sectors.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 60}>
              <Link href={`/sektorler/${s.slug}`} className="group flex h-full min-h-[260px] flex-col rounded-[8px] border border-line bg-white p-6 transition-colors hover:border-primary sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon name={s.icon} className="size-7" />
                  </span>
                  <span className="type-small text-muted">{pad2(i + 1)}</span>
                </div>
                <h2 className="mt-auto pt-10 text-[19px] leading-[1.3] font-semibold text-ink">{s.name}</h2>
                <p className="mt-2 text-[14px] leading-[1.6] text-muted">{s.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-ink group-hover:text-primary">
                  İncele <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
