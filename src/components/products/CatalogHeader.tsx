import Link from "next/link";
import { categories } from "@/lib/data";
import { Breadcrumbs, type Crumb } from "../ui";

/* Referans saytdakı açıq fonlu kataloq başlığı + kateqoriya çipləri */
export function CatalogHeader({
  kicker,
  title,
  text,
  crumbs,
  activeSlug,
  meta,
}: {
  kicker: string;
  title: string;
  text: string;
  crumbs: Crumb[];
  activeSlug?: string;
  meta?: string;
}) {
  return (
    <section className="border-b border-line bg-light">
      <div className="container-site pt-8 pb-8 sm:pt-10 lg:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-6 lg:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="type-kicker">{kicker}</p>
            <h1 className="type-h1 mt-4 text-ink">{title}</h1>
            <p className="type-body mt-5 max-w-[600px]">{text}</p>
          </div>
          {meta && <p className="type-small shrink-0 text-muted">{meta}</p>}
        </div>
        <nav aria-label="Ürün grupları" className="-mx-4 mt-10 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="flex gap-2 sm:flex-wrap">
            <li>
              <Chip href="/urunler" active={!activeSlug}>
                Tümü
              </Chip>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Chip href={`/urunler/${c.slug}`} active={activeSlug === c.slug}>
                  {c.name}
                </Chip>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

function Chip({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex min-h-10 items-center rounded-full border px-4 text-[13px] font-semibold whitespace-nowrap transition-colors ${
        active ? "border-primary bg-primary text-white" : "border-line bg-white text-charcoal hover:border-ink"
      }`}
    >
      {children}
    </Link>
  );
}
