import type { Metadata } from "next";
import { QuoteForm, QuoteList } from "@/components/quote/QuoteForm";
import { Breadcrumbs } from "@/components/ui";
import { processSteps } from "@/lib/data";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Teklif Listem",
  description: "Seçtiğiniz ürünler için üyelik gerektirmeden teklif talebi oluşturun; teknik şartname ve ürün listenizi yükleyin.",
  alternates: { canonical: "/teklif-listem" },
  robots: { index: false },
};

export default function QuotePage() {
  return (
    <>
      <section className="border-b border-line bg-light">
        <div className="container-site py-8 sm:py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "Teklif Listem" }]} />
          <p className="type-kicker mt-8 lg:mt-12">Teklif Talebi</p>
          <h1 className="type-h1 mt-4 text-ink">Teklif Listem</h1>
          <p className="type-body mt-5 max-w-[620px]">
            Üyelik gerektirmeden ürünlerinizi listeleyin, adet ve notlarınızı ekleyin; teknik şartnamenizle birlikte tek formda gönderin.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14 lg:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="type-h3 text-ink">Seçilen ürünler</h2>
            <div className="mt-5">
              <QuoteList />
            </div>

            <div id="teklif-formu" className="scroll-mt-28 pt-14">
              <h2 className="type-h3 text-ink">Talep formu</h2>
              <p className="type-body mt-2">Zorunlu alanlar * ile işaretlenmiştir.</p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </div>

          <aside className="lg:pt-12">
            <div className="rounded-[8px] bg-navy p-6 text-white sm:p-8 lg:sticky lg:top-28">
              <p className="type-kicker text-[#6fd3a8]">Süreç</p>
              <p className="mt-3 text-[20px] font-bold">Talebiniz nasıl ilerler?</p>
              <ol className="mt-6 space-y-5">
                {processSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#6fd3a8]">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[12px] font-semibold tracking-[0.14em] text-white/50 uppercase">Adım {i + 1}</span>
                      <span className="block font-semibold">{s.title}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6 text-[14px] leading-[1.6] text-white/65">
                Her talep için benzersiz bir müracaat numarası oluşturulur ve e-posta ile onay gönderilir. Talep durumu: Yeni Talep → İnceleniyor →
                Teklif Hazırlanıyor → Teklif Gönderildi → Sonuçlandı.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
