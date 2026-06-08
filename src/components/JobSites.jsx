import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

// ── Dados ──────────────────────────────────────────────────────────────────────

const plataformasNacionais = [
  { emoji: "💼", titulo: "LinkedIn", texto: "Rede profissional utilizada para criar perfil, acompanhar empresas e buscar oportunidades de trabalho.", url: "https://www.linkedin.com" },
  { emoji: "🔍", titulo: "Indeed Brasil", texto: "Uma das maiores plataformas de emprego do país. Permite pesquisar vagas por cidade, profissão e área de atuação.", url: "https://br.indeed.com" },
  { emoji: "📋", titulo: "InfoJobs", texto: "Portal com oportunidades em diversas áreas profissionais, com foco na área técnica.", url: "https://www.infojobs.com.br" },
  { emoji: "🎯", titulo: "Catho", texto: "Plataforma tradicional de recrutamento e seleção com vagas em todo o Brasil.", url: "https://www.catho.com.br" },
  { emoji: "📌", titulo: "Vagas.com.br", texto: "Muito utilizada por empresas de médio e grande porte para divulgar oportunidades.", url: "https://www.vagas.com.br" },
  { emoji: "🏢", titulo: "Glassdoor Brasil", texto: "Permite conhecer empresas, salários e processos seletivos antes de se candidatar.", url: "https://www.glassdoor.com.br" },
  { emoji: "💻", titulo: "Empregos.com.br", texto: "Portal tradicional com vagas em diversas áreas profissionais em todo o Brasil.", url: "https://www.empregos.com.br" },
  { emoji: "🏭", titulo: "Banco Nacional de Empregos", texto: "Possui vagas para áreas técnicas, industriais e administrativas em todo o país.", url: "https://www.bne.com.br" },
  { emoji: "🇧🇷", titulo: "Trabalha Brasil", texto: "Portal nacional com oportunidades em diferentes áreas e níveis de escolaridade.", url: "https://www.trabalhabrasil.com.br" },
];

const plataformasRegionais = [
  { emoji: "🎯", titulo: "RH Genial", texto: "Empresa de recrutamento e seleção com forte atuação em Blumenau e região. Especializada em vagas industriais e técnicas.", url: "https://www.rhgenial.com.br" },
  { emoji: "🤝", titulo: "Recrutar RH", texto: "Consultoria especializada em recrutamento para diversos segmentos da região.", url: "https://www.recrutarrh.com.br" },
  { emoji: "🌟", titulo: "Talento do Vale SC", texto: "Portal regional com oportunidades para diferentes perfis profissionais do Vale do Itajaí.", url: "https://talentodovalesc.com.br/vagas" },
  { emoji: "💼", titulo: "BluVagas", texto: "Portal de empregos focado em Blumenau e cidades próximas. Vagas para diferentes áreas e níveis de experiência.", url: "https://www.bluvagas.com.br" },
];

const dicasVagas = [
  { emoji: "📝", titulo: "Cadastre e atualize seu currículo", texto: "Cadastre seu currículo nas plataformas e mantenha-o atualizado. Inclua cursos, experiências e habilidades adquiridas no trabalho, em casa e na escola." },
  { emoji: "🔑", titulo: "Use as palavras certas na busca", texto: "Experimente pesquisar com estas palavras-chave:\n- Eletricista Industrial\n- Auxiliar de Eletricista\n- Eletromecânico\n- Manutenção Industrial\n- Técnico em Eletrotécnica" },
  { emoji: "🔔", titulo: "Ative alertas de oportunidades", texto: "A maioria das plataformas permite ativar alertas por e-mail ou celular quando surgem novas vagas na sua área. Configure essa função — é gratuita e muito prática!" },
  { emoji: "📨", titulo: "Acompanhe suas candidaturas", texto: "Anote em quais vagas se candidatou e acompanhe os retornos. Candidate-se regularmente — cada processo seletivo é uma experiência de aprendizado." },
  { emoji: "👁️", titulo: "Leia os requisitos com atenção", texto: "Antes de enviar seu currículo, leia atentamente o que a empresa pede. Isso aumenta suas chances e evita frustrações." },
];

const perguntasEntrevista = [
  { pergunta: "Fale um pouco sobre você.", dica: "Apresente sua trajetória de forma resumida. Fale de onde vem, o que já fez na vida profissional e o que busca agora. Sua história tem valor!" },
  { pergunta: "Por que deseja esta oportunidade?", dica: "Conecte seus objetivos com o que a empresa oferece. Seja honesto(a) sobre suas motivações." },
  { pergunta: "Quais são seus pontos fortes?", dica: "Pense em habilidades desenvolvidas no trabalho, na escola e na vida. Responsabilidade, persistência e trabalho em equipe são muito valorizados." },
  { pergunta: "Como o curso de Eletricista Industrial contribuiu para sua formação?", dica: "Fale sobre o que aprendeu no curso, as práticas realizadas e como isso te preparou para atuar na área elétrica." },
];

// ── Sub-componentes ────────────────────────────────────────────────────────────

function SecaoHeader({ titulo, subtitulo }) {
  return (
    <div className="pt-2">
      <h2 className="font-extrabold text-base leading-tight">{titulo}</h2>
      {subtitulo && <p className="text-xs text-muted-foreground mt-0.5">{subtitulo}</p>}
    </div>
  );
}

