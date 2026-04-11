import { ArrowLeft } from "lucide-react";

const rights = [
  {
    emoji: "📋",
    title: "Carteira Assinada (CLT)",
    text: "O empregador deve assinar sua carteira em até 5 dias. Isso garante FGTS, férias e 13º salário.",
  },
  {
    emoji: "💰",
    title: "Salário Mínimo",
    text: "Ninguém pode pagar menos que o salário mínimo. Se trabalhar menos horas, o valor é proporcional.",
  },
  {
    emoji: "🏖️",
    title: "Férias",
    text: "Após 1 ano de trabalho, você tem direito a 30 dias de férias com pagamento extra de 1/3.",
  },
  {
    emoji: "🎄",
    title: "13º Salário",
    text: "Pago em duas parcelas: a primeira até novembro e a segunda até dezembro.",
  },
  {
    emoji: "⏰",
    title: "Jornada de Trabalho",
    text: "Máximo de 8 horas por dia e 44 horas por semana. Hora extra paga pelo menos 50% a mais.",
  },
  {
    emoji: "🛡️",
    title: "FGTS",
    text: "O patrão deposita 8% do seu salário todo mês. Você pode sacar na demissão sem justa causa.",
  },
  {
    emoji: "🏥",
    title: "Seguro Desemprego",
    text: "Se for demitido sem justa causa, pode receber de 3 a 5 parcelas do seguro desemprego.",
  },
  {
    emoji: "⚠️",
    title: "NR-10 (Segurança Elétrica)",
    text: "Toda empresa deve fornecer EPIs e treinamento de segurança. Nunca trabalhe sem proteção!",
  },
];

export default function RightsGuide({ onBack }) {
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
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-accent/10 rounded-2xl p-4 text-center mb-2">
          <p className="text-sm font-semibold">🛡️ Conheça seus direitos — isso é poder!</p>
        </div>
        {rights.map((r, i) => (
          <div key={i} className="p-4 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{r.emoji}</span>
              <h3 className="font-bold text-sm">{r.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}