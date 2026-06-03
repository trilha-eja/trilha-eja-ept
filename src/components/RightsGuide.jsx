import { ArrowLeft } from "lucide-react";

const rights = [
  {
    emoji: "📋",
    title: "Carteira Assinada (CLT)",
    text: "O empregador deve assinar sua carteira em até 5 dias. Isso garante FGTS, férias e 13º salário. A empresa tem até 5 dias úteis após a contratação para registrar. Se não fizer, você pode denunciar ao Ministério do Trabalho (MTE).",
    legal: "CLT, Art. 29 e Art. 47",
  },
  {
    emoji: "💰",
    title: "Salário Mínimo",
    text: "Ninguém pode pagar menos que o salário mínimo. Se trabalhar menos horas, o valor é proporcional. Nenhum contrato pode estabelecer valor inferior. É inconstitucional.",
    legal: "CF/88, Art. 7º, inciso IV",
  },
  {
    emoji: "🏖️",
    title: "Férias",
    text: "Após 1 ano de trabalho, você tem direito a 30 dias de férias com pagamento extra de 1/3. As férias devem ser pagas com 1/3 a mais ANTES do início do período. Se atrasarem, você tem direito à dobra.",
    legal: "CLT, Art. 129 e Art. 145",
  },
  {
    emoji: "🎄",
    title: "13º Salário",
    text: "Pago em duas parcelas: a primeira até novembro e a segunda até dezembro.",
    legal: "CLT, Art. 1º da Lei nº 4.090/1962 e Lei nº 4.749/1965",
  },
  {
    emoji: "⏰",
    title: "Jornada de Trabalho",
    text: "Máximo de 8 horas por dia e 44 horas por semana. Hora extra paga pelo menos 50% a mais. Hora extra acima de 2h por dia é proibida. Você pode recusar horas extras acima do limite legal.",
    legal: "CLT, Art. 59 e CF/88, Art. 7º, inciso XIII",
  },
  {
    emoji: "🛡️",
    title: "FGTS",
    text: "O patrão deposita 8% do seu salário todo mês. Você pode sacar na demissão sem justa causa.",
    legal: "Lei nº 8.036/1990, Art. 15 — depósito obrigatório de 8% sobre a remuneração",
  },
  {
    emoji: "🏥",
    title: "Seguro Desemprego",
    text: "Se for demitido sem justa causa, pode receber de 3 a 5 parcelas do seguro desemprego.",
    legal: "Lei nº 7.998/1990 e CF/88, Art. 7º, inciso II",
  },
  {
    emoji: "⚡🛡️",
    title: "NR-10: Seu direito à segurança",
    text: "Todo trabalhador que lida com instalações elétricas tem direito a:\n- Treinamento de 40h antes de iniciar o trabalho (ou 40h + 40h para Alta Tensão)\n- Receber EPIs gratuitamente (luvas, capacete, botina isolante, óculos)\n- Recusar serviço em condições inseguras SEM punição\n- Adicional de insalubridade ou periculosidade no salário",
    legal: "NR-10 (Portaria MTE 598/2004), CLT Art. 193",
  },
  {
    emoji: "⚠️",
    title: "Trabalho informal: conhecer para se proteger",
    text: "Trabalhar sem registro é comum na área elétrica, mas tem riscos sérios: sem FGTS acumulado, sem seguro-desemprego se dispensado, sem cobertura em caso de acidente de trabalho. Se isso acontecer com você, procure o CRAS ou o sindicato da categoria.",
    legal: "CLT, Art. 47 — multa ao empregador por não registro | Lei nº 8.213/1991 — cobertura previdenciária vinculada ao registro formal",
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
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{r.text}</p>
            {r.legal && (
              <p className="text-xs text-muted-foreground/70 mt-2 border-t border-border pt-2">
                📋 <span className="font-semibold">Base legal:</span> {r.legal}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}