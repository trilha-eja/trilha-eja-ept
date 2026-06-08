import { useState } from "react";
import { FileText, Shield, ExternalLink, Star, Heart, Users, Clock, AlertTriangle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import ContentCard from "../components/ContentCard";
import ResumeBuilder from "../components/ResumeBuilder";
import RightsGuide from "../components/RightsGuide";
import SoftSkillsTips from "../components/SoftSkillsTips";
import JobSites from "../components/JobSites";
import InternshipSites from "../components/InternshipSites";
import TrabalhoPrecarizado from "../components/TrabalhoPrecarizado";

const sections = [
  { id: "resume", icon: FileText, title: "Criar meu Currículo", description: "Passo a passo simples", color: "bg-primary" },
  { id: "skills", icon: Star, title: "Valorize sua Experiência", description: "Suas habilidades de vida contam!", color: "bg-secondary" },
  { id: "precario", icon: AlertTriangle, title: "Trabalho Precarizado", description: "Autonomia ou armadilha? Conheça os riscos", color: "bg-destructive" },
  { id: "rights", icon: Shield, title: "Seus Direitos Trabalhistas", description: "Conheça seus direitos e faça valer", color: "bg-accent" },
  { id: "jobs", icon: ExternalLink, title: "Central de Oportunidades", description: "Plataformas, dicas e orientações para o mundo do trabalho", color: "bg-chart-4" },
  { id: "internship", icon: ExternalLink, title: "Sites de Estágio", description: "Onde encontrar e se cadastrar para estágios", color: "bg-chart-5" },
];

export default function Empregabilidade() {
  const [activeSection, setActiveSection] = useState(null);

  if (activeSection === "resume") return <ResumeBuilder onBack={() => setActiveSection(null)} />;
  if (activeSection === "skills") return <SoftSkillsTips onBack={() => setActiveSection(null)} />;
  if (activeSection === "precario") return <TrabalhoPrecarizado onBack={() => setActiveSection(null)} />;
  if (activeSection === "rights") return <RightsGuide onBack={() => setActiveSection(null)} />;
  if (activeSection === "jobs") return <JobSites onBack={() => setActiveSection(null)} />;
  if (activeSection === "internship") return <InternshipSites onBack={() => setActiveSection(null)} />;

  return (
    <div>
      <PageHeader title="Mundo do Trabalho" subtitle="Direitos, currículo e caminhos no mundo do trabalho" />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-1">
          <p className="text-sm leading-relaxed text-foreground">
            🌍 Aqui falamos de <strong>Mundo do Trabalho</strong> — não apenas de emprego. Você tem direitos, história e saberes que o mercado não pode apagar. Aqui você encontra ferramentas para se posicionar com dignidade: seus direitos, seu currículo e onde buscar oportunidades.
          </p>
        </div>
        <div className="bg-secondary/20 rounded-2xl p-4 mb-2">
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