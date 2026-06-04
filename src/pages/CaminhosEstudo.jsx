import { useState } from "react";
import { BookOpen, Award, GraduationCap, School, Lightbulb, Smartphone, Video } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import SubEnem from "../components/caminhos/SubEnem";
import SubSisu from "../components/caminhos/SubSisu";
import SubProuni from "../components/caminhos/SubProuni";
import SubCursosGratuitos from "../components/caminhos/SubCursosGratuitos";
import SubDicasEstudo from "../components/caminhos/SubDicasEstudo";
import SubFerramentasDigitais from "../components/caminhos/SubFerramentasDigitais";
import SubVideos from "../components/caminhos/SubVideos";

const sections = [
  { id: "enem",        icon: BookOpen,       title: "ENEM",                   description: "Exame Nacional do Ensino Médio",       color: "bg-primary" },
  { id: "sisu",        icon: Award,          title: "SISU",                   description: "Sistema de Seleção Unificada",          color: "bg-accent" },
  { id: "prouni",      icon: GraduationCap,  title: "PROUNI",                 description: "Programa Universidade para Todos",      color: "bg-chart-4" },
  { id: "cursos",      icon: School,         title: "Cursos Gratuitos",        description: "Estude de graça onde estiver",          color: "bg-chart-2" },
  { id: "dicas",       icon: Lightbulb,      title: "Dicas de Estudo",         description: "Como estudar com pouco tempo",          color: "bg-secondary" },
  { id: "ferramentas", icon: Smartphone,     title: "Ferramentas Digitais",    description: "Seu celular como aliado nos estudos",   color: "bg-chart-1" },
  { id: "videos",      icon: Video,          title: "Vídeos Recomendados",     description: "Aprenda assistindo",                    color: "bg-chart-5" },
];

const subMap = {
  enem:        (back) => <SubEnem onBack={back} />,
  sisu:        (back) => <SubSisu onBack={back} />,
  prouni:      (back) => <SubProuni onBack={back} />,
  cursos:      (back) => <SubCursosGratuitos onBack={back} />,
  dicas:       (back) => <SubDicasEstudo onBack={back} />,
  ferramentas: (back) => <SubFerramentasDigitais onBack={back} />,
  videos:      (back) => <SubVideos onBack={back} />,
};

export default function CaminhosEstudo() {
  const [active, setActive] = useState(null);

  if (active) return subMap[active](() => setActive(null));

  return (
    <div>
      <PageHeader title="Caminhos de Estudo" subtitle="Continue crescendo!" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-1">
          <p className="text-sm leading-relaxed text-foreground">
            🎓 Aqui você encontra caminhos para <strong>continuar estudando</strong> — do ENEM a cursos gratuitos. Cada passo conta, e você já está dando o mais importante.
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