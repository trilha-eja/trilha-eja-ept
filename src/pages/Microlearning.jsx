import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";

const cards = [
  {
    category: "Segurança",
    emoji: "🛡️",
    title: "NR-10: O Básico",
    content: "A NR-10 é a norma que protege quem trabalha com eletricidade. Exige treinamento obrigatório de 40h antes de atuar em instalações elétricas. Para atividades em Média ou Alta Tensão, há complementação: mais 16h para o SEC (indústrias) ou 40h para o SEP (transmissão). Atualizada em 2026 pela Portaria MTE nº 737.",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Ferramenta",
    emoji: "🔧",
    title: "Alicate Universal",
    content: "Serve para cortar, dobrar e segurar fios e cabos. Sempre use um com cabo isolado (identificado com a marcação 1000V). É uma das ferramentas mais usadas pelo(a) eletricista industrial no dia a dia.",
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
    category: "Conceito",
    emoji: "⚡",
    title: "Fio Fase: Cuidado!",
    content: "O fio fase é o condutor energizado do circuito — por onde a energia chega ao equipamento. É o fio que representa maior risco de choque elétrico. Antes de qualquer trabalho, desligue sempre o disjuntor correspondente e verifique a ausência de tensão com equipamento adequado.",
    color: "bg-secondary/10 border-secondary/20",
  },
  {
    category: "Conceito",
    emoji: "🔌",
    title: "Emendas Elétricas",
    content: "Emendas elétricas mal feitas são uma das principais causas de incêndios e falhas em instalações. Na indústria, toda emenda deve seguir normas técnicas e ser realizada por profissional habilitado. Conhecer o procedimento correto faz parte da formação do(a) eletricista industrial.",
    color: "bg-chart-4/10 border-chart-4/20",
  },
  {
    category: "Mundo do Trabalho",
    emoji: "💼",
    title: "Remuneração e Direitos",
    content: "A remuneração do(a) eletricista industrial varia conforme a região, o setor de atuação, o vínculo empregatício e a experiência profissional. Conhecer seus direitos trabalhistas — como o adicional de periculosidade — é tão importante quanto conhecer o salário. Trabalhador(a) informado(a) negocia melhor.",
    color: "bg-chart-5/10 border-chart-5/20",
  },
  {
    category: "Segurança",
    emoji: "🧤",
    title: "EPIs Obrigatórios",
    content: "Os EPIs do(a) eletricista industrial incluem: luvas isolantes, óculos de proteção, capacete, calçados adequados para serviços elétricos e vestimentas apropriadas. A empresa é obrigada a fornecer todos gratuitamente e em boas condições. (NR-06 e NR-10)",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Conceito",
    emoji: "🔄",
    title: "Circuito Série x Paralelo",
    content: "Série: tudo em fila (se uma lâmpada queima, todas apagam). Paralelo: cada um no seu caminho (se uma queima, as outras continuam). Casas usam paralelo!",
    color: "bg-accent/10 border-accent/20",
  },
  {
    category: "Segurança",
    emoji: "⚡",
    title: "Arco Elétrico — Perigo Invisível",
    content: "O arco elétrico é uma descarga elétrica que pode atingir temperaturas superiores a 20.000°C. Ocorre em painéis energizados e pode causar queimaduras graves em frações de segundo. O uso correto dos EPIs e dos procedimentos de segurança é a principal proteção.",
    dica: "Nunca abra um painel elétrico energizado sem os EPIs adequados e sem autorização.",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Conceito",
    emoji: "🔧",
    title: "O que é um Contator?",
    content: "O contator é um dispositivo que liga e desliga motores e equipamentos industriais de forma controlada. Funciona como um interruptor de alta capacidade comandado por um circuito de controle. É um dos componentes mais comuns em painéis elétricos industriais.",
    dica: "Na manutenção, verifique o estado dos contatos do contator — desgastes causam falhas nos equipamentos.",
    color: "bg-primary/10 border-primary/20",
  },
  {
    category: "Segurança",
    emoji: "🔒",
    title: "LOTO — Bloqueio e Etiquetagem",
    content: "Antes de realizar qualquer manutenção em equipamentos elétricos, o procedimento LOTO garante que a máquina esteja desligada, bloqueada e sinalizada. É uma exigência de segurança — não apenas uma recomendação. Protege a vida de quem realiza a manutenção.",
    dica: "Nunca confie apenas no aviso verbal de que a máquina está desligada — aplique sempre o bloqueio físico.",
    color: "bg-destructive/10 border-destructive/20",
  },
  {
    category: "Conceito",
    emoji: "⚙️",
    title: "Motor Elétrico",
    content: "O motor elétrico transforma energia elétrica em movimento mecânico. É um dos equipamentos mais presentes na indústria — bombas, compressores, esteiras e máquinas dependem dele. Saber identificar falhas em motores é uma habilidade essencial do(a) eletricista industrial.",
    dica: "Ruído excessivo, vibração e aquecimento fora do normal são sinais de que um motor precisa de manutenção.",
    color: "bg-accent/10 border-accent/20",
  },
  {
    category: "Direitos",
    emoji: "🛡️",
    title: "Adicional de Periculosidade",
    content: "Quem trabalha com eletricidade em condições de risco tem direito ao adicional de periculosidade — 30% sobre o salário base. Esse direito é garantido pela CLT e pela NR-16, não pela NR-10. Conhecer seus direitos é parte da sua formação profissional.",
    dica: "Se você atua com eletricidade e não recebe o adicional, consulte o sindicato da sua categoria.",
    color: "bg-chart-5/10 border-chart-5/20",
  },
  {
    category: "Conceito",
    emoji: "📐",
    title: "Leitura de Plaqueta do Motor",
    content: "Todo motor elétrico tem uma plaqueta com informações essenciais: tensão de operação, corrente nominal, potência, rotação e fator de serviço. Saber ler essas informações é fundamental para ligar corretamente o motor e evitar danos ao equipamento.",
    dica: "Antes de ligar qualquer motor, verifique se a tensão da rede corresponde à tensão indicada na plaqueta.",
    color: "bg-primary/10 border-primary/20",
  },
];

export default function Microlearning() {
  const [current, setCurrent] = useState(0);
  const card = cards[current];

  return (
    <div>
      <PageHeader title="Microlearning" subtitle="Conteúdos rápidos para quem nunca para de aprender" />
      <div className="max-w-lg mx-auto px-4 py-5">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-4">
          <p className="text-sm leading-relaxed text-foreground">Para quem tem <strong>pouco tempo</strong> mas não abre mão de aprender. Cada conteúdo foi pensado para caber na sua rotina.</p>
        </div>
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
          {card.dica && (
            <div className="mt-4 bg-white/60 rounded-xl px-4 py-3 w-full">
              <p className="text-sm font-semibold text-foreground">💡 {card.dica}</p>
            </div>
          )}
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