import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Edit, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";

// ── Dimensões ─────────────────────────────────────────────────────────────────
const W = 1200;
const H = 900;

const ZONA1_TOP = 0;
const ZONA1_BOT = 100;
const ZONA2_TOP = 100;
const ZONA2_BOT = 820;
const ZONA5_TOP = 820;

const TRILHA_Y = Math.round((ZONA2_TOP + ZONA2_BOT) / 2); // 460
const TRILHA_H = 40;
const TRAIL_START_X = 80;
const TRAIL_END_X = 1120;
const BRANCH_GAP = 85;

// ── Eixos ─────────────────────────────────────────────────────────────────────
const EIXOS_ACIMA = [
  { key: "trabalho", emoji: "🔧", label: "Trabalho",   cor: "#E86826", fields: ["trabalho_1ano",      "trabalho_5anos",      "trabalho_10anos"]      },
  { key: "estudos",  emoji: "📚", label: "Estudos",    cor: "#4A90D9", fields: ["estudos_1ano",       "estudos_5anos",       "estudos_10anos"]       },
  { key: "familia",  emoji: "👨‍👩‍👧", label: "Família",   cor: "#5BAD6F", fields: ["comunidade_rede",   "comunidade_5anos",    "comunidade_10anos"]    },
];
const EIXOS_ABAIXO = [
  { key: "eu",         emoji: "🌟", label: "Eu Mesmo(a)",       cor: "#9B59B6", fields: ["eu_1ano",            "eu_5anos",            "eu_10anos"]           },
  { key: "vida",       emoji: "🏠", label: "Condições de Vida", cor: "#F0A500", fields: ["vida_1ano",          "vida_5anos",          "vida_10anos"]         },
  { key: "comunidade", emoji: "🤝", label: "Comunidade",        cor: "#E74C6C", fields: ["comunidade_contribui","comunidade_5anos",   "comunidade_10anos"]   },
];

const MARCOS = [
  { label: "1 ano",   x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.30), idx: 0 },
  { label: "5 anos",  x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.60), idx: 1 },
  { label: "10 anos", x: Math.round(TRAIL_START_X + (TRAIL_END_X - TRAIL_START_X) * 0.85), idx: 2 },
];

const MAX_LABEL_W = 145;
const PAD_X = 4;
const PAD_Y = 3;

// ── Wrapping ──────────────────────────────────────────────────────────────────
function wrapToLines(text, charsPerLine, maxLines = 3) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? cur + " " + w : w;
    if (candidate.length > charsPerLine) {
      if (cur) lines.push(cur);
      cur = w;
    } else { cur = candidate; }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const last = lines.slice(maxLines - 1).join(" ");
    return [...lines.slice(0, maxLines - 1), last.slice(0, charsPerLine - 1) + "…"];
  }
  return lines;
}

function computeLabel(text) {
  if (!text) return { lines: [], fontSize: 9, lineH: 12.6 };
  let lines = wrapToLines(text, 22, 3);
  if (lines.length <= 3) return { lines, fontSize: 9, lineH: 12.6 };
  lines = wrapToLines(text, 26, 3);
  return { lines, fontSize: 8, lineH: 11.2 };
}

function LabelAbove({ cx, cy, text }) {
  const { lines, fontSize, lineH } = computeLabel(text);
  const bw = MAX_LABEL_W + PAD_X * 2;
  if (!lines.length) {
    const bh = lineH + PAD_Y * 2;
    return (
      <g>
        <rect x={cx - bw / 2} y={cy - 20 - bh} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
        <text x={cx} y={cy - 20 - bh + PAD_Y + lineH * 0.8} textAnchor="middle" fontSize={9} fill="#aaa" fontStyle="italic">A definir...</text>
      </g>
    );
  }
  const bh = lines.length * lineH + PAD_Y * 2;
  return (
    <g>
      <rect x={cx - bw / 2} y={cy - 20 - bh} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
      {lines.map((line, i) => (
        <text key={i} x={cx} y={cy - 20 - bh + PAD_Y + (i + 0.8) * lineH}
          textAnchor="middle" fontSize={fontSize} fill="#333333">{line}</text>
      ))}
    </g>
  );
}

