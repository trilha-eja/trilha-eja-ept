import { ArrowLeft } from "lucide-react";
import AccordionSection from "./AccordionSection";

function SecaoHeader({ titulo, subtitulo }) {
  return (
    <div className="pt-2">
      <h2 className="font-extrabold text-base leading-tight">{titulo}</h2>
      {subtitulo && <p className="text-xs text-muted-foreground mt-0.5">{subtitulo}</p>}
    </div>
  );
}

function VideoCard({ titulo, texto, url }) {
  return (
    <div className="border border-border rounded-xl p-3 bg-background flex items-start gap-3">
      <span className="text-lg shrink-0 mt-0.5">🎬</span>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm mb-1">{titulo}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{texto}</p>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
          ▶️ Ver vídeos
        </a>
      </div>
    </div>
  );
}

const sitesEditais = [
  { emoji: "🏆", titulo: "PCI Concursos", texto: "Um dos maiores portais de concursos do país.", url: "https://www.pciconcursos.com.br" },
  { emoji: "📰", titulo: "Concursos no Brasil", texto: "Portal de notícias e acompanhamento de concursos.", url: "https://concursosnobrasil.com" },
  { emoji: "🏛️", titulo: "Portal Gov.br", texto: "Portal oficial do Governo Federal para editais.", url: "https://www.gov.br" },
];

const videosConcursos = [
  { titulo: "Como estudar para concursos públicos", texto: "Dicas práticas para quem está começando.", url: "https://www.youtube.com/results?search_query=como+estudar+para+concursos+publicos+iniciantes" },
  { titulo: "Como ler um edital", texto: "Aprenda a entender os documentos oficiais.", url: "https://www.youtube.com/results?search_query=como+ler+edital+concurso+publico" },
  { titulo: "Concursos para Ensino Médio", texto: "Oportunidades acessíveis para quem concluiu a EJA.", url: "https://www.youtube.com/results?search_query=concursos+publicos+ensino+medio+2025" },
  { titulo: "Dicas para o primeiro concurso", texto: "Orientações para quem vai participar pela primeira vez.", url: "https://www.youtube.com/results?search_query=dicas+primeiro+concurso+publico" },
];

const passosEdital = [
  { emoji: "👔", titulo: "1. Cargo", texto: "Verifique o nome do cargo e suas atribuições. Confira se tem relação com sua formação e experiência." },
  { emoji: "🎓", titulo: "2. Escolaridade Exigida", texto: "Cada cargo exige um nível de escolaridade. Verifique se você já atende ou está prestes a atender o requisito." },
  { emoji: "💰", titulo: "3. Salário", texto: "O edital informa o salário inicial do cargo. Compare com suas necessidades e expectativas." },
  { emoji: "📅", titulo: "4. Inscrição", texto: "Fique atento ao prazo e ao link para inscrição. A maioria das inscrições é online e gratuita para candidatos de baixa renda." },
  { emoji: "🗓️", titulo: "5. Data da Prova", texto: "Anote a data da prova no celular e planeje com antecedência." },
  { emoji: "📚", titulo: "6. Conteúdo Programático", texto: "É a lista de assuntos que podem ser cobrados na prova. Use essa lista para organizar seus estudos." },
];

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
            Conheça outros caminhos no mundo do trabalho além das vagas tradicionais.
          </p>
        </div>

        {/* ── Seção 1 — O que são? ── */}
        <SecaoHeader titulo="🏛️ O que são Concursos e Processos Seletivos?" />

        <AccordionSection titulo="📋 Concurso Público">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">É uma seleção realizada pelo governo para contratar servidores públicos.
As vagas são abertas por edital, as regras são claras e públicas, e quem passa tem estabilidade no emprego.
Qualquer pessoa pode participar se atender aos requisitos do edital.</p>
        </AccordionSection>
        <AccordionSection titulo="📝 Processo Seletivo Simplificado">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">É uma seleção mais rápida, geralmente para contratos temporários em órgãos públicos.
Pode ser por análise de currículo, prova ou entrevista.
Também é divulgado por edital e segue regras públicas.</p>
        </AccordionSection>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💡</span>
            <h3 className="font-bold text-sm">Você Sabia?</h3>
          </div>
          <p className="text-sm leading-relaxed">Muitos concursos e processos seletivos exigem apenas:</p>
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

        <AccordionSection titulo="⚡ Empresas Públicas e de Economia Mista">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">Empresas como as de energia elétrica, saneamento, Correios, bancos públicos e cooperativas mistas frequentemente abrem processos seletivos para eletricistas e técnicos.
Fique de olho nos portais de concursos!</p>
        </AccordionSection>
        <AccordionSection titulo="🎓 Institutos Federais e Universidades Públicas">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">Os Institutos Federais e as Universidades Públicas frequentemente abrem processos seletivos para técnicos e assistentes administrativos.

💡 Fique de olho nos portais de concursos listados nesta página e nas redes sociais dessas instituições — os editais são divulgados assim que abrem!</p>
        </AccordionSection>
        <AccordionSection titulo="🏙️ Prefeituras e Câmaras Municipais">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">Municípios realizam concursos e processos seletivos para diversas áreas, incluindo manutenção elétrica e infraestrutura.
Acompanhe os editais da sua cidade e região.</p>
        </AccordionSection>

        {/* ── Seção 3 — Sites ── */}
        <SecaoHeader titulo="🌐 Sites Confiáveis para Acompanhar Editais" subtitulo="Clique para abrir diretamente 👇" />
        {sitesEditais.map((s, i) => (
          <AccordionSection key={i} titulo={`${s.emoji} ${s.titulo}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.texto}</p>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              🔗 Acessar
            </a>
          </AccordionSection>
        ))}

        {/* ── Seção 4 — Como se Preparar (Acordeão) ── */}
        <SecaoHeader titulo="📋 Como se Preparar" subtitulo="Editais, vídeos e dicas práticas" />

        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <p className="text-xs leading-relaxed">
            O edital é o documento oficial que explica tudo sobre o concurso. Parece complicado, mas seguindo estes passos fica mais fácil!
          </p>
        </div>
        {passosEdital.map((p, i) => (
          <AccordionSection key={i} titulo={`${p.emoji} ${p.titulo}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.texto}</p>
          </AccordionSection>
        ))}

        <AccordionSection titulo="🎬 Vídeos para te Ajudar">
          {videosConcursos.map((v, i) => <VideoCard key={i} {...v} />)}
        </AccordionSection>

        <AccordionSection titulo="💡 Dicas para Começar">
          <div className="p-3 bg-muted/30 rounded-xl">
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`• Leia os editais com calma — não precisa entender tudo de uma vez\n- Acompanhe os sites de concursos regularmente\n- Organize um plano simples de estudos`}</p>
          </div>
        </AccordionSection>

        {/* Mensagem final */}
        <div className="border border-orange-300 rounded-2xl p-4" style={{ background: "#FFF8F0" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm leading-relaxed italic">
            Concursos e processos seletivos são caminhos reais — e você já tem qualificação para concorrer.
          </p>
        </div>

      </div>
    </div>
  );
}