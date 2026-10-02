"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/*
 * Sağ aşağı küncdəki düymələr (DEFNE yaşılı):
 * - "Yuxarı qalx" — səhifə bir ekrandan çox sürüşdürüləndə görünür; halqa oxunma irəliləyişini göstərir.
 * - WhatsApp — həmişə görünür, "yuxarı qalx"-ın üstündə; nömrə paneldə (Site Ayarları) yazılmayıbsa
 *   İletişim səhifəsinə aparır.
 * Əsas məzmunu və "Teklif" düymələrini bağlamamaq üçün kiçik və küncdədir.
 */
export function FloatingActions({ whatsappHref, t }: { whatsappHref: string; t: { whatsapp: string; top: string } }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const R = 22;
  const C = 2 * Math.PI * R;
  const btn = "inline-flex size-12 items-center justify-center rounded-full shadow-[0_10px_28px_-10px_rgba(0,112,74,0.55)] transition-[transform,opacity,background-color] duration-300 sm:size-[52px]";

  return (
    <div className="fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] size-12 sm:size-[52px]">
      {/* WhatsApp: yuxarı düyməsi görünəndə onun üstünə qalxır */}
      <a
        href={whatsappHref}
        target={whatsappHref.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
        className={`${btn} absolute right-0 bottom-0 bg-primary text-white hover:bg-primary-dark ${visible ? "-translate-y-[60px] sm:-translate-y-16" : "translate-y-0"}`}
      >
        <svg viewBox="0 0 24 24" className="size-6 sm:size-[26px]" fill="currentColor" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.45-5.02c0-5.2 4.24-9.43 9.45-9.43a9.4 9.4 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.8.7.7 5.8.7 12.05c0 2 .52 3.95 1.52 5.66L.6 23.3l5.72-1.5a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
        </svg>
      </a>

      <button
        type="button"
        onClick={toTop}
        aria-label={t.top}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={`${btn} absolute right-0 bottom-0 bg-white text-primary hover:bg-primary-light ${visible ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"}`}
      >
        <svg viewBox="0 0 52 52" className="absolute inset-0 size-full -rotate-90" aria-hidden>
          <circle cx="26" cy="26" r={R} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
          <circle cx="26" cy="26" r={R} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
        </svg>
        <ArrowUp className="relative size-5" strokeWidth={2} aria-hidden />
      </button>

    </div>
  );
}
