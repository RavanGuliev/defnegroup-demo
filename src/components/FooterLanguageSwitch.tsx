"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { localeLabels, locales, stripLocale } from "@/i18n/config";
import { useLang } from "@/i18n/client";
import { useDict } from "./SiteData";
import Link from "./Link";

/* Footer dil seçimi: "TR / EN" — cari səhifə seçilən dildə açılır */
export function FooterLanguageSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const path = stripLocale(usePathname());
  return (
    <div role="group" aria-label={useDict().common.language} className={`flex items-center gap-1 text-[13px] font-medium tracking-[0.14em] ${className}`}>
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span className="px-1 text-white/25" aria-hidden>
              /
            </span>
          )}
          <Link
            href={`/${l}${path === "/" ? "" : path}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            title={localeLabels[l].name}
            className={`inline-flex min-h-11 items-center px-1 transition-colors ${l === lang ? "text-white" : "text-white/45 hover:text-white/80"}`}
          >
            {localeLabels[l].short}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
