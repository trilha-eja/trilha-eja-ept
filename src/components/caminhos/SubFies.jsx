import PageHeader from "../PageHeader";

const infos = [
  { emoji: "🎓", titulo: "O que é o FIES?", texto: "O FIES (Fundo de Financiamento Estudantil) é um programa do governo federal que financia até 100% das mensalidades de faculdades privadas. Você paga enquanto estuda uma taxa mínima e quita o restante após se formar, com juros baixos." },
  { emoji: "📋", titulo: "Quem pode participar?", texto: "Para se candidatar ao FIES você precisa:\n- Ter feito o ENEM a partir de 2010 com nota acima de 450 pontos\n- Não ter zerado a redação\n- Renda familiar de até 3 salários mínimos por pessoa\n- Não ter diploma de curso superior" },
  { emoji: "💰", titulo: "Como funciona o pagamento?", texto: "Durante o curso você paga uma parcela mínima mensal. Após se formar, tem até 3 vezes o tempo do curso para quitar a dívida com juros de 3,4% ao ano. Exemplo: curso de 4 anos → até 12 anos para pagar depois." },
  { emoji: "⚠️", titulo: "Cuidados importantes", texto: "Antes de assinar o contrato do FIES, considere:\n- Você terá uma dívida real para pagar após se formar\n- Calcule se o salário da sua profissão vai cobrir as parcelas\n- Pesquise bem a faculdade — escolha cursos reconhecidos pelo MEC\n- Guarde todos os comprovantes de pagamento" },
  { emoji: "🔄", titulo: "FIES x PROUNI — qual escolher?", texto: "Se você tem renda familiar de até 3 salários mínimos por pessoa, tente primeiro o PROUNI — é bolsa, não empréstimo. Use o FIES apenas se não conseguir o PROUNI ou o SISU, e se tiver certeza que conseguirá pagar a dívida depois de formado." },
];

export default function SubFies({ onBack }) {
  return (
    <div>
      <PageHeader title="FIES" subtitle="Financiamento Estudantil — entenda antes de decidir" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Aviso em destaque */}
        <div className="rounded-2xl p-4 bg-red-50 border border-red-300 space-y-1">
          <p className="text-sm font-bold text-red-800">⚠️ Atenção antes de continuar!</p>
          <p className="text-xs text-red-700 leading-relaxed">
            O FIES é um <strong>empréstimo</strong> do governo para pagar a faculdade. Diferente do PROUNI, você precisará <strong>devolver o dinheiro</strong> depois que se formar. Antes de optar pelo FIES, tente primeiro o <strong>PROUNI</strong> e o <strong>SISU</strong> — que são totalmente gratuitos e não geram dívida.
          </p>
        </div>

        {infos.map((i) => (
          <div key={i.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">{i.emoji}</span>
            <div>
              <p className="font-bold text-sm mb-0.5">{i.titulo}</p>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{i.texto}</p>
            </div>
          </div>
        ))}

        {/* Card 6 — Como se inscrever com botão */}
        <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">📝</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm mb-0.5">Como se inscrever?</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              As inscrições são feitas pelo site oficial do FIES. O processo é online e gratuito. Tenha em mãos: RG, CPF, comprovante de renda e resultado do ENEM.
            </p>
            <a
              href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/financiamento/fies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              🔗 Acessar site oficial do FIES
            </a>
          </div>
        </div>

        {/* Mensagem de encorajamento */}
        <div className="rounded-2xl p-4 bg-orange-50 border border-orange-200">
          <p className="text-xs text-orange-800 leading-relaxed">
            💡 <strong>Lembre-se:</strong> existem caminhos gratuitos como o PROUNI e o SISU. Pesquise todas as opções antes de assumir um financiamento. Conhecer suas opções é o primeiro passo para uma decisão consciente.
          </p>
        </div>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}