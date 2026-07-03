import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Briefcase, Zap, BookOpen, Map, GraduationCap, BookMarked, Sparkles, Star, Download, Home } from "lucide-react";

const moduleIcons = {
  empregabilidade: Briefcase,
  guia: Zap,
  microlearning: BookOpen,
  mapa: Map,
  caminhos: GraduationCap,
  glossario: BookMarked,
  vozes: Sparkles,
  opiniao: Star,
  materiais: Download,
  educador: BookOpen,
};

const searchIndex = [
  // Módulos principais
  { title: "Mundo do Trabalho", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "trabalho emprego direitos currículo carteira assinada salário CLT habilidades profissional" },
  { title: "Guia Prático", module: "Guia Prático", path: "/guia-pratico", icon: "guia", keywords: "prático instalação tomada fio eletricidade passo a passo multímetro diagrama elétrico" },
  { title: "Microlearning", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "aprender rápido NR-10 segurança norma regulamentadora EPI alicate contator motor elétrico periculosidade LOTO bloqueio etiquetagem emenda circuito série paralelo plaqueta" },
  { title: "Mapa da Vida", module: "Mapa da Vida", path: "/mapa-da-vida", icon: "mapa", keywords: "mapa vida projeto sonho meta futuro planejamento pessoal profissional" },
  { title: "Caminhos de Estudo", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ENEM SISU PROUNI FIES estudo faculdade universidade vestibular cursos gratuitos SENAI SENAC Sebrae moodle IFC recursos auxílio bolsa" },
  { title: "Glossário do Eletricista", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "glossário termos técnicos elétrica vocabulário fase neutro terra aterramento disjuntor DR multímetro contator motor inversor frequência SEC SEP" },
  { title: "Vozes da Trilha", module: "Vozes da Trilha", path: "/vozes", icon: "vozes", keywords: "histórias depoimentos relatos egressos compartilhar experiência inspiração enviar portal ifc" },
  { title: "Para o Educador", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "educador professor pedagógico EJA sala aula orientação didática roteiro encontros recursos externos referências EJA cartilha segurança CERT.br saiba mais AVAMEC" },
  { title: "Sua Opinião Importa", module: "Sua Opinião Importa", path: "/opiniao", icon: "opiniao", keywords: "opinião avaliação feedback estrelas sugestão formulário pesquisa" },
  { title: "Baixar Materiais", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "PDF download material impresso imprimir apostila mapa direitos checklist ENEM glossário cartilha eletricista currículo microlearning precarizado informática" },

  // Mundo do Trabalho — subpáginas
  { title: "O que faz um Eletricista Industrial?", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "eletricista industrial profissão carreira atuação instalação manutenção painel motor elétrico indústria" },
  { title: "Valorize sua Experiência", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "experiência habilidades soft skills competência vida saberes cotidiano" },
  { title: "Criar meu Currículo", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "currículo curriculum vitae modelo preencher criar elaborar" },
  { title: "Central de Oportunidades", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "emprego vaga trabalho site indeed infojobs linkedin catho central oportunidades plataforma" },
  { title: "Sites de Estágio", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "estágio estagiário cadastro oportunidade jovem aprendiz" },
  { title: "Concursos e Processos Seletivos", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "concurso processo seletivo edital prova vaga pública carreira" },
  { title: "Trabalho Precarizado", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "precarização precariado MEI autônomo empreendedor riscos direitos antunes uber ifood" },
  { title: "Seus Direitos Trabalhistas", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "direitos trabalhistas CLT carteira assinada salário férias contrato jornada remuneração proteção segurança" },

  // Direitos Trabalhistas — subseções
  { title: "Contrato e Registro", module: "Mundo do Trabalho → Direitos", path: "/empregabilidade", icon: "empregabilidade", keywords: "contrato registro carteira assinada CTPS vale-transporte igualdade admissão prazo" },
  { title: "Jornada e Remuneração", module: "Mundo do Trabalho → Direitos", path: "/empregabilidade", icon: "empregabilidade", keywords: "jornada horas extras férias 13º salário décimo terceiro remuneração descanso" },
  { title: "Proteção e Segurança", module: "Mundo do Trabalho → Direitos", path: "/empregabilidade", icon: "empregabilidade", keywords: "FGTS seguro desemprego segurança demissão proteção NR-10 EPI periculosidade adicional" },
  { title: "Previdência Social", module: "Mundo do Trabalho → Direitos", path: "/empregabilidade", icon: "empregabilidade", keywords: "INSS aposentadoria aposentador auxílio licença previdência social maternidade paternidade pensão benefício" },
  { title: "Direitos Coletivos", module: "Mundo do Trabalho → Direitos", path: "/empregabilidade", icon: "empregabilidade", keywords: "sindicato greve negociação coletiva associação trabalhadores unidos categoria" },

  // Caminhos de Estudo — subpáginas
  { title: "ENEM", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ENEM exame nacional ensino médio inscrição nota redação prova isenção MEC ENEM simulado enem prepara enem enem 2026 redação enem corrigir redação cora redação brasil escola cria redação aplicativos enem sites enem praticar redação play store enem" },
  { title: "SISU", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "SISU universidade federal cotas vagas ingresso matrícula nota corte" },
  { title: "PROUNI", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "PROUNI bolsa particular faculdade gratuita renda documentação" },
  { title: "FIES", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "FIES financiamento estudantil empréstimo faculdade juros dívida" },
  { title: "Trilha de Continuidade", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "trilha continuidade caminhos possíveis EJA EPT formação pós técnico" },
  { title: "Cursos Gratuitos", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "cursos gratuitos SENAI SENAC Sebrae certificação qualificação profissionalizante MOOC ENCCEJA UAB ENAP Fundação Bradesco SEST SENAT EVG MEC IFSC AVAMEC cursos MEC formação continuada cursos gratuitos educador plataforma MEC certificado online" },
  { title: "Ferramentas Digitais para Estudar", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ferramentas digitais app celular khan academy chatgpt youtube moodle IFC canva google drive documentos estudo online qr code qrcode sigaa google keep google agenda notebooklm notebook lm microsoft lens whatsapp computador internet redes sociais segurança digital privacidade MEC livros livros gratuitos acervo digital" },
  { title: "Dicas de Estudo", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "dicas estudo pomodoro rotina organização tempo concentração trabalhar estudar método" },
  { title: "Vídeos Recomendados", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "vídeos youtube aulas gratuitas recomendados assistir canais educativos" },
  { title: "Recursos do IFC", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "IFC recursos auxílio bolsa permanência SISAE portal estudante ingresso apoio estudantil sigaa manual estudante ifc edu br ingresso ifc edu br" },

  // Guia Prático — guias
  { title: "Como ligar uma tomada", module: "Guia Prático", path: "/guia-pratico", icon: "guia", keywords: "tomada ligar instalar elétrica fio fase neutro terra disjuntor" },
  { title: "Uso básico do multímetro", module: "Guia Prático", path: "/guia-pratico", icon: "guia", keywords: "multímetro medir tensão corrente resistência continuidade escala voltagem" },
  { title: "Leitura de diagramas elétricos", module: "Guia Prático", path: "/guia-pratico", icon: "guia", keywords: "diagrama elétrico leitura símbolo circuito mapa componente" },

  // Glossário — termos
  { title: "Fase (elétrica)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "fase fio condutor tensão corrente elétrica energizado" },
  { title: "Neutro", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "neutro fio retorno corrente circuito azul" },
  { title: "Aterramento / Terra", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "aterramento terra proteção choque elétrico segurança verde" },
  { title: "Tensão elétrica", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "tensão voltagem volts 127 220 força elétrica" },
  { title: "Corrente elétrica", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "corrente ampères fluxo elétrons" },
  { title: "Disjuntor", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "disjuntor proteção curto circuito sobrecarga desligar DDR" },
  { title: "Dispositivo DR", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "DR diferencial residual choque proteção fuga corrente" },
  { title: "NR-10", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "NR-10 nr10 norma regulamentadora segurança eletricidade trabalho treinamento" },
  { title: "EPI", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "EPI equipamento proteção individual luva capacete óculos segurança" },
  { title: "Curto-circuito", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "curto circuito curto-circuito falha elétrica faísca incêndio" },
  { title: "Sobrecarga", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "sobrecarga excesso corrente aquecimento disjuntor desarmar" },
  { title: "LOTO (Bloqueio e Etiquetagem)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "LOTO bloqueio etiquetagem segurança manutenção máquina" },
  { title: "Arco elétrico", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "arco elétrico descarga temperatura queimadura painel energizado" },
  { title: "Multímetro", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "multímetro medição instrumento" },
  { title: "Contator", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "contator dispositivo eletromecânico motor painel industrial" },
  { title: "Motor elétrico", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "motor elétrico máquina movimento indústria bomba compressor" },
  { title: "Inversor de frequência", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "inversor frequência velocidade motor controle" },
  { title: "QD (Quadro de Distribuição)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "QD quadro distribuição painel elétrico disjuntores" },
  { title: "SEC (Sistema Elétrico de Consumo)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "SEC sistema elétrico consumo indústria empresa" },
  { title: "SEP (Sistema Elétrico de Potência)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "SEP sistema elétrico potência transmissão geração subestação" },
  { title: "Potência elétrica", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "potência watts quilowatts energia consumo chuveiro lâmpada" },
  { title: "Painel elétrico", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "painel elétrico comando proteção indústria fábrica" },
  { title: "SPDA (Para-raios)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "SPDA para-raios descarga atmosférica proteção raio" },

  // Microlearning — cards
  { title: "NR-10: O Básico", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "NR-10 norma segurança eletricidade treinamento 40h básico" },
  { title: "Alicate Universal", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "alicate universal ferramenta corte isolação 1000V" },
  { title: "Tensão x Corrente", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "tensão corrente diferença volts ampères analogia água" },
  { title: "Fio Fase: Cuidado!", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "fio fase perigo choque elétrico energizado cuidado segurança" },
  { title: "EPIs Obrigatórios", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "EPI equipamento proteção luva capacete óculos calçado" },
  { title: "LOTO — Bloqueio e Etiquetagem", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "LOTO bloqueio etiquetagem segurança manutenção" },
  { title: "Arco Elétrico", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "arco elétrico descarga temperatura perigo invisível" },
  { title: "Motor Elétrico", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "motor elétrico funcionamento movimento indústria" },
  { title: "Adicional de Periculosidade", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "adicional periculosidade 30% salário direito CLT NR-16" },
  { title: "Remuneração e Direitos", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "remuneração salário piso eletricista direitos trabalhistas" },

  // Baixar Materiais
  { title: "Mapa da Vida (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "mapa vida PDF imprimir download preencher" },
  { title: "Cartilha de Direitos Trabalhistas", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "cartilha direitos trabalhistas PDF CLT NR-10 imprimir" },
  { title: "Checklist ENEM/SISU/PROUNI", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "checklist ENEM SISU PROUNI documentos prazo imprimir" },
  { title: "Glossário do Eletricista (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "glossário eletricista PDF imprimir termos técnicos" },
  { title: "Mapa de Navegação do Aplicativo", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "mapa navegação navegacao aplicativo completo módulos funcionalidades orientar conhecer" },

  // Para o Educador
  { title: "Quem é o estudante da EJA-EPT?", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "estudante EJA trabalhador adulto trajetória interrompida identidade" },
  { title: "EJA como Direito", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "EJA direito constitucional reparação histórica dívida" },
  { title: "Mundo do Trabalho x Mercado de Trabalho", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "mundo trabalho mercado diferença política pedagogia" },
  { title: "Como mediar o Mapa da Vida", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "mediar mapa vida meritocracia projeto coletivo esperança Freire" },
  { title: "O educador como ponte", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "educador ponte apagão informacional mediação tecnológica" },
  { title: "Roteiro de Encontros", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "roteiro encontros sala aula planejamento pedagógico" },
  { title: "Arco de Maguerez", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "maguerez arco maguerez metodologia problematização estudo caso" },
  { title: "Plano de Aula — Arco de Maguerez", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "plano aula maguerez roteiro prático sala" },
  { title: "Guia Completo do Educador", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "guia educador completo materiais aprofundar imprimir" },

  // Glossário — termos complementares
  { title: "Resistência elétrica", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "resistência elétrica oposição corrente calor aquecimento fio fino carga" },
  { title: "Relé", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "relé interruptor automático comando circuito controle sinal automação proteção motor" },

  // Microlearning — cards complementares
  { title: "Emendas Elétricas", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "emenda elétrica conexão fio incêndio falha instalação norma técnica procedimento" },
  { title: "Circuito Série x Paralelo", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "circuito série paralelo lâmpada fila caminho elétrico diferença" },
  { title: "O que é um Contator?", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "contator dispositivo interruptor motor equipamento industrial painel elétrico comando contatos" },
  { title: "Leitura de Plaqueta do Motor", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "plaqueta motor leitura dados tensão corrente nominal potência rotação fator serviço" },

  // Baixar Materiais — PDFs complementares
  { title: "Eletricista e Experiência (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "eletricista experiência profissão PDF imprimir download trajetória" },
  { title: "Guia para Criar Currículo (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "guia currículo PDF passo a passo montar imprimir download" },
  { title: "Microlearning EJA-EPT (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "microlearning PDF imprimir download conteúdos rápidos elétrica" },
  { title: "Trabalho Precarizado (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "trabalho precarizado PDF precarização riscos direitos imprimir download" },
  { title: "Informática Básica (PDF)", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "informática básica PDF computador celular email moodle QR code passo a passo imprimir download" },

  // Vozes da Trilha — itens complementares
  { title: "Portal de Egressos do IFC", module: "Vozes da Trilha", path: "/vozes", icon: "vozes", keywords: "portal egressos IFC egresso ifc edu br acompanhamento trajetória" },
  { title: "Compartilhar minha história", module: "Vozes da Trilha", path: "/vozes", icon: "vozes", keywords: "compartilhar história enviar depoimento depor relato testemunho escrever" },

  // Home — seções da tela inicial
  { title: "Instale o app no seu celular", module: "Início", path: "/", icon: "empregabilidade", keywords: "instalar app celular android iPhone Chrome Safari adicionar tela inicial PWA ícone instalação" },
  { title: "Informações e Suporte", module: "Início", path: "/", icon: "empregabilidade", keywords: "informações suporte ajuda contato email mapa navegação sobre autoria licença" },
  { title: "Sobre o Produto Educacional", module: "Início", path: "/", icon: "empregabilidade", keywords: "produto educacional dissertação ProfEPT IFC Blumenau Marileia Hillesheim Jorge Dutra autoria mestrado" },
  { title: "Licença Creative Commons", module: "Início", path: "/", icon: "empregabilidade", keywords: "licença creative commons CC BY-NC-ND código fonte atribuição não comercial sem derivações" },
  { title: "Encontrou algum problema?", module: "Início", path: "/", icon: "empregabilidade", keywords: "problema erro suporte email contato relatar reportar link quebrado conteúdo desatualizado" },

  // Configurações
  { title: "Configurações", module: "Configurações", path: "/settings", icon: "empregabilidade", keywords: "configurações settings tema aparência claro escuro sistema sobre versão" },
  { title: "Aparência e Tema", module: "Configurações", path: "/settings", icon: "empregabilidade", keywords: "aparência tema claro escuro sistema visual modo noturno diurno" },

  // Para o Educador — materiais complementares
  { title: "Cartilha de Segurança CERT.br", module: "Para o Educador", path: "/educador", icon: "educador", keywords: "cartilha segurança internet CERT br fascículos slides senhas golpes privacidade redes sociais digital" },

  // Caminhos de Estudo — recursos e plataformas complementares
  { title: "Portal do Estudante IFC", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "portal estudante IFC estudante ifc edu br auxílio bolsa permanência SISAE" },
  { title: "Portal de Ingresso IFC", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "portal ingresso IFC ingresso ifc edu br processo seletivo edital" },
  { title: "Manual do SIGAA", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "manual SIGAA sistema acadêmico notas faltas histórico documento orientações iniciais" },
  { title: "SISAE — Apoio Estudantil", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "SISAE serviço integrado suporte acompanhamento educacional auxílio financeiro bolsa permanência" },
  { title: "ENCCEJA", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ENCCEJA exame certificação ensino fundamental médio conclusão certificado INEP" },
  { title: "UAB — Universidade Aberta do Brasil", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "UAB universidade aberta Brasil graduação distância gratuita CAPES polo" },
];

function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = (() => {
    if (query.trim().length < 3) return [];
    const q = normalize(query.trim());
    return searchIndex
      .filter((item) =>
        normalize(item.title).includes(q) ||
        normalize(item.module).includes(q) ||
        normalize(item.keywords).includes(q)
      )
      .slice(0, 8);
  })();

  const handleSelect = (path) => {
    setQuery("");
    setFocused(false);
    inputRef.current?.blur();
    navigate(path);
  };

  const showDropdown = focused && query.trim().length >= 3;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#global-search-container")) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div id="global-search-container" className="relative mb-5">
      <div className={`flex items-center gap-2 bg-card border rounded-2xl px-3 py-2.5 transition-all ${focused ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
        <Search className="w-4 h-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Buscar no Trilha EJA-EPT..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onMouseDown={(e) => { e.preventDefault(); setQuery(""); }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-2xl shadow-lg z-50 overflow-hidden">
          {results.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4 px-4">
              Nenhum resultado encontrado para "{query}". Tente outras palavras ou navegue pelos módulos no menu abaixo.
            </p>
          ) : (
            <ul>
              {results.map((item, i) => {
                const Icon = moduleIcons[item.icon] || Home;
                return (
                  <li key={i}>
                    <button
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(item.path); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left border-b border-border last:border-0"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm leading-tight truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.module}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}