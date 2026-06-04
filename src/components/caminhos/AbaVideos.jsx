const secoes = [
  {
    titulo: "Como Estudar com Pouco Tempo",
    intro: "Para quem trabalha e precisa aproveitar cada momento.",
    cards: [
      {
        titulo: "Como estudar trabalhando",
        texto: "Técnicas reais para quem tem pouco tempo disponível.",
        url: "https://www.youtube.com/results?search_query=como+estudar+trabalhando+pouco+tempo",
      },
      {
        titulo: "Técnica Pomodoro — como usar",
        texto: "Aprenda a técnica de estudo mais usada no mundo.",
        url: "https://www.youtube.com/results?search_query=tecnica+pomodoro+como+usar+estudar",
      },
      {
        titulo: "Organização para estudar",
        texto: "Como montar uma rotina de estudos mesmo com agenda cheia.",
        url: "https://www.youtube.com/results?search_query=como+se+organizar+para+estudar+trabalhando",
      },
    ],
  },
  {
    titulo: "ENEM para Quem Trabalha",
    intro: "Tudo sobre o ENEM explicado de forma simples e direta.",
    cards: [
      {
        titulo: "ENEM do zero — o que é e como funciona",
        texto: "Entenda tudo sobre o ENEM antes de se inscrever.",
        url: "https://www.youtube.com/results?search_query=enem+do+zero+o+que+e+como+funciona",
      },
      {
        titulo: "Como se inscrever no ENEM",
        texto: "Passo a passo da inscrição explicado de forma simples.",
        url: "https://www.youtube.com/results?search_query=como+se+inscrever+enem+passo+a+passo",
      },
      {
        titulo: "ENEM para quem trabalha",
        texto: "Dicas específicas para trabalhadores-estudantes.",
        url: "https://www.youtube.com/results?search_query=enem+para+quem+trabalha+dicas+estudo",
      },
    ],
  },
  {
    titulo: "Estudar pelo Celular",
    intro: "Seu celular pode ser sua maior ferramenta de aprendizado.",
    cards: [
      {
        titulo: "Melhores apps gratuitos para estudar",
        texto: "Aplicativos que todo estudante deveria conhecer.",
        url: "https://www.youtube.com/results?search_query=melhores+aplicativos+gratuitos+para+estudar+celular",
      },
      {
        titulo: "Como usar o YouTube para estudar",
        texto: "Dicas para aproveitar ao máximo as aulas gratuitas no YouTube.",
        url: "https://www.youtube.com/results?search_query=como+usar+youtube+para+estudar+dicas",
      },
      {
        titulo: "Khan Academy pelo celular",
        texto: "Tutorial completo da plataforma mais usada para estudar de graça.",
        url: "https://www.youtube.com/results?search_query=khan+academy+tutorial+celular+portugues",
      },
    ],
  },
];

export default function AbaVideos() {
  return (
    <div className="space-y-5">
      <div className="text-center space-y-1 pb-1">
        <h2 className="text-base font-extrabold">🎬 Vídeos para Te Ajudar a Estudar</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Clique no tema que você quer aprender — abrirá uma busca no YouTube com os melhores vídeos sobre esse assunto.
        </p>
      </div>

      {/* Nota explicativa */}
      <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3 text-xs leading-relaxed text-foreground">
        💡 <strong>Como funciona:</strong> ao clicar em "Ver vídeos", o YouTube abrirá com uma busca já feita sobre o tema. Escolha o vídeo que parecer mais claro para você!
      </div>

      {secoes.map((s) => (
        <div key={s.titulo} className="space-y-2">
          <div className="px-1">
            <h3 className="font-extrabold text-sm">{s.titulo}</h3>
            <p className="text-xs text-muted-foreground">{s.intro}</p>
          </div>
          {s.cards.map((c) => (
            <div key={c.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">🎬</span>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm mb-1">{c.titulo}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.texto}</p>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                >
                  ▶️ Ver vídeos
                </a>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}