"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { IconName } from "@/lib/data";
import { pad2 } from "@/lib/data";
import { Icon } from "../Icon";
import { Media } from "../Media";

/*
 * Başlıq və alt mətn sənəddə təsdiqlənib (bölmə 4.2) və bütün slaydlarda sabit qalır.
 * Slaydlar yalnız vizual sahəni dəyişir. Real şəkillər gəldikdə `image` sahəsinə
 * /images/hero/*.webp yolunu yazmaq kifayətdir.
 */
type Slide = { label: string; image?: string; tiles: { name: string; icon: IconName }[] };

const slides: Slide[] = [
  {
    label: "Belediye ve kamu tedariki",
    tiles: [
      { name: "Kent mobilyaları", icon: "bench" },
      { name: "Park ve bahçe", icon: "trees" },
      { name: "Temizlik ve atık", icon: "trash" },
    ],
  },
  {
    label: "Sokak hayvanları ve barınak çözümleri",
    tiles: [
      { name: "Barınak donatımı", icon: "paw" },
      { name: "Klinik ekipman", icon: "stethoscope" },
      { name: "Dezenfeksiyon", icon: "spray" },
    ],
  },
  {
    label: "Tıbbi, sosyal ve afet ürünleri",
    tiles: [
      { name: "Medikal ürünler", icon: "cross" },
      { name: "Sosyal yardım", icon: "heart-hand" },
      { name: "Afet tedariki", icon: "siren" },
    ],
  },
  {
    label: "Üniforma, KKD ve proje tedariki",
    tiles: [
      { name: "Üniforma", icon: "shirt" },
      { name: "İş güvenliği", icon: "hard-hat" },
      { name: "Proje tedariki", icon: "truck" },
    ],
  },
];

const DURATION = 7000;

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED).matches, () => false);
  // İstifadəçi seçimi yoxdursa, "azaldılmış hərəkət" parametrinə uyğun avtomatik dayanır
  const paused = userPaused ?? reducedMotion;
  const setPaused = (fn: (p: boolean) => boolean) => setUserPaused(fn(paused));
  const go = useCallback((dir: number) => setActive((i) => (i + dir + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  const slide = slides[active];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="DEFNE GROUP tanıtım"
      className="relative isolate -mt-[72px] min-h-[max(640px,100svh)] w-full overflow-hidden bg-night md:h-[min(100svh,820px)] md:min-h-[720px] lg:-mt-[84px]"
    >
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide absolute inset-0 ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
          <div className="hero-photo absolute inset-0">
            <Media src={s.image} alt="" sizes="100vw" priority={i === 0} iconClassName="hidden" />
          </div>
        </div>
      ))}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.5)_65%,rgba(0,0,0,0.75)_100%)] md:bg-[linear-gradient(90deg,rgba(10,14,18,0.75)_0%,rgba(10,14,18,0.35)_45%,rgba(10,14,18,0)_75%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full min-h-[max(640px,100svh)] w-full max-w-[1440px] flex-col justify-end px-5 pt-[120px] pb-[96px] sm:px-8 md:min-h-0 md:justify-center md:px-[clamp(2.5rem,6vw,6rem)] md:pt-[110px] md:pb-[96px]">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-3">
              <span className="hidden h-px w-8 bg-primary sm:block" aria-hidden />
              <p className="text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-[12px] sm:tracking-[0.26em]">
                DEFNE GROUP · {slide.label}
              </p>
            </div>
            <h1 className="mt-5 text-[clamp(30px,8vw,44px)] leading-[1.08] font-bold tracking-[-0.03em] text-white md:mt-6 md:text-[clamp(40px,4.4vw,64px)] md:leading-[1.05]">
              Kamu kurumları ve özel sektör için <span className="text-[#5fd09d]">güvenilir</span> tedarik ve proje çözümleri.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[15px] leading-[1.6] text-white/80 md:mt-6 md:text-[17px] md:leading-[1.65] md:text-white/70">
              Geniş ürün portföyümüz, sektörel deneyimimiz ve ihtiyaca özel yaklaşımımızla tüm tedarik süreçlerini tek noktadan yönetiyoruz.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:items-center sm:mt-10">
              <Link
                href="/urunler"
                className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] bg-primary px-7 text-[14px] font-semibold tracking-wide text-white transition-colors hover:bg-primary-dark sm:min-h-[52px] sm:px-8"
              >
                Ürünleri İnceleyin
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/teklif-listem#teklif-formu"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[6px] border border-white/30 bg-white/[0.06] px-7 text-[14px] font-semibold tracking-wide text-white backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white hover:text-ink sm:min-h-[52px] sm:px-8"
              >
                Teklif Talebi Oluşturun
              </Link>
            </div>
          </div>

          {/* Sahə kompozisiyası: slayda uyğun üç xidmət sahəsi */}
          <div className="hidden md:block">
            <ul key={active} className="grid grid-cols-3 gap-3">
              {slide.tiles.map((t, i) => (
                <li
                  key={t.name}
                  className="reveal is-visible flex aspect-[3/4] flex-col justify-between rounded-[6px] border border-white/15 bg-white/[0.06] p-4 text-white backdrop-blur-[3px]"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <Icon name={t.icon} className="size-9 text-[#5fd09d]" />
                  <span className="text-[13px] leading-[1.3] font-semibold lg:text-[14px]">{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 md:mt-14">
          <p className="text-[12px] tracking-[0.2em] text-white/55 tabular-nums">
            <span className="text-white">{pad2(active + 1)}</span>
            <span className="text-white/30"> / {pad2(slides.length)}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Slaytları oynat" : "Slaytları durdur"}
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki slayt"
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki slayt"
              className="inline-flex size-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Slayt {active + 1}. {slide.label}
      </span>
      <div className="absolute inset-x-0 bottom-0 z-20 h-[2px] bg-white/15" aria-hidden>
        {!paused && <div key={active} className="hero-progress-fill h-full bg-primary" style={{ animationDuration: `${DURATION}ms` }} />}
      </div>
    </section>
  );
}
