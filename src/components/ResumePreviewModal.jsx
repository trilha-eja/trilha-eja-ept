import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

function generatePDF(data) {
  const { jsPDF } = window.jspdf || {};
  // Use dynamic import via script if jsPDF not on window
  // We'll use the jspdf package already installed
  import("jspdf").then(({ jsPDF }) => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const marginL = 20;
    const marginR = 20;
    const pageW = 210;
    const contentW = pageW - marginL - marginR;
    let y = 25;

    const addText = (text, fontSize, bold = false, color = [30, 30, 30]) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text || "", contentW);
      doc.text(lines, marginL, y);
      y += lines.length * (fontSize * 0.38) + 2;
    };

    const addSectionTitle = (title) => {
      y += 3;
      doc.setDrawColor(200, 200, 200);
      doc.line(marginL, y, pageW - marginR, y);
      y += 5;
      addText(title, 10, true, [180, 80, 20]);
      y += 1;
    };

    // Header
    addText(data.full_name || "Nome não informado", 18, true, [20, 20, 20]);
    const contact = [data.phone, data.email, data.city].filter(Boolean).join("   |   ");
    addText(contact, 10, false, [80, 80, 80]);
    y += 4;

    if (data.objective) {
      addSectionTitle("OBJETIVO PROFISSIONAL");
      addText(data.objective, 11);
    }
    if (data.education) {
      addSectionTitle("FORMAÇÃO ESCOLAR");
      addText(data.education, 11);
    }
    if (data.experience) {
      addSectionTitle("EXPERIÊNCIAS");
      addText(data.experience, 11);
    }
    if (data.skills) {
      addSectionTitle("HABILIDADES");
      addText(data.skills, 11);
    }

    const safeName = (data.full_name || "curriculo").replace(/\s+/g, "_").toLowerCase();
    doc.save(`${safeName}_curriculo.pdf`);
  });
}

export default function ResumePreviewModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 px-0 sm:px-4">
      <div className="bg-background w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col max-h-[90dvh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-extrabold text-lg">Pré-visualização</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="bg-white border border-border rounded-2xl p-5 space-y-4 text-foreground">
            {/* Name & contact */}
            <div className="text-center border-b border-border pb-4">
              <h3 className="text-xl font-extrabold">{data.full_name || "—"}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {[data.phone, data.email, data.city].filter(Boolean).join(" · ")}
              </p>
            </div>

            {data.objective && (
              <div>
                <p className="text-xs font-bold text-primary tracking-wider mb-1">OBJETIVO PROFISSIONAL</p>
                <p className="text-sm leading-relaxed">{data.objective}</p>
              </div>
            )}
            {data.education && (
              <div>
                <p className="text-xs font-bold text-primary tracking-wider mb-1">FORMAÇÃO ESCOLAR</p>
                <p className="text-sm whitespace-pre-line leading-relaxed">{data.education}</p>
              </div>
            )}
            {data.experience && (
              <div>
                <p className="text-xs font-bold text-primary tracking-wider mb-1">EXPERIÊNCIAS</p>
                <p className="text-sm whitespace-pre-line leading-relaxed">{data.experience}</p>
              </div>
            )}
            {data.skills && (
              <div>
                <p className="text-xs font-bold text-primary tracking-wider mb-1">HABILIDADES</p>
                <p className="text-sm whitespace-pre-line leading-relaxed">{data.skills}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-border shrink-0">
          <Button
            onClick={() => generatePDF(data)}
            className="w-full h-12 rounded-xl text-base font-bold gap-2"
          >
            <Download className="w-5 h-5" /> Baixar em PDF
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            💡 Também pode tirar uma foto desta tela para enviar por WhatsApp
          </p>
        </div>
      </div>
    </div>
  );
}