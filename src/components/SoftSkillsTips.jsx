import { ArrowLeft, Heart, Users, Clock, Star, Lightbulb } from "lucide-react";

const tips = [
  {
    icon: Heart,
    title: "Responsabilidade",
    text: "Cuidar da casa, dos filhos, trabalhar e estudar ao mesmo tempo exige organização e senso de responsabilidade construídos na prática cotidiana. Essas experiências têm valor e fazem parte da sua formação.\n\nPara muitas mulheres, essa responsabilidade é ainda maior — cuidar da casa, dos filhos e ainda estudar e trabalhar é uma conquista que merece ser reconhecida.",
    color: "bg-chart-5",
  },
  {
    icon: Users,
    title: "Trabalho em Equipe",
    text: "Conviver com colegas de trabalho, familiares, vizinhos e comunidade desenvolve a capacidade de dialogar, colaborar e construir junto — habilidades fundamentais em qualquer espaço de atuação.",
    color: "bg-accent",
  },
  {
    icon: Clock,
    title: "Gestão do Tempo e Compromisso",
    text: "Conciliar trabalho, família e estudos exige planejamento, organização e dedicação construídos na prática cotidiana. Permanecer estudando em meio a tantas responsabilidades demonstra força e determinação.",
    color: "bg-primary",
  },
  {
    icon: Star,
    title: "Disposição para Aprender",
    text: "Retornar aos estudos demonstra abertura para novos conhecimentos, novas aprendizagens e novas possibilidades de formação. Aprender ao longo da vida é uma das capacidades mais importantes que existem.",
    color: "bg-secondary",
  },
  {
    icon: Lightbulb,
    title: "Experiência Prática",
    text: "Os conhecimentos construídos ao longo da vida podem contribuir para sua atuação no mundo do trabalho, na continuidade dos estudos e na construção de seus projetos de vida.",
    color: "bg-chart-2",
  },
];

const extraCards = [
  {
    emoji: "🏠",
    title: "Experiências que também ensinam",
    text: "Muitas experiências frequentemente invisibilizadas também desenvolvem conhecimentos e habilidades importantes:\n\n- Cuidar de familiares\n- Organizar atividades da comunidade\n- Participar de grupos religiosos\n- Realizar trabalhos voluntários\n- Organizar finanças domésticas\n- Realizar pequenos serviços e reparos\n- Participar de associações ou grupos locais\n\nEssas experiências têm valor formativo e fazem parte da sua trajetória.",
  },
  {
    emoji: "⚡",
    title: "Experiências na Área Elétrica Também Contam",
    text: "Muitas pessoas acreditam que não possuem experiência na área elétrica. Porém, diversas atividades do cotidiano já proporcionam conhecimentos importantes:\n\n- Pequenos reparos elétricos\n- Manutenção de equipamentos\n- Instalação de tomadas e iluminação\n- Uso de ferramentas\n- Apoio a profissionais da área\n- Atividades realizadas durante o curso\n- Experiências profissionais anteriores\n\nEsses conhecimentos têm valor e podem ser aproveitados na sua formação.",
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

      <div className="max-w-lg mx-auto px-4 py-5 space-y-3 pb-10">

        {/* Texto de abertura */}
        <div className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Tudo que você viveu tem <strong>valor formativo</strong>. Seu trabalho, sua família, suas lutas — são saberes que nenhum diploma apaga. Veja como reconhecê-los:
          </p>
        </div>

        {/* Cards existentes */}
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${tip.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed whitespace-pre-line">{tip.text}</p>
              </div>
            </div>
          );
        })}

        {/* Novas seções */}
        {extraCards.map((card, i) => (
          <div key={i} className="p-4 bg-card border border-border rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{card.emoji}</span>
              <h3 className="font-bold text-sm">{card.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{card.text}</p>
          </div>
        ))}

        {/* Card final de encerramento */}
        <div className="bg-orange-50 border border-orange-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <h3 className="font-bold text-sm">Reconhecer sua trajetória é reconhecer sua história</h3>
          </div>
          <p className="text-sm leading-relaxed text-orange-900">
            Sua história não começou quando você entrou no curso. Ela foi construída ao longo dos anos, em diferentes espaços de vida, trabalho, estudo e convivência. Reconhecer essa trajetória é um passo importante para construir novos projetos de vida.
          </p>
        </div>

      </div>
    </div>
  );
}