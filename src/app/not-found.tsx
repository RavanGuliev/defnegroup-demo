import Link from "next/link";

export default function NotFound() {
  return (
    <section className="leaf-motif-dark bg-light py-24 sm:py-32">
      <div className="container-site text-center">
        <p className="type-kicker">404</p>
        <h1 className="type-h1 mt-4 text-ink">Sayfa bulunamadı</h1>
        <p className="type-body mx-auto mt-5 max-w-[480px]">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
          <Link href="/urunler" className="btn-outline">
            Ürünleri İnceleyin
          </Link>
        </div>
      </div>
    </section>
  );
}
