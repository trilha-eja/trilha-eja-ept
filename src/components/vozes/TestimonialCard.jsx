import { useState } from "react";

function primeiroNome(nomeCompleto) {
  if (!nomeCompleto) return "—";
  return nomeCompleto.trim().split(" ")[0];
}

export default function TestimonialCard({ depoimento: d }) {
  const [expandedField, setExpandedField] = useState(null);
  const MAX = 200;

  const campos = [
    { key: "texto_conciliar", label: "Como foi conciliar trabalho, família e estudos" },
    { key: "texto_apos", label: "O que aconteceu após o curso" },
    { key: "mensagem", label: "Mensagem para quem está estudando hoje" },
    // campo legado
    { key: "texto", label: "Depoimento" },
  ].filter(({ key }) => d[key] && String(d[key]).trim());

  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-sm">
            {primeiroNome(d.nome)}{d.idade ? `, ${d.idade} anos` : ""}
          </p>
          <p className="text-xs text-muted-foreground">{d.curso} • {d.ano_conclusao}</p>
          {d.cidade_estado && (
            <p className="text-xs text-muted-foreground">{d.cidade_estado}</p>
          )}
          {d.contribuicao_projetos && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Contribuição para projetos de vida: <span className="font-semibold">{d.contribuicao_projetos}</span>
            </p>
          )}
          {d.situacao_atual && d.situacao_atual.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Após o curso: <span className="font-semibold">{d.situacao_atual.join(", ")}</span>
            </p>
          )}
        </div>
        <span className="text-[10px] text-accent font-semibold shrink-0 mt-0.5">✓ Publicado com autorização</span>
      </div>

      {/* Campos de texto */}
      {campos.map(({ key, label }) => {
        const texto = String(d[key]);
        const isLong = texto.length > MAX;
        const isExpanded = expandedField === key;
        const displayText = isExpanded || !isLong ? texto : texto.slice(0, MAX) + "…";
        return (
          <div key={key}>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">"{displayText}"</p>
            {isLong && (
              <button
                onClick={() => setExpandedField(isExpanded ? null : key)}
                className="text-xs font-semibold text-primary mt-1"
              >
                {isExpanded ? "Ler menos" : "Ler mais"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}