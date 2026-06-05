import { ArrowLeft, Heart, Users, Clock, Shield, Star, Lightbulb } from "lucide-react";

const tips = [
  {
    icon: Heart,
    title: "Responsabilidade",
    text: "Cuidar da casa, dos filhos e trabalhar ao mesmo tempo mostra que você é uma pessoa muito responsável.",
    color: "bg-chart-5",
  },
  {
    icon: Users,
    title: "Trabalho em equipe",
    text: "Conviver com colegas de trabalho, vizinhos e família mostra sua habilidade de lidar com pessoas.",
    color: "bg-accent",
  },
  {
    icon: Clock,
    title: "Gestão do tempo",
    text: "Estudar à noite depois de um dia inteiro de trabalho? Isso é gestão de tempo de verdade!",
    color: "bg-primary",
  },
  {
    icon: Shield,
    title: "Resiliência",
    text: "Superar dificuldades e continuar estudando mostra uma força que nem todo mundo tem.",
    color: "bg-chart-4",
  },
  {
    icon: Star,
    title: "Vontade de aprender",
    text: "Voltar a estudar é prova de que você quer crescer. Isso vale ouro no mercado!",
    color: "bg-secondary",
  },
  {
    icon: Lightbulb,
    title: "Experiência prática",
    text: "Tudo que você fez na vida — consertos, serviços, ajuda — é experiência que vale no currículo.",
    color: "bg-chart-2",
  },
];

export default function SoftSkillsTips({ onBack }) {
  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Valorize sua Experiência</h1>
            <p className="text-sm text-muted-foreground">Suas habilidades de vida contam!</p>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Tudo que você viveu tem <strong>valor formativo</strong>. Seu trabalho, sua família, suas lutas — são saberes que nenhum diploma apaga. Veja como reconhecê-los:</p>
        </div>
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tip.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{tip.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}