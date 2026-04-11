import { useState } from "react";
import { FileText, Shield, ExternalLink, Star, Heart, Users, Clock } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import ResumeBuilder from "../components/ResumeBuilder";
import RightsGuide from "../components/RightsGuide";
import SoftSkillsTips from "../components/SoftSkillsTips";
import JobSites from "../components/JobSites";

const sections = [
  { id: "resume", icon: FileText, title: "Criar meu Currículo", description: "Passo a passo simples", color: "bg-primary" },
  { id: "skills", icon: Star, title: "Valorize sua Experiência", description: "Suas habilidades de vida contam!", color: "bg-secondary" },
  { id: "rights", icon: Shield, title: "Seus Direitos Trabalhistas", description: "O básico que você precisa saber", color: "bg-accent" },
  { id: "jobs", icon: ExternalLink, title: "Sites de Emprego", description: "Onde procurar vagas agora", color: "bg-chart-4" },
];

export default function Empregabilidade() {
  const [activeSection, setActiveSection] = useState(null);

  if (activeSection === "resume") return <ResumeBuilder onBack={() => setActiveSection(null)} />;
  if (activeSection === "skills") return <SoftSkillsTips onBack={() => setActiveSection(null)} />;
  if (activeSection === "rights") return <RightsGuide onBack={() => setActiveSection(null)} />;
  if (activeSection === "jobs") return <JobSites onBack={() => setActiveSection(null)} />;

  return (
    <div>
      <PageHeader title="Empregabilidade" subtitle="Prepare-se para o mercado" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-primary/10 rounded-2xl p-4 mb-2">
          <p className="text-sm font-semibold text-center">
            🎯 Sua experiência de vida é seu maior trunfo!
          </p>
        </div>
        {sections.map((s) => (
          <ContentCard
            key={s.id}
            icon={s.icon}
            title={s.title}
            description={s.description}
            color={s.color}
            onClick={() => setActiveSection(s.id)}
          />
        ))}
      </div>
    </div>
  );
}