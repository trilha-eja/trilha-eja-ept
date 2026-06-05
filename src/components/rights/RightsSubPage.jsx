import { ArrowLeft } from "lucide-react";

export default function RightsSubPage({ titulo, subtitulo, intro, introBg, cards, onBack }) {
  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">{titulo}</h1>
            {subtitulo && <p className="text-sm text-muted-foreground leading-snug">{subtitulo}</p>}
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3 pb-10">
        {intro && (
          <div className={`border rounded-2xl p-4 ${introBg || "bg-muted/40 border-border"}`}>
            <p className="text-sm leading-relaxed text-foreground">{intro}</p>
          </div>
        )}
        {cards.map((r, i) => (
          <div key={i} className="p-4 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{r.emoji}</span>
              <h3 className="font-bold text-sm">{r.titulo}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{r.texto}</p>
            {r.canais && (
              <div className="mt-3 space-y-3">
                {r.canais.map((c, ci) => (
                  <div key={ci} className="bg-muted/50 rounded-xl p-3">
                    <p className="font-bold text-xs mb-1">{c.nome}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>
                    {c.link && (
                      <a
                        href={c.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                      >
                        {c.link.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            {r.legal && (
              <p className="text-xs text-muted-foreground/70 mt-2 border-t border-border pt-2">
                📋 <span className="font-semibold">Base legal:</span> {r.legal}
              </p>
            )}
            {r.link && (
              <a
                href={r.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
              >
                {r.link.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}