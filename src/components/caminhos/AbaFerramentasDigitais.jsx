const ferramentas = [
  {
    emoji: "📱",
    titulo: "Khan Academy",
    texto: "Plataforma gratuita com aulas de matemática, ciências, história e mais. Tem aplicativo para celular. Você avança no seu próprio ritmo.",
    url: "https://pt.khanacademy.org",
    botao: "Acessar",
  },
  {
    emoji: "🎥",
    titulo: "YouTube Educacional",
    texto: "Pesquise qualquer conteúdo que estuda na escola — há milhares de aulas gratuitas em português. Dica: pesquise '[tema] + explicação simples'.",
    url: "https://www.youtube.com/results?search_query=aulas+gratuitas+ensino+medio",
    botao: "Pesquisar aulas",
  },
  {
    emoji: "🤖",
    titulo: "ChatGPT — IA para estudar",
    texto: "Inteligência artificial gratuita que explica qualquer conteúdo de forma simples. Pergunte como se estivesse conversando com um professor particular.",
    url: "https://chat.openai.com",
    botao: "Acessar",
  },
  {
    emoji: "🎓",
    titulo: "Google Acadêmico",
    texto: "Para pesquisas mais aprofundadas. Encontra artigos e trabalhos científicos gratuitos sobre qualquer tema.",
    url: "https://scholar.google.com",
    botao: "Acessar",
  },
  {
    emoji: "📓",
    titulo: "NotebookLM",
    texto: "Ferramenta gratuita do Google que lê seus materiais de estudo e responde perguntas sobre eles. Excelente para revisar conteúdos.",
    url: "https://notebooklm.google.com",
    botao: "Acessar",
  },
  {
    emoji: "🎨",
    titulo: "Canva — Apresentações",
    texto: "Crie resumos visuais, mapas mentais e apresentações bonitas de graça. Tem versão pelo celular e é muito fácil de usar.",
    url: "https://www.canva.com",
    botao: "Acessar",
  },
];

export default function AbaFerramentasDigitais() {
  return (
    <div className="space-y-4">
      <div className="text-center pb-1">
        <h2 className="text-base font-extrabold">📱 Ferramentas Digitais para Estudar</h2>
      </div>

      {ferramentas.map((f) => (
        <div key={f.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">{f.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1">{f.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{f.texto}</p>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              {f.botao} →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}