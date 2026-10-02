import { isFinal } from "@/lib/site";
import Link from "./Link";
import { getDb, getDictionary } from "@/lib/cms";

/* Kurumsal səhifələri arasında tab keçidi (üst menyudan asılı deyil) */
const items = [
  { key: "about", href: "/kurumsal/hakkimizda" },
  { key: "mission", href: "/kurumsal/misyon-ve-vizyon" },
  { key: "why", href: "/kurumsal/neden-defne-group" },
  { key: "certificates", href: "/kurumsal/belgeler-ve-sertifikalar" },
] as const;

export async function KurumsalNav({ active }: { active: string }) {
  const t = (await getDictionary()).nav;
  const { certificates } = await getDb();
  return (
    <nav aria-label={t.corporate} className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[84px]">
      <ul className="container-site flex gap-6 overflow-x-auto [scrollbar-width:none] sm:gap-8">
        {items.filter((i) => !(isFinal && i.key === "certificates" && !certificates.length)).map((i) => (
          <li key={i.href} className="shrink-0">
            <Link
              href={i.href}
              aria-current={active === i.href ? "page" : undefined}
              className={`relative inline-flex min-h-14 items-center text-[14px] font-semibold whitespace-nowrap transition-colors ${
                active === i.href ? "text-primary" : "text-charcoal hover:text-ink"
              }`}
            >
              {t[i.key]}
              {active === i.href && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" aria-hidden />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
