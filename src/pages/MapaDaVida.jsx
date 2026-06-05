import { useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MapaVisual from "../components/mapa/MapaVisual";

const STORAGE_KEY = "mapa_vida_rascunho";
const NOME_KEY = "mapa_vida_nome";

const NOME_MAX = 25;

// Mapa de limites por field — usado na validação do localStorage
const FIELD_LIMITS = {
  partida_forca: 25, partida_orgulho: 80, partida_motivacao: 80,
  trabalho_semana: 35, trabalho_1ano: 35, trabalho_5anos: 35, trabalho_10anos: 35,
  estudos_semana:  35, estudos_1ano:  35, estudos_5anos:  35, estudos_10anos:  35,
  familia_semana:  35, familia_1ano:  35, familia_5anos:  35, familia_10anos:  35,
  eu_semana:       35, eu_1ano:       35, eu_5anos:       35, eu_10anos:       35,
  material_semana: 35, material_1ano: 35, material_5anos: 35, material_10anos: 35,
  comunidade_semana: 35, comunidade_1ano: 35, comunidade_5anos: 35, comunidade_10anos: 35,
};

const ETAPAS = [
  {
    emoji: "🌱",
    titulo: "Seu ponto de partida",
    subtitulo: "Antes de olhar para frente, reconheça o que você já construiu.",
    perguntas: [
      // campo de nome é tratado separadamente no render
      { field: "partida_forca",     maxLength: 25, label: "Qual é a sua maior força hoje?",                              placeholder: "Pode ser coragem, paciência, persistência, cuidado com os outros..." },
      { field: "partida_orgulho",   maxLength: 80, label: "O que você já conquistou na vida que te enche de orgulho?",  placeholder: "Criar seus filhos, chegar até aqui, aprender uma habilidade — tudo isso é conquista real." },
      { field: "partida_motivacao", maxLength: 80, label: "O que te trouxe até este curso?",                            placeholder: "O que te motivou a voltar a estudar?" },
    ],
  },
  {
    emoji: "🔧",
    titulo: "Trabalho e Profissão",
    subtitulo: "Onde você quer chegar como profissional?",
    perguntas: [
      { field: "trabalho_semana",  maxLength: 35, label: "Esta semana, qual pequeno passo posso dar na minha vida profissional?", placeholder: "Ex: Atualizar meu currículo, pesquisar uma vaga..." },
      { field: "trabalho_1ano",   maxLength: 35, label: "Em 1 ano, onde quero estar profissionalmente?",                         placeholder: "Ex: Trabalhando como eletricista com carteira assinada..." },
      { field: "trabalho_5anos",  maxLength: 35, label: "Em 5 anos, como imagino minha vida no trabalho?",                      placeholder: "Ex: Ter minha própria empresa, ser técnico sênior..." },
      { field: "trabalho_10anos", maxLength: 35, label: "Em 10 anos, qual é meu maior sonho profissional?",                     placeholder: "Ex: Ter estabilidade, ser referência na minha área..." },
    ],
  },
  {
    emoji: "📚",
    titulo: "Estudos e Aprendizado",
    subtitulo: "O conhecimento que você quer buscar para si mesmo.",
    perguntas: [
      { field: "estudos_semana",  maxLength: 35, label: "Esta semana, o que posso fazer pelos meus estudos?",                   placeholder: "Ex: Revisar o conteúdo da aula, pesquisar sobre o ENEM..." },
      { field: "estudos_1ano",   maxLength: 35, label: "Em 1 ano, o que quero ter aprendido ou conquistado nos estudos?",       placeholder: "Ex: Concluir o curso técnico, me inscrever no ENEM..." },
      { field: "estudos_5anos",  maxLength: 35, label: "Em 5 anos, como imagino minha formação?",                              placeholder: "Ex: Estar cursando engenharia elétrica..." },
      { field: "estudos_10anos", maxLength: 35, label: "Em 10 anos, qual é meu maior sonho nos estudos?",                      placeholder: "Ex: Ter uma graduação, fazer uma especialização..." },
    ],
  },
  {
    emoji: "👨‍👩‍👧",
    titulo: "Família e Relações",
    subtitulo: "As pessoas que você ama e quer construir junto.",
    perguntas: [
      { field: "familia_semana",  maxLength: 35, label: "Esta semana, o que posso fazer pela minha família?",                   placeholder: "Ex: Passar mais tempo com meus filhos, ligar para alguém que não falo há tempo..." },
      { field: "familia_1ano",   maxLength: 35, label: "Em 1 ano, como quero que seja minha vida familiar?",                   placeholder: "Ex: Ter mais tempo de qualidade com minha família..." },
      { field: "familia_5anos",  maxLength: 35, label: "Em 5 anos, o que quero ter construído com quem amo?",                  placeholder: "Ex: Uma vida mais estável para meus filhos..." },
      { field: "familia_10anos", maxLength: 35, label: "Em 10 anos, qual é meu maior sonho para minha família?",               placeholder: "Ex: Ver meus filhos realizados, ter uma família unida..." },
    ],
  },
  {
    emoji: "🌟",
    titulo: "Eu Mesmo(a)",
    subtitulo: "Seu crescimento pessoal, sua saúde, seu bem-estar.",
    perguntas: [
      { field: "eu_semana",  maxLength: 35, label: "Esta semana, o que posso fazer por mim mesmo?",                            placeholder: "Ex: Dormir melhor, reservar um momento só meu..." },
      { field: "eu_1ano",   maxLength: 35, label: "Em 1 ano, que versão de mim quero ser?",                                   placeholder: "Ex: Mais confiante, mais saudável, mais tranquilo..." },
      { field: "eu_5anos",  maxLength: 35, label: "Em 5 anos, o que quero ter superado ou conquistado para mim mesmo?",       placeholder: "Ex: Superar o medo de falar em público, cuidar melhor da minha saúde..." },
      { field: "eu_10anos", maxLength: 35, label: "Em 10 anos, como quero me sentir sobre a minha trajetória?",               placeholder: "Ex: Orgulhoso do caminho que percorri..." },
    ],
  },
  {
    emoji: "🏠",
    titulo: "Vida Material",
    subtitulo: "Estabilidade, moradia e conquistas concretas.",
    perguntas: [
      { field: "material_semana",  maxLength: 35, label: "Esta semana, o que posso fazer pela minha estabilidade financeira?", placeholder: "Ex: Organizar minhas contas, pesquisar uma renda extra..." },
      { field: "material_1ano",   maxLength: 35, label: "Em 1 ano, o que quero ter conquistado materialmente?",               placeholder: "Ex: Sair do aluguel, ter uma reserva financeira..." },
      { field: "material_5anos",  maxLength: 35, label: "Em 5 anos, como imagino minha vida material?",                      placeholder: "Ex: Casa própria, carro, mais estabilidade..." },
      { field: "material_10anos", maxLength: 35, label: "Em 10 anos, qual é meu maior sonho de conquista material?",          placeholder: "Ex: Uma vida confortável para minha família, independência financeira..." },
    ],
  },
  {
    emoji: "🤝",
    titulo: "Comunidade",
    subtitulo: "Como você quer contribuir com as pessoas ao seu redor.",
    perguntas: [
      { field: "comunidade_semana",  maxLength: 35, label: "Esta semana, o que posso fazer por alguém além de mim?",          placeholder: "Ex: Ajudar um colega de curso, participar de algo no meu bairro..." },
      { field: "comunidade_1ano",   maxLength: 35, label: "Em 1 ano, como quero contribuir com minha comunidade?",            placeholder: "Ex: Ser referência para alguém mais novo..." },
      { field: "comunidade_5anos",  maxLength: 35, label: "Em 5 anos, que impacto quero ter causado ao meu redor?",           placeholder: "Ex: Ter ajudado alguém a voltar a estudar..." },
      { field: "comunidade_10anos", maxLength: 35, label: "Em 10 anos, como quero ser lembrado pelas pessoas ao meu redor?",  placeholder: "Ex: Como alguém que fez diferença, que ajudou, que inspirou..." },
    ],
  },
];

// ─── Helpers localStorage ───────────────────────────────────────────────────
function loadDraft() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveDraft(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, _savedAt: new Date().toISOString() })); } catch {}
}
function loadNome() {
  try {
    // 1. chave própria do mapa
    const nome = localStorage.getItem(NOME_KEY);
    if (nome) return nome;
    // 2. curriculo_rascunho
    const cur = localStorage.getItem("curriculo_rascunho");
    if (cur) {
      const parsed = JSON.parse(cur);
      return parsed.full_name || parsed.nome || "";
    }
  } catch {}
  return "";
}
function saveNome(nome) {
  try { localStorage.setItem(NOME_KEY, nome); } catch {}
}
function clearStorage() {
  try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(NOME_KEY); } catch {}
}
function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
// Verifica se algum valor salvo ultrapassa os novos limites
function hasStaleData() {
  try {
    const draft = loadDraft();
    if (draft) {
      for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
        if (draft[field] && draft[field].length > limit) return true;
      }
    }
    const nome = localStorage.getItem(NOME_KEY);
    if (nome && nome.length > NOME_MAX) return true;
  } catch {}
  return false;
}

