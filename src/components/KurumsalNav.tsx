import Link from "next/link";
import { mainNav } from "@/lib/site";

const items = mainNav.find((i) => i.href === "/kurumsal")?.children ?? [];

export function KurumsalNav({ active }: { active: string }) {
  return (
    <nav aria-label="Kurumsal" className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[84px]">
      <ul className="container-site flex gap-6 overflow-x-auto [scrollbar-width:none] sm:gap-8">
        {items.map((i) => (
          <li key={i.href} className="shrink-0">
            <Link
              href={i.href}
              aria-current={active === i.href ? "page" : undefined}
              className={`relative inline-flex min-h-14 items-center text-[14px] font-semibold whitespace-nowrap transition-colors ${
                active === i.href ? "text-primary" : "text-charcoal hover:text-ink"
              }`}
            >
              {i.label}
              {active === i.href && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" aria-hidden />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
