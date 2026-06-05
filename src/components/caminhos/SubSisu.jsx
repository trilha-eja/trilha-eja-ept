import PageHeader from "../PageHeader";

const infos = [
  { emoji: "🎓", titulo: "O que é?", texto: "O SISU usa a nota do ENEM para distribuir vagas em universidades federais e estaduais. É tudo gratuito!" },
  { emoji: "📅", titulo: "Quando?", texto: "Logo após a divulgação das notas do ENEM, geralmente em janeiro/fevereiro." },
  { emoji: "🔍", titulo: "Como funciona?", texto: "Você escolhe até 2 cursos. O sistema calcula se sua nota é suficiente. Funciona como um leilão." },
  { emoji: "📊", titulo: "Notas de corte", texto: "Cada curso tem uma nota mínima. Cursos mais concorridos pedem notas maiores." },
  { emoji: "🏷️", titulo: "Cotas", texto: "Há vagas reservadas para alunos de escola pública, negros, pardos, indígenas e baixa renda." },
  { emoji: "✅", titulo: "Se passou!", texto: "Faça a matrícula na universidade com seus documentos. Não perca o prazo!" },
];

export default function SubSisu({ onBack }) {
  return (
    <div>
      <PageHeader title="SISU" subtitle="Sistema de Seleção Unificada" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">O <strong>SISU</strong> usa sua nota do ENEM para garantir uma vaga em universidade pública e gratuita. É tudo online e sem taxa.</p>
        </div>

        {infos.map((i) => (
          <div key={i.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">{i.emoji}</span>
            <div>
              <p className="font-bold text-sm mb-0.5">{i.titulo}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{i.texto}</p>
            </div>
          </div>
        ))}

        {/* Como funciona na prática */}
        <div className="border border-border rounded-2xl p-4 bg-card space-y-2">
          <p className="font-bold text-sm">🔎 Como funciona na prática?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Após sair o resultado do ENEM, o SISU abre as inscrições. Você entra no site, coloca sua nota e escolhe até 2 cursos. O sistema calcula automaticamente se sua nota é suficiente. É tudo online e gratuito!
          </p>
        </div>

        {/* Link oficial */}
        <div className="border border-border rounded-2xl p-4 bg-card space-y-2">
          <p className="font-bold text-sm">Site oficial do SISU</p>
          <a href="https://sisu.mec.gov.br" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 active:scale-95 transition-all">
            🔗 Acessar site oficial do SISU
          </a>
        </div>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}