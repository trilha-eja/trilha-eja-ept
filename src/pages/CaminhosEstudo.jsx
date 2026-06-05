import { useState } from "react";
import { BookOpen, Award, GraduationCap, School, Lightbulb, Smartphone, Video } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import SubEnem from "../components/caminhos/SubEnem";
import SubSisu from "../components/caminhos/SubSisu";
import SubProuni from "../components/caminhos/SubProuni";
import SubFies from "../components/caminhos/SubFies";
import SubTrilhaContinuidade from "../components/caminhos/SubTrilhaContinuidade";
import SubCursosGratuitos from "../components/caminhos/SubCursosGratuitos";
import SubDicasEstudo from "../components/caminhos/SubDicasEstudo";
import SubFerramentasDigitais from "../components/caminhos/SubFerramentasDigitais";
import SubVideos from "../components/caminhos/SubVideos";

const sections = [
  { id: "enem",        icon: BookOpen,       title: "ENEM",                   description: "Exame Nacional do Ensino Médio",       color: "bg-primary" },
  { id: "sisu",        icon: Award,          title: "SISU",                   description: "Sistema de Seleção Unificada",          color: "bg-accent" },
  { id: "prouni",      icon: GraduationCap,  title: "PROUNI",                 description: "Programa Universidade para Todos",      color: "bg-chart-4" },
  { id: "fies",        icon: GraduationCap,  title: "FIES",                   description: "Financiamento Estudantil do Governo Federal",   color: "bg-destructive" },
  { id: "trilha",      icon: BookOpen,       title: "Trilha de Continuidade",  description: "Veja os caminhos possíveis após a EJA-EPT",     color: "bg-chart-3" },
  { id: "cursos",      icon: School,         title: "Cursos Gratuitos",        description: "Conheça caminhos de aprendizado ao seu alcance",          color: "bg-chart-2" },
  { id: "dicas",       icon: Lightbulb,      title: "Dicas de Estudo",         description: "Estudar trabalhando é um desafio real — estas dicas são para quem vive essa realidade",          color: "bg-secondary" },
  { id: "ferramentas", icon: Smartphone,     title: "Ferramentas Digitais",    description: "Tecnologia a serviço da sua formação — gratuita e acessível",   color: "bg-chart-1" },
  { id: "videos",      icon: Video,          title: "Vídeos Recomendados",     description: "Vídeos gratuitos sobre estudo, carreira e aprendizado",                    color: "bg-chart-5" },
];

const subMap = {
  enem:        (back) => <SubEnem onBack={back} />,
  sisu:        (back) => <SubSisu onBack={back} />,
  prouni:      (back) => <SubProuni onBack={back} />,
  fies:        (back) => <SubFies onBack={back} />,
  trilha:      (back, nav) => <SubTrilhaContinuidade onBack={back} onNavigate={nav} />,
  cursos:      (back) => <SubCursosGratuitos onBack={back} />,
  dicas:       (back) => <SubDicasEstudo onBack={back} />,
  ferramentas: (back) => <SubFerramentasDigitais onBack={back} />,
  videos:      (back) => <SubVideos onBack={back} />,
};

export default function CaminhosEstudo() {
  const [active, setActive] = useState(null);

  if (active) return subMap[active](() => setActive(null), setActive);

  return (
    <div>
      <PageHeader title="Caminhos de Estudo" subtitle="Conheça seus caminhos de continuidade" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-1">
          <p className="text-sm leading-relaxed text-foreground">
            🎓 A educação é um direito — não um privilégio. Aqui você encontra caminhos reais para continuar sua formação, no seu tempo e do seu jeito.
          </p>
        </div>
        {sections.map((s) => (
          <ContentCard
            key={s.id}
            icon={s.icon}
            title={s.title}
            description={s.description}
            color={s.color}
            onClick={() => setActive(s.id)}
          />
        ))}
      </div>
    </div>
  );
}