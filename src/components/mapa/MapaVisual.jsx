import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, Edit, RefreshCw } from "lucide-react";
import { base44 } from "@/api/base44Client";

// ── Dimensões ─────────────────────────────────────────────────────────────────
const W = 900;
const H = 900;
const CX = 450;  // Centro X da mandala
const CY = 440;  // Centro X da mandala (zona 2: y=80..800)
const RAIO = 280; // Raio das pétalas
const PETALA_W = 140;
const PETALA_H = 180;

// ── 8 pétalas ─────────────────────────────────────────────────────────────────
const PETALAS = [
  { id: "origem",     emoji: "🌱", titulo: "De onde venho?",          cor: "#5BAD6F", angulo: -90,  getTexto: (d) => d.origem_orgulho },
  { id: "hoje",       emoji: "📍", titulo: "Onde estou?",             cor: "#4A90D9", angulo: -45,  getTexto: (d) => d.hoje_forca },
  { id: "trabalho",   emoji: "🔧", titulo: "Mundo do Trabalho",       cor: "#E86826", angulo: 0,    getTexto: (d) => d.trabalho_10anos },
  { id: "estudos",    emoji: "📚", titulo: "Estudos",                 cor: "#2C5F8A", angulo: 45,   getTexto: (d) => d.estudos_10anos },
  { id: "eu",         emoji: "🌟", titulo: "Eu Mesmo(a)",             cor: "#9B59B6", angulo: 90,   getTexto: (d) => d.eu_10anos },
  { id: "vida",       emoji: "🏠", titulo: "Condições de Vida",       cor: "#F0A500", angulo: 135,  getTexto: (d) => d.vida_10anos },
  { id: "comunidade", emoji: "🤝", titulo: "Comunidade",              cor: "#E74C6C", angulo: 180,  getTexto: (d) => d.comunidade_10anos },
  { id: "sintese",    emoji: "✨", titulo: "Síntese",                 cor: "#27AE60", angulo: -135, getTexto: (d) => d.sintese_projeto },
];

// ── Anéis (raios) ─────────────────────────────────────────────────────────────
const ANEIS = [
  { r: 90,  label: "Esta semana", dash: "4,3",  sw: 1 },
  { r: 175, label: "1–5 anos",    dash: "6,4",  sw: 1.5 },
  { r: 260, label: "10 anos",     dash: "8,5",  sw: 2 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function deg2rad(d) { return (d * Math.PI) / 180; }

function wrapSVGText(text, maxChars, maxLines = 4) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const candidate = cur ? cur + " " + w : w;
    if (candidate.length > maxChars) {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length >= maxLines - 1) { lines.push(cur + (words[words.indexOf(w) + 1] ? "…" : "")); break; }
    } else { cur = candidate; }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines.slice(0, maxLines);
}

