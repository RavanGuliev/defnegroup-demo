import { PageHero } from "@/components/ui";
import { getLang, pageMeta } from "@/i18n/server";
import { getDb, getDictionary, pageCopy } from "@/lib/cms";
import { RichText } from "@/components/RichText";

const copy = {
  tr: {
    kicker: "Yasal",
    text: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metni, DEFNE GROUP tarafından onaylandıktan sonra bu sayfada yayımlanacaktır.",
  },
  en: {
    kicker: "Legal",
    text: "The information notice under Turkish Personal Data Protection Law No. 6698 will be published on this page once approved by DEFNE GROUP.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kvkk", { title: (await getDictionary(lang)).nav.kvkk });
}

// Hüquqi mətn DEFNE GROUP-un hüquq məsləhətçisi tərəfindən təqdim ediləcək.
export default async function KvkkPage() {
  const lang = await getLang();
  const t = (await pageCopy("pages.kvkk", copy, lang));
  const title = (await getDictionary(lang)).nav.kvkk;
  return (
    <>
      <PageHero kicker={t.kicker} title={title} crumbs={[{ label: title }]} image={(await getDb(lang)).images.kvkk ?? undefined} />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-site max-w-[820px]">
          <RichText html={t.text} />
        </div>
      </section>
    </>
  );
}
