import { ClipboardList, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import Link from "@/components/Link";
import { PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { telHref } from "@/lib/site";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "Ürün, tedarik ve teklif talepleriniz için DEFNE GROUP ile iletişime geçin.",
    title: "Bize ulaşın",
    text: "Ürün, tedarik, teknik destek veya teklif talepleriniz için ekibimize ulaşabilirsiniz.",
    email: "E-posta",
    quotes: "Teklif talepleri",
    phone: "Telefon",
    address: "Adres",
    hours: "Çalışma saatleri",
    directKicker: "Doğrudan iletişim",
    directTitle: "Doğrudan iletişime geçin",
    quoteTitle: "Fiyat teklifi mi almak istiyorsunuz?",
    quoteText: "Ürünleri Teklif Listenize ekleyin veya teknik şartnamenizi yükleyin.",
    formKicker: "İletişim formu",
    formTitle: "Mesaj gönderin",
  },
  en: {
    description: "Contact DEFNE GROUP for product, supply and quotation requests.",
    title: "Contact us",
    text: "You can reach our team for product, supply, technical support or quotation requests.",
    email: "Email",
    quotes: "Quotation requests",
    phone: "Phone",
    address: "Address",
    hours: "Working hours",
    directKicker: "Direct contact",
    directTitle: "Get in touch directly",
    quoteTitle: "Would you like a price quote?",
    quoteText: "Add products to your Quote List or upload your technical specification.",
    formKicker: "Contact form",
    formTitle: "Send a message",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/iletisim", { title: (await getDictionary(lang)).nav.contact, description: (await pageCopy("pages.iletisim", copy, lang)).description });
}

export default async function ContactPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.iletisim", copy, lang));
  const d = (await getDictionary(lang));
  const db = await getDb(lang);
  const c = db.site.contact;
  // Yalnız paneldə doldurulmuş (təsdiqlənmiş) əlaqə məlumatları göstərilir
  const cards = [
    ...(c.email ? [{ icon: Mail, label: t.email, value: c.email, href: `mailto:${c.email}` }] : []),
    ...(c.quoteEmail ? [{ icon: ClipboardList, label: t.quotes, value: c.quoteEmail, href: `mailto:${c.quoteEmail}` }] : []),
    ...(c.phone ? [{ icon: Phone, label: t.phone, value: c.phone, href: telHref(c.phone) }] : []),
    ...(c.address ? [{ icon: MapPin, label: t.address, value: c.address, href: c.mapUrl ?? undefined }] : []),
    ...(c.workingHours ? [{ icon: Clock, label: t.hours, value: c.workingHours, href: undefined }] : []),
  ];

  return (
    <>
      <PageHero
        kicker={d.nav.contact}
        title={t.title}
        text={t.text}
        crumbs={[{ label: d.nav.contact }]}
        icon="building"
        image={db.images.iletisim ?? undefined}
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p className="type-kicker">01 — {t.directKicker}</p>
            <h2 className="type-h2 mt-4 text-ink">{t.directTitle}</h2>
            <ul className="mt-8 grid gap-3">
              {cards.map((x) => (
                <li key={x.label} className="flex items-start gap-4 rounded-[8px] border border-line bg-white p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                    <x.icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="type-small block text-muted">{x.label}</span>
                    {x.href ? (
                      <a href={x.href} className="mt-1 block text-[16px] font-semibold break-words text-ink hover:text-primary">
                        {x.value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-[16px] text-ink">{x.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-[8px] bg-navy p-6 text-white">
              <p className="font-semibold">{t.quoteTitle}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/65">{t.quoteText}</p>
              <Link href="/teklif-listem#teklif-formu" className="btn-primary mt-5">
                {d.common.createQuoteRequest}
              </Link>
            </div>
          </div>
          <div>
            <p className="type-kicker">02 — {t.formKicker}</p>
            <h2 className="type-h2 mt-4 text-ink">{t.formTitle}</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
