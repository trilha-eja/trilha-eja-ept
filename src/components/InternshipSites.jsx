import { ArrowLeft } from "lucide-react";
import AccordionSection from "./AccordionSection";
import NavigationBar from "./NavigationBar";

const todosSites = [
  { emoji: "🎓", titulo: "CIEE Nacional", texto: "Principal portal do país para estágios e jovem aprendiz.", url: "https://portal.ciee.org.br" },
  { emoji: "🎓", titulo: "CIEE Santa Catarina", texto: "Portal dedicado a SC com vagas na região de Blumenau.", url: "https://cieesc.org.br" },
  { emoji: "💼", titulo: "Nube", texto: "Portal com foco em estudantes de ensino médio, técnico e superior.", url: "https://www.nube.com.br" },
  { emoji: "🏭", titulo: "IEL", texto: "Estágios na indústria — ideal para área técnica e elétrica.", url: "https://www.iel.org.br" },
  { emoji: "🌱", titulo: "Jovem Aprendiz", texto: "Programa federal para jovens de 14 a 24 anos.", url: "https://www.gov.br/trabalho/pt-br/assuntos/aprendizagem-profissional" },
  { emoji: "🏢", titulo: "Companhia de Estágios", texto: "Vagas em grandes empresas nacionais e multinacionais.", url: "https://www.ciadeestagios.com.br" },
  { emoji: "⭐", titulo: "Super Estágios", texto: "Milhares de vagas distribuídas pelo Brasil.", url: "https://www.superestagios.com.br" },
  { emoji: "🔎", titulo: "Estagiar", texto: "Portal com vagas de estágio em todo o Brasil.", url: "https://www.estagiar.com.br" },
];

export default function InternshipSites({ onBack }) {
  return (
    <div>
      <NavigationBar onBack={onBack} />
      <div className="max-w-lg mx-auto px-4 pt-1 pb-3">
        <div>
            <h1 className="font-extrabold text-lg leading-tight">Sites de Estágio</h1>
            <p className="text-sm text-muted-foreground">Onde encontrar e se cadastrar para estágios</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 pb-12">

        {/* Intro */}
        <div className="bg-chart-5/10 border border-chart-5/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            O estágio pode ser uma oportunidade de aprendizagem, desenvolvimento profissional e aproximação com o mundo do trabalho.
          </p>
        </div>

        {/* O que é estágio — Acordeão */}
        <AccordionSection titulo="❓ O que é Estágio?">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📚</span>
            <h3 className="font-bold text-sm">Entenda o que é estágio</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`O estágio é uma atividade educativa supervisionada que faz parte do processo de formação profissional.\n\n- Permite desenvolver conhecimentos e experiências práticas\n- Pode ser obrigatório (previsto no curso) ou não obrigatório\n- Possui direitos e regras definidos em lei\n- O(a) estudante tem direito a bolsa-auxílio, seguro e condições dignas`}</p>
          <div className="bg-muted/40 rounded-xl px-3 py-2 flex items-center gap-2 mt-3">
            <span className="text-base">📋</span>
            <span className="text-xs font-semibold">Lei nº 11.788/2008 — Lei do Estágio</span>
          </div>
          <a href="https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11788.htm" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all mt-3">
            🔗 Conhecer a Lei do Estágio
          </a>
        </AccordionSection>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-xs text-orange-800 leading-relaxed">
            💡 Alguns sites servem para você se <strong>CADASTRAR</strong> e receber indicações de vagas. Outros servem para <strong>BUSCAR</strong> vagas abertas e se candidatar.
          </p>
        </div>

        {/* ── Grade de Sites ── */}
        <div>
          <h2 className="font-extrabold text-sm mb-3">🌐 Plataformas de Estágio</h2>
          {todosSites.map((s, i) => (
            <AccordionSection key={i} titulo={`${s.emoji} ${s.titulo}`}>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.texto}</p>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
            </AccordionSection>
          ))}
          <AccordionSection titulo="🏛️ Emprega Brasil">
            <p className="text-sm text-muted-foreground leading-relaxed">Portal oficial do governo federal. Cadastre seu perfil e busque vagas de estágio e emprego em todo o Brasil. Totalmente gratuito.</p>
            <a href="https://servicos.mte.gov.br/spme-v2/#/login" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
          </AccordionSection>
        </div>

        {/* ── IFC e Rede Federal (Acordeão) ── */}
        <h2 className="font-extrabold text-sm">🏫 Oportunidades no IFC e na Rede Federal</h2>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed">
            Além dos sites de estágio, muitas oportunidades podem surgir dentro do próprio IFC. Fique atento às informações compartilhadas pela escola.
          </p>
        </div>

        <AccordionSection titulo="📢 Como acompanhar oportunidades no IFC">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`Muitas oportunidades não aparecem nos grandes portais — chegam diretamente pela escola.\nFique atento a:\n- Site oficial do campus\n- Murais físicos\n- E-mails institucionais\n- Redes sociais oficiais\n- Avisos em sala de aula\n- Comunicados da coordenação`}</p>
        </AccordionSection>

        <AccordionSection titulo="👨‍🏫 Coordenação e Professores">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`A coordenação do curso e os professores podem informar sobre:\n- Oportunidades de estágio\n- Empresas parceiras\n- Projetos institucionais\n- Processos seletivos\n- Programas de bolsas\n- Eventos da área\n\nNão hesite em conversar — eles podem abrir portas que você ainda não conhece!`}</p>
        </AccordionSection>

        <AccordionSection titulo="🔬 Projetos de Ensino, Pesquisa e Extensão">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{`Os Institutos Federais frequentemente oferecem:\n- Bolsas de pesquisa\n- Bolsas de extensão\n- Monitorias\n- Projetos comunitários\n- Atividades de formação complementar\n\nEssas experiências também contribuem para sua formação profissional e para o seu currículo!`}</p>
        </AccordionSection>

      </div>
    </div>
  );
}