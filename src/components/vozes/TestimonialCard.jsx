import { useState } from "react";
import { ChevronDown } from "lucide-react";

function primeiroNome(nomeCompleto) {
  if (!nomeCompleto) return "—";
  return nomeCompleto.trim().split(" ")[0];
}

export default function TestimonialCard({ depoimento: d }) {
  const [open, setOpen] = useState(false);

  const campos = [
    { key: "texto_conciliar", label: "Como foi conciliar trabalho, família e estudos" },
    { key: "texto_apos", label: "O que aconteceu após o curso" },
    { key: "mensagem", label: "Mensagem para quem está estudando hoje" },
    // campo legado
    { key: "texto", label: "Depoimento" },
  ].filter(({ key }) => d[key] && String(d[key]).trim());

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Cabeçalho — sempre visível */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-2 p-4 text-left"
      >
        <div>
          <p className="font-bold text-sm">
            {primeiroNome(d.nome)}{d.idade && Number(d.idade) >= 1 && Number(d.idade) <= 120 ? `, ${d.idade} anos` : ""}
          </p>
          <p className="text-xs text-muted-foreground">{d.curso} • {d.ano_conclusao}</p>
          {d.cidade_estado && (
            <p className="text-xs text-muted-foreground">{d.cidade_estado}</p>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          {d.contribuicao_projetos && (
            <p className="text-xs text-muted-foreground">
              Contribuição para projetos de vida: <span className="font-semibold">{d.contribuicao_projetos}</span>
            </p>
          )}
          {d.situacao_atual && d.situacao_atual.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Após o curso: <span className="font-semibold">{d.situacao_atual.join(", ")}</span>
            </p>
          )}

          {campos.map(({ key, label }) => (
            <div key={key}>
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">"{d[key]}"</p>
            </div>
          ))}

          <p className="text-[10px] text-accent font-semibold">✓ Publicado com autorização</p>
        </div>
      )}
    </div>
  );
}