const dicas = [
  {
    emoji: "🌱",
    titulo: "Voltar a estudar leva tempo",
    texto: "Se você ficou anos sem estudar, é normal que no início pareça difícil. A memória, a concentração e o ritmo de leitura se reconstroem com o tempo — e isso é esperado. Não compare seu ritmo com o de quem nunca parou.",
    destaque: true,
  },
  {
    emoji: "⏱️",
    titulo: "Técnica Pomodoro",
    texto: "Estude 25 minutos seguidos e descanse 5 minutos. Depois de 4 ciclos, faça uma pausa maior. Funciona bem para quem tem dificuldade de manter o foco por longos períodos.",
  },
  {
    emoji: "📅",
    titulo: "Planeje sua semana de estudos",
    texto: "Reserve horários fixos para estudar — mesmo que sejam 20 ou 30 minutos. Consistência ao longo do tempo vale mais que longas sessões que raramente acontecem. Anote no celular como um compromisso com você mesmo(a).",
  },
  {
    emoji: "⏳",
    titulo: "Aproveite os pequenos momentos",
    texto: "Não espere ter horas livres para começar. No ônibus, no intervalo, em cinco minutos de silêncio — qualquer momento conta. Períodos curtos e regulares constroem aprendizagem de verdade ao longo do tempo.",
  },
  {
    emoji: "📝",
    titulo: "Como fazer um bom resumo",
    texto: "Leia o conteúdo completo primeiro. Depois anote apenas as ideias principais com suas próprias palavras. Resumos escritos por você ficam mais na memória do que copiar textos prontos.",
  },
  {
    emoji: "👥",
    titulo: "Estude com um colega",
    texto: "Combinar de estudar com um(a) colega — mesmo por WhatsApp — aumenta o compromisso e torna o estudo mais leve. Explicar um conteúdo para alguém é uma das formas mais eficientes de fixar o que você aprendeu.",
  },
  {
    emoji: "😴",
    titulo: "Durma bem — o sono é estudo",
    texto: "Dormir consolida o que você aprendeu. Estudar cansado demais tem pouco efeito. Às vezes descansar é a melhor decisão de estudo que você pode tomar.",
  },
  {
    emoji: "📱",
    titulo: "Seu celular já é uma ferramenta de estudo",
    texto: "Pelo celular é possível estudar de várias formas gratuitas.",
    linkFerramentas: true,
  },
];

export default function AbaDicasEstudo({ onNavigate }) {
  return (
    <div className="space-y-3">
      {dicas.map((d) => (
        <div
          key={d.titulo}
          className={`rounded-2xl p-4 flex items-start gap-3 ${
            d.destaque
              ? "bg-orange-50 border border-orange-200"
              : "border border-border bg-card"
          }`}
        >
          <span className="text-xl shrink-0 mt-0.5">{d.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1 leading-snug">{d.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{d.texto}</p>
            {d.linkFerramentas && onNavigate && (
              <button
                onClick={() => onNavigate("ferramentas")}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
              >
                📱 Ver Ferramentas Digitais
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}