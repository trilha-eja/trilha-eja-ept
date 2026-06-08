import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

// ── Dados ──────────────────────────────────────────────────────────────────────

const plataformasNacionais = [
  {
    emoji: "🔍",
    titulo: "Indeed Brasil",
    texto: "Uma das maiores plataformas de emprego do país. Permite pesquisar vagas por cidade, profissão e área de atuação.",
    btns: [
      { label: "🔗 Acessar Plataforma", url: "https://br.indeed.com" },
      { label: "⚡ Buscar Eletricista Industrial", url: "https://br.indeed.com/jobs?q=eletricista+industrial" },
    ],
  },
  {
    emoji: "🏢",
    titulo: "Glassdoor Brasil",
    texto: "Além das vagas, permite conhecer empresas, salários e experiências de outros candidatos antes de se candidatar.",
    btns: [
      { label: "🔗 Acessar Plataforma", url: "https://www.glassdoor.com.br" },
      { label: "⚡ Buscar Eletricista Industrial", url: "https://www.glassdoor.com.br/Vagas/eletricista-industrial-vagas-SRCH_KO0,22.htm" },
    ],
  },
  {
    emoji: "📋",
    titulo: "Empregos.com.br",
    texto: "Portal tradicional com vagas em diversas áreas profissionais em todo o Brasil.",
    btns: [
      { label: "🔗 Acessar Plataforma", url: "https://www.empregos.com.br" },
      { label: "⚡ Buscar Eletricista Industrial", url: "https://www.empregos.com.br/empregos/eletricista-industrial" },
    ],
  },
  {
    emoji: "🏭",
    titulo: "Banco Nacional de Empregos",
    texto: "Grande quantidade de vagas para áreas técnicas e industriais. Muito usado por empresas da área elétrica.",
    btns: [
      { label: "🔗 Acessar Plataforma", url: "https://www.bne.com.br" },
      { label: "⚡ Buscar Eletricista Industrial", url: "https://www.bne.com.br/vagas-de-emprego/eletricista-industrial" },
    ],
  },
  {
    emoji: "🇧🇷",
    titulo: "Trabalha Brasil",
    texto: "Plataforma com oportunidades em todo o país para diferentes níveis de escolaridade.",
    btns: [
      { label: "🔗 Acessar Plataforma", url: "https://www.trabalhabrasil.com.br" },
      { label: "⚡ Buscar Eletricista Industrial", url: "https://www.trabalhabrasil.com.br/vagas-de-emprego-em/eletricista-industrial" },
    ],
  },
];

const plataformasRegionais = [
  {
    emoji: "🎯",
    titulo: "RH Genial",
    texto: "Empresa de recrutamento e seleção com forte atuação em Blumenau e região. Especializada em vagas industriais e técnicas.",
    btns: [
      { label: "🔗 Acessar Site", url: "https://www.rhgenial.com.br" },
      { label: "👁️ Ver Vagas", url: "https://www.rhgenial.com.br" },
    ],
  },
  {
    emoji: "🤝",
    titulo: "Recrutar RH",
    texto: "Consultoria especializada em recrutamento com diversas oportunidades para a indústria da região.",
    btns: [
      { label: "🔗 Acessar Site", url: "https://www.recrutarrh.com.br" },
      { label: "👁️ Ver Vagas", url: "https://www.recrutarrh.com.br" },
    ],
  },
  {
    emoji: "🌟",
    titulo: "Talento do Vale SC",
    texto: "Portal regional com vagas para profissionais técnicos, administrativos e operacionais do Vale do Itajaí.",
    btns: [
      { label: "🔗 Acessar Site", url: "https://talentodovalesc.com.br/vagas" },
      { label: "👁️ Ver Vagas", url: "https://talentodovalesc.com.br/vagas" },
    ],
  },
  {
    emoji: "💼",
    titulo: "BluVagas",
    texto: "Portal de empregos focado em Blumenau e cidades próximas. Vagas para diferentes áreas e níveis de experiência.",
    btns: [
      { label: "🔗 Acessar Site", url: "https://www.bluvagas.com.br" },
      { label: "👁️ Ver Vagas", url: "https://www.bluvagas.com.br" },
    ],
  },
];

