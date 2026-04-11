import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudyPathDetail({ path, onBack }) {
  const [step, setStep] = useState(0);
  const current = path.steps[step];
  const isLast = step === path.steps.length - 1;

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
            <h1 className="font-extrabold text-lg">{path.title}</h1>
            <p className="text-xs text-muted-foreground">{path.subtitle} • Passo {step + 1}/{path.steps.length}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((step + 1) / path.steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-card border border-border rounded-3xl p-6 text-center min-h-[240px] flex flex-col items-center justify-center">
          <span className="text-5xl mb-4">{current.emoji}</span>
          <h2 className="text-xl font-extrabold mb-3">{current.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">{current.text}</p>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {path.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? "bg-primary scale-125" : i < step ? "bg-primary/40" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="mt-6">
          {isLast ? (
            <Button onClick={onBack} variant="outline" className="w-full h-14 rounded-xl text-base font-bold">
              ← Voltar aos caminhos
            </Button>
          ) : (
            <Button onClick={() => setStep(step + 1)} className="w-full h-14 rounded-xl text-base font-bold gap-2">
              Próximo <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}