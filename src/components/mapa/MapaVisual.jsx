import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Edit } from "lucide-react";

const W = 1200;
const H = 900;
const TRILHA_Y = 500;
const TRILHA_H = 40;
const TRAIL_START_X = 80;
const TRAIL_END_X = 1120;

const EIXOS_ACIMA = [
  { key: "trabalho", emoji: "🔧", label: "Trabalho", cor: "#E86826", fields: ["trabalho_1ano", "trabalho_5anos", "trabalho_10anos"] },
  { key: "estudos",  emoji: "📚", label: "Estudos",  cor: "#4A90D9", fields: ["estudos_1ano",  "estudos_5anos",  "estudos_10anos"]  },
  { key: "familia",  emoji: "👨‍👩‍👧", label: "Família",  cor: "#5BAD6F", fields: ["familia_1ano",  "familia_5anos",  "familia_10anos"]  },
];
const EIXOS_ABAIXO = [
  { key: "eu",        emoji: "🌟", label: "Eu Mesmo",       cor: "#9B59B6", fields: ["eu_1ano",        "eu_5anos",        "eu_10anos"]        },
  { key: "material",  emoji: "🏠", label: "Vida Material",  cor: "#F0A500", fields: ["material_1ano",  "material_5anos",  "material_10anos"]  },
  { key: "comunidade",emoji: "🤝", label: "Comunidade",     cor: "#E74C6C", fields: ["comunidade_1ano","comunidade_5anos","comunidade_10anos"] },
];

const MARCOS = [
  { label: "1 ano",   x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.30), idx: 0 },
  { label: "5 anos",  x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.60), idx: 1 },
  { label: "10 anos", x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.85), idx: 2 },
];

// Approx chars per line for a 140px wide box at given fontSize (Arial ~6px per char at 9px)
const CHARS_PER_LINE_9 = 22;
const CHARS_PER_LINE_8 = 25;
const MAX_LABEL_W = 140;
const LINE_H_9 = 12.6; // 9 * 1.4
const LINE_H_8 = 11.2; // 8 * 1.4
const PAD_X = 4;
const PAD_Y = 3;

function wrapToLines(text, charsPerLine) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? cur + " " + w : w;
    if (candidate.length > charsPerLine) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = candidate;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// Returns { lines, fontSize, lineH }
function computeLabel(text) {
  if (!text) return { lines: [], fontSize: 9, lineH: LINE_H_9 };
  let lines = wrapToLines(text, CHARS_PER_LINE_9);
  if (lines.length <= 6) return { lines, fontSize: 9, lineH: LINE_H_9 };
  // reduce font size
  lines = wrapToLines(text, CHARS_PER_LINE_8);
  return { lines, fontSize: 8, lineH: LINE_H_8 };
}

// SVG label with white background — above the circle
function LabelAbove({ cx, cy, text }) {
  const { lines, fontSize, lineH } = computeLabel(text);
  if (!lines.length) {
    const bw = 60 + PAD_X * 2;
    const bh = lineH + PAD_Y * 2;
    const bx = cx - bw / 2;
    const by = cy - 20 - bh;
    return (
      <g>
        <rect x={bx} y={by} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
        <text x={cx} y={by + PAD_Y + lineH * 0.8} textAnchor="middle" fontSize={9} fill="#aaa" fontStyle="italic">A definir...</text>
      </g>
    );
  }
  const bw = MAX_LABEL_W + PAD_X * 2;
  const bh = lines.length * lineH + PAD_Y * 2;
  const bx = cx - bw / 2;
  const by = cy - 20 - bh; // 20px gap above circle edge
  return (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={by + PAD_Y + (i + 0.8) * lineH}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#333333"
        >{line}</text>
      ))}
    </g>
  );
}

// SVG label with white background — below the circle
function LabelBelow({ cx, cy, text }) {
  const { lines, fontSize, lineH } = computeLabel(text);
  if (!lines.length) {
    const bw = 60 + PAD_X * 2;
    const bh = lineH + PAD_Y * 2;
    const bx = cx - bw / 2;
    const by = cy + 20;
    return (
      <g>
        <rect x={bx} y={by} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
        <text x={cx} y={by + PAD_Y + lineH * 0.8} textAnchor="middle" fontSize={9} fill="#aaa" fontStyle="italic">A definir...</text>
      </g>
    );
  }
  const bw = MAX_LABEL_W + PAD_X * 2;
  const bh = lines.length * lineH + PAD_Y * 2;
  const bx = cx - bw / 2;
  const by = cy + 20; // 20px gap below circle edge
  return (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={by + PAD_Y + (i + 0.8) * lineH}
          textAnchor="middle"
          fontSize={fontSize}
          fill="#333333"
        >{line}</text>
      ))}
    </g>
  );
}

// wrapText kept for other uses (ponto de partida)
function wrapText(text, maxChars) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
    if (lines.length >= 2) break;
  }
  if (cur && lines.length < 2) lines.push(cur.trim());
  return lines;
}