const dicasVagas = [
  { emoji: "✅", titulo: "Mantenha seu currículo atualizado", texto: "Antes de se candidatar, revise seu currículo. Inclua cursos, experiências e habilidades adquiridas no trabalho, em casa e na escola." },
  { emoji: "🔑", titulo: "Use as palavras certas na busca", texto: "Experimente pesquisar com estas palavras-chave:\n- Eletricista Industrial\n- Auxiliar de Eletricista\n- Manutenção Industrial\n- Eletromecânico\n- Técnico em Eletrotécnica" },
  { emoji: "🔔", titulo: "Ative alertas de vagas", texto: "A maioria das plataformas permite ativar alertas por e-mail ou celular quando surgem novas vagas na sua área. Configure essa função — é gratuita e prática!" },
  { emoji: "📨", titulo: "Candidate-se regularmente", texto: "Não espere a vaga perfeita. Candidate-se a várias oportunidades. Cada processo seletivo é uma experiência de aprendizado." },
  { emoji: "👁️", titulo: "Leia os requisitos com atenção", texto: "Antes de enviar seu currículo, leia atentamente o que a empresa pede. Isso evita frustrações e aumenta suas chances." },
];

const perguntasEntrevista = [
  {
    pergunta: "Fale um pouco sobre você.",
    dica: "Apresente sua trajetória de forma resumida. Fale de onde vem, o que já fez na vida profissional e o que busca agora. Sua história tem valor!",
  },
  {
    pergunta: "Por que deseja esta vaga?",
    dica: "Conecte seus objetivos profissionais com o que a empresa oferece. Seja honesto(a) sobre suas motivações.",
  },
  {
    pergunta: "Quais são seus pontos fortes?",
    dica: "Pense em habilidades desenvolvidas no trabalho, na escola e na vida. Responsabilidade, persistência e trabalho em equipe são muito valorizados.",
  },
  {
    pergunta: "Como o curso de Eletricista Industrial contribuiu para sua formação?",
    dica: "Fale sobre o que aprendeu no curso, as práticas realizadas e como isso te preparou para atuar na área elétrica.",
  },
];

// ── Sub-componentes ────────────────────────────────────────────────────────────