// ─── Contador de caracteres ─────────────────────────────────────────────────
function CharCounter({ current, max }) {
  const remaining = max - current;
  const pct = current / max;
  const color = pct >= 1 ? "#dc2626" : pct >= 0.8 ? "#f97316" : "#888888";
  return (
    <p className="text-xs text-right" style={{ color }}>
      {current}/{max} caracteres
    </p>
  );
}

// ─── Tela de entrada ────────────────────────────────────────────────────────
function TelaEntrada({ onStart, onContinue, hasDraft, draftDate, onApagar }) {
  const [confirmando, setConfirmando] = useState(false);
  const [apagado, setApagado] = useState(false);
  const mostrarDraft = hasDraft && !apagado;

  function confirmarApagar() {
    onApagar();
    setConfirmando(false);
    setApagado(true);
  }

  return (
    <div>
      <PageHeader title="Mapa da Vida" subtitle="Construa seu projeto de vida com consciência e esperança" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <span className="text-6xl">🗺️</span>
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-extrabold leading-tight">Mapa da Vida</h2>
          <div className="bg-chart-5/10 border border-chart-5/20 rounded-2xl p-4 text-left w-full">
            <p className="text-sm leading-relaxed text-foreground">Seu futuro não está pronto — ele está sendo construído por <strong>você</strong>, agora. Este mapa é um convite para olhar para si mesmo(a) com <strong>cuidado</strong> e <strong>coragem</strong>.</p>
          </div>
          <p className="text-xs italic" style={{ color: "#888888" }}>
            💡 Dica: use frases curtas e diretas — elas ficam mais bonitas no seu mapa. Exemplo: "concluir o ensino médio" em vez de "quero muito concluir o ensino médio este ano"
          </p>
        </div>

        {apagado && (
          <div className="w-full bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 text-sm text-center text-accent-foreground">
            ✓ Mapa apagado. Você pode começar um novo mapa quando quiser.
          </div>
        )}

        <div className="w-full space-y-3 pt-2">
          <Button onClick={onStart} className="w-full h-14 rounded-2xl text-base font-bold gap-2">
            🌱 Começar meu Mapa
          </Button>
          {mostrarDraft && (
            <Button onClick={onContinue} variant="outline" className="w-full h-14 rounded-2xl text-base font-bold gap-2">
              📝 Continuar de onde parou
            </Button>
          )}
          {mostrarDraft && !confirmando && (
            <button
              onClick={() => setConfirmando(true)}
              className="w-full text-sm text-destructive underline underline-offset-4 py-2"
            >
              🗑️ Apagar meu Mapa e começar do zero
            </button>
          )}
        </div>

        {mostrarDraft && draftDate && !confirmando && (
          <p className="text-xs text-muted-foreground text-center">Última edição em {draftDate}</p>
        )}

        {confirmando && (
          <div className="w-full border border-destructive/30 bg-destructive/5 rounded-2xl p-4 space-y-3">
            <p className="text-sm text-center font-medium">
              Tem certeza? Todos os dados do seu mapa serão apagados e não poderão ser recuperados.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={confirmarApagar}
                className="flex-1 h-11 rounded-xl bg-destructive hover:bg-destructive/90 text-white font-bold"
              >
                Sim, apagar tudo
              </Button>
              <Button
                onClick={() => setConfirmando(false)}
                variant="outline"
                className="flex-1 h-11 rounded-xl font-bold"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tela final ─────────────────────────────────────────────────────────────
function TelaFinal({ onEdit, onGerar }) {
  return (
    <div>
      <PageHeader title="Mapa da Vida" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        <span className="text-6xl">🎉</span>
        <h2 className="text-2xl font-extrabold">Seu mapa está quase pronto!</h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Você preencheu todas as etapas. Agora vamos transformar tudo isso em um mapa visual da sua vida.
        </p>
        <Button onClick={onGerar} className="w-full h-14 rounded-2xl text-base font-bold gap-2">
          <Sparkles className="w-5 h-5" /> Gerar meu Mapa da Vida
        </Button>
        <button
          onClick={onEdit}
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          ✏️ Editar respostas
        </button>
      </div>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────
export default function MapaDaVida() {
  const [screen, setScreen] = useState("entrada"); // "entrada" | "form" | "final" | "mapa"
  const [etapa, setEtapa] = useState(0);
  const [data, setData] = useState({});
  const [nome, setNome] = useState(() => loadNome());
  const [toast, setToast] = useState(null);

  // Corr. 2: limpar dados obsoletos ao montar
  useState(() => {
    if (hasStaleData()) {
      clearStorage();
      setToast("📝 Seus dados anteriores foram resetados por conta de uma atualização do aplicativo. Por favor preencha o mapa novamente.");
      setTimeout(() => setToast(null), 5000);
    }
  });

  const draft = loadDraft();
  const hasDraft = !!draft && Object.keys(draft).some((k) => !k.startsWith("_") && draft[k]);
  const draftDate = draft?._savedAt ? formatDate(draft._savedAt) : null;

  const etapaAtual = ETAPAS[etapa];
  const total = ETAPAS.length;

  function handleField(field, value) {
    const next = { ...data, [field]: value };
    setData(next);
    saveDraft(next);
  }

  function handleNome(value) {
    setNome(value);
    saveNome(value);
  }

  function showToast(msg, ms = 4000) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function handleApagar() {
    clearStorage();
    setData({});
    setNome("");
  }

  function handleStart() {
    setData({});
    setNome(loadNome());
    setEtapa(0);
    setScreen("form");
  }

  function handleContinue() {
    const saved = loadDraft();
    if (saved) {
      const { _savedAt, ...fields } = saved;
      setData(fields);
      showToast(`📝 Mapa recuperado — última edição em ${formatDate(_savedAt)}. Continue de onde parou!`);
    }
    setNome(loadNome());
    setEtapa(0);
    setScreen("form");
  }

  function handleNext() {
    if (etapa < total - 1) setEtapa(etapa + 1);
    else setScreen("final");
  }

  function handlePrev() {
    if (etapa > 0) setEtapa(etapa - 1);
    else setScreen("entrada");
  }

  // ── Tela do mapa visual ──
  if (screen === "mapa") {
    return (
      <MapaVisual
        data={data}
        nome={nome}
        onEdit={() => { setEtapa(0); setScreen("form"); }}
      />
    );
  }

  if (screen === "entrada") {
    return (
      <>
        {toast && (
          <div className="max-w-lg mx-auto px-4 pt-4">
            <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-2 text-sm text-accent-foreground">
              {toast}
            </div>
          </div>
        )}
        <TelaEntrada
          onStart={handleStart}
          onContinue={handleContinue}
          hasDraft={hasDraft}
          draftDate={draftDate}
          onApagar={handleApagar}
        />
      </>
    );
  }

  if (screen === "final") {
    return (
      <TelaFinal
        onEdit={() => { setEtapa(0); setScreen("form"); }}
        onGerar={() => setScreen("mapa")}
      />
    );
  }

  // ── Formulário ──
  return (
    <div>
      {/* Header com progresso */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="font-extrabold text-base leading-tight truncate">Mapa da Vida</h1>
            <p className="text-xs text-muted-foreground">Etapa {etapa + 1} de {total}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((etapa + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="max-w-lg mx-auto px-4 pt-3">
          <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-2 text-sm text-accent-foreground">
            {toast}
          </div>
        </div>
      )}

      {/* Conteúdo da etapa */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="text-center space-y-2 pb-2">
          <span className="text-5xl block">{etapaAtual.emoji}</span>
          <h2 className="text-xl font-extrabold">{etapaAtual.titulo}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{etapaAtual.subtitulo}</p>
        </div>

        {/* Campo de nome — apenas na Etapa 0 */}
        {etapa === 0 && (
          <div className="space-y-1">
            <label className="text-sm font-bold leading-snug block">Como você quer ser chamado?</label>
            <Input
              value={nome}
              onChange={(e) => handleNome(e.target.value.slice(0, NOME_MAX))}
              placeholder="Ex: Maria, João, seu apelido..."
              className="rounded-xl text-sm h-10"
              maxLength={NOME_MAX}
            />
            <CharCounter current={nome.length} max={NOME_MAX} />
          </div>
        )}

        {etapaAtual.perguntas.map((p) => {
          const val = data[p.field] || "";
          return (
            <div key={p.field} className="space-y-1">
              <label className="text-sm font-bold leading-snug block">{p.label}</label>
              <Textarea
                value={val}
                onChange={(e) => handleField(p.field, e.target.value.slice(0, p.maxLength))}
                placeholder={p.placeholder}
                className="rounded-xl text-sm min-h-[80px] resize-none"
                maxLength={p.maxLength}
              />
              <CharCounter current={val.length} max={p.maxLength} />
            </div>
          );
        })}

        <div className="flex gap-3 pt-2 pb-6">
          <Button variant="outline" onClick={handlePrev} className="flex-1 h-12 rounded-xl gap-2">
            <ArrowLeft className="w-4 h-4" /> Anterior
          </Button>
          <Button onClick={handleNext} className="flex-1 h-12 rounded-xl gap-2 font-bold">
            {etapa < total - 1 ? (
              <>Próximo <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>Concluir <ArrowRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>


      </div>
    </div>
  );
}