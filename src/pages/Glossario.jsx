import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  {
    id: "fundamentos",
    title: "Fundamentos Elétricos",
    subtitle: "7 termos",
    emoji: "⚡",
    color: "bg-yellow-50 border-yellow-300",
    headerColor: "bg-yellow-100",
    terms: [
      {
        term: "FASE",
        emoji: "⚡",
        color: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700",
        simple: "O condutor energizado do circuito elétrico",
        detail: "É o condutor energizado do circuito elétrico — por onde a energia chega até o equipamento. É o fio que oferece maior risco de choque elétrico. A cor do fio pode variar conforme a instalação.",
        warning: "Nunca toque em fios sem antes verificar se a energia está desligada no disjuntor.",
        tip: "Presente em toda instalação elétrica — tomadas, interruptores e quadros.",
      },
      {
        term: "NEUTRO",
        emoji: "🔵",
        color: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        simple: "Condutor que fecha o circuito elétrico",
        detail: "Condutor que participa do fechamento do circuito elétrico, permitindo a passagem da corrente. Normalmente identificado pela cor azul-claro.",
        warning: "Apesar do nome, o fio neutro também exige cuidados — nunca o manuseie sem verificar se a energia está desligada.",
        tip: "Presente em toda instalação elétrica junto com o fio fase.",
      },
      {
        term: "TERRA",
        emoji: "🌱",
        color: "bg-green-50 border-green-200",
        badge: "bg-green-100 text-green-700",
        simple: "Condutor de proteção contra falhas elétricas",
        detail: "Condutor de proteção que ajuda a proteger pessoas e equipamentos em caso de falha elétrica. Normalmente identificado pelas cores verde ou verde/amarelo.",
        warning: null,
        tip: "Presente em tomadas modernas com três pinos e em equipamentos industriais.",
      },
      {
        term: "TENSÃO",
        emoji: "🌊",
        color: "bg-purple-50 border-purple-200",
        badge: "bg-purple-100 text-purple-700",
        simple: "A força que impulsiona a corrente elétrica",
        detail: "É a força que impulsiona a corrente elétrica pelo circuito — como a pressão da água em um cano. No Brasil, as tensões mais comuns são 127V e 220V.",
        warning: null,
        tip: "Verifique sempre a tensão indicada no equipamento antes de ligá-lo. Ligar um equipamento na tensão errada pode danificá-lo.",
      },
      {
        term: "CORRENTE ELÉTRICA",
        emoji: "🌊",
        color: "bg-cyan-50 border-cyan-200",
        badge: "bg-cyan-100 text-cyan-700",
        simple: "O fluxo de elétrons pelo condutor",
        detail: "É o fluxo de elétrons pelo condutor — como a água que corre por uma tubulação. Correntes maiores exigem instalações e cabos adequados para evitar aquecimento.",
        warning: null,
        tip: "Medida em Ampères (A) — presente em qualquer equipamento elétrico.",
      },
      {
        term: "RESISTÊNCIA",
        emoji: "🌀",
        color: "bg-amber-50 border-amber-200",
        badge: "bg-amber-100 text-amber-700",
        simple: "A oposição à passagem da corrente elétrica",
        detail: "É a oposição que um material oferece à passagem da corrente elétrica. Quanto maior a resistência, maior o calor gerado no condutor.",
        warning: null,
        tip: "Fios muito finos para uma carga alta aumentam a resistência e podem superaquecer.",
      },
      {
        term: "POTÊNCIA",
        emoji: "💪",
        color: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700",
        simple: "Energia consumida ou transformada por segundo",
        detail: "Indica a quantidade de energia que um equipamento consome ou transforma por segundo. Medida em Watts (W) ou Quilowatts (kW). Relaciona tensão, corrente e consumo de energia.",
        warning: null,
        tip: "Presente nas etiquetas de chuveiros, motores, lâmpadas e eletrodomésticos.",
      },
    ],
  },
  {
    id: "protecao",
    title: "Proteção e Segurança",
    subtitle: "9 termos",
    emoji: "🛡️",
    color: "bg-red-50 border-red-300",
    headerColor: "bg-red-100",
    terms: [
      {
        term: "DISJUNTOR",
        emoji: "🔲",
        color: "bg-orange-50 border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        simple: "Dispositivo que protege o circuito elétrico",
        detail: "Dispositivo de proteção que interrompe automaticamente o circuito em caso de sobrecarga ou curto-circuito, protegendo a instalação e os equipamentos. Diferente do DR, que protege contra choques elétricos, o disjuntor protege principalmente os fios e equipamentos.",
        warning: null,
        tip: "Encontrado no quadro elétrico de casas, empresas e indústrias.",
      },
      {
        term: "DISPOSITIVO DR",
        emoji: "🛡️",
        color: "bg-indigo-50 border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700",
        simple: "Protetor que reduz riscos de choque elétrico",
        detail: "Dispositivo Diferencial Residual — ajuda a reduzir riscos de choques elétricos ao detectar vazamentos de corrente e desligar o circuito automaticamente em milissegundos. Quando detecta que parte da corrente está escapando pelo corpo de uma pessoa ou por outro caminho não previsto, desliga o circuito imediatamente. Complementa o aterramento e os disjuntores, mas não garante proteção absoluta.",
        warning: null,
        tip: "Obrigatório em banheiros, cozinhas, áreas externas e piscinas.",
      },
      {
        term: "ATERRAMENTO",
        emoji: "⏚",
        color: "bg-green-50 border-green-200",
        badge: "bg-green-100 text-green-700",
        simple: "Sistema que direciona correntes de fuga ao solo",
        detail: "Sistema de proteção que direciona correntes de fuga para o solo, ajudando a proteger pessoas e equipamentos. O aterramento reduz riscos mas não elimina completamente o perigo elétrico — deve sempre ser combinado com outras medidas de proteção como o DR e os disjuntores. (NBR 5410)",
        warning: null,
        tip: "Tomadas com três pinos e equipamentos industriais utilizam aterramento.",
      },
      {
        term: "CURTO-CIRCUITO",
        emoji: "💥",
        color: "bg-destructive/5 border-destructive/20",
        badge: "bg-red-100 text-red-700",
        simple: "Conexão não intencional entre pontos de potenciais diferentes",
        detail: "Ocorre quando dois pontos de diferentes potenciais elétricos se conectam de forma não intencional, permitindo a passagem de uma corrente muito elevada. Pode causar aquecimento intenso, danos à instalação e risco de incêndio. Diferente da sobrecarga, o curto-circuito ocorre de forma súbita e brusca.",
        warning: "Em caso de cheiro de queimado ou faíscas, desligue o disjuntor e procure um profissional.",
        tip: "Pode acontecer por fios pelados, ligações incorretas ou falhas em equipamentos.",
      },
      {
        term: "SOBRECARGA",
        emoji: "🔥",
        color: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700",
        simple: "Excesso de corrente além da capacidade do circuito",
        detail: "Ocorre quando um circuito recebe mais corrente elétrica do que foi projetado para suportar, causando aquecimento dos condutores e risco de danos ou incêndio. Diferente do curto-circuito, a sobrecarga ocorre gradualmente — a corrente vai aumentando até superar o limite seguro do circuito.",
        warning: "Sinais de alerta: tomadas quentes, cheiro de queimado ou disjuntor desarmando com frequência.",
        tip: "Ligar muitos equipamentos numa mesma tomada pode causar sobrecarga no circuito.",
      },
      {
        term: "EPI",
        emoji: "🧤",
        color: "bg-orange-50 border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        simple: "Equipamentos que protegem o trabalhador",
        detail: "Equipamento de Proteção Individual — equipamentos utilizados para proteger o(a) trabalhador(a) durante atividades de risco. Na área elétrica incluem: luvas isolantes, capacete, óculos de proteção, calçados adequados e vestimentas. A empresa é obrigada a fornecer gratuitamente. (NR-06 e NR-10)",
        warning: null,
        tip: "Obrigatório em qualquer atividade com risco elétrico.",
      },
      {
        term: "NR-10",
        emoji: "📋",
        color: "bg-slate-50 border-slate-200",
        badge: "bg-slate-100 text-slate-700",
        simple: "Norma de segurança para trabalhos elétricos",
        detail: "Norma Regulamentadora que estabelece os requisitos mínimos de segurança para instalação, operação e manutenção de sistemas elétricos. Define treinamentos obrigatórios, EPIs e procedimentos seguros para quem trabalha com eletricidade.",
        warning: null,
        tip: "Todo(a) profissional que trabalha com eletricidade precisa conhecer e seguir a NR-10.",
      },
      {
        term: "LOTO (Bloqueio e Etiquetagem)",
        emoji: "🔒",
        color: "bg-yellow-50 border-yellow-200",
        badge: "bg-yellow-100 text-yellow-700",
        simple: "Procedimento que garante segurança na manutenção",
        detail: "Procedimento de segurança que garante que máquinas e equipamentos sejam desligados e bloqueados antes de qualquer manutenção, evitando acionamentos acidentais.",
        warning: "Nunca realize manutenção em equipamentos sem verificar se o LOTO foi aplicado.",
        tip: "Utilizado em manutenção industrial para proteger quem trabalha em equipamentos elétricos.",
      },
      {
        term: "ARCO ELÉTRICO",
        emoji: "⚠️",
        color: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-700",
        simple: "Descarga elétrica intensa entre dois pontos",
        detail: "Descarga elétrica intensa que ocorre quando a corrente elétrica ioniza o ar entre dois pontos de diferentes potenciais elétricos. Pode atingir temperaturas superiores a 20.000°C e causar queimaduras graves, danos à visão e incêndios.",
        warning: "O uso de EPIs adequados é fundamental para proteção contra arco elétrico.",
        tip: "Risco presente em manutenções em painéis elétricos energizados e em equipamentos de alta tensão.",
      },
    ],
  },
  {
    id: "equipamentos",
    title: "Equipamentos Industriais",
    subtitle: "7 termos",
    emoji: "🔧",
    color: "bg-slate-50 border-slate-300",
    headerColor: "bg-slate-100",
    terms: [
      {
        term: "MULTÍMETRO",
        emoji: "🔬",
        color: "bg-slate-50 border-slate-200",
        badge: "bg-slate-100 text-slate-700",
        simple: "Instrumento para medir tensão, corrente e resistência",
        detail: "Instrumento de medição utilizado para medir tensão, corrente e resistência elétrica. Essencial para testes, diagnósticos e manutenção de instalações e equipamentos.",
        warning: "Use sempre na escala correta e verifique o estado das ponteiras antes de medir.",
        tip: "Utilizado em manutenção elétrica industrial e testes de continuidade.",
      },
      {
        term: "CONTATOR",
        emoji: "🔌",
        color: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        simple: "Liga e desliga circuitos elétricos de forma controlada",
        detail: "Dispositivo eletromecânico usado para ligar e desligar circuitos elétricos de forma controlada, especialmente em motores e equipamentos industriais.",
        warning: null,
        tip: "Encontrado em painéis elétricos industriais para acionamento de motores e máquinas.",
      },
      {
        term: "RELÉ",
        emoji: "🔄",
        color: "bg-purple-50 border-purple-200",
        badge: "bg-purple-100 text-purple-700",
        simple: "Interruptor automático comandado por outro circuito",
        detail: "Dispositivo que abre ou fecha um circuito elétrico a partir de um sinal de controle. Funciona como um interruptor automático comandado por outro circuito.",
        warning: null,
        tip: "Utilizado em automação industrial e sistemas de proteção de motores.",
      },
      {
        term: "MOTOR ELÉTRICO",
        emoji: "⚙️",
        color: "bg-green-50 border-green-200",
        badge: "bg-green-100 text-green-700",
        simple: "Transforma energia elétrica em movimento",
        detail: "Máquina que transforma energia elétrica em energia mecânica (movimento). É um dos equipamentos mais comuns na indústria.",
        warning: null,
        tip: "Presente em máquinas industriais, bombas, compressores, esteiras e ventiladores.",
      },
      {
        term: "INVERSOR DE FREQUÊNCIA",
        emoji: "📊",
        color: "bg-indigo-50 border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700",
        simple: "Controla a velocidade de motores elétricos",
        detail: "Equipamento eletrônico que controla a velocidade de motores elétricos variando a frequência e a tensão da energia fornecida ao motor. Permite ajustar a velocidade conforme a necessidade do processo industrial.",
        warning: null,
        tip: "Utilizado em esteiras, bombas e ventiladores industriais que precisam de velocidade variável.",
      },
      {
        term: "QD (Quadro de Distribuição)",
        emoji: "🗂️",
        color: "bg-orange-50 border-orange-200",
        badge: "bg-orange-100 text-orange-700",
        simple: "Painel que distribui energia pelos circuitos",
        detail: "Painel onde os disjuntores e outros dispositivos de proteção são instalados para distribuir a energia elétrica pelos circuitos de uma instalação.",
        warning: null,
        tip: "Presente em indústrias, empresas e residências — é onde ficam os disjuntores de cada circuito.",
      },
      {
        term: "PAINEL ELÉTRICO",
        emoji: "🖥️",
        color: "bg-slate-50 border-slate-200",
        badge: "bg-slate-100 text-slate-700",
        simple: "Estrutura para controlar e distribuir energia",
        detail: "Conjunto de componentes elétricos montados em uma estrutura para controlar, proteger e distribuir energia elétrica em indústrias e instalações.",
        warning: null,
        tip: "Presente em fábricas e indústrias para comando e proteção de máquinas e equipamentos.",
      },
    ],
  },
  {
    id: "sistemas",
    title: "Sistemas Elétricos",
    subtitle: "2 termos",
    emoji: "🏭",
    color: "bg-blue-50 border-blue-300",
    headerColor: "bg-blue-100",
    terms: [
      {
        term: "SEC (Sistema Elétrico de Consumo)",
        emoji: "🏢",
        color: "bg-blue-50 border-blue-200",
        badge: "bg-blue-100 text-blue-700",
        simple: "Sistema elétrico interno de indústrias e empresas",
        detail: "Sistema elétrico interno de indústrias, empresas e residências — onde a energia já chega distribuída e é utilizada pelos equipamentos. É o sistema onde o(a) eletricista industrial mais atua.",
        warning: null,
        tip: "É o sistema elétrico dentro das fábricas, empresas e casas.",
      },
      {
        term: "SEP (Sistema Elétrico de Potência)",
        emoji: "🏭",
        color: "bg-indigo-50 border-indigo-200",
        badge: "bg-indigo-100 text-indigo-700",
        simple: "Geração, transmissão e distribuição em larga escala",
        detail: "Sistema responsável pela geração, transmissão e distribuição de energia elétrica em grande escala — como torres de transmissão e subestações.",
        warning: null,
        tip: "É o sistema que leva energia das usinas até cidades e indústrias.",
      },
    ],
  },
];

