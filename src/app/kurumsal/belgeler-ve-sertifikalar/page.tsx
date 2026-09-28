import type { Metadata } from "next";
import Link from "next/link";
import { KurumsalNav } from "@/components/KurumsalNav";
import { EmptyState, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Belgeler ve Sertifikalar",
  description: "DEFNE GROUP onaylı belge ve sertifikaları.",
  alternates: { canonical: "/kurumsal/belgeler-ve-sertifikalar" },
};

/*
 * ISO 9001, ISO 14001, yetkinlik və uyğunluq sənədləri YALNIZ real və təsdiqlənmiş olduqda
 * göstəriləcək (sənəd, bölmə 7). Sənədlər gəldikdə bu siyahı `catalogs` quruluşuna oxşar
 * kartlarla doldurulacaq: ön baxış, ad, sənəd növü, etibarlılıq tarixi, İncele / İndir.
 */
const documents: { name: string }[] = [];

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        kicker="Kurumsal"
        title="Belgeler ve Sertifikalar"
        text="Onaylı ve güncel belgelerimiz bu sayfada yayımlanır."
        crumbs={[{ label: "Kurumsal", href: "/kurumsal" }, { label: "Belgeler ve Sertifikalar" }]}
        icon="file-check"
      />
      <KurumsalNav active="/kurumsal/belgeler-ve-sertifikalar" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          {documents.length === 0 && (
            <EmptyState
              title="Belgeler hazırlanıyor"
              text="Belge ve sertifikalarımız doğrulama sürecinin ardından bu sayfada yayımlanacaktır. Belirli bir belgeye ihtiyacınız varsa bizimle iletişime geçebilirsiniz."
              action={
                <Link href="/iletisim" className="btn-primary">
                  Belge Talep Edin
                </Link>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}
