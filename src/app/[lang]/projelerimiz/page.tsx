import Link from "@/components/Link";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";
import { EmptyState, FinalCta, PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";

const copy = {
  tr: {
    description: "DEFNE GROUP tarafından tamamlanan tedarik ve proje çalışmaları.",
    title: "Tamamlanan projeler",
    text: "Kurumlarla birlikte hayata geçirdiğimiz tedarik ve proje çalışmalarından seçmeler.",
    more: "Proje detayı",
    emptyTitle: "Proje içerikleri hazırlanıyor",
    emptyText: "Yayın izni alınan projelerimiz yakında bu sayfada yer alacaktır. Benzer bir proje için ihtiyacınızı bizimle paylaşabilirsiniz.",
    action: "Çözüm Alanlarını İnceleyin",
  },
  en: {
    description: "Supply and project work completed by DEFNE GROUP.",
    title: "Completed projects",
    text: "A selection of supply and project work we have carried out with institutions.",
    more: "Project details",
    emptyTitle: "Project content is being prepared",
    emptyText: "Our projects with publication permission will appear on this page soon. You can share your needs for a similar project with us.",
    action: "Explore Solution Areas",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/projelerimiz", { title: (await getDictionary(lang)).nav.projects, description: (await pageCopy("pages.projelerimiz", copy, lang)).description });
}

export default async function ProjectsPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.projelerimiz", copy, lang));
  const nav = (await getDictionary(lang)).nav;
  const { projects, getSector } = await getDb(lang);
  return (
    <>
      <PageHero kicker={nav.projects} title={t.title} text={t.text} crumbs={[{ label: nav.projects }]} icon="truck" image={(await getDb(lang)).images.projelerimiz ?? undefined} />
      <section className="bg-white py-14 sm:py-16 lg:py-[112px]">
        <div className="container-site">
          {projects.length > 0 && (
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((pr) => (
                <li key={pr.slug} className="flex flex-col overflow-hidden rounded-[8px] border border-line bg-white">
                  <div className="relative aspect-[16/10] bg-night">
                    <Media src={pr.images?.[0]} alt={pr.title} icon="truck" sizes="(max-width: 767px) 100vw, 33vw" iconClassName="size-14" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="type-small text-primary">
                      {[pr.year, pr.sectorSlug && getSector(pr.sectorSlug)?.name].filter(Boolean).join(" · ")}
                    </p>
                    <h2 className="mt-2 text-[19px] leading-[1.3] font-semibold text-ink">{pr.title}</h2>
                    {pr.clientName && <p className="mt-1 text-[14px] text-muted">{pr.clientName}</p>}
                    {pr.summary && <p className="mt-3 text-[15px] leading-[1.6] text-charcoal">{pr.summary}</p>}
                    {pr.content && (
                      <details className="mt-4 border-t border-line pt-3">
                        <summary className="min-h-10 cursor-pointer text-[14px] font-semibold text-primary">{t.more}</summary>
                        <RichText html={pr.content} className="mt-3" />
                      </details>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
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
