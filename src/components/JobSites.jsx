import { ArrowLeft, ExternalLink } from "lucide-react";

const sites = [
  {
    name: "Indeed",
    url: "https://br.indeed.com",
    description: "Milhares de vagas em todo o Brasil. Muito fácil de usar.",
    emoji: "🔍",
  },
  {
    name: "InfoJobs",
    url: "https://www.infojobs.com.br",
    description: "Site brasileiro com muitas vagas na área técnica.",
    emoji: "💼",
  },
  {
    name: "Catho",
    url: "https://www.catho.com.br",
    description: "Um dos maiores sites de emprego do Brasil.",
    emoji: "📋",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    description: "Rede profissional. Crie seu perfil e conecte-se com empresas.",
    emoji: "🤝",
  },
  {
    name: "Vagas.com",
    url: "https://www.vagas.com.br",
    description: "Site gratuito com vagas em diversas áreas.",
    emoji: "🎯",
  },
  {
    name: "SINE (Gov)",
    url: "https://www.gov.br/trabalho-e-emprego",
    description: "Portal do governo com vagas pelo país todo. Totalmente gratuito.",
    emoji: "🏛️",
  },
];

export default function JobSites({ onBack }) {
  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Sites de Emprego</h1>
            <p className="text-sm text-muted-foreground">Plataformas para buscar oportunidades</p>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="bg-chart-4/10 border border-chart-4/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Plataformas onde trabalhadores(as)-estudantes buscam oportunidades no <strong>mundo do trabalho</strong>. Clique para abrir o site diretamente 👇</p>
        </div>
        {sites.map((site, i) => (
          <a
            key={i}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span className="text-2xl">{site.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm">{site.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}