function truncate(text, maxWords) {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

// Gap between branches — larger to avoid label overlap with long texts
const BRANCH_GAP = 100;

function BranchAbove({ marcoX, eixoIdx, cor, data, fields, emoji }) {
  const baseY = TRILHA_Y - TRILHA_H / 2;
  const targetY = baseY - (eixoIdx + 1) * BRANCH_GAP;
  const targetX = marcoX;
  const fieldIdx = MARCOS.findIndex(m => m.x === marcoX);
  const text = data[fields[fieldIdx]] || "";

  return (
    <g>
      <LabelAbove cx={targetX} cy={targetY} text={text} />
      <circle cx={targetX} cy={targetY} r={16} fill={cor} />
      <text x={targetX} y={targetY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">{emoji}</text>
    </g>
  );
}

function BranchBelow({ marcoX, eixoIdx, cor, data, fields, emoji }) {
  const baseY = TRILHA_Y + TRILHA_H / 2;
  const targetY = baseY + (eixoIdx + 1) * BRANCH_GAP;
  const targetX = marcoX;
  const fieldIdx = MARCOS.findIndex(m => m.x === marcoX);
  const text = data[fields[fieldIdx]] || "";

  return (
    <g>
      <LabelBelow cx={targetX} cy={targetY} text={text} />
      <circle cx={targetX} cy={targetY} r={16} fill={cor} />
      <text x={targetX} y={targetY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">{emoji}</text>
    </g>
  );
}

export default function MapaVisual({ data, nome, onEdit }) {
  const svgRef = useRef(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const ano = new Date().getFullYear();
  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const forca = data.partida_forca ? truncate(data.partida_forca, 12) : "";

  async function handlePDF() {
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;
    if (!jsPDF || !html2canvas) { alert("PDF não disponível."); return; }

    setLoadingPdf(true);
    const el = svgRef.current;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFF8F0",
      width: W,
      windowWidth: W,
    });
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
    const pageW = 297;
    const pageH = 210;
    const imgW = pageW;
    const imgH = (canvas.height * pageW) / canvas.width;
    const y = Math.max(0, (pageH - imgH) / 2);
    doc.addImage(imgData, "PNG", 0, y, imgW, imgH);
    doc.save(`mapa-da-vida-${ano}.pdf`);
    setLoadingPdf(false);
  }

  function handlePrint() {
    const svgEl = svgRef.current?.querySelector("svg") || svgRef.current;
    const svgStr = svgEl ? new XMLSerializer().serializeToString(svgEl) : "";
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>Mapa da Vida</title>
      <style>body{margin:0;background:#FFF8F0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
      svg{max-width:100%;height:auto;}@media print{body{display:block;}}</style></head>
      <body>${svgStr}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 500);
  }

  const nomeDisplay = nome || "";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onEdit} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-base">Meu Mapa da Vida</h1>
        </div>
      </div>

      {/* SVG Map */}
      <div className="overflow-x-auto px-2 py-4">
        <div ref={svgRef} style={{ background: "#FFF8F0", width: W, minWidth: W, borderRadius: 16 }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "Arial, sans-serif", display: "block" }}>
            {/* Background */}
            <rect width={W} height={H} fill="#FFF8F0" />

            {/* Área 1 — Título (topo centralizado, altura reservada 90px) */}
            <text x={W / 2} y={38} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#E86826">
              {nomeDisplay ? `Mapa da Vida de ${nomeDisplay}` : "Mapa da Vida"}
            </text>
            <text x={W / 2} y={64} textAnchor="middle" fontSize="14" fill="#888888">
              Gerado em {mes}
            </text>

            {/* Área 2 — Legenda (abaixo do título, margem top 90px) */}
            {[...EIXOS_ACIMA, ...EIXOS_ABAIXO].map((e, i) => (
              <g key={e.key}>
                <circle cx={24} cy={96 + i * 22} r={7} fill={e.cor} />
                <text x={36} y={96 + i * 22 + 1} dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#444">{e.emoji} {e.label}</text>
              </g>
            ))}

            {/* Trail road */}
            <rect
              x={TRAIL_START_X}
              y={TRILHA_Y - TRILHA_H / 2}
              width={TRAIL_END_X - TRAIL_START_X}
              height={TRILHA_H}
              rx={20}
              fill="#C4956A"
            />
            {/* Dashed center line */}
            <line
              x1={TRAIL_START_X + 20}
              y1={TRILHA_Y}
              x2={TRAIL_END_X - 20}
              y2={TRILHA_Y}
              stroke="#FFF8F0"
              strokeWidth="2"
              strokeDasharray="12,8"
            />

            {/* Ponto de Partida */}
            <circle cx={TRAIL_START_X} cy={TRILHA_Y} r={32} fill="#E86826" />
            <text x={TRAIL_START_X} y={TRILHA_Y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="20">🌱</text>
            <text x={TRAIL_START_X} y={TRILHA_Y + 44} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#E86826">Hoje</text>
            {forca && (
              <>
                {wrapText(forca, 14).map((line, i) => (
                  <text key={i} x={TRAIL_START_X} y={TRILHA_Y + 60 + i * 13} textAnchor="middle" fontSize="9" fill="#888" fontStyle="italic">{line}</text>
                ))}
              </>
            )}

            {/* Estrela no final */}
            <text x={TRAIL_END_X} y={TRILHA_Y + 8} textAnchor="middle" dominantBaseline="middle" fontSize="32">⭐</text>
            <text x={TRAIL_END_X} y={TRILHA_Y + 46} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#E86826">Seu futuro</text>

            {/* Marcos na trilha */}
            {MARCOS.map((marco) => (
              <g key={marco.label}>
                <circle cx={marco.x} cy={TRILHA_Y} r={20} fill="white" stroke="#E86826" strokeWidth="2.5" />
                <text x={marco.x} y={TRILHA_Y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#E86826">{marco.label}</text>
              </g>
            ))}

            {/* Ramificações — linhas primeiro (camada de baixo) */}
            {MARCOS.map((marco) => [
              ...EIXOS_ACIMA.map((eixo, ei) => {
                const baseY = TRILHA_Y - TRILHA_H / 2;
                const ty = baseY - (ei + 1) * BRANCH_GAP;
                const fi = MARCOS.findIndex(m => m.x === marco.x);
                const txt = data[eixo.fields[fi]] || "";
                const d = `M ${marco.x} ${baseY} C ${marco.x} ${baseY - 30}, ${marco.x} ${ty + 30}, ${marco.x} ${ty}`;
                return <path key={`line-above-${marco.label}-${eixo.key}`} d={d} stroke={eixo.cor} strokeWidth="2" fill="none" strokeDasharray={txt ? "none" : "4,3"} />;
              }),
              ...EIXOS_ABAIXO.map((eixo, ei) => {
                const baseY = TRILHA_Y + TRILHA_H / 2;
                const ty = baseY + (ei + 1) * BRANCH_GAP;
                const fi = MARCOS.findIndex(m => m.x === marco.x);
                const txt = data[eixo.fields[fi]] || "";
                const d = `M ${marco.x} ${baseY} C ${marco.x} ${baseY + 30}, ${marco.x} ${ty - 30}, ${marco.x} ${ty}`;
                return <path key={`line-below-${marco.label}-${eixo.key}`} d={d} stroke={eixo.cor} strokeWidth="2" fill="none" strokeDasharray={txt ? "none" : "4,3"} />;
              }),
            ])}

            {/* Ramificações — labels e círculos em cima */}
            {MARCOS.map((marco) =>
              EIXOS_ACIMA.map((eixo, ei) => (
                <BranchAbove
                  key={`${marco.label}-${eixo.key}`}
                  marcoX={marco.x}
                  eixoIdx={ei}
                  cor={eixo.cor}
                  data={data}
                  fields={eixo.fields}
                  emoji={eixo.emoji}
                />
              ))
            )}
            {MARCOS.map((marco) =>
              EIXOS_ABAIXO.map((eixo, ei) => (
                <BranchBelow
                  key={`${marco.label}-${eixo.key}`}
                  marcoX={marco.x}
                  eixoIdx={ei}
                  cor={eixo.cor}
                  data={data}
                  fields={eixo.fields}
                  emoji={eixo.emoji}
                />
              ))
            )}

            {/* Rodapé */}
            <text x={W / 2} y={H - 28} textAnchor="middle" fontSize="12" fontStyle="italic" fill="#888">
              "Cada passo conta. Você já chegou até aqui."
            </text>
            <text x={W / 2} y={H - 12} textAnchor="middle" fontSize="10" fill="#bbb">
              Trilha EJA-EPT | Produto Educacional ProfEPT
            </text>
          </svg>
        </div>
      </div>

      {/* Botões */}
      <div className="max-w-lg mx-auto px-4 py-4 w-full space-y-3 pb-8">
        <Button
          onClick={handlePDF}
          disabled={loadingPdf}
          className="w-full h-12 rounded-2xl font-bold gap-2"
        >
          <Download className="w-4 h-4" />
          {loadingPdf ? "Gerando PDF…" : "⬇️ Baixar meu Mapa em PDF"}
        </Button>
        <Button
          variant="outline"
          onClick={handlePrint}
          className="w-full h-12 rounded-2xl font-bold gap-2"
        >
          <Printer className="w-4 h-4" /> Imprimir meu Mapa
        </Button>
        <Button
          variant="ghost"
          onClick={onEdit}
          className="w-full h-12 rounded-2xl font-bold gap-2"
        >
          <Edit className="w-4 h-4" /> Editar meu Mapa
        </Button>
      </div>
    </div>
  );
}