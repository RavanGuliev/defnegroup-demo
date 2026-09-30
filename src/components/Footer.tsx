import { getDict } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { db, groupHref } from "@/lib/data";
import { mainNav, navVisible, site } from "@/lib/site";
import Link from "./Link";
import { Logo } from "./Logo";

const colTitle = "text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase";
const linkCls = "inline-flex min-h-10 items-center text-sm text-white/65 transition-colors duration-200 hover:text-white";

export async function Footer() {
  const lang = await getLang();
  const t = getDict(lang);
  const { groups, solutions } = db(lang);
  const c = site.contact;
  return (
    <footer className="leaf-motif bg-navy text-white">
      <div className="container-site py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              {t.meta.tagline}
            </p>
            <Link href="/teklif-listem#teklif-formu" className="btn-primary mt-6">
              {t.common.createQuoteRequest}
            </Link>
          </div>

          <div>
            <p className={colTitle}>{t.common.quickMenu}</p>
            <ul className="mt-5 space-y-1">
              {mainNav.flatMap((i) => i.children ?? [i]).filter(navVisible).map((i) => (
                <li key={i.href}>
                  <Link className={linkCls} href={i.href}>
                    {t.nav[i.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={colTitle}>{t.nav.productGroups}</p>
            <ul className="mt-5 space-y-1">
              {groups.slice(0, 8).map((g) => (
                <li key={g.code}>
                  <Link className={linkCls} href={groupHref(g)}>
                    {g.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={`${linkCls} font-semibold text-white`} href="/urunler">
                  {t.common.allGroups(groups.length)}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={colTitle}>{t.nav.solutions}</p>
            <ul className="mt-5 space-y-1">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link className={linkCls} href={`/cozum-alanlari/${s.slug}`}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={colTitle}>{t.nav.contact}</p>
            <ul className="mt-5 space-y-1 text-sm text-white/65">
              {c.phone && (
                <li>
                  <a href={`tel:${c.phoneHref}`} className={linkCls}>
                    {c.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={`mailto:${c.email}`} className={linkCls}>
                  {c.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${c.quoteEmail}`} className={linkCls}>
                  {c.quoteEmail}
                </a>
              </li>
              {c.address && <li className="max-w-xs py-2 text-white/50">{c.address}</li>}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DEFNE GROUP. {t.common.allRights}</p>
          <div className="flex gap-6">
            <Link className="inline-flex min-h-11 items-center hover:text-white/75" href="/kvkk">
              {t.nav.kvkk}
            </Link>
            <Link className="inline-flex min-h-11 items-center hover:text-white/75" href="/iletisim">
              {site.domain}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
