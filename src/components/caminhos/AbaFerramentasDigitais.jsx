import AccordionSection from "../AccordionSection";

const categoria1 = [
  {
    emoji: "🎓",
    titulo: "Moodle IFC",
    texto: "Plataforma oficial de ensino online do IFC. Materiais, atividades e comunicados do curso são disponibilizados por lá.",
    url: "https://www.youtube.com/results?search_query=como+acessar+moodle+tutorial",
    botao: "▶️ Ver tutoriais",
  },
  {
    emoji: "📱",
    titulo: "Khan Academy",
    texto: "Plataforma totalmente gratuita com aulas de matemática, ciências, português e mais. Tem aplicativo para celular e você avança no seu próprio ritmo — sem pressão de tempo.",
    url: "https://pt.khanacademy.org",
    botao: "🔗 Acessar",
  },
  {
    emoji: "🎥",
    titulo: "YouTube Educacional",
    texto: "Milhares de aulas gratuitas em português sobre qualquer tema. Dica: pesquise o conteúdo que precisa aprender + 'explicação simples' para encontrar vídeos mais acessíveis.",
    url: "https://www.youtube.com/results?search_query=aulas+gratuitas+ensino+medio",
    botao: "🔗 Pesquisar aulas",
  },
  {
    emoji: "🤖",
    titulo: "ChatGPT — IA para estudar",
    texto: "Ferramenta de inteligência artificial que pode ajudar a explicar conteúdos, tirar dúvidas e revisar materiais. Use para entender melhor — não para copiar respostas prontas. A versão gratuita já é útil.",
    url: "https://chat.openai.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "📓",
    titulo: "NotebookLM",
    texto: "Ferramenta gratuita do Google que lê PDFs e documentos e responde perguntas sobre o que está escrito neles. Como usar: envie uma apostila ou material do curso e pergunte sobre o conteúdo — como se fosse um assistente de estudos pessoal.",
    url: "https://notebooklm.google.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "🎓",
    titulo: "Google Acadêmico",
    texto: "Ferramenta de busca para quem quer encontrar artigos e trabalhos científicos sobre qualquer tema. Útil para pesquisas escolares e trabalhos de conclusão de curso.",
    url: "https://scholar.google.com",
    botao: "🔗 Acessar",
  },
];

const categoria2 = [
  {
    emoji: "📅",
    titulo: "Google Agenda",
    texto: "Organize sua semana de estudos com lembretes e compromissos. Configure alertas para não esquecer datas de provas, entrega de trabalhos e horários de aula. Totalmente gratuito e sincroniza com o celular automaticamente.",
    url: "https://calendar.google.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "📝",
    titulo: "Google Keep",
    texto: "Aplicativo gratuito para anotações rápidas pelo celular. Anote dúvidas durante a aula, faça listas de tarefas e guarde lembretes importantes. Tudo sincronizado entre celular e computador.",
    url: "https://keep.google.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "☁️",
    titulo: "Google Drive",
    texto: "Guarde apostilas, PDFs e materiais do curso na nuvem — sem ocupar a memória do celular. Acesse de qualquer dispositivo e compartilhe materiais com colegas de turma. 15GB gratuitos com qualquer conta Google.",
    url: "https://drive.google.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "🎨",
    titulo: "Canva — Apresentações",
    texto: "Crie resumos visuais, mapas mentais e apresentações de graça. Muito fácil de usar pelo celular — tem centenas de modelos prontos para adaptar.",
    url: "https://www.canva.com",
    botao: "🔗 Acessar",
  },
  {
    emoji: "📷",
    titulo: "Microsoft Lens",
    texto: "Aplicativo gratuito que transforma fotos de apostilas, quadros e documentos em PDFs organizados. Muito útil para digitalizar materiais do curso e guardar no celular ou no Drive.",
    url: "https://play.google.com/store/search?q=lens&c=apps",
    botao: "🔗 Baixar aplicativo",
  },
];

