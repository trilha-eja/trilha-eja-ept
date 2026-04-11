import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import StudyPathDetail from "../components/StudyPathDetail";
import { BookOpen, Award, GraduationCap, School } from "lucide-react";

const paths = [
  {
    id: "enem",
    icon: BookOpen,
    title: "ENEM",
    subtitle: "Exame Nacional do Ensino Médio",
    color: "bg-primary",
    description: "A porta de entrada para o ensino superior gratuito no Brasil.",
    steps: [
      { emoji: "📅", title: "Quando se inscrever?", text: "Geralmente entre maio e junho. Fique atento ao site oficial: enem.inep.gov.br" },
      { emoji: "💰", title: "Quanto custa?", text: "A taxa é em torno de R$ 85, mas alunos de escola pública e pessoas de baixa renda podem pedir isenção." },
      { emoji: "📝", title: "Como se inscrever?", text: "Acesse o site do INEP, crie sua conta e preencha os dados. É tudo online!" },
      { emoji: "📚", title: "O que estudar?", text: "4 áreas: Linguagens, Humanas, Natureza e Matemática + Redação. Foque nos básicos primeiro." },
      { emoji: "💡", title: "Dica de ouro", text: "Faça provas anteriores! O site do INEP tem todas. Comece pelas redações — valem muito!" },
      { emoji: "📱", title: "Apps gratuitos", text: "Descomplica, Khan Academy e Stoodi têm conteúdo gratuito para o ENEM." },
    ],
  },
  {
    id: "sisu",
    icon: Award,
    title: "SISU",
    subtitle: "Sistema de Seleção Unificada",
    color: "bg-accent",
    description: "Use sua nota do ENEM para entrar em universidades públicas gratuitas.",
    steps: [
      { emoji: "🎓", title: "O que é?", text: "O SISU usa a nota do ENEM para distribuir vagas em universidades federais e estaduais. É tudo gratuito!" },
      { emoji: "📅", title: "Quando?", text: "Logo após a divulgação das notas do ENEM, geralmente em janeiro/fevereiro." },
      { emoji: "🔍", title: "Como funciona?", text: "Você escolhe até 2 cursos. O sistema calcula se sua nota é suficiente. Funciona como um leilão." },
      { emoji: "📊", title: "Notas de corte", text: "Cada curso tem uma nota mínima. Cursos mais concorridos pedem notas maiores." },
      { emoji: "🏷️", title: "Cotas", text: "Há vagas reservadas para alunos de escola pública, negros, pardos, indígenas e baixa renda." },
      { emoji: "✅", title: "Se passou!", text: "Faça a matrícula na universidade com seus documentos. Não perca o prazo!" },
    ],
  },
  {
    id: "prouni",
    icon: GraduationCap,
    title: "PROUNI",
    subtitle: "Programa Universidade para Todos",
    color: "bg-chart-4",
    description: "Bolsas de estudo de 50% ou 100% em faculdades particulares.",
    steps: [
      { emoji: "🎁", title: "O que é?", text: "O PROUNI oferece bolsas em faculdades particulares. Pode ser bolsa integral (100%) ou parcial (50%)." },
      { emoji: "📋", title: "Quem pode?", text: "Precisa ter feito o ENEM mais recente com pelo menos 450 pontos e não ter zerado a redação." },
      { emoji: "💰", title: "Renda familiar", text: "Bolsa integral: renda de até 1,5 salário mínimo por pessoa. Parcial: até 3 salários." },
      { emoji: "🏫", title: "Cursos disponíveis", text: "Tem de tudo: engenharia, administração, direito, tecnologia... Confira no site!" },
      { emoji: "📝", title: "Como se inscrever?", text: "Acesse prouniportal.mec.gov.br no período de inscrições. Escolha até 2 opções." },
      { emoji: "📄", title: "Documentos", text: "RG, CPF, comprovante de renda, comprovante de endereço e histórico escolar." },
    ],
  },
  {
    id: "gratuitos",
    icon: School,
    title: "Cursos Gratuitos",
    subtitle: "Outras formas de continuar estudando",
    color: "bg-chart-2",
    description: "Cursos técnicos e superiores gratuitos além do ENEM.",
    steps: [
      { emoji: "🏛️", title: "IFs e CEFETs", text: "Os Institutos Federais oferecem cursos técnicos e superiores 100% gratuitos em todo o Brasil." },
      { emoji: "💻", title: "EaD Gratuito", text: "A UAB (Universidade Aberta do Brasil) oferece graduação a distância gratuita em universidades públicas." },
      { emoji: "📱", title: "Coursera e edX", text: "Plataformas internacionais com cursos gratuitos de universidades famosas. Muitos em português!" },
      { emoji: "🔧", title: "SENAI e SENAC", text: "Oferecem cursos técnicos gratuitos pelo programa Pronatec. Procure uma unidade perto de você." },
      { emoji: "🌐", title: "Fundação Bradesco", text: "Cursos online gratuitos de TI, administração e mais em ev.org.br" },
      { emoji: "📖", title: "ENCCEJA", text: "Se ainda não concluiu o ensino médio, o ENCCEJA é uma prova gratuita para conseguir o certificado." },
    ],
  },
];

export default function CaminhosEstudo() {
  const [activePath, setActivePath] = useState(null);

  if (activePath) {
    const path = paths.find((p) => p.id === activePath);
    return <StudyPathDetail path={path} onBack={() => setActivePath(null)} />;
  }

  return (
    <div>
      <PageHeader title="Caminhos de Estudo" subtitle="Continue crescendo!" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-chart-2/10 rounded-2xl p-4 text-center mb-2">
          <p className="text-sm font-semibold">🎓 Educação é o caminho mais seguro para um futuro melhor</p>
        </div>
        {paths.map((p) => (
          <ContentCard
            key={p.id}
            icon={p.icon}
            title={p.title}
            description={p.description}
            color={p.color}
            onClick={() => setActivePath(p.id)}
          />
        ))}
      </div>
    </div>
  );
}