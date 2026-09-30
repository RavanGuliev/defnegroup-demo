"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/client";
import { getDict } from "@/i18n/dictionaries";
import { db, pad2, type Solution } from "@/lib/data";
import Link from "../Link";
import { Icon } from "../Icon";
import { Media } from "../Media";

export function SolutionsAccordion({ solutions }: { solutions: Solution[] }) {
  const [open, setOpen] = useState(0);
  const current = solutions[open] ?? solutions[0];
  const lang = useLang();
  const t = getDict(lang).solutionsAcc;
  const { getGroupByCode } = db(lang);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] lg:gap-14">
      <div className="border-y border-line">
        {solutions.map((s, i) => {
          const isOpen = open === i;
          const id = `cozum-panel-${s.slug}`;
          return (
            <div key={s.slug} className={`border-b border-l-2 border-line last:border-b-0 ${isOpen ? "border-l-primary bg-light" : "border-l-transparent"}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex min-h-[52px] w-full items-center gap-4 px-4 py-4 text-left sm:gap-5 sm:px-5 sm:py-5"
                >
                  <span className={`type-small w-8 shrink-0 tabular-nums ${isOpen ? "text-primary" : "text-muted"}`}>{pad2(i + 1)}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`type-h3 block ${isOpen ? "text-ink" : "text-charcoal"}`}>{s.name}</span>
                    <span className="mt-1 block text-[14px] leading-[1.5] text-muted">“{s.need}”</span>
                  </span>
                  <ChevronDown className={`size-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} aria-hidden />
                </button>
              </h3>
              <div
                id={id}
                className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 sm:pl-[4.5rem]">
                    <p className="type-body max-w-[520px]">{s.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {s.scope.map((x) => (
                        <li key={x} className="flex items-start gap-2 text-[14px] text-charcoal">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <Link href={`/cozum-alanlari/${s.slug}`} className="group cta-text mt-4 text-primary">
                      {t.inspect}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative hidden overflow-hidden rounded-[8px] bg-night lg:sticky lg:top-28 lg:block lg:aspect-[4/5]">
        <Media alt={current.name} icon={current.icon} iconClassName="size-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <Icon name={current.icon} className="size-8 text-[#5fd09d]" />
          <p className="type-h3 mt-4 text-white">{current.name}</p>
          <p className="mt-3 text-[15px] leading-[1.65] text-white/70">{t.relatedGroups}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {current.groupCodes.map((c) => (
              <li key={c} className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white/85">
                {getGroupByCode(c)?.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
