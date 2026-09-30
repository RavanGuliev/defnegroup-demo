"use client";

import Link from "@/components/Link";
import { useLang } from "@/i18n/client";

const copy = {
  tr: { title: "Sayfa bulunamadı", text: "Aradığınız sayfa taşınmış veya kaldırılmış olabilir.", home: "Ana Sayfaya Dön", products: "Ürün Gruplarını İnceleyin" },
  az: { title: "Səhifə tapılmadı", text: "Axtardığınız səhifə köçürülmüş və ya silinmiş ola bilər.", home: "Ana Səhifəyə Qayıt", products: "Məhsul Qruplarına Baxın" },
};

export default function NotFound() {
  const t = copy[useLang()];
  return (
    <section className="leaf-motif-dark bg-light py-24 sm:py-32">
      <div className="container-site text-center">
        <p className="type-kicker">404</p>
        <h1 className="type-h1 mt-4 text-ink">{t.title}</h1>
        <p className="type-body mx-auto mt-5 max-w-[480px]">{t.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            {t.home}
          </Link>
          <Link href="/urunler" className="btn-outline">
            {t.products}
          </Link>
        </div>
      </div>
    </section>
  );
}
