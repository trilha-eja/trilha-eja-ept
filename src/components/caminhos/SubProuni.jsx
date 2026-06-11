import PageHeader from "../PageHeader";
import AccordionSection from "../AccordionSection";

export default function SubProuni({ onBack }) {
  return (
    <div>
      <PageHeader title="PROUNI" subtitle="Programa Universidade para Todos" onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Abertura */}
        <div className="bg-chart-4/10 border border-chart-4/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">O <strong>PROUNI</strong> oferece bolsas de estudo em faculdades particulares — sem gerar dívida e sem precisar devolver nada. Conheça os critérios e veja se você tem direito.</p>
        </div>

        {/* Card 1 — O que é o PROUNI? */}
        <AccordionSection titulo="🎁 O que é o PROUNI?">
          <p className="text-sm text-muted-foreground leading-relaxed">O Programa Universidade para Todos oferece bolsas de estudo em faculdades particulares. Existem dois tipos:</p>
          <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
            <li>• <strong>Bolsa integral</strong> — cobre 100% da mensalidade</li>
            <li>• <strong>Bolsa parcial</strong> — cobre 50% da mensalidade</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">Diferente do FIES, o PROUNI é uma bolsa — não um empréstimo. Você não precisa devolver nada.</p>
        </AccordionSection>

        {/* Card 2 — Quem pode participar? */}
        <AccordionSection titulo="👥 Quem pode participar?">
          <p className="text-sm text-muted-foreground leading-relaxed">Para concorrer ao PROUNI você precisa:</p>
          <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
            <li>• Ter feito o ENEM</li>
            <li>• Ter atingido a pontuação mínima exigida (exceto na redação nota zero)</li>
            <li>• Não ter diploma de curso superior</li>
            <li>• Atender aos critérios de renda familiar</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">Verifique os critérios atualizados no site oficial do PROUNI — as regras podem mudar a cada edição.</p>
          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-sm leading-relaxed text-foreground">💡 Há vagas reservadas para professores da rede pública, pessoas com deficiência e indígenas — mesmo que não atendam aos critérios de renda.</p>
          </div>
        </AccordionSection>

        {/* Card 3 — Critério de renda */}
        <AccordionSection titulo="💰 Critério de renda">
          <p className="text-sm text-muted-foreground leading-relaxed">O PROUNI tem critérios de renda familiar por pessoa. Os valores são atualizados anualmente e variam conforme o tipo de bolsa:</p>
          <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
            <li>• <strong>Bolsa integral:</strong> renda menor</li>
            <li>• <strong>Bolsa parcial:</strong> renda um pouco maior</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">Consulte os valores exatos no site oficial do PROUNI — eles mudam a cada edição.</p>
        </AccordionSection>

        {/* Card 4 — Cursos disponíveis */}
        <AccordionSection titulo="🏫 Quais cursos disponíveis?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">🏫</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">O PROUNI oferece bolsas em centenas de cursos diferentes: engenharia, tecnologia, saúde, educação, administração e muito mais. A disponibilidade varia conforme a instituição e a região. Pesquise no site oficial os cursos disponíveis na sua cidade.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card 5 — Como se inscrever? */}
        <AccordionSection titulo="📝 Como se inscrever?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📝</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">As inscrições são feitas pelo site oficial do PROUNI, totalmente online e gratuitas. Você pode escolher até 2 opções de curso e instituição. As datas de inscrição mudam a cada edição — fique atento ao site oficial.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card 6 — Documentos necessários */}
        <AccordionSection titulo="📄 Documentos necessários">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📄</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Separe com antecedência:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• RG e CPF</li>
                <li>• Comprovante de renda familiar</li>
                <li>• Comprovante de residência</li>
                <li>• Histórico escolar</li>
                <li>• Outros documentos que a instituição solicitar</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Guarde cópias de tudo — podem ser solicitados em diferentes etapas.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card 7 — E se a bolsa for parcial? */}
        <AccordionSection titulo="🔄 E se a bolsa for parcial?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">🔄</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">A bolsa parcial cobre 50% da mensalidade. Para o restante, algumas opções são:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• Solicitar o FIES para financiar a parte não coberta</li>
                <li>• Verificar se a instituição oferece bolsas complementares</li>
                <li>• Negociar diretamente com a faculdade</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Pesquise todas as possibilidades antes de desistir.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Aviso de segurança */}
        <div className="rounded-2xl p-4 bg-orange-50 border border-orange-200 space-y-2">
          <p className="text-sm font-bold text-orange-800">✅ Site oficial verificado: prouniportal.mec.gov.br</p>
          <p className="text-xs text-orange-700 leading-relaxed">Desconfie de sites parecidos — use sempre o link oficial abaixo.</p>
          <a href="https://prouniportal.mec.gov.br" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
            🔗 Acessar site oficial do PROUNI
          </a>
        </div>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}