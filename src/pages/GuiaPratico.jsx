import { useState } from "react";
import { Plug, Gauge, FileText } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import PracticalGuideDetail from "../components/PracticalGuideDetail";

const guides = [
  {
    id: "tomada",
    icon: Plug,
    title: "Como ligar uma tomada",
    color: "bg-primary",
    steps: [
      { title: "Desligue a energia", text: "Primeiro, SEMPRE desligue o disjuntor do circuito. Sua segurança vem primeiro!", emoji: "⚡" },
      { title: "Identifique os fios", text: "Fase (geralmente preto ou vermelho), Neutro (azul) e Terra (verde ou verde/amarelo).", emoji: "🔌" },
      { title: "Desencape os fios", text: "Use o alicate desencapador. Retire cerca de 1cm da capa de cada fio.", emoji: "🔧" },
      { title: "Conecte os fios", text: "Fase no borne L, Neutro no borne N e Terra no borne com símbolo de terra (⏚).", emoji: "🔗" },
      { title: "Parafuse a tomada", text: "Encaixe a tomada na caixa e aperte os parafusos. Não force!", emoji: "🪛" },
      { title: "Teste", text: "Religue o disjuntor e teste com o multímetro se há tensão correta.", emoji: "✅" },
    ],
    videoUrl: "https://www.youtube.com/results?search_query=como+ligar+tomada+eletrica+passo+a+passo",
    safety: "SEMPRE desligue o disjuntor antes de mexer na fiação. Use luvas isolantes e óculos de proteção.",
  },
  {
    id: "multimetro",
    icon: Gauge,
    title: "Uso básico do multímetro",
    color: "bg-accent",
    steps: [
      { title: "Conheça o aparelho", text: "O multímetro mede tensão (V), corrente (A) e resistência (Ω). É seu melhor amigo!", emoji: "🔬" },
      { title: "Conecte as pontas", text: "Ponta preta no COM (comum) e ponta vermelha no VΩ (para tensão e resistência).", emoji: "🔴" },
      { title: "Selecione a escala", text: "Para medir tensão na tomada, gire para V~ (tensão alternada) na escala de 200V ou mais.", emoji: "🎯" },
      { title: "Meça a tensão", text: "Coloque cada ponta em um furo da tomada. O display mostrará o valor (ex: 127V ou 220V).", emoji: "📊" },
      { title: "Para medir continuidade", text: "Gire para o símbolo de som (🔊). Se o circuito estiver fechado, vai apitar.", emoji: "🔊" },
      { title: "Guarde com cuidado", text: "Após usar, gire para OFF e guarde as pontas de prova separadas.", emoji: "📦" },
    ],
    videoUrl: "https://www.youtube.com/results?search_query=como+usar+multimetro+basico+eletricista",
    safety: "Nunca meça corrente diretamente na tomada. Sempre comece pela maior escala.",
  },
  {
    id: "diagrama",
    icon: FileText,
    title: "Leitura de diagramas",
    color: "bg-chart-4",
    steps: [
      { title: "O que é um diagrama?", text: "É o 'mapa' do circuito elétrico. Mostra como os componentes se conectam.", emoji: "🗺️" },
      { title: "Símbolos básicos", text: "Linha = fio | Círculo com X = lâmpada | Dois traços = capacitor | Zigue-zague = resistor", emoji: "📝" },
      { title: "Leia da esquerda para direita", text: "Geralmente, a energia entra pela esquerda e sai pela direita do diagrama.", emoji: "➡️" },
      { title: "Siga os fios", text: "Acompanhe cada linha do diagrama. Onde as linhas se cruzam com um ponto = conexão.", emoji: "🔍" },
      { title: "Identifique os componentes", text: "Cada símbolo representa um componente real. Pratique reconhecendo os mais comuns.", emoji: "🧩" },
      { title: "Compare com o real", text: "Pegue um diagrama simples e tente montar o circuito de verdade. A prática é essencial!", emoji: "⚡" },
    ],
    videoUrl: "https://www.youtube.com/results?search_query=como+ler+diagrama+eletrico+basico",
    safety: "Diagramas são seguros para estudar! Mas ao montar, sempre desligue a energia.",
  },
];

export default function GuiaPratico() {
  const [activeGuide, setActiveGuide] = useState(null);

  if (activeGuide) {
    const guide = guides.find((g) => g.id === activeGuide);
    return <PracticalGuideDetail guide={guide} onBack={() => setActiveGuide(null)} />;
  }

  return (
    <div>
      <PageHeader title="Guia Prático" subtitle="Aprenda fazendo, passo a passo" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-accent/10 rounded-2xl p-4 text-center mb-2">
          <p className="text-sm font-semibold">🔧 O conhecimento técnico é seu — construído na prática e no dia a dia do trabalho. Aqui você encontra orientações para fortalecer ainda mais esse saber. Escolha um tema:</p>
        </div>
        {guides.map((g) => (
          <ContentCard
            key={g.id}
            icon={g.icon}
            title={g.title}
            description={`${g.steps.length} passos simples`}
            color={g.color}
            onClick={() => setActiveGuide(g.id)}
          />
        ))}
      </div>
    </div>
  );
}