import { ArrowRight, Award, Compass, Info, ThumbsUp } from "lucide-react";
import Link from "@/components/Link";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { pad2 } from "@/lib/data";

const copy = {
  tr: {
    description: "DEFNE GROUP hakkında: misyon ve vizyonumuz, çalışma prensiplerimiz, belgelerimiz.",
    title: "Güvenilir tedarik, sorumlu iş ortaklığı",
    text: "DEFNE GROUP; kamu kurumları ve özel sektörün tedarik süreçlerini tek noktadan, şeffaf ve kayıt altında yönetmek için çalışır.",
    cards: [
      "Kim olduğumuzu ve nasıl çalıştığımızı tanıyın.",
      "Bizi yönlendiren amaç ve hedefler.",
      "Kurumların bizi tercih etme nedenleri.",
      "Onaylı belge ve sertifikalarımız.",
    ],
  },
  az: {
    description: "DEFNE GROUP haqqında: missiya və vizyonumuz, iş prinsiplərimiz, sənədlərimiz.",
    title: "Etibarlı təchizat, məsuliyyətli tərəfdaşlıq",
    text: "DEFNE GROUP dövlət qurumları və özəl sektorun təchizat proseslərini bir mərkəzdən, şəffaf və qeydiyyatla idarə etmək üçün çalışır.",
    cards: ["Kim olduğumuzu və necə işlədiyimizi tanıyın.", "Bizi istiqamətləndirən məqsəd və hədəflər.", "Qurumların bizi seçmə səbəbləri.", "Təsdiqlənmiş sənəd və sertifikatlarımız."],
  },
};

const cards = [
  { href: "/kurumsal/hakkimizda", key: "about", icon: Info },
  { href: "/kurumsal/misyon-ve-vizyon", key: "mission", icon: Compass },
  { href: "/kurumsal/neden-defne-group", key: "why", icon: ThumbsUp },
  { href: "/kurumsal/belgeler-ve-sertifikalar", key: "certificates", icon: Award },
] as const;

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal", { title: getDict(lang).nav.corporate, description: copy[lang].description });
}

export default async function KurumsalPage() {
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  return (
    <>
      <PageHero kicker={nav.corporate} title={t.title} text={t.text} crumbs={[{ label: nav.corporate }]} icon="landmark" />
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
                  <span className="type-h3 mt-2 block text-ink">{nav[c.key]}</span>
                  <span className="mt-2 block text-[15px] text-muted">{t.cards[i]}</span>
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
