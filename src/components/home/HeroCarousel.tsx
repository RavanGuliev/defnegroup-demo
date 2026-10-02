"use client";

import { useDb, useDict, useSite } from "@/components/SiteData";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { groupHref, pad2 } from "@/lib/data";
import Link from "../Link";
import { Icon } from "../Icon";
import { Media } from "../Media";

/*
 * Başlıq və alt mətn sənəddə təsdiqlənib (bölmə 4.2) və bütün slaydlarda sabit qalır.
 * Slaydlar yalnız vizual sahəni dəyişir. Real şəkillər gəldikdə `image` sahəsinə
 * /images/hero/*.webp yolunu yazmaq kifayətdir.
 */
/*
 * Slaydlar paneldən gəlir (Site → Ana Sayfa Slaytları): başlıq, fon şəkli və 3 məhsul qrupu.
 * Plitələr birbaşa əsas məhsul qruplarına aparır — ilk ekranda qrup keçidi görünür.
 */

// Slaydlar yavaş dəyişir; siçan üzərində / fokusda dayanır, istifadəçi tam dayandıra bilir
const DURATION = 9000;

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function HeroCarousel() {
  const site = useSite();
  const slides = site.heroSlides.length ? site.heroSlides : [{ label: null, image: null, groupCodes: [] }];
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED).matches, () => false);
  // İstifadəçi seçimi yoxdursa, "azaldılmış hərəkət" parametrinə uyğun avtomatik dayanır
  // Siçan üzərində və ya klaviatura fokusu içəridə olduqda müvəqqəti dayanır
  const [hovering, setHovering] = useState(false);
  const paused = userPaused ?? reducedMotion;
  const running = !paused && !hovering;
  const setPaused = (fn: (p: boolean) => boolean) => setUserPaused(fn(paused));
  const count = slides.length;
  const go = useCallback((dir: number) => setActive((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [active, running, go]);

  const slide = slides[active];
  const d = useDict();
  const t = d.hero;
  const { getGroupByCode, groups } = useDb();
  // Başlıq paneldə boşdursa lüğətdəki slayd başlığı
  const label = slide.label ?? t.slides[active] ?? "";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.aria}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovering(false)}
      className="relative isolate -mt-[72px] w-full overflow-hidden bg-night lg:-mt-[84px]"
    >
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide absolute inset-0 ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
          <div className="hero-photo absolute inset-0">
            <Media src={s.image ?? undefined} alt="" sizes="100vw" priority={i === 0} iconClassName="hidden" />
          </div>
        </div>
      ))}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.5)_65%,rgba(0,0,0,0.75)_100%)] md:bg-[linear-gradient(90deg,rgba(10,14,18,0.75)_0%,rgba(10,14,18,0.35)_45%,rgba(10,14,18,0)_75%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-5 pt-[100px] pb-8 sm:px-8 md:min-h-[540px] md:px-[clamp(2.5rem,6vw,6rem)] md:pt-[112px] md:pb-10 lg:min-h-[580px] lg:pt-[124px]">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3">
              <span className="hidden h-px w-8 bg-primary sm:block" aria-hidden />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-[12px] sm:tracking-[0.26em]">
                DEFNE GROUP · {label}
              </p>
            </div>
            <h1 className="mt-4 text-[clamp(28px,7.4vw,40px)] leading-[1.1] font-bold tracking-[-0.03em] text-white md:mt-5 md:text-[clamp(36px,3.6vw,54px)] md:leading-[1.06]">
              {t.titleA} <span className="text-[#5fd09d]">{t.titleB}</span> {t.titleC}
            </h1>
            <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.6] text-white/80 md:mt-5 md:text-[17px] md:leading-[1.65] md:text-white/70">
              {t.text}
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center sm:mt-8">
              <Link
                href="/urunler"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] bg-primary px-7 text-[14px] font-semibold tracking-wide text-white transition-colors hover:bg-primary-dark sm:min-h-[52px] sm:px-8"
              >
                {t.products}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/teklif-listem#teklif-formu"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] border border-white/30 bg-white/[0.06] px-7 text-[14px] font-semibold tracking-wide text-white backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white hover:text-ink sm:min-h-[52px] sm:px-8"
              >
                {d.common.createQuoteRequest}
              </Link>
            </div>
          </div>

          {/* Slayda uyğun üç əsas məhsul qrupu — hər plitə qrup səhifəsinə aparır */}
          <div className="hidden md:block">
            <ul key={active} className="grid grid-cols-3 gap-3">
              {slide.groupCodes.flatMap((code, i) => {
                const g = getGroupByCode(code);
                if (!g) return [];
                return (
                  <li key={code} className="reveal is-visible" style={{ transitionDelay: `${i * 90}ms` }}>
                    <Link
                      href={groupHref(g)}
                      className="flex aspect-[4/5] flex-col justify-between rounded-[6px] border border-white/15 bg-white/[0.06] p-4 text-white backdrop-blur-[3px] transition-colors hover:border-white/50 hover:bg-white/[0.12]"
                    >
                      <Icon name={g.icon} className="size-9 text-[#5fd09d]" />
                      <span className="text-[14px] leading-[1.3] font-semibold">{g.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/urunler" className="mt-4 inline-flex min-h-11 items-center gap-2 text-[14px] font-semibold text-white hover:text-[#5fd09d]">
              {d.common.seeAllGroups(groups.length)} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 md:mt-10">
          <p className="text-[12px] tracking-[0.2em] text-white/55 tabular-nums">
            <span className="text-white">{pad2(active + 1)}</span>
            <span className="text-white/30"> / {pad2(slides.length)}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t.play : t.pause}
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.prev}
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.next}
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {t.slide} {active + 1}. {label}
      </span>
      <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/15" aria-hidden>
        {running && <div key={active} className="hero-progress-fill h-full bg-primary" style={{ animationDuration: `${DURATION}ms` }} />}
      </div>
    </section>
  );
}
