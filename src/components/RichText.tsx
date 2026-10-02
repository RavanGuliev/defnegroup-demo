/*
 * Paneldəki zəngin mətn redaktorundan gələn HTML (API tərəfində təmizlənib — script,
 * on* atributları silinir). Düz mətn gəlsə abzaslara çevrilir.
 */
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function RichText({ html, className = "" }: { html?: string | null; className?: string }) {
  if (!html) return null;
  const content = html.includes("<")
    ? html
    : html
        .split(/\n{2,}/)
        .map((p) => `<p>${escape(p.trim())}</p>`)
        .join("");
  return <div className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: content }} />;
}
