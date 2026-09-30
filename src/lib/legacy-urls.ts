/*
 * Köhnə → yeni URL xəritəsi (düzəliş tapşırığı, bölmə 5 "Məlumat və URL qorunması").
 * 12 qruplu demo quruluşundakı ünvanlar qırıq keçidə çevrilmir; 17/107 quruluşundakı
 * uyğun səhifəyə daimi yönləndirilir. next.config.ts bu siyahıdan redirect yaradır.
 */
import { allProducts, getGroupByCode, getSub, groupHref, productHref, subHref } from "./data";

/** Köhnə kateqoriya slug → yeni qrup və ya alt bölmə kodu. */
const legacyCategories: Record<string, string> = {
  "sokak-hayvanlari-ekipmanlari": "01",
  "veteriner-ve-klinik-urunleri": "01.02",
  "kent-mobilyalari": "07.01",
  "park-ve-bahce-ekipmanlari": "02",
  "tibbi-ve-medikal-urunler": "03",
  "sosyal-yardim-ve-afet-urunleri": "05",
  "uniforma-ve-is-kiyafetleri": "04",
  "is-guvenligi-ve-kkd": "10",
  "dezenfeksiyon-ve-hijyen": "08",
  "temizlik-ve-atik-yonetimi": "08",
  "otel-restoran-catering-ekipmanlari": "11",
  "ofis-ve-kurumsal-tedarik": "06",
};

/** Demo məhsulunun köhnə kateqoriyası (köhnə ünvan: /urunler/{kateqoriya}/{məhsul}). */
const legacyProductCategory: Record<string, string> = {
  "paslanmaz-barinak-kafesi-modul": "sokak-hayvanlari-ekipmanlari",
  "yakalama-kementi": "sokak-hayvanlari-ekipmanlari",
  "otomatik-mama-istasyonu": "sokak-hayvanlari-ekipmanlari",
  "muayene-masasi-paslanmaz": "veteriner-ve-klinik-urunleri",
  "kent-bank-ahsap-metal": "kent-mobilyalari",
  "cop-kutusu-galvaniz": "kent-mobilyalari",
  "ilk-yardim-cantasi": "tibbi-ve-medikal-urunler",
  "afet-battaniyesi": "sosyal-yardim-ve-afet-urunleri",
  "saha-personeli-montu": "uniforma-ve-is-kiyafetleri",
  "reflektorlu-yelek": "is-guvenligi-ve-kkd",
  "yuzey-dezenfektani": "dezenfeksiyon-ve-hijyen",
  "sirt-tipi-ilaclama-pompasi": "dezenfeksiyon-ve-hijyen",
  "tekerlekli-atik-konteyneri": "temizlik-ve-atik-yonetimi",
  "endustriyel-yemek-arabasi": "otel-restoran-catering-ekipmanlari",
  "calisma-masasi-kurumsal": "ofis-ve-kurumsal-tedarik",
  "cocuk-oyun-grubu": "park-ve-bahce-ekipmanlari",
};

function codeHref(code: string) {
  return code.includes(".") ? subHref(getSub(code)!) : groupHref(getGroupByCode(code)!);
}

export function legacyUrlMap(): { source: string; destination: string }[] {
  const cats = Object.entries(legacyCategories).map(([slug, code]) => ({ source: `/urunler/${slug}`, destination: codeHref(code) }));
  const prods = allProducts.map((p) => ({
    source: `/urunler/${legacyProductCategory[p.slug]}/${p.slug}`,
    // Təsdiqsiz (yayımlanmayan) məhsul öz qrup səhifəsinə yönləndirilir
    destination: p.published === false ? codeHref(p.groupCode!) : productHref(p),
  }));
  // Dilsiz köhnə ünvan → /tr/... (sayt əvvəl yalnız türkcə idi); dilli köhnə ünvan → eyni dildə yeni ünvan
  return [...cats, ...prods].flatMap((r) => [
    { source: r.source, destination: `/tr${r.destination}` },
    { source: `/:lang(tr|az)${r.source}`, destination: `/:lang${r.destination}` },
  ]);
}
