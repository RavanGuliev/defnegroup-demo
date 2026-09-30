import { Icon } from "@/components/Icon";
import { QuoteForm, QuoteList } from "@/components/quote/QuoteForm";
import { Breadcrumbs } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { db } from "@/lib/data";

const copy = {
  tr: {
    description: "Seçtiğiniz ürünler için üyelik gerektirmeden teklif talebi oluşturun; teknik şartname ve ürün listenizi yükleyin.",
    kicker: "Teklif Talebi",
    text: "Üyelik gerektirmeden ürünlerinizi listeleyin, adet ve notlarınızı ekleyin; teknik şartnamenizle birlikte tek formda gönderin.",
    selected: "Seçilen ürünler",
    form: "Talep formu",
    required: "Zorunlu alanlar * ile işaretlenmiştir.",
    processKicker: "Süreç",
    processTitle: "Talebiniz nasıl ilerler?",
    processNote:
      "Her talep için benzersiz bir müracaat numarası oluşturulur ve e-posta ile onay gönderilir. Talep durumu: Yeni Talep → İnceleniyor → Teklif Hazırlanıyor → Teklif Gönderildi → Sonuçlandı.",
  },
  az: {
    description: "Seçdiyiniz məhsullar üçün qeydiyyatsız təklif sorğusu yaradın; texniki şərtnamə və məhsul siyahınızı yükləyin.",
    kicker: "Təklif Sorğusu",
    text: "Qeydiyyat tələb olunmadan məhsullarınızı siyahıya salın, say və qeydlərinizi əlavə edin; texniki şərtnamənizlə birlikdə bir formada göndərin.",
    selected: "Seçilmiş məhsullar",
    form: "Sorğu forması",
    required: "Mütləq sahələr * ilə işarələnib.",
    processKicker: "Proses",
    processTitle: "Sorğunuz necə irəliləyir?",
    processNote:
      "Hər sorğu üçün unikal müraciət nömrəsi yaradılır və e-poçtla təsdiq göndərilir. Sorğunun statusu: Yeni Sorğu → Araşdırılır → Təklif Hazırlanır → Təklif Göndərildi → Nəticələndi.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/teklif-listem", { title: getDict(lang).common.quoteList, description: copy[lang].description, robots: { index: false } });
}

export default async function QuotePage() {
  const lang = await getLang();
  const t = copy[lang];
  const d = getDict(lang);
  const { processSteps } = db(lang);
  return (
    <>
      <section className="border-b border-line bg-light">
        <div className="container-site py-6 sm:py-8 lg:py-10">
          <Breadcrumbs items={[{ label: d.common.quoteList }]} />
          <p className="type-kicker mt-5 lg:mt-6">{t.kicker}</p>
          <h1 className="type-h1-inner mt-3 text-ink">{d.common.quoteList}</h1>
          <p className="type-body mt-3 max-w-[620px]">{t.text}</p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="type-h3 text-ink">{t.selected}</h2>
            <div className="mt-5">
              <QuoteList />
            </div>

            <div id="teklif-formu" className="scroll-mt-28 pt-14">
              <h2 className="type-h3 text-ink">{t.form}</h2>
              <p className="type-body mt-2">{t.required}</p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>

          <aside className="lg:pt-12">
            <div className="rounded-[8px] bg-navy p-6 text-white sm:p-8 lg:sticky lg:top-28">
              <p className="type-kicker text-[#6fd3a8]">{t.processKicker}</p>
              <p className="mt-3 text-[20px] font-bold">{t.processTitle}</p>
              <ol className="mt-6 space-y-5">
                {processSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#6fd3a8]">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">{d.common.step} {i + 1}</span>
                      <span className="block font-semibold">{s.title}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6 text-[14px] leading-[1.6] text-white/65">
                {t.processNote}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
