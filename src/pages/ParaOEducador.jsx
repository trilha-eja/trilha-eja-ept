import { useRef, useState } from "react";
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
        detail: "Use os módulos ENEM/SISU/PROUNI como ponto de partida para uma roda de conversa sobre os projetos de futuro da turma — individual e coletivamente.",
      },
    ],
  },
];

async function generatePDF(containerRef) {
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;
  if (!jsPDF || !html2canvas) { alert("PDF não disponível. Tente novamente."); return; }

  const el = containerRef.current;
  el.style.display = "block";

  const A4_W_PX = 794; // ~210mm at 96dpi
  const A4_H_PX = 1123; // ~297mm at 96dpi

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: A4_W_PX,
    windowWidth: A4_W_PX,
  });

  el.style.display = "none";

  const imgData = canvas.toDataURL("image/png");
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const pageW = 210;
  const pageH = 297;
  const imgW = pageW;
  const imgH = (canvas.height * pageW) / canvas.width;

  let position = 0;
  let remaining = imgH;

  while (remaining > 0) {
    doc.addImage(imgData, "PNG", 0, position, imgW, imgH);
    remaining -= pageH;
    if (remaining > 0) {
      doc.addPage();
      position -= pageH;
    }
  }

  doc.save("guia-do-educador-trilha-eja-ept.pdf");
}

// Senha ofuscada em base64 para não expor em texto visível
const _k = atob("cHJvZmVwdDIwMjY=");

