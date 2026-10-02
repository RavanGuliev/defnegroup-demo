import { ArrowRight, Clock, MapPin, Navigation, Phone } from "lucide-react";
import type { SiteInfo } from "@/lib/store";
import { telHref } from "@/lib/site";
import { Reveal } from "../Reveal";
import { CtaLink, SectionHeading } from "../ui";

type Copy = {
  kicker: string;
  title: string;
  text: string;
  address: string;
  hours: string;
  phone: string;
  directions: string;
  viewMap: string;
  contactKicker: string;
  contactLink: string;
};

const lines = (s: string | null) => (s ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);

function InfoCard({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-[6px] border border-line bg-white p-5 sm:p-6">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[6px] border border-line bg-light text-primary">
        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="type-small text-muted">{label}</p>
        <div className="mt-2 text-[15px] leading-[1.6] text-ink">{children}</div>
      </div>
    </div>
  );
}

/*
 * Ana səhifə "Konum" bölməsi — ünvan, iş saatları, telefon və Google xəritəsi.
 * Məlumat paneldən gəlir (Site Ayarları → İletişim bilgileri); ünvan və ya xəritə yeri
 * doldurulmayıbsa bölmə göstərilmir. Xəritə API açarı tələb etməyən embed ilə qurulur.
 */
export function LocationSection({ index, lang, contact, show, t }: { index: string; lang: string; contact: SiteInfo["contact"]; show: boolean; t: Copy }) {
  const query = contact.mapQuery || lines(contact.address).join(", ");
  if (!show || !query) return null;

  const q = encodeURIComponent(query);
  // Google-un öz "Xəritədə aç" düyməsi saytın dilində göstərilir
  const embed = `https://maps.google.com/maps?q=${q}&z=16&hl=${lang}&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const viewMap = contact.mapUrl || `https://www.google.com/maps/search/?api=1&query=${q}`;
  const address = lines(contact.address);
  const hours = lines(contact.workingHours);
  const linkCls = "group inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-ink transition-colors hover:text-primary";

  return (
    <section className="section-home bg-light">
      <div className="container-site">
        <SectionHeading
          index={index}
          kicker={t.kicker}
          title={t.title}
          text={t.text}
          aside={
            <div className="flex flex-col items-start gap-1 lg:items-end">
              <span className="type-small text-muted">{t.contactKicker}</span>
              <CtaLink href="/iletisim">{t.contactLink}</CtaLink>
            </div>
          }
        />

        <Reveal className="section-stack grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:gap-5">
          <div className="grid content-start gap-4">
            {address.length > 0 && (
              <InfoCard icon={MapPin} label={t.address}>
                {address.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </InfoCard>
            )}
            {hours.length > 0 && (
              <InfoCard icon={Clock} label={t.hours}>
                {hours.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </InfoCard>
            )}
            <div className="rounded-[6px] border border-line bg-white p-5 sm:p-6">
              {contact.phone && (
                <div className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[6px] border border-line bg-light text-primary">
                    <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div>
                    <p className="type-small text-muted">{t.phone}</p>
                    <a href={telHref(contact.phone)} className="mt-2 block text-[17px] font-semibold text-ink hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              )}
              <div className={`flex flex-wrap gap-x-6 ${contact.phone ? "mt-4 border-t border-line pt-2" : ""}`}>
                <a href={directions} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {t.directions} <Navigation className="size-4" aria-hidden />
                </a>
                <a href={viewMap} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {t.viewMap} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[6px] border border-line bg-white sm:min-h-[400px]">
            <iframe
              src={embed}
              title={`${t.kicker}: ${query}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