function LabelBelow({ cx, cy, text }) {
  const { lines, fontSize, lineH } = computeLabel(text);
  const bw = MAX_LABEL_W + PAD_X * 2;
  if (!lines.length) {
    const bh = lineH + PAD_Y * 2;
    return (
      <g>
        <rect x={cx - bw / 2} y={cy + 20} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
        <text x={cx} y={cy + 20 + PAD_Y + lineH * 0.8} textAnchor="middle" fontSize={9} fill="#aaa" fontStyle="italic">A definir...</text>
      </g>
    );
  }
  const bh = lines.length * lineH + PAD_Y * 2;
  return (
    <g>
      <rect x={cx - bw / 2} y={cy + 20} width={bw} height={bh} rx={4} fill="rgba(255,255,255,0.92)" />
      {lines.map((line, i) => (
        <text key={i} x={cx} y={cy + 20 + PAD_Y + (i + 0.8) * lineH}
          textAnchor="middle" fontSize={fontSize} fill="#333333">{line}</text>
      ))}
    </g>
  );
}

function BranchAbove({ marcoX, eixoIdx, cor, data, fields, emoji }) {
  const baseY = TRILHA_Y - TRILHA_H / 2;
  const targetY = baseY - (eixoIdx + 1) * BRANCH_GAP;
  const fi = MARCOS.findIndex(m => m.x === marcoX);
  const text = data[fields[fi]] || "";
  const d = `M ${marcoX} ${baseY} C ${marcoX} ${baseY - 30}, ${marcoX} ${targetY + 30}, ${marcoX} ${targetY}`;
  return (
    <g>
      <path d={d} stroke={cor} strokeWidth="2" fill="none" strokeDasharray={text ? "none" : "4,3"} />
      <LabelAbove cx={marcoX} cy={targetY} text={text} />
      <circle cx={marcoX} cy={targetY} r={16} fill={cor} />
      <text x={marcoX} y={targetY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">{emoji}</text>
    </g>
  );
}

function BranchBelow({ marcoX, eixoIdx, cor, data, fields, emoji }) {
  const baseY = TRILHA_Y + TRILHA_H / 2;
  const targetY = baseY + (eixoIdx + 1) * BRANCH_GAP;
  const fi = MARCOS.findIndex(m => m.x === marcoX);
  const text = data[fields[fi]] || "";
  const d = `M ${marcoX} ${baseY} C ${marcoX} ${baseY + 30}, ${marcoX} ${targetY - 30}, ${marcoX} ${targetY}`;
  return (
    <g>
      <path d={d} stroke={cor} strokeWidth="2" fill="none" strokeDasharray={text ? "none" : "4,3"} />
      <LabelBelow cx={marcoX} cy={targetY} text={text} />
      <circle cx={marcoX} cy={targetY} r={16} fill={cor} />
      <text x={marcoX} y={targetY + 1} textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">{emoji}</text>
    </g>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function MapaVisual({ data, nome, onEdit }) {
  const printRef = useRef(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [reflexao, setReflexao] = useState("");
  const [loadingReflexao, setLoadingReflexao] = useState(true);
  const [erroReflexao, setErroReflexao] = useState(false);

  const nomeDisplay = nome || "Estudante";
  const ano = new Date().getFullYear();
  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const forca = data.hoje_forca || "";

  async function gerarReflexao() {
    setLoadingReflexao(true);
    setErroReflexao(false);
    setReflexao("");
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        model: "claude_sonnet_4_6",
        prompt: `SYSTEM: Você é um(a) educador(a) da EJA-EPT comprometido(a) com a formação humana integral e com a perspectiva freireana. Sua tarefa é escrever um texto reflexivo personalizado para um(a) estudante trabalhador(a) da EJA-EPT que acabou de preencher seu Mapa da Vida. O texto deve: ter entre 150 e 200 palavras; valorizar a trajetória do estudante; reconhecer suas conquistas e desafios; fortalecer a esperança sem cair em meritocracia ou autoajuda; reconhecer as desigualdades sociais como estruturais, não individuais; usar linguagem acolhedora e próxima; terminar com uma frase de encorajamento coletivo (não individual); nunca usar frases como "basta querer", "você pode tudo", "depende só de você"; sempre reconhecer que os projetos de vida são processos coletivos e em constante construção.

USER: Escreva um texto reflexivo para ${nomeDisplay}.

Sobre sua trajetória:
- Como se apresenta: ${data.origem_apresentacao || "não informado"}
- O que o(a) afastou da escola: ${data.origem_afastou || "não informado"}
- O que o(a) trouxe de volta: ${data.origem_voltou || "não informado"}
- Conquista que enche de orgulho: ${data.origem_orgulho || "não informado"}

Sobre onde está hoje:
- Como descreve sua vida: ${data.hoje_vida || "não informado"}
- Maior desafio: ${data.hoje_desafio || "não informado"}
- Quem o(a) apoia: ${data.hoje_apoio || "não informado"}
- Maior força: ${data.hoje_forca || "não informado"}

Seus sonhos:
- Projeto de vida em uma frase: ${data.sintese_projeto || "não informado"}
- Mensagem para si mesmo(a): ${data.sintese_mensagem || "não informado"}`,
      });
      setReflexao(typeof result === "string" ? result : result?.text || String(result));
    } catch {
      setErroReflexao(true);
    } finally {
      setLoadingReflexao(false);
    }
  }

  useEffect(() => { gerarReflexao(); }, []);

  async function handlePDF() {
    setLoadingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(printRef.current, {
        scale: 2, useCORS: true, backgroundColor: "#FFF8F0", logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
      const pageW = 297; const pageH = 210;
      const ratio = canvas.width / canvas.height;
      let iW = pageW; let iH = iW / ratio;
      if (iH > pageH) { iH = pageH; iW = iH * ratio; }
      doc.addImage(imgData, "PNG", (pageW - iW) / 2, (pageH - iH) / 2, iW, iH);
      doc.save(`mapa-da-vida-${nomeDisplay.replace(/\s+/g, "-").toLowerCase()}-${ano}.pdf`);
    } catch { alert("Erro ao gerar PDF. Tente novamente."); }
    finally { setLoadingPdf(false); }
  }

  function handlePrint() {
    const content = printRef.current?.innerHTML || "";
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>Mapa da Vida — ${nomeDisplay}</title>
      <style>* { box-sizing: border-box; } body { margin:0; background:#FFF8F0; font-family:Arial,sans-serif; }
      @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
      </style></head><body>${content}</body></html>`);
    win.document.close(); win.focus();
    setTimeout(() => { win.print(); }, 800);
  }

  const nTruncado = nomeDisplay.length > 14 ? nomeDisplay.slice(0, 13) + "…" : nomeDisplay;

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

      {/* Área capturável */}
      <div ref={printRef} style={{ background: "#FFF8F0" }}>

        {/* SVG Trilha */}
        <div className="overflow-x-auto px-2 py-4">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "Arial, sans-serif", display: "block", minWidth: W }}>

            {/* Fundo */}
            <rect width={W} height={H} fill="#FFF8F0" />

            {/* ── ZONA 1: CABEÇALHO ── */}
            <text x={W / 2} y={40} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#E86826">
              {`Mapa da Vida de ${nomeDisplay}`}
            </text>
            <text x={W / 2} y={72} textAnchor="middle" fontSize="14" fill="#888888">
              Gerado em {mes}
            </text>

            {/* ── LEGENDA ── */}
            {[...EIXOS_ACIMA, ...EIXOS_ABAIXO].map((e, i) => (
              <g key={e.key}>
                <circle cx={24} cy={95 + i * 0} r={0} fill={e.cor} />
              </g>
            ))}

            {/* ── ZONA 2: TRILHA ── */}

            {/* Trilha */}
            <rect x={TRAIL_START_X} y={TRILHA_Y - TRILHA_H / 2}
              width={TRAIL_END_X - TRAIL_START_X} height={TRILHA_H} rx={20} fill="#C4956A" />
            <line x1={TRAIL_START_X + 20} y1={TRILHA_Y} x2={TRAIL_END_X - 20} y2={TRILHA_Y}
              stroke="#FFF8F0" strokeWidth="2" strokeDasharray="12,8" />

            {/* Ponto de partida */}
            <circle cx={TRAIL_START_X} cy={TRILHA_Y} r={32} fill="#E86826" />
            <text x={TRAIL_START_X} y={TRILHA_Y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="20">🌱</text>
            <text x={TRAIL_START_X} y={TRILHA_Y + 44} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#E86826">Hoje</text>
            {forca && (() => {
              const words = forca.split(" ");
              const lines = []; let cur = "";
              for (const w of words) { const c = cur ? cur + " " + w : w; if (c.length > 14) { if (cur) lines.push(cur); cur = w; } else cur = c; }
              if (cur) lines.push(cur);
              return lines.slice(0, 2).map((l, i) => (
                <text key={i} x={TRAIL_START_X} y={TRILHA_Y + 60 + i * 13} textAnchor="middle" fontSize="9" fill="#888" fontStyle="italic">{l}</text>
              ));
            })()}

            {/* Estrela final */}
            <text x={TRAIL_END_X} y={TRILHA_Y + 8} textAnchor="middle" dominantBaseline="middle" fontSize="32">⭐</text>
            <text x={TRAIL_END_X} y={TRILHA_Y + 46} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#E86826">Seu futuro</text>

            {/* Marcos */}
            {MARCOS.map((marco) => (
              <g key={marco.label}>
                <circle cx={marco.x} cy={TRILHA_Y} r={20} fill="white" stroke="#E86826" strokeWidth="2.5" />
                <text x={marco.x} y={TRILHA_Y + 1} textAnchor="middle" dominantBaseline="middle"
                  fontSize="10" fontWeight="bold" fill="#E86826">{marco.label}</text>
              </g>
            ))}

            {/* Ramificações */}
            {MARCOS.map((marco) => [
              ...EIXOS_ACIMA.map((eixo, ei) => (
                <BranchAbove key={`a-${marco.label}-${eixo.key}`}
                  marcoX={marco.x} eixoIdx={ei} cor={eixo.cor}
                  data={data} fields={eixo.fields} emoji={eixo.emoji} />
              )),
              ...EIXOS_ABAIXO.map((eixo, ei) => (
                <BranchBelow key={`b-${marco.label}-${eixo.key}`}
                  marcoX={marco.x} eixoIdx={ei} cor={eixo.cor}
                  data={data} fields={eixo.fields} emoji={eixo.emoji} />
              )),
            ])}

            {/* ── ZONA 3: RODAPÉ ── */}
            <rect x={0} y={ZONA5_TOP} width={W} height={H - ZONA5_TOP} fill="#FFF8F0" />
            <text x={W / 2} y={848} textAnchor="middle" fontSize="13" fontStyle="italic" fill="#888888">
              "O mundo não é. O mundo está sendo." (Freire, 2002)
            </text>
            <text x={W / 2} y={874} textAnchor="middle" fontSize="11" fill="#AAAAAA">
              Trilha EJA-EPT | Produto Educacional ProfEPT
            </text>
          </svg>
        </div>

        {/* Texto Reflexivo */}
        <div className="max-w-2xl mx-auto px-4 pb-6">
          <div style={{ background: "#FFF8F0", border: "2px solid #E86826", borderRadius: 16, padding: 20 }}>
            <h3 style={{ color: "#E86826", fontWeight: 800, fontSize: 16, marginBottom: 12 }}>
              ✨ Reflexão sobre sua trajetória
            </h3>
            {loadingReflexao ? (
              <div className="flex items-center gap-3 py-4">
                <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin shrink-0" />
                <p style={{ color: "#888", fontSize: 14 }}>Gerando sua reflexão personalizada...</p>
              </div>
            ) : erroReflexao ? (
              <div className="space-y-3">
                <p style={{ color: "#888", fontSize: 14 }}>Não foi possível gerar o texto reflexivo agora. Tente novamente mais tarde.</p>
                <button onClick={gerarReflexao}
                  className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border border-orange-400 text-orange-600 hover:bg-orange-50 transition-colors">
                  <RefreshCw className="w-4 h-4" /> Tentar novamente
                </button>
              </div>
            ) : (
              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{reflexao}</p>
            )}
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="max-w-lg mx-auto px-4 py-4 w-full space-y-3 pb-10">
        <Button onClick={handlePDF} disabled={loadingPdf || loadingReflexao} className="w-full h-12 rounded-2xl font-bold gap-2">
          <Download className="w-4 h-4" />
          {loadingPdf ? "Gerando PDF…" : "⬇️ Baixar meu Mapa em PDF"}
        </Button>
        <Button variant="outline" onClick={handlePrint} className="w-full h-12 rounded-2xl font-bold gap-2">
          <Printer className="w-4 h-4" /> 🖨️ Imprimir meu Mapa
        </Button>
        <Button variant="ghost" onClick={onEdit} className="w-full h-12 rounded-2xl font-bold gap-2">
          <Edit className="w-4 h-4" /> ✏️ Editar meu Mapa
        </Button>
      </div>
    </div>
  );
}