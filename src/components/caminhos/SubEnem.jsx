import PageHeader from "../PageHeader";
import AccordionSection from "../AccordionSection";

const apps = [
  {
    nome: "MEC ENEM",
    descricao: "App oficial do Ministério da Educação com questões anteriores do ENEM, simulados e gabarito.",
    url: "https://play.google.com/store/search?q=mec%20enem&c=apps",
  },
  {
    nome: "Prepara: Simulado ENEM 2026",
    descricao: "Simulados completos no formato do ENEM com gabarito e desempenho por área do conhecimento.",
    url: "https://play.google.com/store/search?q=prepara%20enem&c=apps",
  },
  {
    nome: "ENEM 2026",
    descricao: "Questões organizadas por ano e disciplina, com gabarito comentado para estudar no celular.",
    url: "https://play.google.com/store/apps/details?id=dev.mdxco.enem",
  },
];

const sites = [
  {
    nome: "Cora Redação",
    descricao: "Plataforma gratuita com dicas, temas e correção de redação no estilo ENEM.",
    url: "https://coredacao.com/conteudo/",
  },
  {
    nome: "Corrige Aqui — Brasil Escola",
    descricao: "Ferramenta gratuita do Brasil Escola para praticar e receber dicas de redação para o ENEM.",
    url: "https://vestibular.brasilescola.uol.com.br/corrige-aqui",
  },
  {
    nome: "Cria — Redação Online",
    descricao: "Plataforma de escrita criativa e redação. Possui recursos gratuitos para estudantes — atenção: também tem versão paga, explore primeiro a parte gratuita.",
    url: "https://cria.net.br/",
  },
];

export default function SubEnem({ onBack, onNavigate }) {
  return (
    <div>
      <PageHeader title="ENEM" subtitle="Exame Nacional do Ensino Médio" onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Abertura */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">O <strong>ENEM</strong> é a principal porta de entrada para o ensino superior público e gratuito no Brasil. Mais do que uma prova, é uma oportunidade de ampliar seus horizontes formativos — no seu tempo e da sua forma.</p>
        </div>

        {/* Card 1 — O que é o ENEM? */}
        <AccordionSection titulo="🎓 O que é o ENEM?">
          <p className="text-sm text-muted-foreground leading-relaxed">O Exame Nacional do Ensino Médio avalia o desempenho escolar ao final da educação básica. A nota pode ser usada para:</p>
          <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
            <li>• Ingressar em universidades públicas gratuitas pelo SISU</li>
            <li>• Concorrer a bolsas em faculdades particulares pelo PROUNI</li>
            <li>• Solicitar financiamento estudantil pelo FIES</li>
            <li>• Ingressar diretamente em algumas instituições de ensino</li>
          </ul>
        </AccordionSection>

        {/* Card 2 — Quem pode participar? */}
        <AccordionSection titulo="👥 Quem pode participar?">
          <p className="text-sm text-muted-foreground leading-relaxed">Qualquer pessoa pode fazer o ENEM, independentemente da idade ou do ano em que concluiu o Ensino Médio. Estudantes da EJA também podem participar normalmente.</p>
          <div className="mt-2 bg-accent/10 border border-accent/20 rounded-xl p-3">
            <p className="text-sm leading-relaxed text-foreground">💡 Estudantes de escola pública e pessoas de baixa renda podem solicitar isenção da taxa de inscrição. Verifique as condições no site oficial do INEP.</p>
          </div>
        </AccordionSection>

        {/* Card 3 — Como se inscrever? */}
        <AccordionSection titulo="📝 Como se inscrever?">
          <p className="text-sm text-muted-foreground leading-relaxed">As inscrições são feitas pelo site oficial do INEP, totalmente online. É necessário criar uma conta com seus dados pessoais.</p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">Fique atento às datas de inscrição divulgadas anualmente no site oficial — elas mudam a cada edição.</p>
          <div className="mt-3">
            <a href="https://enem.inep.gov.br" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
              🔗 Acessar site oficial do ENEM
            </a>
          </div>
        </AccordionSection>

        {/* Card 4 — O que é avaliado? */}
        <AccordionSection titulo="📚 O que é avaliado?">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">📚</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">O ENEM avalia 4 áreas do conhecimento:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• Linguagens e Códigos</li>
                <li>• Ciências Humanas</li>
                <li>• Ciências da Natureza</li>
                <li>• Matemática e suas Tecnologias</li>
              </ul>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Além de uma Redação, que tem peso muito importante na nota final. Comece pelos conteúdos básicos e consulte as matrizes de referência no site do INEP.</p>
            </div>
          </div>
        </AccordionSection>

        {/* Card 5 — Você não precisa de nota máxima */}
        <div className="rounded-2xl border-2 p-4" style={{ backgroundColor: "#FFF3E0", borderColor: "#E86826" }}>
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">🌱</span>
            <div>
              <p className="font-bold text-sm mb-1">Você não precisa de nota máxima</p>
              <p className="text-xs leading-relaxed text-foreground">Cada curso tem sua própria nota de corte — e muitos cursos são acessíveis com notas medianas. A nota que você precisa depende do curso e da instituição que você escolher. Informe-se antes de desistir!</p>
            </div>
          </div>
        </div>

        {/* Card 6 — Como estudar mesmo trabalhando */}
        <AccordionSection titulo="⏱️ Como estudar mesmo trabalhando">
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">⏱️</span>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">Você não precisa de horas livres para se preparar. Pequenos momentos já ajudam:</p>
              <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                <li>• Resolva uma questão por dia</li>
                <li>• Assista videoaulas curtas no transporte ou no intervalo</li>
                <li>• Use aplicativos gratuitos no celular</li>
                <li>• Faça provas antigas — são gratuitas no site do INEP</li>
                <li>• Foque nos seus pontos fracos</li>
              </ul>
            </div>
          </div>
          <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
            🔗 Provas anteriores — INEP
          </a>
        </AccordionSection>

        {/* Card 7 — Aplicativos para baixar e estudar */}
        <AccordionSection titulo="📱 Aplicativos para baixar e estudar">
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Para baixar no celular: abra a Play Store, toque na lupa e pesquise pelo nome do app.
          </p>
          <div className="space-y-2">
            {apps.map((a) => (
              <AccordionSection key={a.nome} titulo={a.nome}>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.descricao}</p>
                <a href={a.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all mt-2">
                  🔗 Ver na Play Store
                </a>
              </AccordionSection>
            ))}
          </div>
          <div className="pt-3">
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Para conhecer mais aplicativos e ferramentas gratuitas de estudo, acesse a seção Ferramentas Digitais neste módulo.
            </p>
            <button
              onClick={() => onNavigate("ferramentas")}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              📱 Ver Ferramentas Digitais
            </button>
          </div>
        </AccordionSection>

        {/* Card 8 — Sites para estudar e praticar redação */}
        <AccordionSection titulo="🌐 Sites para estudar e praticar redação">
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Acesse pelo navegador, sem precisar instalar nada
          </p>
          <div className="space-y-2">
            {sites.map((s) => (
              <AccordionSection key={s.nome} titulo={s.nome}>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.descricao}</p>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all mt-2">
                  🔗 Acessar site
                </a>
              </AccordionSection>
            ))}
          </div>
        </AccordionSection>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}