"use client";

import { useLang } from "@/i18n/client";
import { getDict } from "@/i18n/dictionaries";
import Link from "./Link";

/*
 * Müvəqqəti yazı loqosu.
 * Sənədə görə (bölmə 3) yalnız DEFNE GROUP-un təqdim edəcəyi təsdiqlənmiş tam loqo
 * istifadə olunacaq. Loqo faylı gəldikdə `public/logo/defne-group.svg` kimi əlavə edib
 * aşağıdakı <span> blokunu <Image> ilə əvəz edin.
 */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const main = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/60" : "text-muted";
  const t = getDict(useLang()).common;
  return (
    <Link href="/" aria-label={t.logoAria} className={`inline-flex min-w-0 flex-col leading-none ${className}`}>
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