// ── Componente Pétala SVG ─────────────────────────────────────────────────────
function Petala({ petala, data }) {
  const rad = deg2rad(petala.angulo);
  const px = CX + RAIO * Math.cos(rad);
  const py = CY + RAIO * Math.sin(rad);
  const texto = petala.getTexto(data) || "";

  // Rotação da pétala para apontar ao centro
  const rotDeg = petala.angulo + 90;

  // Linha conectora do centro até a pétala
  const lineEndX = CX + (RAIO - PETALA_H / 2 - 5) * Math.cos(rad);
  const lineEndY = CY + (RAIO - PETALA_H / 2 - 5) * Math.sin(rad);
  const ctrl1X = CX + (RAIO * 0.4) * Math.cos(rad);
  const ctrl1Y = CY + (RAIO * 0.4) * Math.sin(rad);
  const pathD = `M ${CX} ${CY} C ${ctrl1X} ${ctrl1Y}, ${ctrl1X} ${ctrl1Y}, ${lineEndX} ${lineEndY}`;

  // Texto dentro da pétala (no espaço local da pétala, depois rotacionado)
  const lines = wrapSVGText(texto, 14, 4);
  const fontSize = lines.some(l => l.length > 12) ? 8 : 9;
  const lineH = fontSize * 1.35;
  const contentH = lines.length * lineH;

  return (
    <g>
      {/* Linha conectora (atrás) */}
      <path d={pathD} stroke={petala.cor} strokeWidth="2" fill="none" strokeOpacity="0.4" />

      {/* Grupo da pétala rotacionado */}
      <g transform={`translate(${px},${py}) rotate(${rotDeg})`}>
        {/* Sombra */}
        <ellipse cx={3} cy={3} rx={PETALA_W / 2} ry={PETALA_H / 2} fill="rgba(0,0,0,0.12)" />
        {/* Corpo */}
        <ellipse cx={0} cy={0} rx={PETALA_W / 2} ry={PETALA_H / 2}
          fill={petala.cor} fillOpacity="0.85" stroke="white" strokeWidth="3" />

        {/* Ícone no topo da pétala */}
        <text x={0} y={-PETALA_H / 2 + 22} textAnchor="middle" fontSize="16" dominantBaseline="middle">
          {petala.emoji}
        </text>

        {/* Título */}
        {(() => {
          const tLines = wrapSVGText(petala.titulo, 13, 2);
          return tLines.map((tl, i) => (
            <text key={i} x={0} y={-PETALA_H / 2 + 38 + i * 12}
              textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">
              {tl}
            </text>
          ));
        })()}

        {/* Separador */}
        <line x1={-PETALA_W / 2 + 12} y1={-PETALA_H / 2 + 58} x2={PETALA_W / 2 - 12} y2={-PETALA_H / 2 + 58}
          stroke="white" strokeWidth="0.8" strokeOpacity="0.5" />

        {/* Conteúdo / resposta */}
        {lines.length > 0 ? (
          lines.map((line, i) => (
            <text key={i}
              x={0}
              y={-PETALA_H / 2 + 70 + i * lineH}
              textAnchor="middle"
              fontSize={fontSize}
              fill="white"
              fontStyle={!texto ? "italic" : "normal"}
            >
              {line}
            </text>
          ))
        ) : (
          <text x={0} y={-PETALA_H / 2 + 80} textAnchor="middle" fontSize={8} fill="white" fontStyle="italic">
            A definir...
          </text>
        )}
      </g>
    </g>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function MapaVisual({ data, nome, onEdit }) {
  const mapaRef = useRef(null);
  const printRef = useRef(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [reflexao, setReflexao] = useState("");
  const [loadingReflexao, setLoadingReflexao] = useState(true);
  const [erroReflexao, setErroReflexao] = useState(false);

  const nomeDisplay = nome || "Estudante";
  const ano = new Date().getFullYear();
  const mes = new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const forca = data.hoje_forca || "";

  // ── Gerar texto reflexivo ──────────────────────────────────────────────────
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

  // ── PDF ────────────────────────────────────────────────────────────────────
  async function handlePDF() {
    setLoadingPdf(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#FFF8F0",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
      const pageW = 297;
      const pageH = 210;
      const ratio = canvas.width / canvas.height;
      let iW = pageW;
      let iH = iW / ratio;
      if (iH > pageH) { iH = pageH; iW = iH * ratio; }
      const xOff = (pageW - iW) / 2;
      const yOff = (pageH - iH) / 2;
      doc.addImage(imgData, "PNG", xOff, yOff, iW, iH);
      doc.save(`mapa-da-vida-${nomeDisplay.replace(/\s+/g, "-").toLowerCase()}-${ano}.pdf`);
    } catch (e) {
      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setLoadingPdf(false);
    }
  }

  // ── Impressão ──────────────────────────────────────────────────────────────
  function handlePrint() {
    const content = printRef.current?.innerHTML || "";
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html><html><head><title>Mapa da Vida — ${nomeDisplay}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #FFF8F0; font-family: Nunito, Arial, sans-serif; }
        @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
      </style></head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 800);
  }

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

      {/* Área capturável para PDF/impressão */}
      <div ref={printRef} style={{ background: "#FFF8F0" }}>

        {/* Mapa SVG */}
        <div ref={mapaRef} className="overflow-x-auto px-2 py-4 flex justify-center">
          <svg
            width={W} height={H}
            viewBox={`0 0 ${W} ${H}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ fontFamily: "Arial, sans-serif", display: "block", maxWidth: "100%", height: "auto" }}
          >
            {/* Fundo */}
            <rect width={W} height={H} fill="#FFF8F0" />

            {/* ── ZONA 1: CABEÇALHO (y=0–80) ── */}
            <text x={W / 2} y={38} textAnchor="middle" fontSize="26" fontWeight="bold" fill="#E86826">
              {`Mapa da Vida de ${nomeDisplay}`}
            </text>
            <text x={W / 2} y={65} textAnchor="middle" fontSize="13" fill="#888888">
              Gerado em {mes}
            </text>

            {/* ── ZONA 2: MANDALA (y=80–800) ── */}

            {/* Anéis concêntricos */}
            {ANEIS.map((anel) => (
              <g key={anel.r}>
                <circle cx={CX} cy={CY} r={anel.r}
                  fill="none" stroke="#DDDDDD" strokeWidth={anel.sw}
                  strokeDasharray={anel.dash} />
                <text x={CX + anel.r + 4} y={CY + 4}
                  fontSize="9" fill="#BBBBBB" fontStyle="italic">
                  {anel.label}
                </text>
              </g>
            ))}

            {/* Pétalas (linhas primeiro, pétalas depois) */}
            {PETALAS.map((p) => <Petala key={p.id} petala={p} data={data} />)}

            {/* Centro */}
            <circle cx={CX} cy={CY} r={62} fill="white" />
            <circle cx={CX} cy={CY} r={58} fill="#E86826" />
            <text x={CX} y={CY - 16} textAnchor="middle" fontSize="22" dominantBaseline="middle">🌱</text>
            <text x={CX} y={CY + 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" dominantBaseline="middle">
              {nomeDisplay.length > 12 ? nomeDisplay.slice(0, 11) + "…" : nomeDisplay}
            </text>
            {forca && (
              <text x={CX} y={CY + 22} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.85)" fontStyle="italic" dominantBaseline="middle">
                {forca.length > 16 ? forca.slice(0, 15) + "…" : forca}
              </text>
            )}

            {/* ── ZONA 3: RODAPÉ (y=800–900) ── */}
            <rect x={0} y={800} width={W} height={100} fill="#FFF8F0" />
            <line x1={40} y1={810} x2={W - 40} y2={810} stroke="#DDDDDD" strokeWidth="1" />
            <text x={W / 2} y={840} textAnchor="middle" fontSize="12" fontStyle="italic" fill="#888888">
              "O mundo não é. O mundo está sendo." (Freire, 2002)
            </text>
            <text x={W / 2} y={868} textAnchor="middle" fontSize="10" fill="#AAAAAA">
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
                <p style={{ color: "#888", fontSize: 14 }}>
                  Não foi possível gerar o texto reflexivo agora. Tente novamente mais tarde.
                </p>
                <button
                  onClick={gerarReflexao}
                  className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border border-orange-400 text-orange-600 hover:bg-orange-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Tentar novamente
                </button>
              </div>
            ) : (
              <p style={{ color: "#444", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{reflexao}</p>
            )}
          </div>
        </div>
      </div>

      {/* Botões de exportação */}
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