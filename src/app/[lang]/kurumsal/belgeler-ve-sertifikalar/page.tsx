import { KurumsalNav } from "@/components/KurumsalNav";
import Link from "@/components/Link";
import { EmptyState, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";
import { certificates } from "@/lib/data";

const copy = {
  tr: {
    description: "DEFNE GROUP onaylı belge ve sertifikaları.",
    text: "Onaylı ve güncel belgelerimiz bu sayfada yayımlanır.",
    emptyTitle: "Belgeler hazırlanıyor",
    emptyText:
      "Belge ve sertifikalarımız doğrulama sürecinin ardından bu sayfada yayımlanacaktır. Belirli bir belgeye ihtiyacınız varsa bizimle iletişime geçebilirsiniz.",
    request: "Belge Talep Edin",
  },
  az: {
    description: "DEFNE GROUP-un təsdiqlənmiş sənəd və sertifikatları.",
    text: "Təsdiqlənmiş və aktual sənədlərimiz bu səhifədə dərc olunur.",
    emptyTitle: "Sənədlər hazırlanır",
    emptyText: "Sənəd və sertifikatlarımız yoxlama prosesindən sonra bu səhifədə dərc olunacaq. Müəyyən bir sənədə ehtiyacınız varsa bizimlə əlaqə saxlaya bilərsiniz.",
    request: "Sənəd Tələb Edin",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kurumsal/belgeler-ve-sertifikalar", { title: getDict(lang).nav.certificates, description: copy[lang].description });
}

/*
 * ISO 9001, ISO 14001, yetkinlik və uyğunluq sənədləri YALNIZ real və təsdiqlənmiş olduqda
 * göstəriləcək (data.ts → certificates). Sənədlər gəldikdə kataloq kartlarına oxşar kartlarla
 * doldurulacaq: ön baxış, ad, sənəd növü, etibarlılıq tarixi, İncele / İndir.
 */
export default async function CertificatesPage() {
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  return (
    <>
      <PageHero
        kicker={nav.corporate}
        title={nav.certificates}
        text={t.text}
        crumbs={[{ label: nav.corporate, href: "/kurumsal" }, { label: nav.certificates }]}
        icon="file-check"
      />
      <KurumsalNav active="/kurumsal/belgeler-ve-sertifikalar" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
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
