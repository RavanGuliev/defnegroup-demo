import { KurumsalNav } from "@/components/KurumsalNav";
import Link from "@/components/Link";
import { Media } from "@/components/Media";
import { EmptyState, PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "DEFNE GROUP onaylı belge ve sertifikaları.",
    text: "Onaylı ve güncel belgelerimiz bu sayfada yayımlanır.",
    emptyTitle: "Belgeler hazırlanıyor",
    emptyText:
      "Belge ve sertifikalarımız doğrulama sürecinin ardından bu sayfada yayımlanacaktır. Belirli bir belgeye ihtiyacınız varsa bizimle iletişime geçebilirsiniz.",
    request: "Belge Talep Edin",
    validUntil: "Geçerlilik",
  },
  en: {
    description: "DEFNE GROUP’s approved documents and certificates.",
    text: "Our approved and up-to-date documents are published on this page.",
    emptyTitle: "Documents are being prepared",
    emptyText: "Our documents and certificates will be published on this page after the review process. If you need a specific document, please contact us.",
    request: "Request a Document",
    validUntil: "Valid until",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/belgeler-ve-sertifikalar", { title: (await getDictionary(lang)).nav.certificates, description: (await pageCopy("pages.kurumsal.belgelerVeSertifikalar", copy, lang)).description });
}

/*
 * ISO 9001, ISO 14001, yetkinlik və uyğunluq sənədləri YALNIZ real və təsdiqlənmiş olduqda
 * göstəriləcək (data.ts → certificates). Sənədlər gəldikdə kataloq kartlarına oxşar kartlarla
 * doldurulacaq: ön baxış, ad, sənəd növü, etibarlılıq tarixi, İncele / İndir.
 */
export default async function CertificatesPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.kurumsal.belgelerVeSertifikalar", copy, lang));
  const d = await getDictionary(lang);
  const nav = d.nav;
  const { certificates } = await getDb(lang);
  const date = (iso: string) => new Date(iso).toLocaleDateString(lang === "en" ? "en-GB" : "tr-TR");
  return (
    <>
      <PageHero
        kicker={nav.corporate}
        title={nav.certificates}
        text={t.text}
        crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.certificates }]}
        icon="file-check"
        image={(await getDb(lang)).images.belgeler ?? undefined}
      />
      <KurumsalNav active="/kurumsal/belgeler-ve-sertifikalar" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          {certificates.length > 0 && (
            <ul className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {certificates.map((c) => (
                <li key={c.slug} className="flex flex-col overflow-hidden rounded-[8px] border border-line bg-white">
                  <div className="relative aspect-[3/4] bg-light">
                    <Media src={c.preview} alt={c.name} icon="file-check" variant="light" sizes="300px" iconClassName="size-14" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {c.type && <p className="type-small text-primary">{c.type}</p>}
                    <h2 className="mt-2 text-[17px] leading-[1.3] font-semibold text-ink">{c.name}</h2>
                    {c.issuer && <p className="mt-1 text-[13px] text-muted">{c.issuer}</p>}
                    {c.validUntil && (
                      <p className="mt-2 text-[13px] text-muted">
                        {t.validUntil}: {date(c.validUntil)}
                      </p>
                    )}
                    {c.file && (
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <a href={c.file} target="_blank" rel="noopener" className="btn-outline min-h-11 px-3">
                          {d.common.inspect}
                        </a>
                        <a href={c.file} download className="btn-primary min-h-11 px-3">
                          {d.common.download}
                        </a>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {certificates.length === 0 && (
            <EmptyState
              title={t.emptyTitle}
              text={t.emptyText}
              action={
                <Link href="/iletisim" className="btn-primary">
                  {t.request}
                </Link>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