function TermCard({ t, isOpen, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${t.color}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{t.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-sm text-foreground">{t.term}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.badge}`}>
              toque para ver mais
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5 font-medium">{t.simple}</p>
        </div>
        <span className={`text-muted-foreground transition-transform text-lg ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-current/10 space-y-2">
          <p className="text-sm leading-relaxed text-foreground">{t.detail}</p>
          {t.warning && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-red-800">⚠️ Segurança: {t.warning}</p>
            </div>
          )}
          <div className="bg-white/60 rounded-xl p-3">
            <p className="text-sm font-semibold">💡 Dia a dia: {t.tip}</p>
          </div>
        </div>
      )}
    </button>
  );
}

export default function Glossario() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [openCategories, setOpenCategories] = useState({ fundamentos: true, protecao: false, equipamentos: false, sistemas: false });

  const allTerms = categories.flatMap((c) => c.terms);
  const isSearching = search.trim().length > 0;

  const filteredAll = isSearching
    ? allTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(search.toLowerCase()) ||
          t.simple.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalTerms = allTerms.length;

  return (
    <div>
      <PageHeader title="Glossário do Eletricista" subtitle="Domine os termos técnicos do seu ofício" />
      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar termo..."
            className="pl-10 h-12 rounded-xl text-base"
          />
        </div>

        <div className="bg-chart-3/10 border border-chart-3/20 rounded-2xl p-4 mb-1">
          <p className="text-sm leading-relaxed text-foreground">Dominar os <strong>termos técnicos</strong> é também dominar o <strong>seu ofício</strong>. Consulte sempre que precisar.</p>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {totalTerms} termos em {categories.length} categorias • Toque em um para ver mais detalhes
        </p>

        {/* Search results */}
        {isSearching && (
          <div className="space-y-2 pb-2">
            <p className="text-xs text-muted-foreground px-1">{filteredAll.length} resultado(s) para "{search}"</p>
            {filteredAll.map((t) => (
              <TermCard
                key={t.term}
                t={t}
                isOpen={expanded === t.term}
                onToggle={() => setExpanded(expanded === t.term ? null : t.term)}
              />
            ))}
            {filteredAll.length === 0 && (
              <div className="text-center py-10">
                <span className="text-4xl block mb-2">🔍</span>
                <p className="text-muted-foreground">Nenhum termo encontrado</p>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!isSearching && (
          <div className="space-y-3 pb-4">
            {categories.map((cat) => (
              <div key={cat.id} className={`rounded-2xl border-2 overflow-hidden ${cat.color}`}>
                {/* Category header */}
                <button
                  onClick={() => toggleCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 ${cat.headerColor} text-left`}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm text-foreground">{cat.title}</p>
                    <p className="text-xs text-muted-foreground">{cat.subtitle}</p>
                  </div>
                  <span className={`text-muted-foreground transition-transform text-lg ${openCategories[cat.id] ? "rotate-180" : ""}`}>▾</span>
                </button>

                {/* Terms inside category */}
                {openCategories[cat.id] && (
                  <div className="p-3 space-y-2">
                    {cat.terms.map((t) => (
                      <TermCard
                        key={t.term}
                        t={t}
                        isOpen={expanded === t.term}
                        onToggle={() => setExpanded(expanded === t.term ? null : t.term)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}