import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MAX = 300;

const APOS_SUGGESTIONS = [
  "Continuei estudando",
  "Ingressei no ensino superior",
  "Consegui uma nova oportunidade",
  "Continuei na mesma atividade",
  "Abri meu próprio negócio",
];

const SITUACAO_OPTIONS = [
  "Continuei trabalhando",
  "Continuei estudando",
  "Continuei trabalhando e estudando",
  "Estou procurando novas oportunidades",
  "Outro",
];

const CONTRIBUICAO_OPTIONS = [
  "Sim, muito",
  "Sim, parcialmente",
  "Pouco",
  "Ainda estou construindo esse caminho",
];

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-bold leading-snug block">{label}</label>
      {hint && <p className="text-xs text-muted-foreground leading-snug">{hint}</p>}
      {children}
    </div>
  );
}

function CharTextarea({ value, onChange, placeholder, max }) {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-input bg-background px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
      <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">
        {value.length}/{max}
      </span>
    </div>
  );
}

const emptyForm = {
  nome: "",
  idade: "",
  ano_conclusao: "",
  curso: "",
  cidade_estado: "",
  texto_conciliar: "",
  texto_apos: "",
  contribuicao_projetos: "",
  situacao_atual: [],
  mensagem: "",
  autorizado: false,
};

export default function TestimonialForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [done, setDone] = useState(false);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const toggleSituacao = (opt) => {
    setForm((f) => {
      const cur = f.situacao_atual;
      return {
        ...f,
        situacao_atual: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt],
      };
    });
  };

  const handleEnviar = async () => {
    // Validação dos obrigatórios
    if (!form.nome.trim() || !form.ano_conclusao || !form.curso.trim() || !form.autorizado) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    setLoading(true);
    await onSubmit({
      ...form,
      idade: form.idade ? Number(form.idade) : undefined,
      ano_conclusao: Number(form.ano_conclusao),
    });
    setLoading(false);
    setDone(true);
  };

  // Tela de sucesso
  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 space-y-5 text-center">
        <div className="text-5xl">🙏</div>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-2">
          <p className="text-base font-bold text-green-800">Obrigado(a) por compartilhar!</p>
          <p className="text-sm text-green-700 leading-relaxed">
            Seu depoimento será revisado e publicado em breve. Sua história vai inspirar muita gente.
          </p>
        </div>
        <Button onClick={onCancel} className="w-full h-12 rounded-xl text-base font-bold">
          Voltar para Vozes da Trilha
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-5 space-y-5 pb-10">

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground leading-snug">Compartilhe sua trajetória</p>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">Sua história pode inspirar quem está estudando hoje.</p>
      </div>

      {/* Nome */}
      <Field label="Nome completo *" hint="Seu nome completo é usado apenas para identificação interna. Publicamente aparecerá apenas seu primeiro nome.">
        <Input value={form.nome} onChange={(e) => set("nome", e.target.value)}
          placeholder="Ex: Maria da Silva" className="h-12 rounded-xl text-base" />
      </Field>

      {/* Idade */}
      <Field label="Idade">
        <Input type="number" value={form.idade} onChange={(e) => set("idade", e.target.value)}
          placeholder="Opcional" className="h-12 rounded-xl text-base" />
      </Field>

      {/* Ano de conclusão */}
      <Field label="Ano de conclusão do curso *">
        <Input type="number" value={form.ano_conclusao} onChange={(e) => set("ano_conclusao", e.target.value)}
          placeholder="Ex: 2024" className="h-12 rounded-xl text-base" />
      </Field>

      {/* Curso */}
      <Field label="Curso que você concluiu *">
        <Input value={form.curso} onChange={(e) => set("curso", e.target.value)}
          placeholder="Ex: Eletricista Industrial" className="h-12 rounded-xl text-base" />
      </Field>

      {/* Cidade */}
      <Field label="Cidade e Estado">
        <Input value={form.cidade_estado} onChange={(e) => set("cidade_estado", e.target.value)}
          placeholder="Ex: Blumenau - SC (opcional)" className="h-12 rounded-xl text-base" />
      </Field>

      {/* Como foi conciliar */}
      <Field label="📖 Como foi conciliar trabalho, família e estudos?">
        <CharTextarea
          value={form.texto_conciliar}
          onChange={(v) => set("texto_conciliar", v)}
          placeholder="Conte um pouco sobre sua experiência..."
          max={MAX}
        />
      </Field>

      {/* Após a conclusão */}
      <Field label="🎓 O que aconteceu após a conclusão do curso?">
        <CharTextarea
          value={form.texto_apos}
          onChange={(v) => set("texto_apos", v)}
          placeholder="Continuei estudando, consegui uma nova oportunidade, abri meu próprio negócio..."
          max={MAX}
        />
        <p className="text-xs text-muted-foreground mt-1">💡 Sugestões — clique para usar:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {APOS_SUGGESTIONS.map((s) => (
            <button key={s} type="button"
              onClick={() => set("texto_apos", s)}
              className="text-xs px-3 py-1.5 rounded-xl border border-primary/40 bg-primary/5 text-primary font-semibold hover:bg-primary/15 active:scale-95 transition-all">
              {s}
            </button>
          ))}
        </div>
      </Field>

      {/* Contribuição para projetos — radio */}
      <Field label="🌱 O curso contribuiu para seus projetos de vida?">
        <div className="space-y-2 pt-1">
          {CONTRIBUICAO_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="contribuicao" value={opt}
                checked={form.contribuicao_projetos === opt}
                onChange={() => set("contribuicao_projetos", opt)}
                className="w-4 h-4 accent-primary shrink-0" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </Field>

      {/* Situação atual — checkbox */}
      <Field label="📚 Após concluir o curso, você:">
        <div className="space-y-2 pt-1">
          {SITUACAO_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value={opt}
                checked={form.situacao_atual.includes(opt)}
                onChange={() => toggleSituacao(opt)}
                className="w-4 h-4 accent-primary shrink-0" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </Field>

      {/* Mensagem */}
      <Field label="💬 Que mensagem você gostaria de deixar para quem está estudando hoje?">
        <CharTextarea
          value={form.mensagem}
          onChange={(v) => set("mensagem", v)}
          placeholder="Uma palavra, uma frase, um conselho para quem está na sala de aula agora..."
          max={MAX}
        />
      </Field>

      {/* Autorização */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={form.autorizado}
          onChange={(e) => set("autorizado", e.target.checked)}
          className="mt-1 w-5 h-5 accent-primary shrink-0" />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Autorizo a publicação do meu depoimento no aplicativo Trilha EJA-EPT. Estou ciente de que apenas meu primeiro nome, idade (se autorizada), ano de conclusão e cidade (se informada) serão exibidos publicamente. Meus dados completos não serão compartilhados com terceiros. Posso solicitar a remoção a qualquer momento.
        </span>
      </label>

      {/* Erro de validação */}
      {validationError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 font-semibold">
          Por favor preencha os campos obrigatórios antes de enviar.
        </div>
      )}

      <div className="space-y-2 pb-6">
        <Button
          type="button"
          onClick={handleEnviar}
          disabled={loading}
          className="w-full h-14 rounded-xl text-base font-bold"
        >
          {loading ? "Enviando…" : "Enviar minha história ✓"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}
          className="w-full h-11 rounded-xl text-base">
          Cancelar
        </Button>
      </div>
    </div>
  );
}