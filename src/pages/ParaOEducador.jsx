import { BookOpen, Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import EducatorCard from "../components/educator/EducatorCard";

const cards = [
  {
    title: "Quem é o estudante da EJA-EPT?",
    emoji: "👤",
    text: `O estudante da EJA-EPT é um trabalhador-estudante adulto que carrega saberes construídos na vida, no trabalho e nas lutas cotidianas. Como disse Miguel Arroyo, ele é um "passageiro da noite" — não por falta de esforço, mas porque as condições estruturais da sociedade o afastaram da escola.

Ao usar este aplicativo, lembre-se: você não está ensinando alguém que não sabe. Você está reconhecendo quem já sabe muito.`,
    reference: "ARROYO, M. G. Passageiros da noite. Petrópolis: Vozes, 2012.",
  },
  {
    title: "Mundo do Trabalho x Mercado de Trabalho",
    emoji: "⚖️",
    text: `Este aplicativo usa intencionalmente "Mundo do Trabalho", não "mercado de trabalho". A diferença é política: formar para o mercado adapta o estudante às necessidades do capital. Formar para o mundo do trabalho instrumentaliza o cidadão a compreender, questionar e transformar as relações de produção.

Use essa distinção em suas aulas.`,
    reference: "FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Médio Integrado. São Paulo: Cortez, 2005.",
  },
  {
    title: "Como usar o Mapa da Vida sem cair na meritocracia",
    emoji: "🗺️",
    text: `✓ FAÇA: Pergunte à turma quais barreiras estruturais (falta de transporte, cansaço, cuidado de filhos) dificultam seus projetos — e debata soluções coletivas.
✓ FAÇA: Conecte as metas individuais a direitos coletivos (moradia, educação, saúde).
✗ EVITE: Frases como "basta querer" ou "quem se esforça chega lá".
✗ EVITE: Tratar o projeto de vida como plano individual de ascensão.

O Mapa da Vida é um ato político de esperança coletiva, não um plano de carreira.`,
    reference: "FREIRE, P. Pedagogia da Esperança. Rio de Janeiro: Paz e Terra, 1992.",
  },
  {
    title: "Roteiro Sugerido de 4 Encontros",
    emoji: "📅",
    encounters: [
      {
        label: "Encontro 1",
        desc: "Mundo do Trabalho + Direitos",
        detail: "Módulos de direitos trabalhistas + NR-10",
      },
      {
        label: "Encontro 2",
        desc: "Empregabilidade Crítica",
        detail: "Gerador de currículo em grupo + Valorize sua Experiência",
      },
      {
        label: "Encontro 3",
        desc: "Mapa da Vida",
        detail: "Em roda de conversa, com relatos de egressos — Vozes da Trilha",
      },
      {
        label: "Encontro 4",
        desc: "Caminhos de Estudo",
        detail: "ENEM/SISU/PROUNI + sonhos coletivos",
      },
    ],
  },
];

function generatePDF() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert("PDF nao disponivel. Tente novamente."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const ML = 20; // margin left
  const MR = 20; // margin right
  const MT = 20; // margin top
  const pageW = 210;
  const contentW = pageW - ML - MR; // 170mm
  let y = MT;

  const FOOTER_TEXT = "Trilha EJA-EPT | Produto Educacional — ProfEPT | IFC";
  const GRAY = [120, 120, 120];
  const BLACK = [30, 30, 30];

  const addFooter = () => {
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...GRAY);
      doc.text(FOOTER_TEXT, pageW / 2, 287, { align: "center" });
    }
  };

  const checkPage = (needed = 20) => {
    if (y + needed > 278) {
      doc.addPage();
      y = MT;
    }
  };

  const writeLine = (text, size, style, color, align) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style || "normal");
    doc.setTextColor(...(color || BLACK));
    const x = align === "center" ? pageW / 2 : ML;
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * size * 0.45 + 2);
    doc.text(lines, x, y, align === "center" ? { align: "center" } : {});
    y += lines.length * size * 0.45 + 2;
  };

  const gap = (mm = 4) => { y += mm; };

  // ── CABECALHO ──────────────────────────────────────────────
  writeLine("Guia do Educador — Trilha EJA-EPT", 18, "bold", [30, 30, 30], "center");
  gap(2);
  writeLine("Orientacoes pedagogicas para uso em sala", 12, "normal", GRAY, "center");
  gap(3);
  doc.setDrawColor(180, 180, 180);
  doc.line(ML, y, pageW - MR, y);
  gap(6);

  // ── SECAO 1 ────────────────────────────────────────────────
  writeLine("1. Quem e o estudante da EJA-EPT?", 14, "bold", BLACK);
  gap(2);
  writeLine(
    "O estudante da EJA-EPT e um trabalhador-estudante adulto que carrega saberes construidos na vida, no trabalho e nas lutas cotidianas. Como disse Miguel Arroyo, ele e um passageiro da noite — nao por falta de esforco, mas porque as condicoes estruturais da sociedade o afastaram da escola. Ao usar este aplicativo, lembre-se: voce nao esta ensinando alguem que nao sabe. Voce esta reconhecendo quem ja sabe muito.",
    11, "normal", BLACK
  );
  gap(2);
  writeLine("Referencia: ARROYO, M. G. Passageiros da noite. Petropolis: Vozes, 2012.", 10, "italic", GRAY);
  gap(6);

  // ── SECAO 2 ────────────────────────────────────────────────
  writeLine("2. Mundo do Trabalho x Mercado de Trabalho", 14, "bold", BLACK);
  gap(2);
  writeLine(
    "Este aplicativo usa intencionalmente Mundo do Trabalho, nao mercado de trabalho. A diferenca e politica: formar para o mercado adapta o estudante as necessidades do capital. Formar para o mundo do trabalho instrumentaliza o cidadao a compreender, questionar e transformar as relacoes de producao. Use essa distincao em suas aulas.",
    11, "normal", BLACK
  );
  gap(2);
  writeLine("Referencia: FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Medio Integrado. Sao Paulo: Cortez, 2005.", 10, "italic", GRAY);

  // ── PAGINA 2 ───────────────────────────────────────────────
  doc.addPage();
  y = MT;

  // ── SECAO 3 ────────────────────────────────────────────────
  writeLine("3. Como usar o Mapa da Vida sem cair na meritocracia", 14, "bold", BLACK);
  gap(3);

  writeLine("FACA:", 11, "bold", [40, 120, 40]);
  gap(1);
  writeLine("- Pergunte a turma quais barreiras estruturais (falta de transporte, cansaco, cuidado de filhos) dificultam seus projetos e debata solucoes coletivas.", 11, "normal", BLACK);
  gap(1);
  writeLine("- Conecte as metas individuais a direitos coletivos (moradia, educacao, saude).", 11, "normal", BLACK);
  gap(3);

  writeLine("EVITE:", 11, "bold", [180, 40, 40]);
  gap(1);
  writeLine("- Frases como basta querer ou quem se esforca chega la.", 11, "normal", BLACK);
  gap(1);
  writeLine("- Tratar o projeto de vida como plano individual de ascensao.", 11, "normal", BLACK);
  gap(3);

  writeLine("O Mapa da Vida e um ato politico de esperanca coletiva, nao um plano de carreira.", 11, "italic", BLACK);
  gap(2);
  writeLine("Referencia: FREIRE, P. Pedagogia da Esperanca. Rio de Janeiro: Paz e Terra, 1992.", 10, "italic", GRAY);
  gap(7);

  // ── SECAO 4 ────────────────────────────────────────────────
  writeLine("4. Roteiro Sugerido de 4 Encontros", 14, "bold", BLACK);
  gap(3);

  const encontros = [
    { label: "Encontro 1 — Mundo do Trabalho + Direitos", detail: "Modulos de direitos trabalhistas + NR-10" },
    { label: "Encontro 2 — Empregabilidade Critica", detail: "Gerador de curriculo em grupo + Valorize sua Experiencia" },
    { label: "Encontro 3 — Mapa da Vida", detail: "Em roda de conversa, com relatos de egressos — Vozes da Trilha" },
    { label: "Encontro 4 — Caminhos de Estudo", detail: "ENEM/SISU/PROUNI + sonhos coletivos" },
  ];

  encontros.forEach((enc) => {
    checkPage(16);
    writeLine(enc.label, 11, "bold", BLACK);
    writeLine(enc.detail, 11, "normal", [80, 80, 80]);
    gap(3);
  });

  addFooter();
  doc.save("guia-do-educador-trilha-eja-ept.pdf");
}

export default function ParaOEducador() {
  return (
    <div>
      <PageHeader title="Área do Educador" subtitle="Orientações pedagógicas para uso do Trilha EJA-EPT em sala" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Intro banner */}
        <div className="bg-chart-4/10 border border-chart-4/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-chart-4" />
            <p className="font-bold text-sm">Para quem ensina e aprende junto</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Este espaço reúne orientações pedagógicas fundamentadas para apoiar educadores da EJA-EPT no uso crítico e transformador deste aplicativo.
          </p>
        </div>

        {/* Cards */}
        {cards.map((card, i) => (
          <EducatorCard key={i} card={card} />
        ))}

        {/* Download button */}
        <div className="pb-6 pt-2">
          <button
            onClick={generatePDF}
            className="w-full py-4 rounded-2xl bg-chart-4 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Download className="w-5 h-5" /> Baixar Guia do Educador em PDF
          </button>
        </div>
      </div>
    </div>
  );
}