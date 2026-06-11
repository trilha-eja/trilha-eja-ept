import PageHeader from "../PageHeader";

const caminhos = [
  {
    cor: "#E86826",
    bg: "bg-orange-50",
    borda: "border-orange-300",
    emoji: "🔧",
    titulo: "Inserção Profissional",
    texto: "Trabalhar na área técnica com carteira assinada, usando o certificado do curso.",
    tag: null,
    tagBg: "",
  },
  {
    cor: "#4A90D9",
    bg: "bg-blue-50",
    borda: "border-blue-300",
    emoji: "📐",
    titulo: "Curso Técnico",
    texto: "Fazer um curso técnico nos Institutos Federais (gratuito) ou no SENAI e SENAC (pago).",
    tag: null,
    tagBg: "",
  },
  {
    cor: "#5BAD6F",
    bg: "bg-green-50",
    borda: "border-green-300",
    emoji: "📝",
    titulo: "Fazer o ENEM",
    texto: "Porta de entrada para a universidade gratuita pelo SISU ou PROUNI.",
    tag: null,
    tagBg: "",
  },
  {
    cor: "#5BAD6F",
    bg: "bg-green-50",
    borda: "border-green-300",
    emoji: "📚",
    titulo: "Cursos de Aperfeiçoamento",
    texto: "Qualificações, certificações e formações complementares na sua área.",
    tag: null,
    tagBg: "",
  },
  {
    cor: "#2C5F8A",
    bg: "bg-blue-50",
    borda: "border-blue-300",
    emoji: "🏛️",
    titulo: "Concursos e Processos Seletivos",
    texto: "Oportunidades em órgãos públicos, empresas públicas e instituições.",
    tag: null,
    tagBg: "",
  },
];

function Seta({ label }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div className="w-px h-5 bg-border" />
      {label && <p className="text-xs text-muted-foreground font-semibold px-2 text-center">{label}</p>}
      <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
        <path d="M8 10L0 0h16L8 10z" fill="hsl(var(--muted-foreground))" opacity="0.5" />
      </svg>
      <div className="w-px h-3 bg-border" />
    </div>
  );
}

function Nivel({ cor, emoji, titulo, subtexto, tags }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="rounded-full flex flex-col items-center justify-center shadow-md"
        style={{ backgroundColor: cor, width: 120, height: 120, minWidth: 120, padding: 10 }}
      >
        <span className="text-3xl leading-none">{emoji}</span>
        <span className="text-white font-extrabold mt-1 leading-tight text-center" style={{ fontSize: 13 }}>{titulo}</span>
      </div>
      <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-[200px]">{subtexto}</p>
      {tags && (
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {tags.map((t) => (
            <span key={t} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SubTrilhaContinuidade({ onBack, onNavigate }) {
  return (
    <div>
      <PageHeader title="Trilha de Continuidade" subtitle="Veja os caminhos possíveis após a EJA-EPT" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">

        {/* Intro */}
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Não existe um único caminho certo. Após a EJA-EPT existem múltiplas possibilidades — cada uma válida e adequada a diferentes projetos de vida, trajetórias e realidades. Os níveis seguintes representam possibilidades, não obrigações.</p>
        </div>

        {/* TRILHA VISUAL */}
        <div className="flex flex-col items-center">

          {/* Nível 1 — ponto de partida */}
          <div className="flex flex-col items-center gap-1">
            <div className="rounded-full flex flex-col items-center justify-center shadow-md bg-primary" style={{ width: 120, height: 120, minWidth: 120, padding: 10 }}>
              <span className="text-3xl leading-none">🎓</span>
              <span className="text-white font-extrabold mt-1 leading-tight text-center" style={{ fontSize: 13 }}>EJA-EPT</span>
            </div>
            <p className="text-xs text-muted-foreground font-semibold">Você está aqui!</p>
          </div>

          <Seta label="O que vem depois?" />

          {/* Nível 2 — 5 caminhos */}
          <div className="w-full grid grid-cols-2 gap-2 sm:grid-cols-3">
            {caminhos.map((c) => (
              <div key={c.titulo} className={`border ${c.borda} ${c.bg} rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center`}>
                <span className="text-xl">{c.emoji}</span>
                <p className="text-xs font-extrabold leading-tight" style={{ color: c.cor }}>{c.titulo}</p>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{c.texto}</p>
                {c.tag && <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.tagBg}`}>{c.tag}</span>}
              </div>
            ))}
          </div>

          <Seta />

          {/* Nível 3 — Graduação */}
          <Nivel
            cor="#4A90D9"
            emoji="🏫"
            titulo="Graduação"
            subtexto="Engenharia Elétrica, Tecnólogo, Licenciatura e muito mais"
            tags={["SISU", "PROUNI", "FIES"]}
          />

          <Seta />

          {/* Nível 4 — Pós */}
          <Nivel
            cor="#5BAD6F"
            emoji="📚"
            titulo="Especialização"
            subtexto="Aprofunde seus conhecimentos na sua área de atuação"
          />

          <Seta />

          {/* Nível 5 — Mestrado */}
          <div className="flex flex-col items-center gap-1">
            <Nivel
              cor="#9B59B6"
              emoji="🔬"
              titulo="Mestrado"
              subtexto="Pesquisa e desenvolvimento na sua área"
            />
            <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">Gratuito nas universidades públicas</span>
          </div>

          <Seta />

          {/* Nível 6 — Doutorado */}
          <div className="flex flex-col items-center gap-1">
            <Nivel
              cor="#C8A200"
              emoji="⭐"
              titulo="Doutorado"
              subtexto="O nível mais alto da formação acadêmica"
            />
            <span className="text-[10px] bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded-full">Gratuito nas universidades públicas</span>
          </div>

        </div>

        {/* Mensagem motivacional */}
        <div className="rounded-2xl p-4 border border-orange-300" style={{ backgroundColor: "#FFF8F0" }}>
          <p className="text-xs text-orange-900 leading-relaxed">
            🌱 Cada caminho desta trilha é uma possibilidade real — não uma obrigação.
          </p>
        </div>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}