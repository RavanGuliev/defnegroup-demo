"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { pad2 } from "@/lib/data";
import type { SiteInfo } from "@/lib/store";

type Copy = { title: string; openGallery: string; close: string; prev: string; next: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/*
 * Ana səhifə "Fuarlar" — fuar və saha görüşlərindən fotoşəkillər (Panel → Site → Fuar Galerisi).
 * Sonsuz karusel: şəkillər dairəvi şəkildə avtomatik sürüşür (son şəkildən sonra yenə birinci),
 * siçan üzərində / fokusda dayanır, oxlar və barmaqla sürüşdürmə ilə idarə olunur.
 * "Galeriyi aç" — tam ekran baxış.
 */
const AUTOPLAY_MS = 3500;
const SPEED_MS = 650;

export function FairsSection({ heading, photos, t }: { heading: React.ReactNode; photos: SiteInfo["fairPhotos"]; t: Copy }) {
  const count = photos.length;
  const loop = count > 1;
  // Sonsuz dövr üçün 3 nüsxə: [əvvəlki | əsas | növbəti]; mövqe həmişə əsas nüsxəyə qaytarılır
  const items = loop ? [...photos, ...photos, ...photos] : photos;
  const [pos, setPos] = useState(loop ? count : 0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0); // bir kart + ara boşluq (px)
  const [ready, setReady] = useState(false); // ilk ölçüdən sonra animasiya açılır (yükləmədə "uçuş" olmasın)
  const [hover, setHover] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const firstRef = useRef<HTMLLIElement>(null);
  const touchX = useRef<number | null>(null);
  const reduced = useSyncExternalStore(subscribeMotion, () => window.matchMedia(REDUCED).matches, () => true);
  const active = ((pos % count) + count) % count;

  // Kart enini ölçmək (ekran ölçüsü dəyişəndə də)
  useEffect(() => {
    const el = firstRef.current;
    if (!el) return;
    const measure = () => setStep(el.offsetWidth + parseFloat(getComputedStyle(el.parentElement!).columnGap || "0"));
    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  const go = useCallback((dir: number) => {
    setAnimate(true);
    setPos((p) => p + dir);
  }, []);

  // Keçid bitəndə kənar nüsxədən görünməz şəkildə əsas nüsxəyə qayıt
  const onTransitionEnd = () => {
    if (!loop) return;
    if (pos >= count * 2 || pos < count) {
      setAnimate(false);
      setPos((p) => (p >= count * 2 ? p - count : p + count));
    }
  };
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // Avtomatik sürüşmə
  useEffect(() => {
    if (!loop || reduced || hover || lightbox !== null) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [pos, loop, reduced, hover, lightbox, go]);

  // Tam ekran baxış: klaviatura və səhifənin sürüşməsinin dayandırılması
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % count);
      if (e.key === "ArrowLeft") setLightbox((i) => (i! - 1 + count) % count);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, count]);

  if (!count) return null;
  const current = lightbox !== null ? photos[lightbox] : null;
  const arrow = "inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-charcoal transition-colors hover:border-ink disabled:opacity-40";

  return (
    <section className="section-home overflow-hidden bg-light">
      <div className="container-site">
        {heading}
      </div>

      <div
        className="section-stack"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHover(false)}
      >
        {/* Karusel pəncərəsi: kartlar başlıqla eyni xəttdən başlayır, solda əvvəlki kart yarımçıq görünür */}
        <div
          className="relative [--gut:1rem] min-[390px]:[--gut:1.25rem] sm:[--gut:2rem] lg:[--gut:max(3rem,calc((100vw-1440px)/2+3rem))]"
          aria-roledescription="carousel"
          aria-label={t.title}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40 && loop) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <ul
            onTransitionEnd={onTransitionEnd}
            className="flex gap-3 sm:gap-4"
            style={{
              paddingLeft: "var(--gut)",
              transform: `translate3d(${-pos * step}px, 0, 0)`,
              transition: animate && ready ? `transform ${SPEED_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
            }}
          >
            {items.map((ph, i) => (
              <li
                key={i}
                ref={i === 0 ? firstRef : undefined}
                className="w-[82%] shrink-0 min-[480px]:w-[60%] md:w-[42%] lg:w-[30%] xl:w-[23%]"
                aria-hidden={loop && (i < count || i >= count * 2) ? true : undefined}
              >
                <button
                  type="button"
                  tabIndex={loop && (i < count || i >= count * 2) ? -1 : undefined}
                  onClick={() => setLightbox(i % count)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-night"
                  aria-label={ph.caption ?? `${t.title} ${(i % count) + 1}`}
                >
                  <Image
                    src={ph.image}
                    alt={ph.caption ?? ""}
                    fill
                    sizes="(max-width: 479px) 82vw, (max-width: 767px) 60vw, (max-width: 1023px) 42vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {ph.caption && (
                    <span className="absolute inset-x-0 bottom-0 bg-black/75 px-3 py-2 text-center text-[13px] font-semibold text-white sm:text-[14px]">
                      {ph.caption}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="container-site mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-[12px] tracking-[0.2em] text-muted tabular-nums" aria-live="polite">
              <span className="text-ink">{pad2(active + 1)}</span> / {pad2(count)}
            </p>
            <button type="button" onClick={() => go(-1)} disabled={!loop} aria-label={t.prev} className={arrow}>
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => go(1)} disabled={!loop} aria-label={t.next} className={arrow}>
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
          <button type="button" onClick={() => setLightbox(active)} className="group cta-text">
            {t.openGallery}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </button>
        </div>
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={t.title} className="fixed inset-0 z-[90] flex flex-col bg-black text-white" onClick={() => setLightbox(null)}>
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="text-[13px] tracking-[0.2em] text-white/70 tabular-nums">
              {pad2(lightbox! + 1)} / {pad2(count)}
            </p>
            <button type="button" onClick={() => setLightbox(null)} aria-label={t.close} className="inline-flex size-11 items-center justify-center rounded-full hover:bg-white/10" autoFocus>
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image src={current.image} alt={current.caption ?? ""} fill sizes="100vw" className="object-contain" />
            <button
              type="button"
              onClick={() => setLightbox((lightbox! - 1 + count) % count)}
              aria-label={t.prev}
              className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 sm:left-6"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setLightbox((lightbox! + 1) % count)}
              aria-label={t.next}
              className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 sm:right-6"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
          <p className="min-h-14 px-4 py-4 text-center text-[15px] text-white/85" onClick={(e) => e.stopPropagation()}>
            {current.caption}
          </p>
        </div>
      )}
    </section>
  );
}
