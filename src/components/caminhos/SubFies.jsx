import PageHeader from "../PageHeader";
import AccordionSection from "../AccordionSection";

export default function SubFies({ onBack }) {
  return (
    <div>
      <PageHeader title="FIES" subtitle="Financiamento Estudantil do Governo Federal" onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Aviso em destaque — manter exatamente */}
        <div className="rounded-2xl p-4 bg-red-50 border border-red-300 space-y-1">
          <p className="text-sm font-bold text-red-800">⚠️ Atenção antes de continuar!</p>
          <p className="text-xs text-red-700 leading-relaxed">
            O FIES é um <strong>empréstimo</strong> do governo para pagar a faculdade. Diferente do PROUNI, você precisará <strong>devolver o dinheiro</strong> depois que se formar. Antes de optar pelo FIES, tente primeiro o <strong>PROUNI</strong> e o <strong>SISU</strong> — que são totalmente gratuitos e não geram dívida.
          </p>
        </div>

        {/* Card — O que é o FIES? */}
        <AccordionSection titulo="🎓 O que é o FIES?">
          <p className="text-sm text-muted-foreground leading-relaxed">O FIES (Fundo de Financiamento Estudantil) é um programa do governo federal que financia parte ou a totalidade das mensalidades de faculdades privadas. Durante o curso você paga uma parcela mínima. Após se formar, tem um prazo para quitar o restante com juros. É um empréstimo — não uma bolsa.</p>
        </AccordionSection>

        {/* Card — Quem pode participar? */}
        <AccordionSection titulo="📋 Quem pode participar?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📋</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Para se candidatar ao FIES você precisa:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• Ter feito o ENEM com pontuação mínima exigida (exceto nota zero na redação)</li>
                <li>• Atender aos critérios de renda familiar estabelecidos para cada edição</li>
                <li>• Não ter diploma de curso superior</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Os critérios de pontuação e renda mudam a cada edição — consulte sempre o site oficial antes de se inscrever.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card — Como funciona o pagamento? */}
        <AccordionSection titulo="💰 Como funciona o pagamento?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">💰</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Durante o curso você paga uma parcela mínima mensal. Após se formar, você tem um prazo para quitar o restante com juros — conforme as regras vigentes no momento da contratação.</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Antes de assinar, verifique no site oficial:</p>
              <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                <li>• O valor das parcelas durante o curso</li>
                <li>• O prazo total para quitação</li>
                <li>• A taxa de juros atual</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">As condições podem mudar a cada edição do programa.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card — Cuidados importantes */}
        <AccordionSection titulo="⚠️ Cuidados importantes">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">⚠️</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Antes de assinar o contrato do FIES, considere:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• Você terá uma dívida real para pagar após se formar(a)</li>
                <li>• Calcule se a renda esperada na sua profissão vai cobrir as parcelas</li>
                <li>• Pesquise se o curso é reconhecido pelo MEC — cursos não reconhecidos não têm validade no mercado</li>
                <li>• Guarde todos os comprovantes de pagamento</li>
              </ul>
            </div>
          </div>
        </AccordionSection>

        {/* Card — FIES x PROUNI — manter exatamente */}
        <AccordionSection titulo="🔄 FIES x PROUNI — qual escolher?">
          <p className="text-sm text-muted-foreground leading-relaxed">Se você tem renda familiar de até 3 salários mínimos por pessoa, tente primeiro o PROUNI — é bolsa, não empréstimo. Use o FIES apenas se não conseguir o PROUNI ou o SISU, e se tiver certeza que conseguirá pagar a dívida depois de formado(a).</p>
        </AccordionSection>

        {/* Card — Como se inscrever? */}
        <AccordionSection titulo="📝 Como se inscrever?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📝</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">As inscrições são feitas pelo site oficial do FIES, totalmente online e gratuitas. Tenha em mãos:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• RG e CPF</li>
                <li>• Comprovante de renda familiar</li>
                <li>• Resultado do ENEM</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">As datas de inscrição mudam a cada edição — acompanhe o site oficial.</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-red-800">⚠️ Atenção: nunca pague para se inscrever no FIES. Desconfie de sites que cobram taxas — a inscrição é sempre gratuita pelo site oficial.</p>
          </div>
          <a
            href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/financiamento/fies"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
          >
            🔗 Acessar site oficial do FIES
          </a>
        </AccordionSection>

        {/* Mensagem de encorajamento — manter exatamente */}
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