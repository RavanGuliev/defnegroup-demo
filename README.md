# DEFNE GROUP — veb sayt (frontend)

Next.js 16 (App Router) + Tailwind CSS 4 + TypeScript. Vizual quruluş vetelsan.com.tr üslubundadır; brend, menyu və məzmun qaydaları
“DEFNE GROUP — İkinci mərhələ dəyişiklik və əlavələr” sənədinə uyğundur.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Səhifələr

| Route | Məzmun |
| --- | --- |
| `/` | Hero karusel, güvən zolağı, 8 məhsul qrupu, çözüm alanları, sektorlar, iş prosesi, seçilmiş məhsullar, son çağırış |
| `/kurumsal` + `/hakkimizda`, `/misyon-ve-vizyon`, `/neden-defne-group`, `/belgeler-ve-sertifikalar` | Kurumsal bölmə |
| `/cozum-alanlari`, `/cozum-alanlari/[slug]` | Ehtiyaca görə həllər |
| `/sektorler`, `/sektorler/[slug]` | 8 sektor |
| `/urunler`, `/urunler/[kategori]`, `/urunler/[kategori]/[urun]` | Axtarış (ad / kod / açar söz), filtrlər, məhsul detalı |
| `/projelerimiz` | Təsdiqli layihələr gələnə qədər boş vəziyyət |
| `/kataloglar` | Üz qabığı, növ, yenilənmə tarixi, İncele / İndir |
| `/iletisim`, `/teklif-listem`, `/kvkk` | Əlaqə forması, təklif siyahısı + forma |

## Məzmunu harada dəyişmək lazımdır

- **`src/lib/data.ts`** — məhsul qrupları, sektorlar, həllər, məhsullar, kataloqlar. Məhsullar və kataloqlar **nümunədir**; real məzmun
  gəldikdə əvəz olunmalıdır (sənəd, bölmə 7). Gələcəkdə bu fayl admin paneli / API ilə əvəz olunacaq.
- **`src/lib/site.ts`** — əlaqə məlumatları (telefon, ünvan, WhatsApp). WhatsApp düyməsi nömrə yazılana qədər göstərilmir.
- **Loqo** — `src/components/Logo.tsx` müvəqqəti yazı loqosudur. Təsdiqlənmiş loqo gəldikdə `public/logo/` altına qoyub bu komponenti yeniləyin.
- **Şəkillər** — `image` / `images` sahələri boşdursa, brend rəngində neytral yer tutucu göstərilir (saxta stok şəkil yoxdur).
  Real şəkilləri WebP/AVIF olaraq `public/images/...` altına əlavə edib yolunu data faylına yazın.
- **Hero slaydları** — `src/components/home/HeroCarousel.tsx` içindəki `slides[].image`.

## Backend-ə bağlanacaq nöqtələr

- `src/components/quote/QuoteForm.tsx` → `submitQuote()` hazırda simulyasiyadır. API: müraciət nömrəsi serverdə yaradılmalı,
  `teklif@defnegroup.com`-a e-poçt, təsdiq e-poçtu, admin paneldə status (Yeni Talep → İnceleniyor → Teklif Hazırlanıyor → Teklif Gönderildi → Sonuçlandı).
- `src/components/ContactForm.tsx` → göndəriş simulyasiyadır.
- Fayl yükləmə müştəri tərəfində növ və ölçü (10 MB, maks. 5 fayl) yoxlanır; server tərəfində də yoxlama və virus skanı lazımdır.

## Hazır olanlar

- Rənglər `#00704A` / `#702F8A` / `#10243F`, Manrope şrifti (`src/app/globals.css`)
- Teklif Listem: qeydiyyatsız, header-də sayğac (mobil daxil), tablar arası sinxron
- SEO: səhifə metadata, canonical, `Organization` və `Product` JSON-LD, `sitemap.xml`, `robots.txt`
- Əlçatanlıq: skip-link, klaviatura ilə menyu, forma etiketləri və xəta mesajları, `prefers-reduced-motion`
- 360px-də üfüqi sürüşmə yoxdur; bütün səhifələr statik yaradılır
