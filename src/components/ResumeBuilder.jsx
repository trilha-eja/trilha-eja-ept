import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Eye, Save, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResumePreviewModal, { generateResumePDF } from "./ResumePreviewModal";

const STORAGE_KEY = "curriculo_rascunho";

const emptyData = {
  full_name: "",
  phone: "",
  email: "",
  city: "",
  objective: "",
  education: "",
  experience: "",
  skills: "",
};

const fields = [
  { field: "full_name", label: "Nome completo *", type: "input", placeholder: "Ex: Maria da Silva", required: true },
  { field: "phone", label: "Telefone / WhatsApp *", type: "input", placeholder: "Ex: (47) 99999-9999", required: true },
  {
    field: "email", label: "E-mail", type: "input", placeholder: "Ex: maria@email.com", required: false,
    tooltip: "Se não tiver, pode deixar em branco",
  },
  { field: "city", label: "Cidade — Estado *", type: "input", placeholder: "Ex: Blumenau — SC", required: true },
  {
    field: "objective", label: "Objetivo profissional", type: "textarea",
    placeholder: "Ex: Atuar como Eletricista Industrial utilizando os conhecimentos adquiridos no curso técnico do IFC",
  },
  {
    field: "education", label: "Formação escolar", type: "textarea",
    placeholder: "Ex: Ensino Médio completo — EJA (2024)\nCurso Técnico em Eletricista Industrial — IFC (em andamento)",
  },
  {
    field: "experience", label: "Experiências", type: "textarea",
    placeholder: "Ex: Auxiliar de eletricista — 2 anos\nManutenção elétrica residencial\nAtividades domésticas e cuidados familiares também contam!",
    hint: "Experiências de trabalho, voluntariado ou atividades domésticas também contam!",
  },
  {
    field: "skills", label: "Habilidades", type: "textarea",
    placeholder: "Ex: Trabalho em equipe\nNR-10\nPontualidade\nOrganização",
  },
];

function AutoTextarea({ value, onChange, placeholder, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={3}
      style={{ minHeight: 100, maxHeight: 200, overflowY: "auto", resize: "none" }}
      className={className}
    />
  );
}

function calcProgress(data) {
  const filled = Object.values(data).filter((v) => v && v.trim()).length;
  return Math.round((filled / fields.length) * 100);
}

export default function ResumeBuilder({ onBack }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...emptyData, ...JSON.parse(saved) } : { ...emptyData };
    } catch {
      return { ...emptyData };
    }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [restoredMsg, setRestoredMsg] = useState(() => {
    try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (restoredMsg) {
      const t = setTimeout(() => setRestoredMsg(false), 4000);
      return () => clearTimeout(t);
    }
  }, [restoredMsg]);

  const progress = calcProgress(data);

  const handleChange = (field, value) => setData((d) => ({ ...d, [field]: value }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-lg leading-tight">Criar Currículo</h1>
            <p className="text-xs text-muted-foreground">{progress}% preenchido</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Encouragement banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            ✨ <strong>Sua história vale muito!</strong> Preencha com calma. Tudo que você viveu — no trabalho, em casa, nos estudos — é experiência real.
          </p>
        </div>

        {/* Restored message */}
        {restoredMsg && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
            📝 Rascunho recuperado. Continue de onde parou!
          </div>
        )}

        {/* Fields */}
        {fields.map(({ field, label, type, placeholder, required, tooltip, hint }) => (
          <div key={field} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label className="text-base font-bold">{label}</label>
              {tooltip && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTooltip(showTooltip === field ? null : field)}
                    className="w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                  >
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  {showTooltip === field && (
                    <div className="absolute left-0 top-8 z-10 bg-card border border-border rounded-xl px-3 py-2 text-xs shadow-md w-56">
                      {tooltip}
                    </div>
                  )}
                </div>
              )}
            </div>

            {hint && (
              <p className="text-xs text-muted-foreground leading-snug">{hint}</p>
            )}

            {type === "textarea" ? (
              <AutoTextarea
                value={data[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                className="w-full text-base rounded-xl border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
              />
            ) : (
              <Input
                value={data[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                type={field === "email" ? "email" : "text"}
                className="text-base h-12 rounded-xl"
              />
            )}
          </div>
        ))}

        {/* Actions */}
        <div className="space-y-3 pt-2 pb-6">
          <Button
            onClick={() => setShowPreview(true)}
            className="w-full h-14 rounded-xl text-base font-bold gap-2"
            disabled={!data.full_name.trim()}
          >
            <Eye className="w-5 h-5" /> Pré-visualizar Currículo
          </Button>
          <Button
            onClick={() => generateResumePDF(data)}
            variant="outline"
            className="w-full h-12 rounded-xl text-base font-semibold gap-2"
          >
            <Download className="w-4 h-4" /> Baixar em PDF
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="w-full h-12 rounded-xl text-base font-semibold gap-2"
          >
            <Save className="w-4 h-4" /> Salvar rascunho
          </Button>
          {savedMsg && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-semibold text-green-700 text-center">
              ✓ Rascunho salvo! Seus dados estão guardados neste dispositivo.
            </div>
          )}
        </div>
      </div>

      {showPreview && (
        <ResumePreviewModal data={data} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
}