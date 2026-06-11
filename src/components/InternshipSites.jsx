import { ArrowLeft, ExternalLink } from "lucide-react";

const secoes = [
  {
    titulo: "📋 Cadastre-se e receba vagas",
    subtitulo: "Crie seu perfil nesses sites e as empresas entram em contato com você",
    sites: [
      { emoji: "🎓", name: "CIEE — Nacional", url: "https://portal.ciee.org.br", description: "Principal portal do país para estágios e jovem aprendiz. Cadastre seu perfil e receba indicações de vagas." },
      { emoji: "🎓", name: "CIEE — Santa Catarina", url: "https://cieesc.org.br", description: "Portal dedicado a SC com vagas presenciais na região de Blumenau e Vale do Itajaí. Ideal para quem mora na região." },
      { emoji: "💼", name: "Nube", url: "https://www.nube.com.br", description: "Portal com foco em estudantes de ensino médio, técnico e superior. Cadastre seu perfil, faça testes gratuitos e receba vagas." },
      { emoji: "🏭", name: "IEL — Estágios na Indústria", url: "https://www.iel.org.br", description: "Instituto Euvaldo Lodi — especializado em estágios na área industrial. Ideal para quem busca estágio na área técnica e elétrica." },
      { emoji: "🌱", name: "Jovem Aprendiz", url: "https://www.gov.br/trabalho/pt-br/assuntos/aprendizagem-profissional", description: "Programa do governo federal para jovens de 14 a 24 anos. Trabalho com carteira assinada, salário e aprendizagem profissional. Cadastre-se pelo portal oficial." },
    ],
  },
  {
    titulo: "🔍 Busque vagas abertas",
    subtitulo: "Pesquise vagas disponíveis agora e candidate-se diretamente. LinkedIn e Indeed também têm vagas de estágio — acesse pela Central de Oportunidades.",
    sites: [
      { emoji: "🏢", name: "Companhia de Estágios", url: "https://www.ciadeestagios.com.br", description: "Vagas em grandes empresas nacionais e multinacionais. Forte em programas de estágio remoto e presencial." },
      { emoji: "⭐", name: "Super Estágios", url: "https://www.superestagios.com.br", description: "Milhares de vagas de estágio distribuídas pelo Brasil. Busque por área, cidade e nível de escolaridade." },
      { emoji: "🔎", name: "Estagiar", url: "https://www.estagiar.com.br", description: "Portal com vagas de estágio em todo o Brasil. Busque por região e área de interesse." },
    ],
  },

];

export default function InternshipSites({ onBack }) {
  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Sites de Estágio</h1>
            <p className="text-sm text-muted-foreground">Onde encontrar e se cadastrar para estágios</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 pb-12">

        {/* Intro atualizado */}
        <div className="bg-chart-5/10 border border-chart-5/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            O estágio pode ser uma oportunidade de aprendizagem, desenvolvimento profissional e aproximação com o mundo do trabalho. Nesta seção você encontrará plataformas confiáveis, programas institucionais e orientações para acompanhar oportunidades.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-xs text-orange-800 leading-relaxed">
            💡 Alguns sites servem para você se <strong>CADASTRAR</strong> e receber indicações de vagas. Outros servem para <strong>BUSCAR</strong> vagas abertas e se candidatar. Veja a diferença em cada um!
          </p>
        </div>

        {/* ── Nova Seção 1 — O que é estágio? ── */}
        <div>
          <h2 className="font-extrabold text-sm mb-3">❓ O que é Estágio?</h2>
          <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <h3 className="font-bold text-sm">Entenda o que é estágio</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`O estágio é uma atividade educativa supervisionada que faz parte do processo de formação profissional.\n\n- Permite desenvolver conhecimentos e experiências práticas\n- Pode ser obrigatório (previsto no curso) ou não obrigatório\n- Possui direitos e regras definidos em lei\n- O(a) estudante tem direito a bolsa-auxílio, seguro e condições dignas`}</p>
            <div className="bg-muted/40 rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="text-base">📋</span>
              <span className="text-xs font-semibold">Lei nº 11.788/2008 — Lei do Estágio</span>
            </div>
            <a href="https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11788.htm" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
              🔗 Conhecer a Lei do Estágio
            </a>
          </div>
        </div>

        {/* ── Seções existentes ── */}
        {secoes.map((s) => (
          <div key={s.titulo} className="space-y-3">
            <div>
              <h2 className="font-extrabold text-sm">{s.titulo}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{s.subtitulo}</p>
            </div>
            {s.sites.map((site, i) => (
              <a key={i} href={site.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:shadow-md transition-all active:scale-[0.98]">
                <span className="text-2xl">{site.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{site.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        ))}

        {/* ── Nova Seção 2 — IFC e Rede Federal ── */}
        <div className="space-y-3">
          <h2 className="font-extrabold text-sm">🏫 Oportunidades no IFC e na Rede Federal</h2>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-sm leading-relaxed">
              Além dos sites de estágio, muitas oportunidades podem surgir dentro do próprio IFC. Algumas são divulgadas por meio de editais, outras pelos professores, coordenação do curso ou setores institucionais. Fique atento às informações compartilhadas pela escola.
            </p>
          </div>
          {[
            { emoji: "📢", titulo: "Como acompanhar oportunidades no IFC", texto: "Muitas oportunidades não aparecem nos grandes portais — chegam diretamente pela escola.\nFique atento a:\n- Site oficial do campus\n- Murais físicos\n- E-mails institucionais\n- Redes sociais oficiais\n- Avisos em sala de aula\n- Comunicados da coordenação" },
            { emoji: "👨‍🏫", titulo: "Coordenação e Professores", texto: "A coordenação do curso e os professores podem informar sobre:\n- Oportunidades de estágio\n- Empresas parceiras\n- Projetos institucionais\n- Processos seletivos\n- Programas de bolsas\n- Eventos da área\n\nNão hesite em conversar — eles podem abrir portas que você ainda não conhece!" },
            { emoji: "🔬", titulo: "Projetos de Ensino, Pesquisa e Extensão", texto: "Os Institutos Federais frequentemente oferecem:\n- Bolsas de pesquisa\n- Bolsas de extensão\n- Monitorias\n- Projetos comunitários\n- Atividades de formação complementar\n\nEssas experiências também contribuem para sua formação profissional e para o seu currículo!" },
          ].map((c, i) => (
            <div key={i} className="p-4 bg-card border border-border rounded-2xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{c.emoji}</span>
                <h3 className="font-bold text-sm">{c.titulo}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{c.texto}</p>
            </div>
          ))}
        </div>



      </div>
    </div>
  );
}