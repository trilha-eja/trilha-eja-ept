export default function GridCard2x2({ emoji, titulo, texto, url }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-3 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow">
      <span className="text-3xl leading-none">{emoji}</span>
      <h3 className="font-bold text-xs leading-tight">{titulo}</h3>
      <p className="text-[11px] text-muted-foreground leading-snug line-clamp-3">{texto}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto text-[11px] font-bold px-3 py-1.5 rounded-lg text-white hover:opacity-90 active:scale-95 transition-all"
        style={{ background: "#E86826" }}
      >
        Acessar
      </a>
    </div>
  );
}