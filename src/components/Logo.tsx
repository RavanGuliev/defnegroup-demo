"use client";

import { useDict, useSite } from "@/components/SiteData";
import Link from "./Link";

/*
 * Loqo paneldən gəlir (Site Ayarları → Marka): açıq fonda "logo", tünd fonda (slayd, footer)
 * "logo_light". Yüklənməyibsə müvəqqəti yazı loqosu göstərilir.
 */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const main = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/60" : "text-muted";
  const t = useDict().common;
  const site = useSite();
  const src = tone === "light" ? (site.logoLight ?? site.logo) : (site.logo ?? site.logoLight);
  if (src) {
    return (
      <Link href="/" aria-label={t.logoAria} className={`inline-flex min-h-11 min-w-0 items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG loqo, ölçü CSS ilə */}
        <img src={src} alt={site.name} className="h-9 w-auto max-w-[200px] object-contain sm:h-11 sm:max-w-[240px]" />
      </Link>
    );
  }
  return (
    <Link href="/" aria-label={t.logoAria} className={`inline-flex min-h-11 min-w-0 flex-col justify-center leading-none ${className}`}>
      <span className={`text-[22px] font-extrabold tracking-[-0.03em] sm:text-[24px] ${main}`}>
        DEFNE<span className="text-primary"> </span>
        <span className={tone === "light" ? "text-white" : "text-primary"}>GROUP</span>
      </span>
      <span className={`mt-1 text-[8.5px] font-semibold tracking-[0.2em] whitespace-nowrap uppercase sm:text-[10px] sm:tracking-[0.28em] ${sub}`}>
        {t.logoTagline}
      </span>
    </Link>
  );
}
