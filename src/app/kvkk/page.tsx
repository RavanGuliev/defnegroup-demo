import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  alternates: { canonical: "/kvkk" },
};

// Hüquqi mətn DEFNE GROUP-un hüquq məsləhətçisi tərəfindən təqdim ediləcək.
export default function KvkkPage() {
  return (
    <>
      <PageHero kicker="Yasal" title="KVKK Aydınlatma Metni" crumbs={[{ label: "KVKK Aydınlatma Metni" }]} />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-site max-w-[820px]">
          <p className="type-body">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki aydınlatma metni, DEFNE GROUP tarafından onaylandıktan sonra bu sayfada
            yayımlanacaktır.
          </p>
        </div>
      </section>
    </>
  );
}
