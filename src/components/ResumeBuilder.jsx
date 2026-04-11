import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  { field: "full_name", label: "Qual é o seu nome completo?", placeholder: "Ex: Maria da Silva", type: "input" },
  { field: "phone", label: "Seu telefone (WhatsApp):", placeholder: "Ex: (11) 99999-9999", type: "input" },
  { field: "email", label: "Seu e-mail (se tiver):", placeholder: "Ex: maria@email.com", type: "input" },
  { field: "city", label: "Cidade onde mora:", placeholder: "Ex: São Paulo - SP", type: "input" },
  { field: "objective", label: "O que você quer trabalhar?", placeholder: "Ex: Eletricista industrial, manutenção elétrica...", type: "input" },
  { field: "education", label: "Sua formação escolar:", placeholder: "Ex: Ensino Médio completo - EJA\nCurso Eletricista Industrial", type: "textarea" },
  { field: "experience", label: "Suas experiências (trabalho, voluntário, casa):", placeholder: "Ex: Ajudante de eletricista por 2 anos\nManutenção elétrica residencial", type: "textarea" },
  { field: "skills", label: "Suas habilidades:", placeholder: "Ex: Trabalho em equipe\nPontualidade\nConhecimento em NR-10", type: "textarea" },
];

export default function ResumeBuilder({ onBack }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  if (done) {
    return (
      <div>
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-extrabold text-lg">Seu Currículo</h1>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 py-5">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="text-center border-b border-border pb-4">
              <h2 className="text-xl font-extrabold">{data.full_name || "Seu Nome"}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {[data.phone, data.email, data.city].filter(Boolean).join(" • ")}
              </p>
            </div>
            {data.objective && (
              <div>
                <h3 className="font-bold text-sm text-primary mb-1">OBJETIVO</h3>
                <p className="text-sm">{data.objective}</p>
              </div>
            )}
            {data.education && (
              <div>
                <h3 className="font-bold text-sm text-primary mb-1">FORMAÇÃO</h3>
                <p className="text-sm whitespace-pre-line">{data.education}</p>
              </div>
            )}
            {data.experience && (
              <div>
                <h3 className="font-bold text-sm text-primary mb-1">EXPERIÊNCIA</h3>
                <p className="text-sm whitespace-pre-line">{data.experience}</p>
              </div>
            )}
            {data.skills && (
              <div>
                <h3 className="font-bold text-sm text-primary mb-1">HABILIDADES</h3>
                <p className="text-sm whitespace-pre-line">{data.skills}</p>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={() => { setDone(false); setStep(0); }} variant="outline" className="flex-1 h-12 rounded-xl">
              ✏️ Editar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            💡 Dica: tire uma foto desta tela ou copie o texto para enviar por WhatsApp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => step === 0 ? onBack() : setStep(step - 1)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-extrabold text-lg">Criar Currículo</h1>
            <p className="text-xs text-muted-foreground">Passo {step + 1} de {steps.length}</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        <label className="block text-lg font-bold mb-4">{current.label}</label>
        {current.type === "textarea" ? (
          <Textarea
            value={data[current.field] || ""}
            onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
            placeholder={current.placeholder}
            className="text-base h-32 rounded-xl"
          />
        ) : (
          <Input
            value={data[current.field] || ""}
            onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
            placeholder={current.placeholder}
            className="text-base h-14 rounded-xl"
          />
        )}

        <Button
          onClick={handleNext}
          className="w-full h-14 rounded-xl mt-6 text-base font-bold gap-2"
        >
          {isLast ? (
            <>
              <Check className="w-5 h-5" /> Ver meu currículo
            </>
          ) : (
            <>
              Próximo <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}