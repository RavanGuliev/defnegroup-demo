import Link from "next/link";
import { categories, solutions } from "@/lib/data";
import { mainNav, site } from "@/lib/site";
import { Logo } from "./Logo";

const colTitle = "text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase";
const linkCls = "inline-flex min-h-10 items-center text-sm text-white/65 transition-colors duration-200 hover:text-white";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="leaf-motif bg-navy text-white">
      <div className="container-site py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Kamu kurumları ve özel sektör için güvenilir tedarik ve proje çözümleri.
            </p>
            <Link href="/teklif-listem#teklif-formu" className="btn-primary mt-6">
              Teklif Talebi Oluşturun
            </Link>
          </div>

          <div>
            <p className={colTitle}>Hızlı Menü</p>
            <ul className="mt-5 space-y-1">
              {mainNav.slice(1).map((i) => (
                <li key={i.href}>
                  <Link className={linkCls} href={i.href}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={colTitle}>Ürün Grupları</p>
            <ul className="mt-5 space-y-1">
              {categories.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link className={linkCls} href={`/urunler/${cat.slug}`}>
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link className={`${linkCls} font-semibold text-white`} href="/urunler">
                  Tüm ürünler →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className={colTitle}>Çözüm Alanları</p>
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
            <p className={colTitle}>İletişim</p>
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
          <p>© {new Date().getFullYear()} DEFNE GROUP. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link className="inline-flex min-h-11 items-center hover:text-white/75" href="/kvkk">
              KVKK Aydınlatma Metni
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
