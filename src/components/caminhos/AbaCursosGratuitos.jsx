import { School } from "lucide-react";
import ContentCard from "../ContentCard";
import StudyPathDetail from "../StudyPathDetail";
import { useState } from "react";

const cursosGratuitos = {
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
};

const novosCards = [
  {
    emoji: "🏛️",
    titulo: "Escola Virtual de Governo",
    texto: "Cursos gratuitos e certificados do governo federal. Áreas como informática, gestão, cidadania e mais.",
    url: "https://www.ev.gov.br",
  },
  {
    emoji: "📖",
    titulo: "Plataforma MEC",
    texto: "Portal oficial com cursos, materiais didáticos e recursos educacionais gratuitos.",
    url: "https://plataformaintegrada.mec.gov.br",
  },
  {
    emoji: "💼",
    titulo: "Sebrae — Cursos Gratuitos",
    texto: "Cursos gratuitos para quem quer empreender ou melhorar suas habilidades profissionais.",
    url: "https://sebrae.com.br/cursos",
  },
  {
    emoji: "🌐",
    titulo: "Coursera — Cursos Gratuitos",
    texto: "Cursos de universidades internacionais. Muitos têm opção gratuita para assistir as aulas.",
    url: "https://www.coursera.org",
  },
];

export default function AbaCursosGratuitos() {
  const [showDetail, setShowDetail] = useState(false);

  if (showDetail) {
    return <StudyPathDetail path={cursosGratuitos} onBack={() => setShowDetail(false)} />;
  }

  return (
    <div className="space-y-3">
      <ContentCard
        icon={cursosGratuitos.icon}
        title={cursosGratuitos.title}
        description={cursosGratuitos.description}
        color={cursosGratuitos.color}
        onClick={() => setShowDetail(true)}
      />

      <p className="text-xs text-muted-foreground font-semibold px-1 pt-1">Plataformas para acessar agora:</p>

      {novosCards.map((c) => (
        <div key={c.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">{c.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1">{c.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.texto}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              Acessar →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}