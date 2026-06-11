import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import GridCard2x2 from "./GridCard2x2";
import AccordionSection from "./AccordionSection";

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
  { emoji: "🎯", titulo: "RH Genial", texto: "Empresa de recrutamento e seleção com forte atuação em Blumenau e região.", url: "https://www.rhgenial.com.br" },
  { emoji: "🤝", titulo: "Recrutar RH", texto: "Consultoria especializada em recrutamento para diversos segmentos da região.", url: "https://www.recrutarrh.com.br" },
  { emoji: "🌟", titulo: "Talento do Vale SC", texto: "Portal regional com oportunidades para diferentes perfis profissionais do Vale do Itajaí.", url: "https://talentodovalesc.com.br/vagas" },
  { emoji: "💼", titulo: "BluVagas", texto: "Portal de empregos focado em Blumenau e cidades próximas.", url: "https://www.bluvagas.com.br" },
];

const dicasVagas = [
  { emoji: "📝", titulo: "Cadastre e atualize seu currículo", texto: "Mantenha seu currículo atualizado nas plataformas. Use o módulo Criar Currículo deste aplicativo como ponto de partida." },
  { emoji: "🔑", titulo: "Use as palavras certas na busca", texto: "Experimente pesquisar com estas palavras-chave:\n- Eletricista Industrial\n- Auxiliar de Eletricista\n- Eletromecânico\n- Manutenção Industrial\n- Técnico em Eletrotécnica" },
  { emoji: "🔔", titulo: "Ative alertas de oportunidades", texto: "A maioria das plataformas permite ativar alertas por e-mail ou celular quando surgem novas vagas na sua área. Configure essa função — é gratuita e muito prática!" },
  { emoji: "📨", titulo: "Acompanhe suas candidaturas", texto: "Anote em quais vagas se candidatou e acompanhe os retornos. Candidate-se regularmente." },
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
        <div className="grid grid-cols-2 gap-2">
          <GridCard2x2
            emoji="🏛️"
            titulo="SINE"
            texto="Serviço público gratuito para busca de trabalho e encaminhamento para entrevistas."
            url="https://servicos.mte.gov.br/spme-v2/#/login"
          />
        </div>

        {/* ── Seção 2 — Plataformas Nacionais ── */}
        <SecaoHeader titulo="🌎 Plataformas Nacionais" subtitulo="Portais com vagas em todo o Brasil" />
        <div className="grid grid-cols-2 gap-2">
          {plataformasNacionais.map((p, i) => <GridCard2x2 key={i} {...p} />)}
        </div>

        {/* ── Seção 3 — Blumenau e Região ── */}
        <SecaoHeader titulo="📍 Oportunidades em Blumenau e Região" subtitulo="Plataformas com foco no Vale do Itajaí" />
        <div className="grid grid-cols-2 gap-2">
          {plataformasRegionais.map((p, i) => <GridCard2x2 key={i} {...p} />)}
        </div>

        {/* ── Seção 4 — Como se Preparar (Acordeão) ── */}
        <SecaoHeader titulo="📋 Como se Preparar" subtitulo="Dicas práticas, entrevistas, documentos e segurança" />

        <AccordionSection titulo="💡 Dicas para Procurar Oportunidades">
          {dicasVagas.map((d, i) => (
            <div key={i} className="p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{d.emoji}</span>
                <h4 className="font-bold text-xs">{d.titulo}</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{d.texto}</p>
            </div>
          ))}
        </AccordionSection>

        <AccordionSection titulo="🎤 Participando de Processos Seletivos">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <p className="text-xs leading-relaxed">
              A entrevista é uma conversa — não um interrogatório. Você tem uma história, saberes e experiências que têm valor.
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-xl">
            <h4 className="font-bold text-xs mb-1">📋 Antes da Entrevista</h4>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`• Pesquise sobre a empresa\n- Leia atentamente a descrição da vaga\n- Revise seu currículo\n- Organize seus documentos\n- Planeje seu deslocamento com antecedência`}</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-xl">
            <h4 className="font-bold text-xs mb-1">🎯 Durante a Entrevista</h4>
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`• Fale com tranquilidade\n- Valorize sua trajetória de vida e trabalho\n- Seja sincero(a) sobre suas experiências\n- Demonstre interesse em aprender\n- Faça perguntas sobre a vaga — isso demonstra interesse`}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">💬</span>
              <h4 className="font-bold text-xs">Perguntas Frequentes</h4>
            </div>
            {perguntasEntrevista.map((p, i) => <PerguntaCard key={i} {...p} />)}
          </div>
        </AccordionSection>

        <AccordionSection titulo="📄 Documentos Necessários">
          <div className="p-3 bg-muted/30 rounded-xl">
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`• Documento de identidade\n- CPF\n- Carteira de Trabalho\n- Comprovante de residência\n- Certificados de cursos`}</p>
          </div>
        </AccordionSection>

        <AccordionSection titulo="🛡️ Segurança Digital e Prevenção de Golpes">
          <div className="bg-red-50 border border-red-300 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-red-700 whitespace-pre-line">{`⚠️ Nunca pague para participar de processos seletivos ou para concorrer a vagas de trabalho.\n\n⚠️ Desconfie de promessas de contratação imediata mediante pagamento.\n\n⚠️ Verifique sempre se a vaga foi divulgada por canais confiáveis.\n\nEm caso de violação de direitos, consulte a seção Direitos Coletivos neste aplicativo.`}</p>
          </div>
        </AccordionSection>

        {/* Mensagem final */}
        <div className="border border-orange-300 rounded-2xl p-4" style={{ background: "#FFF8F0" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎯</span>
          </div>
          <p className="text-sm leading-relaxed italic">
            O mundo do trabalho oferece diferentes caminhos. Use estas ferramentas para conhecer suas possibilidades e construir seus projetos de vida.
          </p>
        </div>

      </div>
    </div>
  );
}