import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import MapaVisual from "../components/mapa/MapaVisual";
import BlocoIntro from "../components/mapa/BlocoIntro";
import CardAjuda from "../components/CardAjuda";

const STORAGE_KEY = "mapa_vida_rascunho";
const NOME_KEY = "mapa_vida_nome";

// ─── Estrutura dos 8 blocos ─────────────────────────────────────────────────
const BLOCOS = [
  {
    emoji: "🌱",
    titulo: "De onde venho?",
    subtitulo: "Sua história começa muito antes deste curso.",
    intro: "Antes de olhar para o futuro, vale reconhecer o caminho que te trouxe até aqui. Sua trajetória é única e tem muito valor.",
    campos: [
      { field: "origem_apresentacao", label: "Como você se apresentaria para alguém que não te conhece?", placeholder: "De onde vem, o que faz...", max: 100 },
      { field: "origem_afastou",      label: "O que te afastou da escola em algum momento da vida?",         placeholder: "Trabalho, família, condições financeiras...", max: 100 },
      { field: "origem_voltou",       label: "O que te trouxe de volta aos estudos?",                        placeholder: "O que te motivou a voltar?", max: 100 },
      { field: "origem_orgulho",      label: "Qual conquista da sua vida te enche de orgulho?",              placeholder: "Criar seus filhos, aprender um ofício, superar uma dificuldade...", max: 100 },
      { field: "origem_aprendeu",     label: "O que você aprendeu na vida que nenhuma escola te ensinou?",   placeholder: "Saberes do trabalho, da família, da experiência...", max: 100 },
    ],
    temNome: true,
  },
  {
    emoji: "📍",
    titulo: "Onde estou?",
    subtitulo: "Um olhar honesto sobre sua realidade hoje.",
    intro: "Reconhecer onde estamos — com nossas dificuldades e recursos — é o ponto de partida para construir caminhos reais. Não há resposta certa ou errada aqui.",
    campos: [
      { field: "hoje_vida",    label: "Como você descreveria sua vida hoje?",              placeholder: "No trabalho, na família, nos estudos...", max: 100 },
      { field: "hoje_desafio", label: "Qual é seu maior desafio neste momento?",           placeholder: "O que mais dificulta sua caminhada hoje?", max: 100 },
      { field: "hoje_apoio",   label: "Quem ou o que te apoia nessa caminhada?",           placeholder: "Família, amigos, colegas, fé...", max: 100 },
      { field: "hoje_curso",   label: "O que este curso está mudando na sua vida?",        placeholder: "No trabalho, na autoestima, nas perspectivas...", max: 100 },
      { field: "hoje_forca",   label: "Qual é sua maior força neste momento?",             placeholder: "Coragem, persistência...", max: 30 },
    ],
  },
  {
    emoji: "🔧",
    titulo: "Mundo do Trabalho e Projetos Profissionais",
    subtitulo: "Onde você quer chegar como profissional?",
    intro: "Falamos de Mundo do Trabalho — não apenas de emprego. Seu trabalho tem história, tem valor e tem direitos.",
    campos: [
      { field: "trabalho_semana",  label: "Esta semana, qual pequeno passo posso dar na minha vida profissional?", placeholder: "Ex: atualizar meu currículo...", max: 30 },
      { field: "trabalho_1ano",    label: "Em 1 ano, onde quero estar profissionalmente?",                         placeholder: "Ex: trabalhando registrado...", max: 30 },
      { field: "trabalho_5anos",   label: "Em 5 anos, como imagino minha vida no trabalho?",                      placeholder: "Ex: ter minha própria empresa...", max: 30 },
      { field: "trabalho_10anos",  label: "Em 10 anos, qual é meu maior sonho profissional?",                     placeholder: "Ex: ter estabilidade...", max: 30 },
    ],
  },
  {
    emoji: "📚",
    titulo: "Estudos e Aprendizagem",
    subtitulo: "A educação é um direito — seu caminho de aprendizado não termina aqui.",
    intro: "Continuar estudando é uma escolha que transforma não só o currículo, mas a forma como você se vê e se posiciona no mundo.",
    campos: [
      { field: "estudos_semana",  label: "Esta semana, o que posso fazer pelos meus estudos?",                    placeholder: "Ex: revisar o conteúdo...", max: 30 },
      { field: "estudos_1ano",    label: "Em 1 ano, o que quero ter aprendido ou conquistado?",                   placeholder: "Ex: concluir o curso...", max: 30 },
      { field: "estudos_5anos",   label: "Em 5 anos, como imagino minha formação?",                              placeholder: "Ex: estar em uma graduação...", max: 30 },
      { field: "estudos_10anos",  label: "Em 10 anos, qual é meu maior sonho nos estudos?",                      placeholder: "Ex: ter uma graduação...", max: 30 },
    ],
  },
  {
    emoji: "🌟",
    titulo: "Eu Mesmo(a)",
    subtitulo: "Seu crescimento pessoal, sua saúde e seu bem-estar.",
    intro: "Cuidar de si mesmo(a) não é egoísmo — é condição para continuar caminhando e ajudando quem você ama.",
    campos: [
      { field: "eu_semana",  label: "Esta semana, o que posso fazer por mim mesmo(a)?",                           placeholder: "Ex: dormir melhor...", max: 30 },
      { field: "eu_1ano",    label: "Em 1 ano, que versão de mim quero ser?",                                    placeholder: "Ex: mais confiante...", max: 30 },
      { field: "eu_5anos",   label: "Em 5 anos, o que quero ter superado ou conquistado para mim?",              placeholder: "Ex: superar o medo...", max: 30 },
      { field: "eu_10anos",  label: "Em 10 anos, como quero me sentir sobre minha trajetória?",                  placeholder: "Ex: orgulhoso(a)...", max: 30 },
    ],
  },
  {
    emoji: "🏠",
    titulo: "Condições de Vida e Bem-Estar",
    subtitulo: "Estabilidade, moradia e conquistas concretas.",
    intro: "Ter condições dignas de vida é um direito — não um privilégio. Sonhar com estabilidade é legítimo e faz parte do seu projeto de vida.",
    campos: [
      { field: "vida_semana",  label: "Esta semana, o que posso fazer pela minha estabilidade?",                  placeholder: "Ex: organizar minhas contas...", max: 30 },
      { field: "vida_1ano",    label: "Em 1 ano, o que quero ter conquistado em termos de condições de vida?",    placeholder: "Ex: mais estabilidade...", max: 30 },
      { field: "vida_5anos",   label: "Em 5 anos, como imagino minhas condições de vida?",                       placeholder: "Ex: casa própria...", max: 30 },
      { field: "vida_10anos",  label: "Em 10 anos, qual é meu maior sonho de bem-estar e estabilidade?",         placeholder: "Ex: vida estável para a família...", max: 30 },
    ],
  },
  {
    emoji: "🤝",
    titulo: "Comunidade e Redes de Apoio",
    subtitulo: "Você não está sozinho(a) nessa caminhada.",
    intro: "Os projetos de vida não se constroem sozinhos. Reconhecer quem nos apoia e como podemos contribuir com os outros fortalece nossa caminhada.",
    campos: [
      { field: "comunidade_rede",        label: "Quem faz parte da sua rede de apoio hoje?",                     placeholder: "Família, amigos, colegas...", max: 30 },
      { field: "comunidade_contribui",   label: "Como você contribui ou gostaria de contribuir com sua comunidade?", placeholder: "Ex: ajudar um colega...", max: 30 },
      { field: "comunidade_5anos",       label: "Em 5 anos, que impacto quer ter causado ao seu redor?",         placeholder: "Ex: inspirar alguém...", max: 30 },
      { field: "comunidade_10anos",      label: "Em 10 anos, como quer ser lembrado(a) pelas pessoas ao seu redor?", placeholder: "Ex: alguém que fez diferença...", max: 30 },
    ],
  },
  {
    emoji: "✨",
    titulo: "Síntese Final",
    subtitulo: "Um olhar sobre tudo que você construiu até aqui.",
    intro: "Antes de gerar seu Mapa da Vida, responda estas últimas perguntas. Elas ajudarão a criar um texto reflexivo personalizado sobre sua trajetória.",
    campos: [
      { field: "sintese_projeto",  label: "Em uma frase, como você descreveria seu projeto de vida hoje?",       placeholder: "Ex: quero construir uma vida digna para minha família...", max: 100 },
      { field: "sintese_mensagem", label: "Qual é a mensagem que você deixaria para si mesmo(a) no futuro?",     placeholder: "Ex: não desista, cada passo vale...", max: 100 },
      { field: "sintese_colega",   label: "O que você diria para um(a) colega que está pensando em desistir?",   placeholder: "Ex: valeu a pena, continue...", max: 100 },
    ],
    isFinal: true,
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
    const nome = localStorage.getItem(NOME_KEY);
    if (nome) return nome;
    const cur = localStorage.getItem("curriculo_rascunho");
    if (cur) { const p = JSON.parse(cur); return p.full_name || p.nome || ""; }
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

// ─── Contador de caracteres ─────────────────────────────────────────────────
function CharCounter({ current, max }) {
  const pct = current / max;
  const color = pct >= 1 ? "#dc2626" : pct >= 0.8 ? "#f97316" : "#888888";
  return (
    <p className="text-xs text-right" style={{ color }}>{current}/{max} caracteres</p>
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

        <div className="w-full bg-chart-5/10 border border-chart-5/20 rounded-2xl p-5 space-y-2">
          <p className="text-sm leading-relaxed text-foreground">
            Este mapa não é um plano de metas nem uma lista de objetivos a cumprir.
            É um convite para você olhar para sua história, reconhecer suas conquistas,
            nomear seus desafios e imaginar seus caminhos possíveis.
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            Seu projeto de vida está sendo construído por você — agora, no seu tempo, da sua forma.
          </p>
          <p className="text-sm italic text-muted-foreground mt-2">
            "O mundo não é. O mundo está sendo." (Freire, 2002)
          </p>
        </div>

        {apagado && (
          <div className="w-full bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 text-sm text-center">
            ✓ Mapa apagado. Você pode começar um novo mapa quando quiser.
          </div>
        )}

        <div className="w-full space-y-3">
          <Button onClick={onStart} className="w-full h-14 rounded-2xl text-base font-bold">
            🌱 Começar meu Mapa
          </Button>
          {mostrarDraft && (
            <Button onClick={onContinue} variant="outline" className="w-full h-14 rounded-2xl text-base font-bold">
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

// ─── Componente principal ────────────────────────────────────────────────────
export default function MapaDaVida() {
  const [screen, setScreen] = useState("entrada"); // "entrada" | "form" | "mapa"
  const [bloco, setBloco] = useState(0);
  const [data, setData] = useState({});
  const [nome, setNome] = useState(() => loadNome());
  const [toast, setToast] = useState(null);

  const draft = loadDraft();
  const hasDraft = !!draft && Object.keys(draft).some((k) => !k.startsWith("_") && draft[k]);
  const draftDate = draft?._savedAt ? formatDate(draft._savedAt) : null;

  const blocoAtual = BLOCOS[bloco];
  const total = BLOCOS.length;

  function showToast(msg, ms = 4000) {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }

  function handleField(field, value) {
    const next = { ...data, [field]: value };
    setData(next);
    saveDraft(next);
  }

  function handleNome(value) {
    setNome(value.slice(0, 30));
    saveNome(value.slice(0, 30));
    const next = { ...data };
    setData(next);
    saveDraft(next);
  }

  function handleApagar() {
    clearStorage();
    setData({});
    setNome("");
  }

  function handleStart() {
    setData({});
    setNome(loadNome());
    setBloco(0);
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
    setBloco(0);
    setScreen("form");
  }

  function handleNext() {
    if (bloco < total - 1) { setBloco(bloco + 1); window.scrollTo(0, 0); }
  }

  function handlePrev() {
    if (bloco > 0) { setBloco(bloco - 1); window.scrollTo(0, 0); }
    else setScreen("entrada");
  }

  // Tela mapa visual
  if (screen === "mapa") {
    return (
      <MapaVisual
        data={data}
        nome={nome}
        onEdit={() => { setBloco(0); setScreen("form"); }}
      />
    );
  }

  if (screen === "entrada") {
    return (
      <>
        {toast && (
          <div className="max-w-lg mx-auto px-4 pt-4">
            <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-2 text-sm">{toast}</div>
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
            <p className="text-xs text-muted-foreground">Bloco {bloco + 1} de {total}</p>
          </div>
        </div>
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((bloco + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="max-w-lg mx-auto px-4 pt-3">
          <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-2 text-sm">{toast}</div>
        </div>
      )}

      {/* Conteúdo do bloco */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="text-center space-y-1 pb-1">
          <span className="text-5xl block">{blocoAtual.emoji}</span>
          <h2 className="text-xl font-extrabold leading-snug">{blocoAtual.titulo}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{blocoAtual.subtitulo}</p>
        </div>

        {/* Caixinha intro colorida por bloco */}
        <BlocoIntro bloco={bloco} emoji={blocoAtual.emoji} titulo={blocoAtual.titulo} intro={blocoAtual.intro} />

        {/* Caixinha extra — Saúde e Bem-Estar (apenas Bloco 5) */}
        {bloco === 4 && (
          <div style={{ background: "#F3E5F5", border: "2px solid #9B59B6", borderRadius: 16, padding: 16 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💜</span>
              <h3 className="font-bold text-sm">Cuidar de si também é parte do projeto de vida</h3>
            </div>
            <p className="text-sm leading-relaxed whitespace-pre-line">{`Dormir bem, movimentar o corpo, ter momentos de lazer com a família e amigos — tudo isso faz parte de quem você é e de quem quer ser.

Cuidar da saúde física e mental não é um luxo — é uma necessidade de quem trabalha, estuda e ainda cuida de tantas outras responsabilidades.

💡 Baixe o infográfico gratuito 'Saúde e Bem-Estar do Trabalhador(a)' na seção Baixar Materiais.`}</p>
          </div>
        )}

        {/* Campo nome — apenas no bloco 0 */}
        {blocoAtual.temNome && (
          <div className="space-y-1">
            <label className="text-sm font-bold leading-snug block">Como você quer ser chamado(a)?</label>
            <Input
              value={nome}
              onChange={(e) => handleNome(e.target.value)}
              placeholder="Seu nome ou apelido..."
              className="rounded-xl text-sm h-10"
              maxLength={30}
            />
            <CharCounter current={nome.length} max={30} />
          </div>
        )}

        {/* Campos do bloco */}
        {blocoAtual.campos.map((c) => {
          const val = data[c.field] || "";
          return (
            <div key={c.field} className="space-y-1">
              <label className="text-sm font-bold leading-snug block">{c.label}</label>
              <Textarea
                value={val}
                onChange={(e) => handleField(c.field, e.target.value.slice(0, c.max))}
                placeholder={c.placeholder}
                className="rounded-xl text-sm min-h-[80px] resize-none"
                maxLength={c.max}
              />
              <CharCounter current={val.length} max={c.max} />
            </div>
          );
        })}

        {/* Botão Gerar — apenas no último bloco */}
        {blocoAtual.isFinal && (
          <Button
            onClick={() => setScreen("mapa")}
            className="w-full h-14 rounded-2xl text-base font-bold gap-2 mt-2"
          >
            <Sparkles className="w-5 h-5" /> Gerar meu Mapa da Vida
          </Button>
        )}

        {blocoAtual.isFinal && (
          <div className="pt-2">
            <CardAjuda />
          </div>
        )}

        <div className="flex gap-3 pt-2 pb-6">
          <Button variant="outline" onClick={handlePrev} className="flex-1 h-12 rounded-xl gap-2">
            <ArrowLeft className="w-4 h-4" /> Anterior
          </Button>
          {!blocoAtual.isFinal && (
            <Button onClick={handleNext} className="flex-1 h-12 rounded-xl gap-2 font-bold">
              Próximo <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}