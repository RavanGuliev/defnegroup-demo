/*
 * Son yayın açarı: NEXT_PUBLIC_SITE_FINAL=true (build zamanı).
 * - false (sınaq mühiti, standart): sayt noindex-dir, nümunə və hazırlıq məzmunu görünür.
 * - true (son yayın): indeksləmə açılır; nümunə məhsullar, faylı olmayan kataloqlar və
 *   boş Projelerimiz / Belgeler menyu keçidləri gizlədilir (Kalan İşler, bölmə 3–4).
 */
export const isFinal = process.env.NEXT_PUBLIC_SITE_FINAL === "true";
