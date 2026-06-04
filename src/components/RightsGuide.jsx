import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import RightsSubPage from "./rights/RightsSubPage";
import { cards as cardsContrato } from "./rights/dadosContratoRegistro";
import { cards as cardsJornada } from "./rights/dadosJornadaRemuneracao";
import { cards as cardsProtecao } from "./rights/dadosProtecaoSeguranca";
import { cards as cardsPrevidencia } from "./rights/dadosPrevidenciaSocial";
import { cards as cardsColetivos } from "./rights/dadosDireitosColetivos";

const subpaginas = [
  {
    id: "contrato",
    emoji: "📋",
    titulo: "Contrato e Registro",
    descricao: "Carteira assinada, salário, vale-transporte e igualdade",
    subtitulo: "Seus direitos desde o primeiro dia de trabalho",
    cards: cardsContrato,
    cor: "bg-orange-50 border-orange-200",
  },
  {
    id: "jornada",
    emoji: "⏰",
    titulo: "Jornada e Remuneração",
    descricao: "Horas de trabalho, extras, férias e 13º salário",
    subtitulo: "Seu tempo e seu salário têm valor — conheça seus direitos",
    cards: cardsJornada,
    cor: "bg-blue-50 border-blue-200",
  },
  {
    id: "protecao",
    emoji: "🦺",
    titulo: "Proteção e Segurança",
    descricao: "FGTS, seguro desemprego e segurança no trabalho",
    subtitulo: "Seus direitos em caso de demissão e no ambiente de trabalho",
    cards: cardsProtecao,
    cor: "bg-green-50 border-green-200",
  },
  {
    id: "previdencia",
    emoji: "🏛️",
    titulo: "Previdência Social",
    descricao: "INSS, aposentadoria, auxílios e licenças",
    subtitulo: "O INSS protege você e sua família em momentos difíceis",
    cards: cardsPrevidencia,
    cor: "bg-purple-50 border-purple-200",
  },
  {
    id: "coletivos",
    emoji: "✊",
    titulo: "Direitos Coletivos",
    descricao: "Sindicato, associação e direitos coletivos",
    subtitulo: "Unidos somos mais fortes — conheça seus direitos coletivos",
    cards: cardsColetivos,
    cor: "bg-yellow-50 border-yellow-200",
  },
];

export default function RightsGuide({ onBack }) {
  const [ativa, setAtiva] = useState(null);

  const sub = subpaginas.find((s) => s.id === ativa);

  if (sub) {
    return (
      <RightsSubPage
        titulo={sub.titulo}
        subtitulo={sub.subtitulo}
        cards={sub.cards}
        onBack={() => setAtiva(null)}
      />
    );
  }

  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-lg">Direitos Trabalhistas</h1>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3 pb-10">
        <div className="bg-accent/10 rounded-2xl p-4 text-center mb-2">
          <p className="text-sm font-semibold">🛡️ Conheça seus direitos — isso é poder!</p>
        </div>
        {subpaginas.map((s) => (
          <button
            key={s.id}
            onClick={() => setAtiva(s.id)}
            className={`w-full border rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-all ${s.cor}`}
          >
            <span className="text-3xl shrink-0">{s.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm leading-tight">{s.titulo}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{s.descricao}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}