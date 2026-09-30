import Link from "@/components/Link";
import { EmptyState, FinalCta, PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";

const copy = {
  tr: {
    description: "DEFNE GROUP tarafından tamamlanan tedarik ve proje çalışmaları.",
    title: "Tamamlanan projeler",
    text: "Kurumlarla birlikte hayata geçirdiğimiz tedarik ve proje çalışmalarından seçmeler.",
    emptyTitle: "Proje içerikleri hazırlanıyor",
    emptyText: "Yayın izni alınan projelerimiz yakında bu sayfada yer alacaktır. Benzer bir proje için ihtiyacınızı bizimle paylaşabilirsiniz.",
    action: "Çözüm Alanlarını İnceleyin",
  },
  az: {
    description: "DEFNE GROUP tərəfindən tamamlanmış təchizat və layihə işləri.",
    title: "Tamamlanmış layihələr",
    text: "Qurumlarla birlikdə həyata keçirdiyimiz təchizat və layihə işlərindən seçmələr.",
    emptyTitle: "Layihə məzmunu hazırlanır",
    emptyText: "Dərc icazəsi alınmış layihələrimiz tezliklə bu səhifədə yer alacaq. Oxşar layihə üçün ehtiyacınızı bizimlə bölüşə bilərsiniz.",
    action: "Həll Sahələrinə Baxın",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/projelerimiz", { title: getDict(lang).nav.projects, description: copy[lang].description });
}

/*
 * Yalnız həqiqətən görülmüş və yayımlanmasına icazə verilmiş layihələr yerləşdiriləcək;
 * müştəri / qurum adı yalnız yazılı icazə ilə (sənəd, bölmə 7).
 * Layihə modeli: { slug, title, sectorSlug, solutionSlug, year, summary, images[], clientName? (icazə ilə) }
 */
const projects: { slug: string; title: string }[] = [];

export default async function ProjectsPage() {
  const lang = await getLang();
  const t = copy[lang];
  const nav = getDict(lang).nav;
  return (
    <>
      <PageHero kicker={nav.projects} title={t.title} text={t.text} crumbs={[{ label: nav.projects }]} icon="truck" />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          {projects.length === 0 && (
            <EmptyState
              title={t.emptyTitle}
              text={t.emptyText}
              action={
                <Link href="/cozum-alanlari" className="btn-primary">
                  {t.action}
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
