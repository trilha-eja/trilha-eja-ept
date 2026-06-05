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
};

const searchIndex = [
  // Módulos principais
  { title: "Mundo do Trabalho", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "trabalho emprego direitos currículo habilidades" },
  { title: "Guia Prático", module: "Guia Prático", path: "/guia-pratico", icon: "guia", keywords: "prático instalação tomada fio eletricidade passo" },
  { title: "Microlearning", module: "Microlearning", path: "/microlearning", icon: "microlearning", keywords: "aprender rápido NR-10 segurança norma regulamentadora" },
  { title: "Mapa da Vida", module: "Mapa da Vida", path: "/mapa-da-vida", icon: "mapa", keywords: "mapa vida projeto sonho meta futuro planejamento" },
  { title: "Caminhos de Estudo", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ENEM SISU PROUNI FIES estudo faculdade universidade vestibular" },
  { title: "Glossário do Eletricista", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "glossário termos técnicos elétrica vocabulário fase neutro terra aterramento" },
  { title: "Vozes da Trilha", module: "Vozes da Trilha", path: "/vozes", icon: "vozes", keywords: "histórias depoimentos relatos trabalhadores estudantes trilha" },
  { title: "Sua Opinião Importa", module: "Sua Opinião Importa", path: "/opiniao", icon: "opiniao", keywords: "opinião avaliação feedback estrelas sugestão" },
  { title: "Baixar Materiais", module: "Baixar Materiais", path: "/materiais", icon: "materiais", keywords: "PDF download material impresso apostila" },

  // Mundo do Trabalho — subpáginas
  { title: "Criar meu Currículo", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "currículo curriculum vitae modelo preencher" },
  { title: "Valorize sua Experiência", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "experiência habilidades soft skills competência vida" },
  { title: "Trabalho Precarizado", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "precarização MEI autônomo empreendedor riscos direitos precariado antunes" },
  { title: "Seus Direitos Trabalhistas", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "direitos trabalhistas CLT carteira assinada salário férias" },
  { title: "Sites de Emprego", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "emprego vaga trabalho site indeed infojobs linkedin catho" },
  { title: "Sites de Estágio", module: "Mundo do Trabalho", path: "/empregabilidade", icon: "empregabilidade", keywords: "estágio estagiário cadastro oportunidade jovem aprendiz" },

  // Direitos Trabalhistas — subseções
  { title: "Contrato e Registro", module: "Direitos Trabalhistas", path: "/empregabilidade", icon: "empregabilidade", keywords: "contrato registro carteira assinada vale-transporte igualdade admissão" },
  { title: "Jornada e Remuneração", module: "Direitos Trabalhistas", path: "/empregabilidade", icon: "empregabilidade", keywords: "jornada horas extras férias 13º salário remuneração" },
  { title: "Proteção e Segurança", module: "Direitos Trabalhistas", path: "/empregabilidade", icon: "empregabilidade", keywords: "FGTS seguro desemprego segurança demissão proteção" },
  { title: "Previdência Social", module: "Direitos Trabalhistas", path: "/empregabilidade", icon: "empregabilidade", keywords: "INSS aposentadoria auxílio licença previdência social" },
  { title: "Direitos Coletivos", module: "Direitos Trabalhistas", path: "/empregabilidade", icon: "empregabilidade", keywords: "sindicato greve negociação coletiva associação trabalhadores" },

  // Caminhos de Estudo — subpáginas
  { title: "ENEM", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ENEM exame nacional ensino médio inscrição nota redação" },
  { title: "SISU", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "SISU universidade federal cotas vagas ingresso" },
  { title: "PROUNI", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "PROUNI bolsa particular faculdade gratuita" },
  { title: "FIES", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "FIES financiamento estudantil empréstimo faculdade" },
  { title: "Cursos Gratuitos", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "cursos gratuitos SENAI SENAC Sebrae certificação qualificação" },
  { title: "Ferramentas Digitais para Estudar", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "ferramentas digitais app celular khan academy chatgpt youtube" },
  { title: "Dicas de Estudo", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "dicas estudo pomodoro rotina organização tempo concentração" },
  { title: "Vídeos Recomendados", module: "Caminhos de Estudo", path: "/caminhos", icon: "caminhos", keywords: "vídeos youtube aulas gratuitas recomendados assistir" },

  // Glossário — termos
  { title: "Fase (elétrica)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "fase fio condutor tensão corrente elétrica" },
  { title: "Neutro", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "neutro fio retorno corrente circuito" },
  { title: "Aterramento / Terra", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "aterramento terra proteção choque elétrico segurança" },
  { title: "Disjuntor", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "disjuntor proteção curto circuito sobrecarga desligar" },
  { title: "NR-10", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "NR-10 norma regulamentadora segurança eletricidade trabalho" },
  { title: "SPDA (Para-raios)", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "SPDA para-raios descarga atmosférica proteção raio" },
  { title: "Quadro de Distribuição", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "quadro distribuição QD painel elétrico disjuntores" },
  { title: "Tomada / Ponto de Energia", module: "Glossário", path: "/glossario", icon: "glossario", keywords: "tomada ponto energia instalação plug NBR" },
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
    if (query.trim().length < 2) return [];
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

  const showDropdown = focused && query.trim().length >= 2;

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
              Nenhum resultado encontrado. Tente outra palavra.
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