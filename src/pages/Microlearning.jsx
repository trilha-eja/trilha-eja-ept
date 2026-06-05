import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";

const cards = [
  {
    category: "Segurança",
    emoji: "🛡️",
    title: "NR-10: O Básico",
    content: "A NR-10 é a norma que protege quem trabalha com eletricidade. Ela exige treinamento obrigatório de 40h antes de mexer em qualquer instalação elétrica.",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Ferramenta",
    emoji: "🔧",
    title: "Alicate Universal",
    content: "Serve para cortar, dobrar e segurar fios. Sempre use um com cabo isolado (até 1000V). É a ferramenta mais usada pelo eletricista.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    category: "Conceito",
    emoji: "⚡",
    title: "Tensão x Corrente",
    content: "Tensão (V) é a 'pressão' que empurra a eletricidade. Corrente (A) é a quantidade que passa. Pense: tensão = pressão da água, corrente = volume de água.",
    color: "bg-accent/10 border-accent/20",
  },
  {
    category: "Dica",
    emoji: "💡",
    title: "Fio Fase: Cuidado!",
    content: "O fio fase é o que conduz energia. Nunca toque sem desligar o disjuntor. Use a chave teste para identificar: se a lâmpada acender, é fase!",
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    category: "Prática",
    emoji: "🔌",
    title: "Emendas de Fio",
    content: "Para emendar fios, desencape 2cm de cada um, torça juntos no sentido horário e cubra com fita isolante. Faça pelo menos 3 camadas de fita.",
    color: "bg-chart-4/10 border-chart-4/20",
  },
  {
    category: "Carreira",
    emoji: "📈",
    title: "Quanto Ganha?",
    content: "Um eletricista industrial iniciante ganha em média R$ 2.500 a R$ 3.500. Com experiência e NR-10, pode chegar a R$ 5.000 ou mais!",
    color: "bg-chart-5/10 border-chart-5/20",
  },
  {
    category: "Segurança",
    emoji: "🧤",
    title: "EPIs Obrigatórios",
    content: "Luva isolante, óculos de proteção, capacete, botina com solado isolante e roupa anti-chama. A empresa DEVE fornecer tudo gratuitamente.",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Conceito",
    emoji: "🔄",
    title: "Circuito Série x Paralelo",
    content: "Série: tudo em fila (se uma lâmpada queima, todas apagam). Paralelo: cada um no seu caminho (se uma queima, as outras continuam). Casas usam paralelo!",
    color: "bg-accent/10 border-accent/20",
  },
];

export default function Microlearning() {
  const [current, setCurrent] = useState(0);
  const card = cards[current];

  return (
    <div>
      <PageHeader title="Microlearning" subtitle="Conteúdos rápidos para quem tem pouco tempo — mas nunca para de aprender" />
      <div className="max-w-lg mx-auto px-4 py-5">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-semibold">
            ⏱️ Leitura de ~1 minuto • Card {current + 1} de {cards.length}
          </span>
        </div>

        {/* Card */}
        <div className={`rounded-3xl border-2 p-6 ${card.color} min-h-[280px] flex flex-col items-center justify-center text-center`}>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            {card.category}
          </span>
          <span className="text-5xl mb-4">{card.emoji}</span>
          <h2 className="text-xl font-extrabold mb-3">{card.title}</h2>
          <p className="text-base leading-relaxed text-foreground">{card.content}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrent(Math.max(0, current - 1))}
            disabled={current === 0}
            className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-1.5">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? "bg-primary scale-125" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent(Math.min(cards.length - 1, current + 1))}
            disabled={current === cards.length - 1}
            className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          👆 Deslize ou toque nas setas para navegar
        </p>
      </div>
    </div>
  );
}