function PlataformaCard({ emoji, titulo, texto, btns }) {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-bold text-sm">{titulo}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
      <div className="flex flex-col gap-2">
        {btns.map((b, i) => (
          <a key={i} href={b.url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all text-center">
            {b.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function DicaCard({ emoji, titulo, texto }) {
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

function PerguntaCard({ pergunta, dica }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 p-3 text-left">
        <p className="text-sm font-semibold leading-snug flex-1">"{pergunta}"</p>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {open && (
        <div className="px-3 pb-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{dica}</p>
        </div>
      )}
    </div>
  );
}

function SecaoHeader({ titulo, subtitulo }) {
  return (
    <div className="pt-2">
      <h2 className="font-extrabold text-base leading-tight">{titulo}</h2>
      {subtitulo && <p className="text-xs text-muted-foreground mt-0.5">{subtitulo}</p>}
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────

export default function JobSites({ onBack }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Central de Oportunidades</h1>
            <p className="text-sm text-muted-foreground leading-snug">Plataformas, dicas e orientações para o mundo do trabalho</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">

        {/* Intro */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Esta central foi pensada para trabalhadores-estudantes que estão buscando oportunidades no mundo do trabalho — seja a primeira vaga, uma recolocação ou um novo caminho. Aqui você encontra plataformas confiáveis, dicas práticas e orientações para se preparar.
          </p>
        </div>

        {/* ── Seção 1 — Plataformas Nacionais ── */}
        <SecaoHeader titulo="🌎 Plataformas Nacionais" subtitulo="Grandes portais com vagas em todo o Brasil" />
        {plataformasNacionais.map((p, i) => <PlataformaCard key={i} {...p} />)}

        {/* ── Seção 2 — Blumenau e Região ── */}
        <SecaoHeader titulo="📍 Oportunidades em Blumenau e Região" subtitulo="Plataformas com foco no Vale do Itajaí e Santa Catarina" />
        {plataformasRegionais.map((p, i) => <PlataformaCard key={i} {...p} />)}

        {/* ── Seção 3 — Dicas para Procurar Vagas ── */}
        <SecaoHeader titulo="💡 Dicas para Procurar Vagas" subtitulo="Pequenos passos que fazem grande diferença" />
        {dicasVagas.map((d, i) => <DicaCard key={i} {...d} />)}

        {/* ── Seção 4 — Entrevistas ── */}
        <SecaoHeader titulo="🎤 Prepare-se para a Entrevista" subtitulo="Orientações para quem está voltando ao mercado ou participando das primeiras entrevistas" />

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            A entrevista é uma conversa — não um interrogatório. Você tem uma história, saberes e experiências que têm valor. Chegue preparado(a) e confie no que você construiu até aqui.
          </p>
        </div>

        <DicaCard emoji="📋" titulo="Antes da Entrevista" texto={"• Pesquise sobre a empresa\n- Leia atentamente a descrição da vaga\n- Revise seu currículo\n- Separe seus documentos\n- Planeje seu deslocamento com antecedência"} />
        <DicaCard emoji="🎯" titulo="Durante a Entrevista" texto={"• Fale com tranquilidade\n- Seja sincero(a) sobre sua trajetória\n- Valorize experiências do trabalho, da família e da comunidade\n- Demonstre disposição para aprender\n- Faça perguntas sobre a vaga — isso demonstra interesse"} />

        {/* Perguntas frequentes */}
        <div className="p-4 bg-card border border-border rounded-2xl space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💬</span>
            <h3 className="font-bold text-sm">Perguntas Frequentes nas Entrevistas</h3>
          </div>
          {perguntasEntrevista.map((p, i) => <PerguntaCard key={i} {...p} />)}
        </div>

        <DicaCard emoji="📄" titulo="Documentos Frequentemente Solicitados" texto={"• RG e CPF\n- Carteira de Trabalho\n- Comprovante de residência\n- Certificados de cursos\n- Comprovante de escolaridade"} />

        {/* ── Seção 5 — Valorizando sua Trajetória ── */}
        <div className="bg-orange-50 border border-orange-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌱</span>
            <h3 className="font-bold text-sm">Valorizando sua Trajetória</h3>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            Muitas pessoas acreditam que não possuem experiência suficiente para uma vaga de emprego. Mas os saberes construídos no trabalho, na família, na comunidade e na escola também desenvolvem habilidades importantes.
          </p>
          <p className="text-sm leading-relaxed text-foreground mt-2">
            Como nos ensina Paulo Freire, o conhecimento não começa na escola — ele nasce da vida, da prática e da experiência de cada pessoa.
          </p>
          <p className="text-sm leading-relaxed text-foreground mt-2">
            Sua trajetória tem valor. Sua história importa. Você não está começando do zero — você está chegando até aqui com tudo que construiu.
          </p>
        </div>

        {/* ── Seção 6 — Fique Atento ── */}
        <div className="bg-red-50 border border-red-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🛡️</span>
            <h3 className="font-bold text-sm text-red-700">Fique Atento — Golpes em Processos Seletivos</h3>
          </div>
          <p className="text-sm leading-relaxed text-red-700 whitespace-pre-line">
            {`⚠️ Nunca pague para participar de processos seletivos ou para concorrer a vagas de emprego.\n\n⚠️ Desconfie de promessas de contratação imediata mediante pagamento.\n\n⚠️ Verifique sempre se a vaga foi publicada em canais confiáveis.\n\nEm caso de dúvida, consulte o Ministério do Trabalho: gov.br/trabalho ou ligue 158.`}
          </p>
        </div>

        {/* Mensagem final */}
        <div style={{ background: "#FFF8F0" }} className="border border-orange-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground italic">
            O mundo do trabalho oferece diferentes caminhos. Buscar oportunidades exige informação, preparação e persistência. Utilize estas ferramentas para conhecer possibilidades, ampliar seus horizontes e construir seus projetos de vida.
          </p>
        </div>

      </div>
    </div>
  );
}