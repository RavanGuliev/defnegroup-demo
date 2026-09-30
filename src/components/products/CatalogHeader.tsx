import { Breadcrumbs, type Crumb } from "../ui";

/*
 * Kataloq səhifələrinin yığcam başlığı — alt bölmə və məhsullar daha tez görünsün deyə
 * başlıq sahəsi kiçikdir (H1: masaüstü 36–44 px, mobil 28–32 px).
 * 17 uzun qrup adı düymə sırasına yığılmır; qrup keçidi kartlar və filtr ilə verilir.
 */
export function CatalogHeader({
  kicker,
  title,
  text,
  crumbs,
  meta,
  media,
  children,
}: {
  kicker: string;
  title: string;
  text?: string;
  crumbs: Crumb[];
  meta?: string;
  media?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-light">
      <div className="container-site py-6 sm:py-8 lg:py-10">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-5 grid gap-6 lg:mt-6 ${media ? "md:grid-cols-[minmax(0,1fr)_280px] md:items-center lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10" : ""}`}>
          <div className="max-w-[760px]">
            <p className="type-kicker">{kicker}</p>
            <h1 className="type-h1-inner mt-3 text-ink">{title}</h1>
            {text && <p className="type-body mt-3 max-w-[640px]">{text}</p>}
            {meta && <p className="mt-3 text-[14px] font-medium text-charcoal">{meta}</p>}
            {children}
          </div>
          {media && <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[6px] bg-night md:block">{media}</div>}
        </div>
      </div>
    </section>
  );
}
