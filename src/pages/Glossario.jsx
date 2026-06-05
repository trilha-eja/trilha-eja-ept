import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const terms = [
  {
    term: "FASE",
    emoji: "⚡",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    simple: "O fio que carrega a eletricidade",
    detail: "É o fio 'vivo' do circuito. Geralmente é preto, vermelho ou marrom. Nunca toque nele sem desligar o disjuntor! A tensão fica aqui — 127V ou 220V.",
    tip: "🔴 Fio vermelho ou preto = PERIGO, é o fase!",
  },
  {
    term: "NEUTRO",
    emoji: "🔵",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    simple: "O fio de retorno da energia",
    detail: "Ele completa o circuito, permitindo que a corrente 'volte' depois de passar pela carga (lâmpada, aparelho...). Geralmente é azul. Não tem tensão, mas ainda é perigoso!",
    tip: "🔵 Fio azul = NEUTRO. Sem tensão, mas cuidado!",
  },
  {
    term: "TERRA",
    emoji: "🌱",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    simple: "O fio de segurança que protege você",
    detail: "Conectado diretamente ao chão (terra). Se houver um vazamento de energia, esse fio conduz a corrente para o solo, evitando que você leve um choque.",
    tip: "🟢 Fio verde (ou verde/amarelo) = TERRA. Sua proteção!",
  },
  {
    term: "DISJUNTOR",
    emoji: "🔲",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    simple: "O 'guarda-costas' do circuito elétrico",
    detail: "Fica no quadro de distribuição. Quando passa corrente demais (sobrecarga) ou tem curto-circuito, ele desliga automaticamente para proteger a fiação e evitar incêndios.",
    tip: "🟠 Se o disjuntor caiu: não ligue de volta sem descobrir o porquê!",
  },
  {
    term: "CURTO-CIRCUITO",
    emoji: "💥",
    color: "bg-destructive/5 border-destructive/20",
    badge: "bg-red-100 text-red-700",
    simple: "Quando a eletricidade toma um atalho perigoso",
    detail: "Acontece quando o fio fase toca o neutro diretamente, sem passar por nenhuma carga. A corrente dispara, gerando calor, faísca e risco de incêndio. O disjuntor corta na hora.",
    tip: "💥 Faísca + disjuntor caindo = sinal de curto! Chame um técnico.",
  },
  {
    term: "TENSÃO (VOLTAGEM)",
    emoji: "🌊",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    simple: "A 'pressão' que empurra a eletricidade",
    detail: "Medida em Volts (V). Pense como a pressão da água numa caixa d'água: quanto mais alta, mais força. No Brasil: 127V ou 220V. Aparelhos têm tensão ideal — leia sempre o manual!",
    tip: "⚡ 127V ou 220V — sempre confira antes de ligar um aparelho!",
  },
  {
    term: "CORRENTE (AMPERAGEM)",
    emoji: "🌊",
    color: "bg-cyan-50 border-cyan-200",
    badge: "bg-cyan-100 text-cyan-700",
    simple: "A quantidade de eletricidade que flui",
    detail: "Medida em Ampères (A). Se a tensão é a pressão da água, a corrente é a quantidade de água que passa pelo cano. Fios têm limite de corrente — passar mais que isso aquece e pode causar incêndio.",
    tip: "🔢 Amperagem alta = fio mais grosso necessário!",
  },
  {
    term: "RESISTÊNCIA",
    emoji: "🌀",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    simple: "O quanto algo 'dificulta' a passagem da eletricidade",
    detail: "Medida em Ohms (Ω). Fios finos têm mais resistência que fios grossos. Quando a corrente passa por uma resistência, gera calor — é assim que chuveiros e ferros de passar funcionam!",
    tip: "🔧 Quanto mais fio, mais resistência. Use o mínimo necessário!",
  },
  {
    term: "POTÊNCIA",
    emoji: "💪",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    simple: "Quanto de energia um aparelho usa ou produz",
    detail: "Medida em Watts (W). A conta de luz é em kWh (quilowatt-hora). Um chuveiro elétrico usa ~5.500W — é o aparelho mais 'guloso' de energia da casa!",
    tip: "💡 W = V × A. Quanto maior o W, mais energia consome!",
  },
  {
    term: "ATERRAMENTO",
    emoji: "⏚",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    simple: "Ligar a instalação à terra para segurança",
    detail: "É o sistema que conecta partes metálicas de equipamentos ao solo. Se houver falha elétrica, a energia vai para a terra, não para você. Obrigatório em instalações modernas (NBR 5410).",
    tip: "⏚ Sem aterramento = risco de choque. Exija aterramento!",
  },
  {
    term: "DISJUNTOR DR",
    emoji: "🛡️",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
    simple: "O protetor que salva vidas de choques",
    detail: "O DR (Diferencial Residual) detecta pequenas fugas de corrente — inclusive através do corpo humano — e desliga em milissegundos, antes do choque machucar você.",
    tip: "🛡️ DR no banheiro e cozinha = proteção essencial!",
  },
  {
    term: "SOBRECARGA",
    emoji: "🔥",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    simple: "Quando passa mais energia do que o fio aguenta",
    detail: "Ocorre quando ligamos aparelhos demais num mesmo circuito. O fio esquenta, pode derreter o isolamento e causar incêndio. O disjuntor corta — mas se o disjuntor estiver errado, pode não cortar!",
    tip: "🔌 Não use benjamins! Distribua os aparelhos em tomadas diferentes.",
  },
  {
    term: "MULTÍMETRO",
    emoji: "🔬",
    color: "bg-slate-50 border-slate-200",
    badge: "bg-slate-100 text-slate-700",
    simple: "O instrumento que 'lê' a eletricidade",
    detail: "Mede tensão (V), corrente (A) e resistência (Ω). É a ferramenta mais importante do eletricista. Com ele você testa se há energia, se o fio está rompido e muito mais.",
    tip: "🔬 Todo eletricista tem um multímetro. É o seu melhor amigo!",
  },
  {
    term: "EPI",
    emoji: "🧤",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    simple: "Equipamento que protege seu corpo no trabalho",
    detail: "EPI = Equipamento de Proteção Individual. Para eletricistas: luvas isolantes, óculos, capacete, botina isolante e roupa anti-chama. A empresa é OBRIGADA a fornecer gratuitamente.",
    tip: "🧤 Sem EPI, não trabalhe. É seu direito e é sua vida!",
  },
];

export default function Glossario() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = terms.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.simple.toLowerCase().includes(search.toLowerCase())
  );

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

        <p className="text-xs text-muted-foreground text-center mb-1">
          Dominar os termos técnicos é também dominar o seu ofício. Consulte sempre que precisar.
        </p>
        <p className="text-xs text-muted-foreground text-center">
          {filtered.length} termos • Toque em um para ver mais detalhes
        </p>

        {/* Terms list */}
        <div className="space-y-2 pb-2">
          {filtered.map((t) => {
            const isOpen = expanded === t.term;
            return (
              <button
                key={t.term}
                onClick={() => setExpanded(isOpen ? null : t.term)}
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
                    <div className="bg-white/60 rounded-xl p-3">
                      <p className="text-sm font-semibold">{t.tip}</p>
                    </div>
                  </div>
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-10">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-muted-foreground">Nenhum termo encontrado</p>
            </div>
          )}
        </div>


      </div>
    </div>
  );
}