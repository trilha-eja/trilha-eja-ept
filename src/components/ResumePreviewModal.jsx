import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function generateResumePDF(data) {
  if (!data.full_name || !data.full_name.trim()) {
    alert("Preencha pelo menos seu nome para baixar o currículo.");
    return;
  }

  const { jsPDF } = window.jspdf;
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
    const lines = doc.splitTextToSize(String(text || ""), contentW);
    doc.text(lines, marginL, y);
    y += lines.length * (fontSize * 0.38) + 2;
  };

  const addSectionTitle = (title) => {
    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(marginL, y, pageW - marginR, y);
    y += 6;
    addText(title, 10, true, [180, 80, 20]);
    y += 1;
  };

  // Nome
  addText(data.full_name, 18, true, [20, 20, 20]);
  y += 1;

  // Linha separadora sob nome
  doc.setDrawColor(180, 80, 20);
  doc.setLineWidth(0.5);
  doc.line(marginL, y, pageW - marginR, y);
  doc.setLineWidth(0.2);
  y += 6;

  // Contato
  const contactParts = [data.phone, data.email, data.city].filter(Boolean);
  if (contactParts.length) {
    addText(contactParts.join("   |   "), 10, false, [80, 80, 80]);
    y += 2;
  }

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

  // Rodapé
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(160, 160, 160);
  doc.text("Currículo gerado pelo Trilha EJA-EPT", marginL, 285);

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
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable preview */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="bg-white border border-border rounded-2xl p-5 space-y-4">

            {/* Nome + Contato */}
            <div className="text-center pb-4 border-b border-border">
              <h3 className="text-xl font-extrabold text-gray-900">{data.full_name || "—"}</h3>
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
          <Button
            onClick={() => generateResumePDF(data)}
            className="w-full h-12 rounded-xl text-base font-bold gap-2"
          >
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