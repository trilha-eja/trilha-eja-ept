import { ArrowLeft } from "lucide-react";

function SecaoHeader({ titulo, subtitulo }) {
  return (
    <div className="pt-2">
      <h2 className="font-extrabold text-base leading-tight">{titulo}</h2>
      {subtitulo && <p className="text-xs text-muted-foreground mt-0.5">{subtitulo}</p>}
    </div>
  );
}

function InfoCard({ emoji, titulo, texto }) {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-bold text-sm">{titulo}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{texto}</p>
    </div>
  );
}

function LinkCard({ emoji, titulo, texto, url }) {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-bold text-sm">{titulo}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
        🔗 Acessar
      </a>
    </div>
  );
}

function VideoCard({ titulo, texto, url }) {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
      <h3 className="font-bold text-sm">{titulo}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
        ▶️ Ver vídeos
      </a>
    </div>
  );
}

export default function ConcursosProcessos({ onBack }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Concursos e Processos Seletivos</h1>
            <p className="text-sm text-muted-foreground leading-snug">Oportunidades além das vagas tradicionais</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-12">

        {/* Intro */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed">
            Além das vagas tradicionais, existem outros caminhos no mundo do trabalho que muitos trabalhadores-estudantes não conhecem. Concursos públicos e processos seletivos podem abrir portas importantes para sua trajetória profissional.
          </p>
        </div>

        {/* ── Seção 1 — O que são? ── */}
        <SecaoHeader titulo="🏛️ O que são Concursos e Processos Seletivos?" />

        <InfoCard
          emoji="📋"
          titulo="Concurso Público"
          texto={"É uma seleção realizada pelo governo para contratar servidores públicos.\nAs vagas são abertas por edital, as regras são claras e públicas, e quem passa tem estabilidade no emprego.\nQualquer pessoa pode participar se atender aos requisitos do edital."}
        />
        <InfoCard
          emoji="📝"
          titulo="Processo Seletivo Simplificado"
          texto={"É uma seleção mais rápida, geralmente para contratos temporários em órgãos públicos.\nPode ser por análise de currículo, prova ou entrevista.\nTambém é divulgado por edital e segue regras públicas."}
        />

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <h3 className="font-bold text-sm">Você Sabia?</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Muitos concursos e processos seletivos exigem apenas:
          </p>
          <ul className="text-sm leading-relaxed mt-1 space-y-0.5 ml-2">
            <li>- Ensino Fundamental</li>
            <li>- Ensino Médio</li>
            <li>- Cursos de qualificação profissional</li>
          </ul>
          <p className="text-sm leading-relaxed mt-2">
            Quem está concluindo a EJA-EPT já tem qualificação para concorrer a diversas oportunidades! Fique atento aos editais.
          </p>
        </div>

        {/* ── Seção 2 — Onde Procurar ── */}
        <SecaoHeader titulo="🔍 Onde Procurar Oportunidades?" />

        <InfoCard
          emoji="⚡"
          titulo="Empresas Públicas e de Economia Mista"
          texto={"Empresas como as de energia elétrica, saneamento, Correios, bancos públicos e cooperativas mistas frequentemente abrem processos seletivos para eletricistas e técnicos.\nFique de olho nos portais de concursos!"}
        />
        <InfoCard
          emoji="🎓"
          titulo="Institutos Federais e Universidades Públicas"
          texto={"Os Institutos Federais e as Universidades Públicas frequentemente abrem processos seletivos para técnicos e assistentes administrativos.\n\n💡 Fique de olho nos portais de concursos listados nesta página e nas redes sociais dessas instituições — os editais são divulgados assim que abrem!"}
        />
        <InfoCard
          emoji="🏙️"
          titulo="Prefeituras e Câmaras Municipais"
          texto={"Municípios realizam concursos e processos seletivos para diversas áreas, incluindo manutenção elétrica e infraestrutura.\nAcompanhe os editais da sua cidade e região."}
        />

        {/* ── Seção 3 — Sites ── */}
        <SecaoHeader titulo="🌐 Sites Confiáveis para Acompanhar Editais" subtitulo="Clique para abrir diretamente 👇" />

        <LinkCard emoji="🏆" titulo="PCI Concursos" texto="Um dos maiores portais de divulgação de concursos públicos do país. Fácil de usar e atualizado diariamente." url="https://www.pciconcursos.com.br" />
        <LinkCard emoji="📰" titulo="Concursos no Brasil" texto="Portal de notícias e acompanhamento de concursos e processos seletivos em todo o país." url="https://concursosnobrasil.com" />
        <LinkCard emoji="🏛️" titulo="Portal Gov.br" texto="Portal oficial do Governo Federal onde órgãos públicos divulgam seus editais e processos seletivos." url="https://www.gov.br" />

        {/* ── Seção 4 — Como ler um edital ── */}
        <SecaoHeader titulo="📖 Como Ler um Edital?" subtitulo="Um guia simples para quem está começando" />

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed">
            O edital é o documento oficial que explica tudo sobre o concurso. Parece complicado, mas seguindo estes passos fica mais fácil!
          </p>
        </div>

        <InfoCard emoji="👔" titulo="1. Cargo" texto="Verifique o nome do cargo e suas atribuições. Confira se tem relação com sua formação e experiência." />
        <InfoCard emoji="🎓" titulo="2. Escolaridade Exigida" texto="Cada cargo exige um nível de escolaridade. Verifique se você já atende ou está prestes a atender o requisito." />
        <InfoCard emoji="💰" titulo="3. Salário" texto="O edital informa o salário inicial do cargo. Compare com suas necessidades e expectativas." />
        <InfoCard emoji="📅" titulo="4. Inscrição" texto="Fique atento ao prazo e ao link para inscrição. A maioria das inscrições é online e gratuita para candidatos de baixa renda." />
        <InfoCard emoji="🗓️" titulo="5. Data da Prova" texto="Anote a data da prova no celular e planeje com antecedência." />
        <InfoCard emoji="📚" titulo="6. Conteúdo Programático" texto="É a lista de assuntos que podem ser cobrados na prova. Use essa lista para organizar seus estudos." />

        {/* ── Seção 5 — Vídeos ── */}
        <SecaoHeader titulo="🎬 Vídeos para te Ajudar" subtitulo="Clique para buscar vídeos no YouTube 👇" />

        <VideoCard titulo="Como estudar para concursos públicos" texto="Dicas práticas para quem está começando." url="https://www.youtube.com/results?search_query=como+estudar+para+concursos+publicos+iniciantes" />
        <VideoCard titulo="Como ler um edital" texto="Aprenda a entender os documentos oficiais." url="https://www.youtube.com/results?search_query=como+ler+edital+concurso+publico" />
        <VideoCard titulo="Concursos para Ensino Médio" texto="Oportunidades acessíveis para quem concluiu a EJA." url="https://www.youtube.com/results?search_query=concursos+publicos+ensino+medio+2025" />
        <VideoCard titulo="Dicas para o primeiro concurso" texto="Orientações para quem vai participar pela primeira vez." url="https://www.youtube.com/results?search_query=dicas+primeiro+concurso+publico" />

        {/* ── Seção 6 — Dicas Práticas ── */}
        <SecaoHeader titulo="💡 Dicas para Começar" />

        <div className="p-4 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">✅</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`• Leia os editais com calma — não precisa entender tudo de uma vez\n- Acompanhe os sites de concursos regularmente\n- Organize um plano simples de estudos\n- Mantenha seus documentos pessoais atualizados\n- Nunca pague taxas fora dos canais oficiais`}</p>
        </div>

        {/* Mensagem final */}
        <div className="border border-orange-300 rounded-2xl p-4" style={{ background: "#FFF8F0" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm leading-relaxed italic">
            Muitos caminhos podem ser construídos após a conclusão da EJA-EPT. Concursos públicos e processos seletivos são algumas das possibilidades que podem ampliar suas oportunidades de atuação profissional e continuidade dos estudos.
          </p>
        </div>

      </div>
    </div>
  );
}