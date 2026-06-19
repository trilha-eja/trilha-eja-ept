import { Briefcase, Zap, BookOpen, Map, GraduationCap, Sparkles, BookMarked, Settings, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";
import ModuleCard from "../components/ModuleCard";
import GlobalSearch from "../components/GlobalSearch";

const modules = [
  {
    to: "/empregabilidade",
    icon: Briefcase,
    title: "Mundo do Trabalho",
    description: "Direitos, currículo e caminhos no mundo do trabalho",
    color: "bg-primary",
  },
  {
    to: "/guia-pratico",
    icon: Zap,
    title: "Guia Prático",
    description: "Aprenda fazendo, passo a passo",
    color: "bg-accent",
  },
  {
    to: "/microlearning",
    icon: BookOpen,
    title: "Microlearning",
    description: "Conteúdos rápidos para quem nunca para de aprender",
    color: "bg-chart-4",
  },
  {
    to: "/mapa-da-vida",
    icon: Map,
    title: "Mapa da Vida",
    description: "Construa seu projeto de vida com consciência e esperança",
    color: "bg-chart-5",
  },
  {
    to: "/caminhos",
    icon: GraduationCap,
    title: "Caminhos de Estudo",
    description: "Conheça seus caminhos de continuidade",
    color: "bg-chart-2",
  },
  {
    to: "/glossario",
    icon: BookMarked,
    title: "Glossário do Eletricista",
    description: "Domine os termos técnicos do seu ofício",
    color: "bg-chart-3",
  },
  {
    to: "/vozes",
    icon: Sparkles,
    title: "Vozes da Trilha",
    description: "Histórias reais de quem trilhou esse caminho",
    color: "bg-chart-5",
  },
  {
    to: "/educador",
    icon: BookOpen,
    title: "Para o Educador",
    description: "Orientações pedagógicas para o uso do Trilha EJA-EPT em sala",
    color: "bg-chart-4",
  },
  {
    to: "/opiniao",
    icon: Star,
    title: "Sua Opinião Importa",
    description: "Sua voz transforma este aplicativo",
    color: "bg-secondary",
  },
  {
    to: "/materiais",
    icon: Download,
    title: "Baixar Materiais",
    description: "PDFs gratuitos para imprimir e estudar",
    color: "bg-chart-4",
  },
];

export default function Home() {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-20">
          <Sparkles className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <p className="text-sm font-semibold opacity-90 mb-1">👋 Bem-vindo(a)!</p>
          <h1 className="text-2xl font-extrabold leading-tight mb-2">
            Trilha EJA-EPT
          </h1>
          <p className="text-sm opacity-90 leading-relaxed">
            Um guia para fortalecer seu projeto de vida — no seu tempo, do seu jeito.
          </p>
        </div>
      </div>

      {/* Motivational quote */}
      <div className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4 mb-6 text-center">
        <p className="text-base font-extrabold text-foreground leading-snug">
          💡 "O mundo não é. O mundo está sendo."
        </p>
        <p className="text-xs italic text-muted-foreground mt-1">(Freire, 2002)</p>
      </div>

      {/* Global Search */}
      <GlobalSearch />

      {/* Module cards */}
      <h2 className="font-extrabold text-lg mb-3">Escolha um módulo</h2>
      <div className="space-y-3">
        {modules.map((mod) => (
          <ModuleCard key={mod.to} {...mod} />
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-8 text-center text-xs text-muted-foreground pb-4 flex flex-col items-center gap-3">
        <p>Curso Eletricista Industrial — EJA-EPT</p>
        <p>Feito com ❤️ para trabalhadores-estudantes</p>
        <Link
          to="/settings"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Settings className="w-3.5 h-3.5" /> Configurações
        </Link>
      </div>

      {/* Fale Conosco */}
      <div className="mt-4 bg-muted/40 border border-border/50 rounded-2xl p-3 text-center">
        <p className="text-xs font-semibold mb-1">🔧 Encontrou algum problema?</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Se encontrar um link que não abre, um conteúdo desatualizado ou qualquer erro no aplicativo, nos avise — sua mensagem ajuda a melhorar o Trilha EJA-EPT.
        </p>
        <p className="text-xs text-muted-foreground mt-1.5">
          📧 marileia.hillesheim@ifc.edu.br
        </p>
      </div>

      {/* Mapa de Navegação */}
      <a
        href="https://trilha-eja.github.io/materiais/MapaNavegacao.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block bg-muted/40 border border-border/50 rounded-2xl p-3 text-center hover:bg-muted/60 transition-colors"
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          📍 Não sabe por onde começar? Veja o mapa completo do aplicativo
        </p>
      </a>
    </div>
  );
}