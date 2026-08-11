import { useState } from "react";
import { ChevronDown } from "lucide-react";

function primeiroNome(nomeCompleto) {
  if (!nomeCompleto) return "—";
  return nomeCompleto.trim().split(" ")[0];
}

const CAMPOS_TEXTO = [
  { key: "texto_conciliar", emoji: "📖", label: "Como foi conciliar trabalho, família e estudos?" },
  { key: "texto_apos", emoji: "🎓", label: "O que aconteceu após o curso?" },
  { key: "mensagem", emoji: "💬", label: "Mensagem para quem está estudando hoje" },
  // campo legado
  { key: "texto", emoji: "📝", label: "Depoimento" },
];

export default function TestimonialCard({ depoimento: d }) {
  const [open, setOpen] = useState(false);

  const campos = CAMPOS_TEXTO.filter(({ key }) => d[key] && String(d[key]).trim());

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
          <p className="text-xs text-muted-foreground mt-0.5">{d.curso} • {d.ano_conclusao}</p>
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
          {/* 1. Contribuição para projetos de vida */}
          {d.contribuicao_projetos && (
            <div>
              <p className="text-sm font-bold text-foreground">🌱 Contribuição para projetos de vida:</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed">{d.contribuicao_projetos}</p>
            </div>
          )}

          {/* 2. Após o curso */}
          {d.situacao_atual && d.situacao_atual.length > 0 && (
            <div>
              <p className="text-sm font-bold text-foreground">📌 Após o curso:</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed">{d.situacao_atual.join(", ")}</p>
            </div>
          )}

          {/* 3, 4, 5 — Campos de texto */}
          {campos.map(({ key, emoji, label }) => (
            <div key={key} className="space-y-0.5">
              <p className="text-sm font-bold text-foreground">{emoji} {label}</p>
              <p className="text-sm italic text-muted-foreground leading-relaxed">{d[key]}</p>
            </div>
          ))}

          {/* 6. Publicado com autorização */}
          <p className="text-sm font-bold text-accent pt-1">✓ Publicado com autorização</p>
        </div>
      )}
    </div>
  );
}