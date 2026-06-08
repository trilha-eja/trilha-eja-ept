import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PageHeader from "../components/PageHeader";
import TestimonialCard from "../components/vozes/TestimonialCard";
import TestimonialForm from "../components/vozes/TestimonialForm";

export default function VozesDaTrilha() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchDepoimentos = () => {
    setLoading(true);
    base44.entities.Depoimento.filter({ status: "aprovado" }, "-data_envio", 50)
      .then(setDepoimentos)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDepoimentos();
  }, [showForm]); // re-busca sempre que sai do formulário também

  const handleSubmit = async (formData) => {
    await base44.entities.Depoimento.create({
      ...formData,
      status: "pendente",
      data_envio: new Date().toISOString(),
    });
    setShowForm(false);
    setSubmitted(true);
  };

  if (showForm) {
    return (
      <div>
        <PageHeader title="Compartilhar minha história" backTo="/vozes" />
        <TestimonialForm onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Vozes da Trilha"
        subtitle="Histórias reais de quem trilhou esse caminho — de trabalhador-estudante para trabalhador-estudante."
        backTo="/"
      />
      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">

        {/* Intro */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Estas histórias são de pessoas reais que, como você, conciliaram trabalho, família e escola. Não são exemplos de quem "se esforçou mais", mas relatos de pessoas que enfrentaram desafios semelhantes e construíram seus próprios caminhos.
          </p>
        </div>

        {/* Success message */}
        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-green-700">
              Obrigado(a) por compartilhar! Seu depoimento será revisado e publicado em breve. Sua história vai inspirar muita gente.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={() => { setShowForm(true); setSubmitted(false); }}
          className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-base active:scale-95 transition-all"
        >
          ✍️ Compartilhar minha história
        </button>

        {/* Depoimentos */}
        <div>
          <h2 className="font-extrabold text-base mb-3">Depoimentos</h2>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-7 h-7 border-4 border-muted border-t-primary rounded-full animate-spin" />
            </div>
          ) : depoimentos.length === 0 ? (
            <div className="bg-muted rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Em breve os primeiros depoimentos aparecerão aqui.<br />
                <span className="font-semibold">Seja o primeiro a compartilhar sua história!</span>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {depoimentos.map((d) => (
                <TestimonialCard key={d.id} depoimento={d} />
              ))}
            </div>
          )}
        </div>

        {/* Portal de Egressos */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <h3 className="font-bold text-sm">Continue conectado(a) ao IFC</h3>
          </div>
          <p className="text-sm text-blue-800 leading-relaxed">
            O IFC acompanha as trajetórias dos estudantes após a conclusão dos cursos. Participar das iniciativas voltadas aos egressos ajuda a fortalecer a instituição e contribui para melhorias nos cursos e nas políticas educacionais.
          </p>
          <a
            href="https://egresso.ifc.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all"
          >
            🔗 Portal de Egressos do IFC
          </a>
        </div>

      </div>
    </div>
  );
}