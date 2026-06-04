const apps = [
  {
    nome: "Khan Academy",
    descricao: "Totalmente gratuito. Disponível para Android e iPhone. Como baixar: abra a loja de aplicativos do seu celular (Play Store ou App Store), pesquise 'Khan Academy' e instale. É gratuito e não precisa pagar nada.",
    url: "https://play.google.com/store/apps/details?id=org.khanacademy.android",
  },
  {
    nome: "Descomplica",
    descricao: "Tem conteúdo gratuito limitado. A versão completa é paga. Use o gratuito para revisões rápidas. Como baixar: pesquise 'Descomplica' na Play Store ou App Store.",
    url: "https://play.google.com/store/apps/details?id=com.descomplica.app",
  },
  {
    nome: "Me Salva",
    descricao: "Tem aulas gratuitas e pagas. O conteúdo gratuito já é muito útil para revisar para o ENEM. Como baixar: pesquise 'Me Salva' na Play Store ou App Store.",
    url: "https://play.google.com/store/apps/details?id=br.com.mesalva.app",
  },
];

const infos = [
  { emoji: "📅", titulo: "Quando se inscrever?", texto: "Geralmente entre maio e junho." },
  { emoji: "💰", titulo: "Quanto custa?", texto: "A taxa é em torno de R$ 85, mas alunos de escola pública e pessoas de baixa renda podem pedir isenção." },
  { emoji: "📝", titulo: "Como se inscrever?", texto: "Acesse o site do INEP, crie sua conta e preencha os dados. É tudo online!" },
  { emoji: "📚", titulo: "O que estudar?", texto: "4 áreas: Linguagens, Humanas, Natureza e Matemática + Redação. Foque nos básicos primeiro." },
  { emoji: "💡", titulo: "Dica de ouro", texto: "Faça provas anteriores! O site do INEP tem todas. Comece pelas redações — valem muito!" },
];

export default function SecaoEnem() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground leading-relaxed px-1">
        A porta de entrada para o ensino superior gratuito no Brasil.
      </p>

      {/* Infos */}
      {infos.map((i) => (
        <div key={i.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">{i.emoji}</span>
          <div>
            <p className="font-bold text-sm mb-0.5">{i.titulo}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{i.texto}</p>
          </div>
        </div>
      ))}

      {/* Link oficial */}
      <div className="border border-border rounded-2xl p-4 bg-card">
        <p className="text-sm font-bold mb-2">Site oficial do ENEM</p>
        <a
          href="https://enem.inep.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
        >
          🔗 Acessar site oficial do ENEM
        </a>
      </div>

      {/* Apps */}
      <div className="border border-border rounded-2xl p-4 bg-card space-y-4">
        <p className="font-bold text-sm">📱 Apps gratuitos para o ENEM</p>
        {apps.map((a) => (
          <div key={a.nome} className="space-y-2 pb-3 border-b border-border last:border-0 last:pb-0">
            <p className="font-bold text-sm">{a.nome}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{a.descricao}</p>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              📱 Baixar {a.nome}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}