const categoria3 = [
  {
    emoji: "📱",
    titulo: "Celular e WhatsApp para Iniciantes",
    texto: "Aprenda a usar o celular Android, configurar o WhatsApp, fazer chamadas de vídeo e salvar contatos.",
    url: "https://www.youtube.com/results?search_query=como+usar+celular+android+iniciantes+passo+a+passo",
    botao: "▶️ Ver vídeos",
  },
  {
    emoji: "💻",
    titulo: "Computador do Zero",
    texto: "Como usar o mouse, o teclado, ligar o computador e organizar arquivos e pastas.",
    url: "https://www.youtube.com/results?search_query=informatica+basica+iniciantes+adultos+passo+a+passo",
    botao: "▶️ Ver vídeos",
  },
  {
    emoji: "🌐",
    titulo: "Internet e Navegador",
    texto: "Como acessar sites, pesquisar no Google e navegar com segurança.",
    url: "https://www.youtube.com/results?search_query=como+usar+internet+navegador+iniciantes+adultos",
    botao: "▶️ Ver vídeos",
  },
  {
    emoji: "📸",
    titulo: "Redes Sociais",
    texto: "Como usar Instagram e Facebook — criar conta, postar fotos e recuperar senha.",
    url: "https://www.youtube.com/results?search_query=como+usar+instagram+facebook+iniciantes+tutorial",
    botao: "▶️ Ver vídeos",
  },
  {
    emoji: "🔒",
    titulo: "Segurança Digital e Privacidade",
    texto: "Como se proteger de golpes na internet, identificar links falsos e proteger suas contas.",
    url: "https://www.youtube.com/results?search_query=seguranca+digital+golpes+internet+como+se+proteger",
    botao: "▶️ Ver vídeos",
  },
  {
    emoji: "📷",
    titulo: "Como usar QR Code",
    texto: "Aprenda a baixar um leitor de QR Code gratuito e usar para acessar sites e aplicativos pelo celular.",
    url: "https://www.youtube.com/results?search_query=como+usar+qr+code+celular+android+iniciantes",
    botao: "▶️ Ver vídeos",
  },
];


export default function AbaFerramentasDigitais() {
  return (
    <div className="space-y-3">
      {/* Categoria 1 */}
      <div className="pt-1">
        <h2 className="font-extrabold text-sm mb-3">📚 Para Aprender e Estudar</h2>
        {categoria1.map((f) => (
          <AccordionSection key={f.titulo} titulo={`${f.emoji} ${f.titulo}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.texto}</p>
            <a href={f.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">{f.botao || "🔗 Acessar"}</a>
          </AccordionSection>
        ))}
      </div>

      {/* Categoria 2 */}
      <div className="pt-2">
        <h2 className="font-extrabold text-sm mb-3">🗂️ Para se Organizar</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-3">
          <p className="text-xs leading-relaxed text-foreground">
            💡 Organizar os estudos é tão importante quanto estudar. Estas ferramentas ajudam a planejar sua semana, guardar materiais e fazer anotações rápidas — tudo pelo celular.
          </p>
        </div>
        {categoria2.map((f) => (
          <AccordionSection key={f.titulo} titulo={`${f.emoji} ${f.titulo}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.texto}</p>
            <a href={f.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">{f.botao || "🔗 Acessar"}</a>
          </AccordionSection>
        ))}
      </div>

      {/* Categoria 3 — Vídeos para Aprender Tecnologia */}
      <div className="pt-2">
        <h2 className="font-extrabold text-sm mb-1">📺 Canais para Aprender Tecnologia</h2>
        <p className="text-xs text-muted-foreground mb-3">Busque pelo nome do canal no YouTube</p>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 mb-3">
          <p className="text-xs leading-relaxed text-foreground">
            O YouTube tem canais gratuitos com explicações simples e pausadas sobre celular, computador, redes sociais e segurança digital. Clique em 'Ver vídeos' para abrir a busca diretamente.
          </p>
        </div>
        {categoria3.map((f) => (
          <AccordionSection key={f.titulo} titulo={`${f.emoji} ${f.titulo}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.texto}</p>
            <a href={f.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">{f.botao || "🔗 Acessar"}</a>
          </AccordionSection>
        ))}
      </div>
    </div>
  );
}