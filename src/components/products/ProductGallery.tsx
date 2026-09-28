"use client";

import { useState } from "react";
import type { IconName } from "@/lib/data";
import { Media } from "../Media";

export function ProductGallery({ images, name, icon }: { images?: string[]; name: string; icon?: IconName }) {
  // Şəkil yoxdursa, qalereya quruluşunu göstərmək üçün 4 boş yer tutucu
  const slots: (string | undefined)[] = images?.length ? images : [undefined, undefined, undefined, undefined];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] border border-line bg-light">
        <Media src={slots[active]} alt={`${name} — görsel ${active + 1}`} icon={icon} variant="light" priority sizes="(max-width: 1023px) 100vw, 50vw" iconClassName="size-24" />
      </div>
      {slots.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3" aria-label="Ürün görselleri">
          {slots.map((src, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Görsel ${i + 1}`}
                aria-current={active === i}
                className={`relative block aspect-square w-full overflow-hidden rounded-[6px] border-2 bg-light transition-colors ${
                  active === i ? "border-primary" : "border-transparent hover:border-line"
                }`}
              >
                <Media src={src} alt="" icon={icon} variant="light" sizes="120px" iconClassName="size-7" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