function PlataformaCard({ emoji, titulo, texto, url }) {
  return (
    <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h3 className="font-bold text-sm">{titulo}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
      <a href={url} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
        🔗 Acessar Plataforma
      </a>
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
    <div className="bg-muted/40 border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-2 p-3 text-left">
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

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-12">

        {/* Intro */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed">
            Esta central foi pensada para trabalhadores-estudantes que buscam oportunidades no mundo do trabalho — seja a primeira vaga, uma recolocação ou um novo caminho. Aqui você encontra plataformas confiáveis, dicas práticas e orientações para se preparar.
          </p>
        </div>

        {/* ── Seção 1 — Serviços Públicos Gratuitos ── */}
        <SecaoHeader titulo="🏛️ Serviços Públicos Gratuitos" subtitulo="Serviços do governo para apoiar o trabalhador(a)" />
        <div className="p-4 bg-card border border-border rounded-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <h3 className="font-bold text-sm">SINE — Sistema Nacional de Emprego</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Serviço público e gratuito que auxilia trabalhadores(as) na busca por oportunidades de trabalho, encaminhamento para entrevistas e acesso a informações sobre qualificação profissional.
          </p>
          <a href="https://servicos.mte.gov.br/spme-v2/#/login" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
            🔗 Acessar Plataforma
          </a>
        </div>

        {/* ── Seção 2 — Plataformas Nacionais ── */}
        <SecaoHeader titulo="🌎 Plataformas Nacionais" subtitulo="Portais com vagas em todo o Brasil" />
        {plataformasNacionais.map((p, i) => <PlataformaCard key={i} {...p} />)}

        {/* ── Seção 3 — Blumenau e Região ── */}
        <SecaoHeader titulo="📍 Oportunidades em Blumenau e Região" subtitulo="Plataformas com foco no Vale do Itajaí e Santa Catarina" />
        {plataformasRegionais.map((p, i) => <PlataformaCard key={i} {...p} />)}

        {/* ── Seção 4 — Dicas ── */}
        <SecaoHeader titulo="💡 Dicas para Procurar Oportunidades" subtitulo="Pequenos passos que fazem grande diferença" />
        {dicasVagas.map((d, i) => <DicaCard key={i} {...d} />)}

        {/* ── Seção 5 — Processos Seletivos ── */}
        <SecaoHeader titulo="🎤 Participando de Processos Seletivos" subtitulo="Orientações para quem está retornando ao mundo do trabalho ou participando das primeiras entrevistas" />

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed">
            A entrevista é uma conversa — não um interrogatório. Você tem uma história, saberes e experiências que têm valor. Chegue preparado(a) e confie no que você construiu até aqui.
          </p>
        </div>

        <DicaCard emoji="📋" titulo="Antes da Entrevista" texto={"• Pesquise sobre a empresa\n- Leia atentamente a descrição da vaga\n- Revise seu currículo\n- Organize seus documentos\n- Planeje seu deslocamento com antecedência"} />
        <DicaCard emoji="🎯" titulo="Durante a Entrevista" texto={"• Fale com tranquilidade\n- Valorize sua trajetória de vida e trabalho\n- Seja sincero(a) sobre suas experiências\n- Demonstre interesse em aprender\n- Faça perguntas sobre a vaga — isso demonstra interesse"} />

        {/* Perguntas frequentes */}
        <div className="p-4 bg-card border border-border rounded-2xl space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💬</span>
            <h3 className="font-bold text-sm">Perguntas Frequentes nos Processos Seletivos</h3>
          </div>
          {perguntasEntrevista.map((p, i) => <PerguntaCard key={i} {...p} />)}
        </div>

        <DicaCard emoji="📄" titulo="Documentos Frequentemente Solicitados" texto={"• Documento de identidade\n- CPF\n- Carteira de Trabalho\n- Comprovante de residência\n- Certificados de cursos"} />

        {/* ── Seção 6 — Valorizando sua Trajetória ── */}
        <div className="bg-orange-50 border border-orange-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌱</span>
            <h3 className="font-bold text-sm">Valorizando sua Trajetória</h3>
          </div>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>Muitas pessoas acreditam que não possuem experiência suficiente para participar de processos seletivos. Mas os saberes construídos no trabalho, na família, na comunidade e na escola também desenvolvem habilidades importantes.</p>
            <p>Como nos ensina Paulo Freire, o conhecimento não começa na escola — ele nasce da vida, da prática e da experiência de cada pessoa.</p>
            <p>Como nos lembra Miguel Arroyo, os trabalhadores-estudantes chegam com histórias e trajetórias que precisam ser reconhecidas e valorizadas.</p>
            <p>Sua trajetória tem valor. Sua história importa. Você não está começando do zero — você está chegando até aqui com tudo que construiu.</p>
          </div>
        </div>

        {/* ── Seção 7 — Segurança Digital ── */}
        <div className="bg-red-50 border border-red-300 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h3 className="font-bold text-sm text-red-700">Segurança Digital e Prevenção de Golpes</h3>
          </div>
          <p className="text-sm leading-relaxed text-red-700 whitespace-pre-line">{`⚠️ Nunca pague para participar de processos seletivos ou para concorrer a vagas de trabalho.\n\n⚠️ Desconfie de promessas de contratação imediata mediante pagamento.\n\n⚠️ Verifique sempre se a vaga foi divulgada por canais confiáveis.\n\nEm caso de dúvida ou violação de direitos, acesse os canais oficiais:`}</p>
          <a href="https://www.gov.br/trabalho-e-emprego" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-all">
            🔗 Ministério do Trabalho
          </a>
          <div className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-red-100 text-red-700 border border-red-300">
            📞 Alô Trabalho — Ligue 158
          </div>
        </div>

        {/* Mensagem final */}
        <div className="border border-orange-300 rounded-2xl p-4" style={{ background: "#FFF8F0" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm leading-relaxed italic">
            O mundo do trabalho oferece diferentes caminhos. Buscar oportunidades exige informação, preparação e persistência. Utilize estas ferramentas para conhecer possibilidades, ampliar seus horizontes e construir seus projetos de vida.
          </p>
        </div>

      </div>
    </div>
  );
}