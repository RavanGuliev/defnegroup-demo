import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, FinalCta, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description: "DEFNE GROUP tarafından tamamlanan tedarik ve proje çalışmaları.",
  alternates: { canonical: "/projelerimiz" },
};

/*
 * Yalnız həqiqətən görülmüş və yayımlanmasına icazə verilmiş layihələr yerləşdiriləcək;
 * müştəri / qurum adı yalnız yazılı icazə ilə (sənəd, bölmə 7).
 * Layihə modeli: { slug, title, sectorSlug, solutionSlug, year, summary, images[], clientName? (icazə ilə) }
 */
const projects: { slug: string; title: string }[] = [];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        kicker="Projelerimiz"
        title="Tamamlanan projeler"
        text="Kurumlarla birlikte hayata geçirdiğimiz tedarik ve proje çalışmalarından seçmeler."
        crumbs={[{ label: "Projelerimiz" }]}
        icon="truck"
      />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          {projects.length === 0 && (
            <EmptyState
              title="Proje içerikleri hazırlanıyor"
              text="Yayın izni alınan projelerimiz yakında bu sayfada yer alacaktır. Benzer bir proje için ihtiyacınızı bizimle paylaşabilirsiniz."
              action={
                <Link href="/cozum-alanlari" className="btn-primary">
                  Çözüm Alanlarını İnceleyin
                </Link>
              }
            />
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
