const dicas = [
  {
    emoji: "⏱️",
    titulo: "Técnica Pomodoro",
    texto: "Estude 25 minutos seguidos, descanse 5 minutos. Repita 4 vezes e faça uma pausa maior de 20 minutos. Simples e muito eficiente para quem tem pouco tempo.",
  },
  {
    emoji: "📅",
    titulo: "Planeje sua semana de estudos",
    texto: "Reserve horários fixos para estudar — mesmo que sejam apenas 30 minutos por dia. Consistência vale mais que longas sessões ocasionais. Anote no celular como compromisso.",
  },
  {
    emoji: "🚌",
    titulo: "Aproveite o tempo no transporte",
    texto: "No ônibus ou trem, você pode ouvir podcasts educativos, rever anotações ou assistir videoaulas com fone de ouvido. Cada minuto conta!",
  },
  {
    emoji: "📝",
    titulo: "Como fazer um bom resumo",
    texto: "Leia o conteúdo completo primeiro. Depois anote apenas as ideias principais com suas próprias palavras. Resumos curtos e escritos por você ficam muito mais na memória.",
  },
  {
    emoji: "👥",
    titulo: "Estude com um colega",
    texto: "Combinar de estudar com um colega — mesmo por WhatsApp — aumenta o compromisso e torna o estudo mais leve. Explique o conteúdo para alguém: é a melhor forma de aprender.",
  },
  {
    emoji: "😴",
    titulo: "Durma bem — o sono é estudo",
    texto: "Dormir consolida o que você aprendeu. Estudar cansado demais tem pouco efeito. Às vezes descansar é a melhor decisão de estudo que você pode tomar.",
  },
];

export default function AbaDicasEstudo() {
  return (
    <div className="space-y-4">
      <div className="text-center pb-1">
        <h2 className="text-base font-extrabold">💡 Dicas para Estudar com Pouco Tempo</h2>
      </div>

      {dicas.map((d) => (
        <div key={d.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">{d.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1">{d.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{d.texto}</p>
          </div>
        </div>
      ))}
    </div>
  );
}