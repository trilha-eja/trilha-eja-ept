import PageHeader from "../components/PageHeader";
import AccordionSection from "../components/AccordionSection";
import { Download } from "lucide-react";

export default function BaixarMateriais() {

  const materiais = [
    {
      id: "mapa",
      emoji: "🗺️",
      titulo: "Mapa da Vida",
      descricao: "Construa seu mapa de trajetória e projeto de vida — para preencher à mão.",
      link: "https://trilha-eja.github.io/materiais/MapaDaVida.pdf",
    },
    {
      id: "eletricista",
      emoji: "⚡",
      titulo: "Eletricista e Experiência",
      descricao: "Conheça a profissão e veja como sua experiência de vida também tem valor.",
      link: "https://trilha-eja.github.io/materiais/EletricistaEExperiencia.pdf",
    },
    {
      id: "curriculo",
      emoji: "📝",
      titulo: "Guia para Criar Currículo",
      descricao: "Passo a passo para montar seu currículo valorizando sua trajetória.",
      link: "https://trilha-eja.github.io/materiais/GuiaCurriculo.pdf",
    },
    {
      id: "glossario",
      emoji: "📖",
      titulo: "Glossário do Eletricista",
      descricao: "25 termos técnicos organizados em 4 categorias — para consulta rápida e estudo.",
      link: "https://trilha-eja.github.io/materiais/GlossariodoEletricista.pdf",
    },
    {
      id: "microlearning",
      emoji: "📚",
      titulo: "Microlearning EJA-EPT",
      descricao: "Conteúdos rápidos e práticos sobre a área elétrica.",
      link: "https://trilha-eja.github.io/materiais/MicrolearningEjaEpt.pdf",
    },
    {
      id: "precarizado",
      emoji: "⚠️",
      titulo: "Trabalho Precarizado",
      descricao: "Entenda os riscos da precarização e conheça seus direitos.",
      link: "https://trilha-eja.github.io/materiais/TrabalhoPrecarizado.pdf",
    },
    {
      id: "direitos",
      emoji: "⚖️",
      titulo: "Cartilha de Direitos Trabalhistas",
      descricao: "Conheça seus direitos desde o primeiro dia de trabalho.",
      link: "https://trilha-eja.github.io/materiais/ConhecerMeusDireitos.pdf",
    },
    {
      id: "checklist",
      emoji: "🎓",
      titulo: "Checklist Caminhos de Estudo",
      descricao: "ENEM, SISU, PROUNI e FIES — organize sua continuidade nos estudos.",
      link: "https://trilha-eja.github.io/materiais/ChecklistCaminhosdeEstudo.pdf",
    },
    {
      id: "informatica",
      emoji: "💻",
      titulo: "Informática Básica para o Dia a Dia do Curso",
      descricao: "Primeiros passos para usar o computador, celular, e-mail, Moodle e QR Code — passo a passo e sem pressa.",
      link: "https://trilha-eja.github.io/materiais/InformaticaBasica.pdf",
    },
  ];

  return (
    <div>
      <PageHeader title="Baixar Materiais" subtitle="PDFs gratuitos para imprimir e estudar" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 pb-2">
          <span className="text-5xl block">📥</span>
          <h2 className="text-xl font-extrabold">Materiais para Baixar e Imprimir</h2>
          <p className="text-sm text-muted-foreground italic">
            "Porque aprender também funciona no papel."
          </p>
        </div>

        {/* Cards em acordeão */}
        <div className="space-y-3">
          {materiais.map((m) => (
            <AccordionSection key={m.id} titulo={`${m.emoji} ${m.titulo}`}>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.descricao}</p>
              <a
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                ⬇️ Baixar e Imprimir
              </a>
            </AccordionSection>
          ))}
        </div>

        {/* Nota */}
        <div className="bg-muted/60 border border-border rounded-2xl px-4 py-4 text-xs text-muted-foreground leading-relaxed text-center">
          📄 Todos os materiais são gratuitos e podem ser reproduzidos para fins educacionais não-comerciais, desde que mantida a referência ao <strong>Trilha EJA-EPT / IFC</strong>.
        </div>
      </div>
    </div>
  );
}