export default function ParaOEducador() {
  const pdfRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [acesso, setAcesso] = useState(() => sessionStorage.getItem("educador_acesso") === "1");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const handleAcessar = () => {
    if (senha === _k) {
      sessionStorage.setItem("educador_acesso", "1");
      setAcesso(true);
      setErro(false);
    } else {
      setErro(true);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    await generatePDF(pdfRef);
    setLoading(false);
  };

  if (!acesso) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center space-y-1">
            <div className="text-5xl mb-2">👨‍🏫</div>
            <h1 className="font-extrabold text-2xl">Para o Educador</h1>
            <p className="text-sm text-muted-foreground leading-snug">
              Orientações pedagógicas para o uso do Trilha EJA-EPT em sala
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-sm leading-relaxed">
            <p>Este espaço é destinado a educadores(as) da EJA-EPT. Para receber a senha de acesso, entre em contato pelo e-mail:</p>
            <p className="font-semibold mt-2">📧 marileia.hillesheim@ifc.edu.br</p>
            <p className="text-muted-foreground mt-1">A senha será enviada em até 48 horas.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Digite a senha de acesso:</label>
            <input
              type="password"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErro(false); }}
              onKeyDown={e => e.key === "Enter" && handleAcessar()}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {erro && (
              <p className="text-destructive text-sm">
                Senha incorreta. Solicite o acesso pelo e-mail indicado.
              </p>
            )}
          </div>

          <button
            onClick={handleAcessar}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-base active:scale-95 transition-all"
          >
            Acessar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Para o Educador" subtitle="Orientações pedagógicas para o uso do Trilha EJA-EPT em sala" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Intro banner */}
        <div className="bg-chart-4/10 border border-chart-4/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-chart-4" />
            <p className="font-bold text-sm">Para educadores que compreendem que ensinar na EJA é um ato político de esperança</p>
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
            onClick={handleDownload}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-chart-4 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
          >
            <Download className="w-5 h-5" />
            {loading ? "Gerando PDF…" : "Baixar Guia do Educador em PDF"}
          </button>
        </div>
      </div>

      {/* Hidden PDF template */}
      <div ref={pdfRef} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
        <div style={{
          width: "794px",
          backgroundColor: "#ffffff",
          color: "#000000",
          fontFamily: "Arial, sans-serif",
          padding: "75px 76px",
          boxSizing: "border-box",
        }}>
          {/* Header */}
          <h1 style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center", margin: "0 0 8px 0" }}>
            Guia do Educador — Trilha EJA-EPT
          </h1>
          <p style={{ fontSize: "13px", color: "#666", textAlign: "center", margin: "0 0 16px 0" }}>
            Orientações pedagógicas para uso em sala
          </p>
          <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "28px" }} />

          {/* Seção 1 */}
          <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0" }}>
            1. Quem é o estudante da EJA-EPT?
          </h2>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 8px 0" }}>
            O estudante da EJA-EPT é um trabalhador-estudante adulto que carrega saberes construídos na vida, no trabalho e nas lutas cotidianas. Como disse Miguel Arroyo, ele é um passageiro da noite — não por falta de esforço, mas porque as condições estruturais da sociedade o afastaram da escola. Ao usar este aplicativo, lembre-se: você não está ensinando alguém que não sabe. Você está reconhecendo quem já sabe muito.
          </p>
          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
            Referência: ARROYO, M. G. Passageiros da noite. Petrópolis: Vozes, 2012.
          </p>

          {/* Seção 2 */}
          <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0" }}>
            2. Mundo do Trabalho x Mercado de Trabalho
          </h2>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 8px 0" }}>
            Este aplicativo usa intencionalmente Mundo do Trabalho, não mercado de trabalho. A diferença é política: formar para o mercado adapta o estudante às necessidades do capital. Formar para o mundo do trabalho instrumentaliza o cidadão a compreender, questionar e transformar as relações de produção. Use essa distinção em suas aulas.
          </p>
          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
            Referência: FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Médio Integrado. São Paulo: Cortez, 2005.
          </p>

          {/* Seção 3 */}
          <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 12px 0" }}>
            3. Como usar o Mapa da Vida sem cair na meritocracia
          </h2>
          <p style={{ fontSize: "12px", fontWeight: "bold", color: "#2a7a2a", margin: "0 0 4px 0" }}>FAÇA:</p>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 4px 8px" }}>
            — Pergunte à turma quais barreiras estruturais (falta de transporte, cansaço, cuidado de filhos) dificultam seus projetos e debata soluções coletivas.
          </p>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 14px 8px" }}>
            — Conecte as metas individuais a direitos coletivos (moradia, educação, saúde).
          </p>
          <p style={{ fontSize: "12px", fontWeight: "bold", color: "#b02020", margin: "0 0 4px 0" }}>EVITE:</p>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 4px 8px" }}>
            — Frases como "basta querer" ou "quem se esforça chega lá".
          </p>
          <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 14px 8px" }}>
            — Tratar o projeto de vida como plano individual de ascensão.
          </p>
          <p style={{ fontSize: "12px", fontStyle: "italic", lineHeight: "1.7", margin: "0 0 8px 0" }}>
            O Mapa da Vida é um ato político de esperança coletiva, não um plano de carreira.
          </p>
          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
            Referência: FREIRE, P. Pedagogia da Esperança. Rio de Janeiro: Paz e Terra, 1992.
          </p>

          {/* Seção 4 */}
          <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 12px 0" }}>
            4. Roteiro Sugerido de 4 Encontros
          </h2>
          {[
            { label: "Encontro 1 — Mundo do Trabalho + Direitos", detail: "Módulos de direitos trabalhistas + NR-10" },
            { label: "Encontro 2 — Empregabilidade Crítica", detail: "Gerador de currículo em grupo + Valorize sua Experiência" },
            { label: "Encontro 3 — Mapa da Vida", detail: "Em roda de conversa, com relatos de egressos — Vozes da Trilha" },
            { label: "Encontro 4 — Caminhos de Estudo", detail: "Use os módulos ENEM/SISU/PROUNI como ponto de partida para uma roda de conversa sobre os projetos de futuro da turma — individual e coletivamente." },
          ].map((enc, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <p style={{ fontSize: "12px", fontWeight: "bold", margin: "0 0 2px 0" }}>{enc.label}</p>
              <p style={{ fontSize: "12px", color: "#444", margin: 0 }}>{enc.detail}</p>
            </div>
          ))}

          {/* Rodapé */}
          <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#888", margin: 0 }}>
              Trilha EJA-EPT | Produto Educacional — ProfEPT | IFC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}