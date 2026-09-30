import { Compass, Target } from "lucide-react";
import { KurumsalNav } from "@/components/KurumsalNav";
import { Reveal } from "@/components/Reveal";
import { FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";

// Yekun misyon/vizyon mətni DEFNE GROUP tərəfindən təsdiqlənməlidir.
const copy = {
  tr: {
    description: "DEFNE GROUP misyonu ve vizyonu.",
    blocks: [
      {
        kicker: "Misyonumuz",
        title: "Kurumların ihtiyacını doğru ürün ve doğru çözümle, zamanında karşılamak.",
        text: "Geniş ürün portföyümüz ve sektörel deneyimimizle, kamu ve özel sektör kurumlarının tedarik süreçlerini sadeleştirmek; her talebi şeffaf, ölçülebilir ve güvenilir biçimde sonuçlandırmak.",
      },
      {
        kicker: "Vizyonumuz",
        title: "Türkiye genelinde kurumların ilk tercih ettiği tedarik ve proje çözüm ortağı olmak.",
        text: "Dijital altyapımızı, ürün bilgisini ve hizmet kalitemizi sürekli geliştirerek; kurumların ihtiyaçlarını önceden öngören, sürdürülebilir çözümler üreten bir yapı kurmak.",
      },
    ],
  },
  az: {
    description: "DEFNE GROUP-un missiyası və vizyonu.",
    blocks: [
      {
        kicker: "Missiyamız",
        title: "Qurumların ehtiyacını düzgün məhsul və düzgün həll ilə vaxtında qarşılamaq.",
        text: "Geniş məhsul portfelimiz və sektor təcrübəmizlə dövlət və özəl sektor qurumlarının təchizat proseslərini sadələşdirmək; hər sorğunu şəffaf, ölçülə bilən və etibarlı şəkildə nəticələndirmək.",
      },
      {
        kicker: "Vizyonumuz",
        title: "Türkiyə üzrə qurumların ilk seçdiyi təchizat və layihə həlləri tərəfdaşı olmaq.",
        text: "Rəqəmsal infrastrukturumuzu, məhsul biliyini və xidmət keyfiyyətimizi daim inkişaf etdirərək qurumların ehtiyaclarını əvvəlcədən görən, davamlı həllər yaradan bir struktur qurmaq.",
      },
    ],
  },
};

const icons = [Target, Compass];

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/misyon-ve-vizyon", { title: getDict(lang).nav.mission, description: copy[lang].description });
}

export default async function MissionPage() {
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  return (
    <>
      <PageHero kicker={nav.corporate} title={nav.mission} crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.mission }]} icon="file-check" />
      <KurumsalNav active="/kurumsal/misyon-ve-vizyon" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-5 lg:grid-cols-2">
          {t.blocks.map((b, i) => {
            const BIcon = icons[i];
            return (
              <Reveal
                key={b.kicker}
                delay={i * 100}
                className={`rounded-[8px] p-8 sm:p-10 lg:p-12 ${i === 0 ? "bg-primary text-white" : "border border-line bg-light text-ink"}`}
              >
                <BIcon className={`size-10 ${i === 0 ? "text-white/80" : "text-accent"}`} strokeWidth={1.5} aria-hidden />
                <p className={`type-kicker mt-8 ${i === 0 ? "text-white/70" : "text-accent"}`}>{b.kicker}</p>
                <h2 className="mt-4 text-[clamp(22px,2vw,30px)] leading-[1.25] font-bold tracking-[-0.02em]">{b.title}</h2>
                <p className={`mt-5 text-[16px] leading-[1.7] ${i === 0 ? "text-white/80" : "text-muted"}`}>{b.text}</p>
              </Reveal>
            );
          })}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
