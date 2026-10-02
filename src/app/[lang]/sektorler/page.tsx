import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import Link from "@/components/Link";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { pad2 } from "@/lib/data";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "Belediyeler, valilikler ve kamu kurumları, güvenlik birimleri, sağlık, eğitim, otel-restoran, sanayi ve sosyal hizmet kurumları için tedarik.",
    title: "Her sektörün diline uygun tedarik",
    text: "Kurumunuzun mevzuatını, satın alma sürecini ve kullanım koşullarını bilen bir ekip ile çalışın.",
  },
  en: {
    description: "Supply for municipalities, governorships and public institutions, security units, healthcare, education, hotels and restaurants, industry and social service institutions.",
    title: "Supply that speaks each sector’s language",
    text: "Work with a team that knows your institution’s regulations, procurement process and conditions of use.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/sektorler", { title: (await getDictionary(lang)).nav.sectors, description: (await pageCopy("pages.sektorler", copy, lang)).description });
}

export default async function SectorsPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.sektorler", copy, lang));
  const d = (await getDictionary(lang));
  const { sectors } = (await getDb(lang));
  return (
    <>
      <PageHero kicker={d.nav.sectors} title={t.title} text={t.text} crumbs={[{ label: d.nav.sectors }]} icon="landmark" image={(await getDb(lang)).images.sektorler ?? undefined} />
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
                  {d.common.inspect} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
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
