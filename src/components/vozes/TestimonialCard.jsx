import { useState } from "react";

export default function TestimonialCard({ depoimento }) {
  const [expanded, setExpanded] = useState(false);
  const MAX = 300;
  const isLong = depoimento.texto.length > MAX;
  const displayText = expanded || !isLong ? depoimento.texto : depoimento.texto.slice(0, MAX) + "…";

  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-sm">{depoimento.nome}, {depoimento.idade} anos</p>
          <p className="text-xs text-muted-foreground">{depoimento.curso} • {depoimento.ano_conclusao}</p>
          {depoimento.cidade_estado && (
            <p className="text-xs text-muted-foreground">{depoimento.cidade_estado}</p>
          )}
        </div>
        <span className="text-[10px] text-accent font-semibold shrink-0 mt-0.5">✓ Publicado com autorização</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">"{displayText}"</p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-semibold text-primary"
        >
          {expanded ? "Ler menos" : "Ler mais"}
        </button>
      )}
    </div>
  );
}