import PageHeader from "../PageHeader";
import AccordionSection from "../AccordionSection";

export default function SubSisu({ onBack }) {
  return (
    <div>
      <PageHeader title="SISU" subtitle="Sistema de Seleção Unificada" onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Abertura */}
        <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">O <strong>SISU</strong> permite usar sua nota do ENEM para concorrer a uma vaga em universidade pública e gratuita. É tudo online, sem taxa de inscrição.</p>
        </div>

        {/* Card 1 — O que é o SISU? */}
        <AccordionSection titulo="🎓 O que é o SISU?">
          <p className="text-sm text-muted-foreground leading-relaxed">O Sistema de Seleção Unificada distribui vagas em universidades federais e estaduais públicas usando a nota do ENEM. Você não precisa fazer outra prova — basta usar a nota que já tirou no ENEM.</p>
        </AccordionSection>

        {/* Card 2 — Como funciona na prática? */}
        <AccordionSection titulo="🔍 Como funciona na prática?">
          <p className="text-sm text-muted-foreground leading-relaxed">Após a divulgação das notas do ENEM, o SISU abre as inscrições. As datas mudam a cada edição — fique atento ao site oficial. Você acessa o site, informa sua nota e escolhe até 2 opções de curso e instituição. O sistema verifica automaticamente se sua nota é suficiente. É tudo online e gratuito.</p>
        </AccordionSection>

        {/* Card 4 — Notas de corte */}
        <AccordionSection titulo="📊 Notas de corte">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📊</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Cada curso tem uma nota mínima necessária para aprovação — chamada nota de corte. Cursos mais concorridos exigem notas mais altas. Cursos menos concorridos podem ser acessíveis com notas menores.</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Pesquise as notas de edições anteriores para ter uma referência — elas ficam disponíveis no site oficial do SISU.</p>
            </div>
          </div>
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-foreground">💡 Não desanime antes de pesquisar. Muitos cursos têm notas de corte mais acessíveis do que você imagina.</p>
          </div>
        </AccordionSection>

        {/* Card 5 — Cotas e vagas reservadas */}
        <AccordionSection titulo="🏷️ Cotas e vagas reservadas">
          <p className="text-sm text-muted-foreground leading-relaxed">As universidades federais reservam vagas para estudantes de escola pública, pessoas negras, pardas, indígenas e de baixa renda. Verifique se você tem direito a concorrer pelas cotas — pode aumentar muito suas chances de aprovação.</p>
        </AccordionSection>

        {/* Card 6 — E se não passar na primeira chamada? */}
        <AccordionSection titulo="🔄 E se não passar?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">🔄</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Não desanime. O SISU tem chamadas e lista de espera. Muitos estudantes são chamados após a primeira divulgação.</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Além disso, você pode tentar o ENEM novamente no ano seguinte com mais preparo. Trajetórias não lineares são comuns e legítimas.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card 7 — Se você for aprovado */}
        <AccordionSection titulo="✅ Se você for aprovado">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">✅</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Fique atento ao prazo de matrícula na universidade — ele é curto e não pode ser perdido. Separe seus documentos com antecedência:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• RG e CPF</li>
                <li>• Histórico escolar</li>
                <li>• Comprovante de residência</li>
                <li>• Outros documentos que a instituição solicitar</li>
              </ul>
            </div>
          </div>
        </AccordionSection>

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