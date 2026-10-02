"use client";

import NextLink from "next/link";
import { withLocale } from "@/i18n/config";
import { useLang } from "@/i18n/client";

/* next/link + cari dil prefiksi: "/urunler" → "/tr/urunler" və ya "/en/urunler" */
export default function Link({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const lang = useLang();
  return <NextLink href={typeof href === "string" ? withLocale(lang, href) : href} {...props} />;
}
