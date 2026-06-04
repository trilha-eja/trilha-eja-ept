import { Briefcase, Zap, BookOpen, Map, GraduationCap, Sparkles, BookMarked, Settings, Star } from "lucide-react";
import { Link } from "react-router-dom";
import ModuleCard from "../components/ModuleCard";

const modules = [
  {
    to: "/empregabilidade",
    icon: Briefcase,
    title: "Mundo do Trabalho",
    description: "Direitos, currículo e vagas de emprego",
    color: "bg-primary",
  },
  {
    to: "/guia-pratico",
    icon: Zap,
    title: "Guia Prático",
    description: "Aprenda na prática: tomadas, multímetro e mais",
    color: "bg-accent",
  },
  {
    to: "/microlearning",
    icon: BookOpen,
    title: "Microlearning",
    description: "Conteúdos rápidos de 1 minuto",
    color: "bg-chart-4",
  },
  {
    to: "/mapa-da-vida",
    icon: Map,
    title: "Mapa da Vida",
    description: "Planeje seu futuro passo a passo",
    color: "bg-chart-5",
  },
  {
    to: "/caminhos",
    icon: GraduationCap,
    title: "Caminhos de Estudo",
    description: "ENEM, SISU, PROUNI e mais",
    color: "bg-chart-2",
  },
  {
    to: "/glossario",
    icon: BookMarked,
    title: "Glossário do Eletricista",
    description: "Termos técnicos em linguagem simples",
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
    description: "Orientações pedagógicas para uso em sala",
    color: "bg-chart-4",
  },
  {
    to: "/opiniao",
    icon: Star,
    title: "Sua Opinião Importa",
    description: "Avalie o app e ajude a melhorá-lo",
    color: "bg-secondary",
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
            Práticas, Direitos e Futuros — seu guia para crescer como eletricista e como pessoa.
          </p>
        </div>
      </div>

      {/* Motivational quote */}
      <div className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4 mb-6">
        <p className="text-sm text-foreground font-semibold text-center leading-relaxed">
          💡 "Você já chegou até aqui. Cada passo conta. Continue!"
        </p>
      </div>

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
    </div>
  );
}