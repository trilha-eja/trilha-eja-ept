import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "mapa_vida_rascunho";

const ETAPAS = [
  {
    emoji: "🌱",
    titulo: "Seu ponto de partida",
    subtitulo: "Antes de olhar para frente, reconheça o que você já construiu.",
    perguntas: [
      {
        field: "partida_forca",
        label: "Qual é a sua maior força hoje?",
        placeholder: "Pode ser coragem, paciência, persistência, cuidado com os outros...",
      },
      {
        field: "partida_orgulho",
        label: "O que você já conquistou na vida que te enche de orgulho?",
        placeholder: "Criar seus filhos, chegar até aqui, aprender uma habilidade — tudo isso é conquista real.",
      },
      {
        field: "partida_motivacao",
        label: "O que te trouxe até este curso?",
        placeholder: "O que te motivou a voltar a estudar?",
      },
    ],
  },
  {
    emoji: "🔧",
    titulo: "Trabalho e Profissão",
    subtitulo: "Onde você quer chegar como profissional?",
    perguntas: [
      {
        field: "trabalho_semana",
        label: "Esta semana, qual pequeno passo posso dar na minha vida profissional?",
        placeholder: "Ex: Atualizar meu currículo, pesquisar uma vaga...",
      },
      {
        field: "trabalho_1ano",
        label: "Em 1 ano, onde quero estar profissionalmente?",
        placeholder: "Ex: Trabalhando como eletricista com carteira assinada...",
      },
      {
        field: "trabalho_5anos",
        label: "Em 5 anos, como imagino minha vida no trabalho?",
        placeholder: "Ex: Ter minha própria empresa, ser técnico sênior...",
      },
      {
        field: "trabalho_10anos",
        label: "Em 10 anos, qual é meu maior sonho profissional?",
        placeholder: "Ex: Ter estabilidade, ser referência na minha área...",
      },
    ],
  },
  {
    emoji: "📚",
    titulo: "Estudos e Aprendizado",
    subtitulo: "O conhecimento que você quer buscar para si mesmo.",
    perguntas: [
      {
        field: "estudos_semana",
        label: "Esta semana, o que posso fazer pelos meus estudos?",
        placeholder: "Ex: Revisar o conteúdo da aula, pesquisar sobre o ENEM...",
      },
      {
        field: "estudos_1ano",
        label: "Em 1 ano, o que quero ter aprendido ou conquistado nos estudos?",
        placeholder: "Ex: Concluir o curso técnico, me inscrever no ENEM...",
      },
      {
        field: "estudos_5anos",
        label: "Em 5 anos, como imagino minha formação?",
        placeholder: "Ex: Estar cursando engenharia elétrica...",
      },
      {
        field: "estudos_10anos",
        label: "Em 10 anos, qual é meu maior sonho nos estudos?",
        placeholder: "Ex: Ter uma graduação, fazer uma especialização...",
      },
    ],
  },
  {
    emoji: "👨‍👩‍👧",
    titulo: "Família e Relações",
    subtitulo: "As pessoas que você ama e quer construir junto.",
    perguntas: [
      {
        field: "familia_semana",
        label: "Esta semana, o que posso fazer pela minha família?",
        placeholder: "Ex: Passar mais tempo com meus filhos, ligar para alguém que não falo há tempo...",
      },
      {
        field: "familia_1ano",
        label: "Em 1 ano, como quero que seja minha vida familiar?",
        placeholder: "Ex: Ter mais tempo de qualidade com minha família...",
      },
      {
        field: "familia_5anos",
        label: "Em 5 anos, o que quero ter construído com quem amo?",
        placeholder: "Ex: Uma vida mais estável para meus filhos...",
      },
      {
        field: "familia_10anos",
        label: "Em 10 anos, qual é meu maior sonho para minha família?",
        placeholder: "Ex: Ver meus filhos realizados, ter uma família unida...",
      },
    ],
  },
  {
    emoji: "🌟",
    titulo: "Eu Mesmo",
    subtitulo: "Seu crescimento pessoal, sua saúde, seu bem-estar.",
    perguntas: [
      {
        field: "eu_semana",
        label: "Esta semana, o que posso fazer por mim mesmo?",
        placeholder: "Ex: Dormir melhor, reservar um momento só meu...",
      },
      {
        field: "eu_1ano",
        label: "Em 1 ano, que versão de mim quero ser?",
        placeholder: "Ex: Mais confiante, mais saudável, mais tranquilo...",
      },
      {
        field: "eu_5anos",
        label: "Em 5 anos, o que quero ter superado ou conquistado para mim mesmo?",
        placeholder: "Ex: Superar o medo de falar em público, cuidar melhor da minha saúde...",
      },
      {
        field: "eu_10anos",
        label: "Em 10 anos, como quero me sentir sobre a minha trajetória?",
        placeholder: "Ex: Orgulhoso do caminho que percorri...",
      },
    ],
  },
  {
    emoji: "🏠",
    titulo: "Vida Material",
    subtitulo: "Estabilidade, moradia e conquistas concretas.",
    perguntas: [
      {
        field: "material_semana",
        label: "Esta semana, o que posso fazer pela minha estabilidade financeira?",
        placeholder: "Ex: Organizar minhas contas, pesquisar uma renda extra...",
      },
      {
        field: "material_1ano",
        label: "Em 1 ano, o que quero ter conquistado materialmente?",
        placeholder: "Ex: Sair do aluguel, ter uma reserva financeira...",
      },
      {
        field: "material_5anos",
        label: "Em 5 anos, como imagino minha vida material?",
        placeholder: "Ex: Casa própria, carro, mais estabilidade...",
      },
      {
        field: "material_10anos",
        label: "Em 10 anos, qual é meu maior sonho de conquista material?",
        placeholder: "Ex: Uma vida confortável para minha família, independência financeira...",
      },
    ],
  },
  {
    emoji: "🤝",
    titulo: "Comunidade",
    subtitulo: "Como você quer contribuir com as pessoas ao seu redor.",
    perguntas: [
      {
        field: "comunidade_semana",
        label: "Esta semana, o que posso fazer por alguém além de mim?",
        placeholder: "Ex: Ajudar um colega de curso, participar de algo no meu bairro...",
      },
      {
        field: "comunidade_1ano",
        label: "Em 1 ano, como quero contribuir com minha comunidade?",
        placeholder: "Ex: Ser referência para alguém mais novo...",
      },
      {
        field: "comunidade_5anos",
        label: "Em 5 anos, que impacto quero ter causado ao meu redor?",
        placeholder: "Ex: Ter ajudado alguém a voltar a estudar...",
      },
      {
        field: "comunidade_10anos",
        label: "Em 10 anos, como quero ser lembrado pelas pessoas ao meu redor?",
        placeholder: "Ex: Como alguém que fez diferença, que ajudou, que inspirou...",
      },
    ],
  },
];

function loadDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDraft(data) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...data, _savedAt: new Date().toISOString() })
    );
  } catch {}
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

// ─── Tela de entrada ───────────────────────────────────────────────────────
function TelaEntrada({ onStart, onContinue, hasDraft, draftDate }) {
  return (
    <div>
      <PageHeader title="Mapa da Vida" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">
        <span className="text-6xl">🗺️</span>
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-extrabold leading-tight">Mapa da Vida</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Sua história não começa aqui — ela já vem de longe. Este mapa é para você enxergar onde está e para onde quer caminhar.
          </p>
        </div>

        <div className="w-full space-y-3 pt-2">
          <Button onClick={onStart} className="w-full h-14 rounded-2xl text-base font-bold gap-2">
            🌱 Começar meu Mapa
          </Button>
          {hasDraft && (
            <Button onClick={onContinue} variant="outline" className="w-full h-14 rounded-2xl text-base font-bold gap-2">
              📝 Continuar de onde parou
            </Button>
          )}
        </div>

        {hasDraft && draftDate && (
          <p className="text-xs text-muted-foreground text-center">
            Última edição em {draftDate}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Tela final ─────────────────────────────────────────────────────────────
function TelaFinal({ onEdit }) {
  return (
    <div>
      <PageHeader title="Mapa da Vida" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        <span className="text-6xl">🎉</span>
        <h2 className="text-2xl font-extrabold">Seu mapa está quase pronto!</h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          Você preencheu todas as etapas. Na próxima etapa vamos transformar tudo isso em um mapa visual da sua vida.
        </p>
        <Button className="w-full h-14 rounded-2xl text-base font-bold gap-2 opacity-70 cursor-not-allowed" disabled>
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

// ─── Componente principal ───────────────────────────────────────────────────
export default function MapaDaVida() {
  const [screen, setScreen] = useState("entrada"); // "entrada" | "form" | "final"
  const [etapa, setEtapa] = useState(0);
  const [data, setData] = useState({});
  const [toast, setToast] = useState(null);

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

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  }

  function handleStart() {
    setData({});
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

  if (screen === "entrada") {
    return (
      <TelaEntrada
        onStart={handleStart}
        onContinue={handleContinue}
        hasDraft={hasDraft}
        draftDate={draftDate}
      />
    );
  }

  if (screen === "final") {
    return <TelaFinal onEdit={() => { setEtapa(0); setScreen("form"); }} />;
  }

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

        {etapaAtual.perguntas.map((p) => (
          <div key={p.field} className="space-y-2">
            <label className="text-sm font-bold leading-snug block">{p.label}</label>
            <Textarea
              value={data[p.field] || ""}
              onChange={(e) => handleField(p.field, e.target.value)}
              placeholder={p.placeholder}
              className="rounded-xl text-sm min-h-[80px] resize-none"
            />
          </div>
        ))}

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