import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MAX_CHARS = 1000;

export default function TestimonialForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    nome: "", idade: "", curso: "", ano_conclusao: "",
    cidade_estado: "", texto: "", autorizado: false,
  });
  const [loading, setLoading] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const isValid = form.nome.trim() && form.idade && form.curso.trim() &&
    form.ano_conclusao && form.texto.trim() && form.autorizado;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    await onSubmit({ ...form, idade: Number(form.idade), ano_conclusao: Number(form.ano_conclusao) });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-5 space-y-4">
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
        <p className="text-sm text-foreground leading-relaxed">
          🌟 Sua história pode iluminar o caminho de alguém que está exatamente onde você esteve. Obrigado por compartilhar!
        </p>
      </div>

      <Field label="Nome completo *">
        <Input value={form.nome} onChange={(e) => set("nome", e.target.value)}
          placeholder="Ex: Maria da Silva" className="h-12 rounded-xl text-base" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Idade *">
          <Input type="number" value={form.idade} onChange={(e) => set("idade", e.target.value)}
            placeholder="Ex: 42" className="h-12 rounded-xl text-base" />
        </Field>
        <Field label="Ano de conclusão *">
          <Input type="number" value={form.ano_conclusao} onChange={(e) => set("ano_conclusao", e.target.value)}
            placeholder="Ex: 2023" className="h-12 rounded-xl text-base" />
        </Field>
      </div>

      <Field label="Curso que concluiu na EJA *">
        <Input value={form.curso} onChange={(e) => set("curso", e.target.value)}
          placeholder="Ex: Eletricista Industrial — IFC" className="h-12 rounded-xl text-base" />
      </Field>

      <Field label="Cidade e Estado (opcional)">
        <Input value={form.cidade_estado} onChange={(e) => set("cidade_estado", e.target.value)}
          placeholder="Ex: Blumenau — SC" className="h-12 rounded-xl text-base" />
      </Field>

      <Field label={`Sua história * (${form.texto.length}/${MAX_CHARS})`}>
        <textarea
          value={form.texto}
          onChange={(e) => set("texto", e.target.value.slice(0, MAX_CHARS))}
          placeholder="Conte como foi conciliar trabalho e estudo, como você deu o próximo passo e o que diria para quem está na sala de aula agora..."
          rows={6}
          className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
      </Field>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.autorizado}
          onChange={(e) => set("autorizado", e.target.checked)}
          className="mt-1 w-5 h-5 accent-primary shrink-0"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Autorizo a publicação do meu depoimento no aplicativo Trilha EJA-EPT, podendo ser removido a qualquer momento mediante solicitação. Meus dados não serão compartilhados com terceiros.
        </span>
      </label>

      <div className="space-y-2 pb-6">
        <Button type="submit" disabled={!isValid || loading}
          className="w-full h-14 rounded-xl text-base font-bold">
          {loading ? "Enviando…" : "Enviar minha história"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}
          className="w-full h-11 rounded-xl text-base">
          Cancelar
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold">{label}</label>
      {children}
    </div>
  );
}