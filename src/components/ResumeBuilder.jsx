import { useState, useRef, useEffect } from "react";
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
  courses: "",
  experience: "",
  skills: "",
};

const OBJECTIVE_SUGGESTIONS = [
  "Eletricista Industrial",
  "Auxiliar de Eletricista",
  "Manutenção Industrial",
  "Eletromecânico",
  "Operador de Produção",
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

const FIELD_COUNT = Object.keys(emptyData).length;

function calcProgress(data) {
  const filled = Object.values(data).filter((v) => v && v.trim()).length;
  return Math.round((filled / FIELD_COUNT) * 100);
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
  const [showTooltip, setShowTooltip] = useState(null);

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

  const inputClass = "w-full text-base rounded-xl border border-input bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring";
  const hintClass = "text-xs text-muted-foreground leading-snug mt-1";

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-lg leading-tight">Criar Currículo</h1>
            <p className="text-sm text-muted-foreground">Passo a passo simples • {progress}% preenchido</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* Mensagem de abertura */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            ✨ <strong>Preencha com calma</strong> e inclua tudo que você sabe fazer — dentro e fora da escola.
          </p>
        </div>

        {restoredMsg && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
            📝 Rascunho recuperado. Continue de onde parou!
          </div>
        )}

        {/* Nome */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Nome completo *</label>
          <Input value={data.full_name} onChange={(e) => handleChange("full_name", e.target.value)}
            placeholder="Ex: Maria da Silva" type="text" className="text-base h-12 rounded-xl" />
        </div>

        {/* Telefone */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Telefone / WhatsApp *</label>
          <Input value={data.phone} onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Ex: (47) 99999-9999" type="text" className="text-base h-12 rounded-xl" />
        </div>

        {/* E-mail */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <label className="text-base font-bold">E-mail</label>
            <div className="relative">
              <button type="button"
                onClick={() => setShowTooltip(showTooltip === "email" ? null : "email")}
                className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {showTooltip === "email" && (
                <div className="absolute left-0 top-8 z-10 bg-card border border-border rounded-xl px-3 py-2 text-xs shadow-md w-56">
                  Se não tiver, pode deixar em branco
                </div>
              )}
            </div>
          </div>
          <Input value={data.email} onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Ex: maria@email.com" type="email" className="text-base h-12 rounded-xl" />
        </div>

        {/* Cidade */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Cidade — Estado *</label>
          <Input value={data.city} onChange={(e) => handleChange("city", e.target.value)}
            placeholder="Ex: Blumenau — SC" type="text" className="text-base h-12 rounded-xl" />
        </div>

        {/* Objetivo Profissional com sugestões */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Objetivo profissional</label>
          <AutoTextarea
            value={data.objective}
            onChange={(e) => handleChange("objective", e.target.value)}
            placeholder="Ex: Atuar como Eletricista Industrial utilizando os conhecimentos adquiridos no curso técnico do IFC"
            className={inputClass}
          />
          <p className={hintClass}>💡 Sugestões — clique para usar:</p>
          <div className="flex flex-wrap gap-2 pt-0.5">
            {OBJECTIVE_SUGGESTIONS.map((s) => (
              <button key={s} type="button"
                onClick={() => handleChange("objective", s)}
                className="text-xs px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/5 text-primary font-semibold hover:bg-primary/15 active:scale-95 transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Formação Escolar */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Formação escolar</label>
          <AutoTextarea
            value={data.education}
            onChange={(e) => handleChange("education", e.target.value)}
            placeholder={"Ex: Ensino Médio completo — EJA (2024)\nCurso Técnico em Eletricista Industrial — IFC (em andamento)"}
            className={inputClass}
          />
          <p className={hintClass}>Inclua sua escolarização atual ou concluída e cursos realizados.</p>
        </div>

        {/* Cursos e Certificações */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">📚 Cursos e Certificações</label>
          <AutoTextarea
            value={data.courses}
            onChange={(e) => handleChange("courses", e.target.value)}
            placeholder={"Ex: Curso de Eletricista Industrial — IFC\nNR-10 Básico\nInformática Básica"}
            className={inputClass}
          />
          <p className={hintClass}>Inclua cursos de qualificação, certificações técnicas e outras formações complementares.</p>
        </div>

        {/* Experiências */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Experiências</label>
          <AutoTextarea
            value={data.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            placeholder={"Ex: Auxiliar de eletricista — 2 anos\nManutenção elétrica residencial\nAtividades domésticas e cuidados familiares também contam!"}
            className={inputClass}
          />
          <p className={hintClass}>Você pode incluir trabalhos formais, informais, autônomos, atividades comunitárias, voluntariado, cuidados familiares e outras experiências que desenvolveram conhecimentos e habilidades.</p>
        </div>

        {/* Habilidades */}
        <div className="space-y-1.5">
          <label className="text-base font-bold">Habilidades</label>
          <AutoTextarea
            value={data.skills}
            onChange={(e) => handleChange("skills", e.target.value)}
            placeholder={"Ex: Trabalho em equipe\nNR-10\nPontualidade\nOrganização"}
            className={inputClass}
          />
          <p className={hintClass}>Você pode incluir conhecimentos técnicos, habilidades de convivência, organização, responsabilidade, trabalho em equipe e outras capacidades desenvolvidas ao longo da vida.</p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2 pb-6">
          <Button onClick={() => setShowPreview(true)} className="w-full h-14 rounded-xl text-base font-bold gap-2" disabled={!data.full_name.trim()}>
            <Eye className="w-5 h-5" /> Pré-visualizar Currículo
          </Button>
          <Button onClick={() => generateResumePDF(data)} variant="outline" className="w-full h-12 rounded-xl text-base font-semibold gap-2">
            <Download className="w-4 h-4" /> Baixar em PDF
          </Button>
          <Button onClick={handleSave} variant="outline" className="w-full h-12 rounded-xl text-base font-semibold gap-2">
            <Save className="w-4 h-4" /> Salvar rascunho
          </Button>
          {savedMsg && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm font-semibold text-green-700 text-center">
              ✓ Rascunho salvo! Seus dados estão guardados neste dispositivo.
            </div>
          )}
        </div>
      </div>

      {showPreview && <ResumePreviewModal data={data} onClose={() => setShowPreview(false)} />}
    </div>
  );
}