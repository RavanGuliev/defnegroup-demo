import Image from "next/image";
import type { IconName } from "@/lib/data";
import { Icon } from "./Icon";

/*
 * Real şəkil olduqda next/image (WebP/AVIF, lazy) ilə göstərir.
 * Şəkil hələ təqdim edilməyibsə (sənəd, bölmə 7: saxta/əlaqəsiz stok şəkil yoxdur)
 * brend rənglərində neytral yer tutucu göstərir.
 */
export function Media({
  src,
  alt,
  icon,
  sizes = "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw",
  priority,
  variant = "dark",
  iconClassName = "size-16 sm:size-20",
}: {
  src?: string;
  alt: string;
  icon?: IconName;
  sizes?: string;
  priority?: boolean;
  variant?: "dark" | "light";
  iconClassName?: string;
}) {
  if (src) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-center" />;
  }
  const dark = variant === "dark";
  const bg = dark
    ? "bg-[radial-gradient(120%_90%_at_80%_10%,#1d3a33_0%,#13171c_55%,#10243f_100%)] text-white/15"
    : "bg-[radial-gradient(120%_90%_at_80%_10%,#e6f1ed_0%,#f4f5f3_60%)] text-primary/25";
  return (
    <div role="img" aria-label={alt || undefined} aria-hidden={alt ? undefined : true} className={`absolute inset-0 flex items-center justify-center ${bg}`}>
      <div className={`absolute inset-0 ${dark ? "leaf-motif" : "leaf-motif-dark"}`} aria-hidden />
      {icon && <Icon name={icon} className={`relative ${iconClassName}`} />}
    </div>
  );
}
