import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Ürün, tedarik ve teklif talepleriniz için DEFNE GROUP ile iletişime geçin.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const c = site.contact;
  const cards = [
    { icon: Mail, label: "E-posta", value: c.email, href: `mailto:${c.email}` },
    { icon: ClipboardList, label: "Teklif talepleri", value: c.quoteEmail, href: `mailto:${c.quoteEmail}` },
    ...(c.phone ? [{ icon: Phone, label: "Telefon", value: c.phone, href: `tel:${c.phoneHref}` }] : []),
    ...(c.address ? [{ icon: MapPin, label: "Adres", value: c.address, href: undefined }] : []),
    ...(c.hours.length ? [{ icon: Clock, label: "Çalışma saatleri", value: c.hours.join(" · "), href: undefined }] : []),
  ];

  return (
    <>
      <PageHero
        kicker="İletişim"
        title="Bize ulaşın"
        text="Ürün, tedarik, teknik destek veya teklif talepleriniz için ekibimize ulaşabilirsiniz."
        crumbs={[{ label: "İletişim" }]}
        icon="building"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p className="type-kicker">01 — Doğrudan iletişim</p>
            <h2 className="type-h2 mt-4 text-ink">Doğrudan iletişime geçin</h2>
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
              <p className="font-semibold">Fiyat teklifi mi almak istiyorsunuz?</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-white/65">Ürünleri Teklif Listenize ekleyin veya teknik şartnamenizi yükleyin.</p>
              <Link href="/teklif-listem#teklif-formu" className="btn-primary mt-5">
                Teklif Talebi Oluşturun
              </Link>
            </div>
          </div>
          <div>
            <p className="type-kicker">02 — İletişim formu</p>
            <h2 className="type-h2 mt-4 text-ink">Mesaj gönderin</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
