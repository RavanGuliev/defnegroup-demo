/* Hazır olmayan bölmə — saxta məzmun əvəzinə (sənəd, bölmə 7) */
export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="leaf-motif-dark rounded-[8px] border border-dashed border-line bg-light px-6 py-14 text-center sm:py-20">
      <p className="type-h3 text-ink">{title}</p>
      <p className="type-body mx-auto mt-3 max-w-[520px]">{text}</p>
      {action && <div className="mt-8 flex justify-center">{action}</div>}
    </div>
  );
}
