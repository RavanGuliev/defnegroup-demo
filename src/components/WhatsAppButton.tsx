import { getLang } from "@/i18n/server";
import { getDb, getDictionary } from "@/lib/cms";
import { FloatingActions } from "./FloatingActions";

/*
 * Sağ aşağı küncdəki düymələr: "yuxarı qalx" və WhatsApp.
 * WhatsApp nömrəsi paneldə (Site Ayarları) yazılana qədər ikon İletişim səhifəsinə aparır.
 */
export async function WhatsAppButton() {
  const n = (await getDb()).site.contact.whatsapp?.replace(/\D/g, "");
  const t = await getDictionary();
  const lang = await getLang();
  // Nömrə yazılmayıbsa ikon yenə görünür və İletişim səhifəsinə aparır
  const href = n ? `https://wa.me/${n}?text=${encodeURIComponent(t.whatsapp.text)}` : `/${lang}/iletisim`;
  return <FloatingActions whatsappHref={href} t={{ whatsapp: t.whatsapp.aria, top: t.whatsapp.top }} />;
}
