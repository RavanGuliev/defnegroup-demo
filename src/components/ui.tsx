import { getDict } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import Link from "./Link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { IconName } from "@/lib/data";
import { Icon } from "./Icon";
import { Media } from "./Media";
import { Reveal } from "./Reveal";

/* Bölmə başlığı: “01 — Kicker” + H2 + açıqlama + sağda keçid (referans saytdakı ritm) */
export function SectionHeading({
  index,
  kicker,
  title,
  text,
  aside,
  as: H = "h2",
  light,
}: {
  index?: string;
  kicker: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  aside?: React.ReactNode;
  as?: "h1" | "h2";
  light?: boolean;
}) {
  return (
    <Reveal>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-[620px]">
          <p className={`type-kicker ${light ? "text-[#6fd3a8]" : ""}`}>
            {index ? `${index} — ` : ""}
            {kicker}
          </p>
          <H className={`type-h2 mt-4 ${light ? "text-white" : "text-ink"}`}>{title}</H>
          {text && <p className={`type-body mt-5 max-w-[560px] ${light ? "!text-white/65" : ""}`}>{text}</p>}
        </div>
        {aside && <div className="shrink-0 lg:text-right">{aside}</div>}
      </div>
    </Reveal>
  );
}

export function CtaLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group cta-text ${className}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export type Crumb = { label: string; href?: string };

export async function Breadcrumbs({ items, light }: { items: Crumb[]; light?: boolean }) {
  const t = getDict(await getLang());
  const all: Crumb[] = [{ label: t.nav.home, href: "/" }, ...items];
  return (
    <nav aria-label={t.common.breadcrumbAria}>
      <ol className={`flex flex-wrap items-center gap-1 text-[13px] ${light ? "text-white/60" : "text-muted"}`}>
        {all.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={`inline-flex min-h-8 items-center hover:underline ${light ? "hover:text-white" : "hover:text-ink"}`}>
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className={light ? "text-white" : "text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* İç səhifə başlığı — referans saytdakı qaranlıq banner üslubunda */
export function PageHero({
  kicker,
  title,
  text,
  crumbs,
  icon,
  image,
  children,
}: {
  kicker: string;
  title: string;
  text?: string;
  crumbs: Crumb[];
  icon?: IconName;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div className="absolute inset-0 -z-10 opacity-70">
        <Media src={image} alt="" icon={icon} sizes="100vw" iconClassName="hidden" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(19,23,28,0.92)_0%,rgba(19,23,28,0.7)_50%,rgba(19,23,28,0.35)_100%)]" />
      {icon && (
        <Icon
          name={icon}
          strokeWidth={0.8}
          className="pointer-events-none absolute top-1/2 right-[6%] -z-10 hidden size-[200px] -translate-y-1/2 text-white/[0.07] lg:block"
        />
      )}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" aria-hidden />
      <div className="container-site py-8 sm:py-10 lg:py-14">
        <Breadcrumbs items={crumbs} light />
        <p className="type-kicker mt-6 text-[#6fd3a8]">{kicker}</p>
        <h1 className="type-h1-inner mt-3 max-w-[900px]">{title}</h1>
        {text && <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-white/70 sm:text-[17px]">{text}</p>}
        {children}
      </div>
    </section>
  );
}

/* Son çağırış (sənəd, bölmə 5) */
export async function FinalCta() {
  const t = getDict(await getLang()).cta;
  return (
    <section className="relative isolate overflow-hidden bg-primary text-white">
      <div className="leaf-motif absolute inset-0 -z-10" aria-hidden />
      <div className="absolute -top-24 -right-24 -z-10 size-[420px] rounded-full bg-accent/30 blur-3xl" aria-hidden />
      <div className="container-site flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <Reveal className="max-w-[760px]">
          <p className="type-kicker text-white/70">{t.kicker}</p>
          <h2 className="type-h2 mt-4">{t.title}</h2>
          <p className="mt-5 text-[16px] leading-[1.7] text-white/80 sm:text-[18px]">
            {t.text}
          </p>
        </Reveal>
        <Reveal className="flex shrink-0 flex-col gap-3 sm:flex-row" delay={120}>
          <Link
            href="/teklif-listem#teklif-formu"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[6px] bg-white px-7 text-[14px] font-semibold tracking-wide text-primary transition-colors hover:bg-light"
          >
            {t.send}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex min-h-[52px] items-center justify-center rounded-[6px] border border-white/40 px-7 text-[14px] font-semibold tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {t.contact}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export { EmptyState } from "./EmptyState";
