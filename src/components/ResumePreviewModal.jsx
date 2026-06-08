import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function generateResumePDF(data) {
  if (!data.full_name || !data.full_name.trim()) {
    alert("Preencha pelo menos seu nome para baixar o currículo.");
    return;
  }

  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  const marginL = 20;
  const marginR = 20;
  const pageW = 210;
  const pageH = 297;
  const contentW = pageW - marginL - marginR;
  let y = 20;

  const addWrappedText = (text, fontSize, bold = false, color = [51, 51, 51]) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(String(text || ""), contentW);
    doc.text(lines, marginL, y);
    y += lines.length * (fontSize * 0.4) + 1;
  };

  const addSectionTitle = (title) => {
    y += 5;
    addWrappedText(title, 12, true, [51, 51, 51]);
    y += 1;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(marginL, y, pageW - marginR, y);
    y += 4;
  };

  // 1. Nome
  addWrappedText(data.full_name, 18, true, [232, 104, 38]);
  y += 1;

  // 2. Linha separadora após nome
  doc.setDrawColor(232, 104, 38);
  doc.setLineWidth(0.6);
  doc.line(marginL, y, pageW - marginR, y);
  doc.setLineWidth(0.3);
  y += 5;

  // 3. Contato em linha
  const contactParts = [data.phone, data.email, data.city].filter(Boolean);
  if (contactParts.length) {
    addWrappedText(contactParts.join("   |   "), 10, false, [100, 100, 100]);
    y += 2;
  }

  // 4. Linha separadora após contato
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(marginL, y, pageW - marginR, y);
  y += 3;

  // 5–9. Seções
  if (data.objective) {
    addSectionTitle("OBJETIVO PROFISSIONAL");
    addWrappedText(data.objective, 11);
  }
  if (data.education) {
    addSectionTitle("FORMAÇÃO ESCOLAR");
    addWrappedText(data.education, 11);
  }
  if (data.courses && data.courses.trim()) {
    addSectionTitle("CURSOS E CERTIFICAÇÕES");
    addWrappedText(data.courses, 11);
  }
  if (data.experience) {
    addSectionTitle("EXPERIÊNCIAS");
    addWrappedText(data.experience, 11);
  }
  if (data.skills) {
    addSectionTitle("HABILIDADES");
    addWrappedText(data.skills, 11);
  }

  // 10. Linha separadora no rodapé
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(marginL, pageH - 15, pageW - marginR, pageH - 15);

  // 11. Rodapé
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(160, 160, 160);
  doc.text("Currículo gerado pelo Trilha EJA-EPT", marginL, pageH - 10);

  const safeName = data.full_name.replace(/\s+/g, "_").toLowerCase();
  doc.save(`${safeName}_curriculo.pdf`);
}

export default function ResumePreviewModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60">
      <div className="bg-background w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl flex flex-col max-h-[92dvh] shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-extrabold text-lg">Pré-visualização</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center active:scale-95">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable preview */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="bg-white border border-border rounded-2xl p-5 space-y-4">

            {/* Nome + Contato */}
            <div className="text-center pb-4 border-b border-border">
              <h3 className="text-xl font-extrabold" style={{ color: "#E86826" }}>{data.full_name || "—"}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {[data.phone, data.email, data.city].filter(Boolean).join(" · ") || "Sem contato informado"}
              </p>
            </div>

            {data.objective && (
              <div>
                <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1">Objetivo Profissional</p>
                <p className="text-sm leading-relaxed text-gray-800">{data.objective}</p>
              </div>
            )}
            {data.education && (
              <div>
                <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1">Formação Escolar</p>
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">{data.education}</p>
              </div>
            )}
            {data.courses && data.courses.trim() && (
              <div>
                <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1">Cursos e Certificações</p>
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">{data.courses}</p>
              </div>
            )}
            {data.experience && (
              <div>
                <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1">Experiências</p>
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">{data.experience}</p>
              </div>
            )}
            {data.skills && (
              <div>
                <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-1">Habilidades</p>
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">{data.skills}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-border shrink-0 space-y-2">
          <Button onClick={() => generateResumePDF(data)} className="w-full h-12 rounded-xl text-base font-bold gap-2">
            <Download className="w-5 h-5" /> Baixar em PDF
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            💡 Pode tirar uma foto da tela para enviar por WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}