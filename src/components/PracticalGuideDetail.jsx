import { useState } from "react";
import { ArrowLeft, ArrowRight, AlertTriangle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PracticalGuideDetail({ guide, onBack }) {
  const [step, setStep] = useState(0);
  const current = guide.steps[step];
  const isLast = step === guide.steps.length - 1;

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
            <h1 className="font-extrabold text-lg">{guide.title}</h1>
            <p className="text-xs text-muted-foreground">Passo {step + 1} de {guide.steps.length}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / guide.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Safety warning */}
        {step === 0 && guide.safety && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-destructive">⚠️ Segurança primeiro!</p>
              <p className="text-sm text-foreground mt-1">{guide.safety}</p>
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="bg-card border border-border rounded-3xl p-6 text-center">
          <span className="text-5xl mb-4 block">{current.emoji}</span>
          <h2 className="text-xl font-extrabold mb-3">{current.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed">{current.text}</p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {guide.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === step ? "bg-primary scale-125" : i < step ? "bg-primary/40" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-6 space-y-3">
          {isLast ? (
            <>
              <a
                href={guide.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-accent text-accent-foreground font-bold text-base"
              >
                <Play className="w-5 h-5" /> Ver vídeos sobre o tema
              </a>
              <Button onClick={onBack} variant="outline" className="w-full h-14 rounded-xl text-base">
                ← Voltar aos guias
              </Button>
            </>
          ) : (
            <Button onClick={() => setStep(step + 1)} className="w-full h-14 rounded-xl text-base font-bold gap-2">
              Próximo passo <ArrowRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}