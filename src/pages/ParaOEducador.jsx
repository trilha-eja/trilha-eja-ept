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
  if (!jsPDF) { alert("PDF não disponível. Tente novamente."); return; }
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 190;
  let y = 15;

  const addText = (text, size, bold, color, maxWidth) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    if (color) doc.setTextColor(...color);
    else doc.setTextColor(30, 20, 10);
    const lines = doc.splitTextToSize(text, maxWidth || W);
    doc.text(lines, 10, y);
    y += lines.length * (size * 0.4) + 2;
  };

  const checkPage = (needed = 20) => {
    if (y + needed > 280) { doc.addPage(); y = 15; }
  };

  // Title
  addText("Guia do Educador — Trilha EJA-EPT", 18, true, [200, 100, 20]);
  addText("Orientações pedagógicas para uso em sala", 11, false, [100, 80, 60]);
  y += 4;

  cards.forEach((card) => {
    checkPage(30);
    doc.setDrawColor(220, 200, 180);
    doc.setFillColor(255, 250, 245);
    const startY = y;
    y += 6;

    addText(`${card.emoji}  ${card.title}`, 13, true, [30, 20, 10]);
    y += 1;

    if (card.text) {
      addText(card.text, 10, false, [60, 50, 40]);
    }

    if (card.encounters) {
      card.encounters.forEach((enc, i) => {
        checkPage(14);
        addText(`${enc.label}: ${enc.desc}`, 10, true, [30, 20, 10]);
        addText(enc.detail, 9, false, [80, 70, 60], W - 5);
        y += 1;
      });
    }

    if (card.reference) {
      y += 1;
      addText(`📋 Referência: ${card.reference}`, 8, false, [120, 100, 80]);
    }

    doc.roundedRect(8, startY - 2, W + 4, y - startY + 4, 3, 3, "S");
    y += 6;
  });

  y += 4;
  addText("Curso Eletricista Industrial — EJA-EPT | Feito com ❤ para educadores comprometidos", 8, false, [150, 130, 100]);

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