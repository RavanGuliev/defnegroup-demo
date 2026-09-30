import { PageHero } from "@/components/ui";
import { getDict } from "@/i18n/dictionaries";
import { getLang, pageMeta } from "@/i18n/server";

const copy = {
  tr: {
    kicker: "Yasal",
    text: "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metni, DEFNE GROUP tarafından onaylandıktan sonra bu sayfada yayımlanacaktır.",
  },
  az: {
    kicker: "Hüquqi",
    text: "Türkiyə Respublikasının 6698 saylı Şəxsi Məlumatların Qorunması Qanunu çərçivəsində məlumatlandırma mətni DEFNE GROUP tərəfindən təsdiqləndikdən sonra bu səhifədə dərc olunacaq.",
  },
};

export async function generateMetadata() {
  const lang = await getLang();
  return pageMeta("/kvkk", { title: getDict(lang).nav.kvkk });
}

// Hüquqi mətn DEFNE GROUP-un hüquq məsləhətçisi tərəfindən təqdim ediləcək.
export default async function KvkkPage() {
  const lang = await getLang();
  const t = copy[lang];
  const title = getDict(lang).nav.kvkk;
  return (
    <>
      <PageHero kicker={t.kicker} title={title} crumbs={[{ label: title }]} />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-site max-w-[820px]">
          <p className="type-body">{t.text}</p>
        </div>
      </section>
    </>
  );
}
