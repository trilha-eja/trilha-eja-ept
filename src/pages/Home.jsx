import { Briefcase, Zap, BookOpen, Map, GraduationCap, Sparkles, BookMarked, Settings, Star, Download } from "lucide-react";
import { Link } from "react-router-dom";
import ModuleCard from "../components/ModuleCard";
import GlobalSearch from "../components/GlobalSearch";
import AccordionSection from "../components/AccordionSection";

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
          <p className="text-xs opacity-70 mt-1">Produto Educacional do ProfEPT/IFC</p>
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

      {/* Instalar o App */}
      <div className="mt-4 bg-primary/5 border border-primary/30 rounded-2xl overflow-hidden">
        <AccordionSection titulo="📲 Instale o app no seu celular">
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Deixe o Trilha EJA-EPT com um ícone na tela do seu celular, igual a qualquer outro aplicativo.
          </p>
          <div className="space-y-2">
            <AccordionSection titulo="▶ Celular Android (Chrome)">
              <p className="text-xs text-muted-foreground leading-relaxed">
                1. Abra o Chrome e acesse o aplicativo.<br />
                2. Toque nos 3 pontinhos no canto superior direito da tela (na barra do navegador, não dentro do app).<br />
                3. Toque em 'Adicionar à tela inicial' ou 'Instalar app'.<br />
                4. Confirme tocando em 'Adicionar' ou 'Instalar'.<br />
                5. Um ícone do Trilha EJA-EPT vai aparecer na tela inicial do celular.
              </p>
            </AccordionSection>
            <AccordionSection titulo="▶ iPhone (Safari)">
              <p className="text-xs text-muted-foreground leading-relaxed">
                1. Abra o Safari e acesse o aplicativo.<br />
                2. Toque no ícone de compartilhar (quadrado com seta para cima), na parte de baixo da tela.<br />
                3. Toque em 'Adicionar à Tela de Início'.<br />
                4. Confirme tocando em 'Adicionar'.
              </p>
            </AccordionSection>
          </div>
        </AccordionSection>
      </div>

      {/* Informações e Suporte */}
      <AccordionSection titulo="ℹ️ Informações e Suporte">
        <div className="space-y-2">
          <AccordionSection titulo="📍 Mapa de Navegação do App">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Veja todos os módulos e funcionalidades do Trilha EJA-EPT organizados em um só lugar.
            </p>
            <a
              href="https://trilha-eja.github.io/materiais/MapaNavegacao.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              📄 Ver Mapa Completo
            </a>
          </AccordionSection>
          <AccordionSection titulo="🔧 Encontrou algum problema?">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Se encontrar um link que não abre, um conteúdo desatualizado ou qualquer erro no aplicativo, nos avise — sua mensagem ajuda a melhorar o Trilha EJA-EPT.
            </p>
            <a
              href="mailto:marileia.hillesheim@ifc.edu.br?subject=Trilha%20EJA-EPT%20-%20Problema%20encontrado"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              📧 Enviar e-mail
            </a>
          </AccordionSection>
          <AccordionSection titulo="📘 Sobre o Produto Educacional / Autoria">
            <div className="flex justify-center mb-3">
              <img
                src="https://trilha-eja.github.io/materiais/LogoProfEPTIFC.jpeg"
                alt="Logo ProfEPT IFC"
                className="max-w-[180px] w-full rounded-xl"
              />
            </div>
            <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
              <p><span className="font-semibold">Autoria:</span> Marileia Hillesheim Netto, Mestranda</p>
              <p><span className="font-semibold">Orientação:</span> Prof. Dr. Jorge da Cunha Dutra</p>
              <p className="leading-relaxed">
                <span className="font-semibold">Vínculo institucional:</span> Mestrado Profissional em Educação Profissional e Tecnológica (ProfEPT), Instituto Federal Catarinense (IFC) — Campus Blumenau
              </p>
            </div>
          </AccordionSection>
        </div>
      </AccordionSection>
    </div>
  );
}