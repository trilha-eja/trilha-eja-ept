import { useState } from "react";
import { Target, Calendar, Rocket, Star, ArrowRight, Check, ArrowLeft } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const reflectionQuestions = [
  { field: "reflection_strength", emoji: "💪", question: "Qual é sua maior força?", hint: "Pode ser coragem, paciência, esforço..." },
  { field: "reflection_dream", emoji: "🌟", question: "Qual é o seu maior sonho?", hint: "Não tenha medo de sonhar grande!" },
  { field: "reflection_next_step", emoji: "👣", question: "Qual seu próximo passo concreto?", hint: "Algo pequeno que você pode fazer esta semana" },
];

const goalSteps = [
  { field: "goal_1_year", icon: Calendar, emoji: "📅", title: "Daqui a 1 ano", question: "Onde você quer estar em 1 ano?", hint: "Ex: Trabalhando como eletricista, com carteira assinada..." },
  { field: "goal_5_years", icon: Target, emoji: "🎯", title: "Daqui a 5 anos", question: "E em 5 anos?", hint: "Ex: Ter minha própria empresa, ter feito faculdade..." },
  { field: "goal_10_years", icon: Rocket, emoji: "🚀", title: "Daqui a 10 anos", question: "E em 10 anos?", hint: "Ex: Casa própria, estabilidade, ajudar minha família..." },
];

export default function MapaDaVida() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  const allSteps = [...reflectionQuestions, ...goalSteps];
  const current = allSteps[step];
  const isLast = step === allSteps.length - 1;

  const handleNext = () => {
    if (isLast) setDone(true);
    else setStep(step + 1);
  };

  if (done) {
    return (
      <div>
        <PageHeader title="Meu Mapa da Vida" />
        <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 text-white text-center">
            <Star className="w-10 h-10 mx-auto mb-2 opacity-80" />
            <h2 className="text-xl font-extrabold">Parabéns! 🎉</h2>
            <p className="text-sm opacity-90 mt-2">Você criou seu mapa de vida. Releia sempre que precisar de motivação!</p>
          </div>

          {reflectionQuestions.map((q) => (
            data[q.field] && (
              <div key={q.field} className="bg-card border border-border rounded-2xl p-4">
                <span className="text-2xl">{q.emoji}</span>
                <p className="text-xs text-muted-foreground mt-1">{q.question}</p>
                <p className="font-bold text-sm mt-1">{data[q.field]}</p>
              </div>
            )
          ))}

          <div className="space-y-3">
            {goalSteps.map((g) => (
              data[g.field] && (
                <div key={g.field} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{g.emoji}</span>
                    <h3 className="font-bold text-sm">{g.title}</h3>
                  </div>
                  <p className="text-sm text-foreground">{data[g.field]}</p>
                </div>
              )
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <Button onClick={() => { setDone(false); setStep(0); }} variant="outline" className="flex-1 h-12 rounded-xl">
              ✏️ Editar
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            💡 Dica: tire uma foto desta tela para lembrar de seus objetivos!
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
            onClick={() => step === 0 ? null : setStep(step - 1)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-extrabold text-lg">Mapa da Vida</h1>
            <p className="text-xs text-muted-foreground">Passo {step + 1} de {allSteps.length}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${((step + 1) / allSteps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        <span className="text-5xl block mb-4">{current.emoji}</span>
        <h2 className="text-xl font-extrabold mb-2">{current.question}</h2>
        <p className="text-sm text-muted-foreground mb-6">{current.hint}</p>

        <Textarea
          value={data[current.field] || ""}
          onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
          placeholder="Escreva aqui..."
          className="text-base h-32 rounded-xl text-center"
        />

        <Button onClick={handleNext} className="w-full h-14 rounded-xl mt-6 text-base font-bold gap-2">
          {isLast ? (
            <><Check className="w-5 h-5" /> Ver meu mapa</>
          ) : (
            <>Próximo <ArrowRight className="w-5 h-5" /></>
          )}
        </Button>
      </div>
    </div>
  );
}