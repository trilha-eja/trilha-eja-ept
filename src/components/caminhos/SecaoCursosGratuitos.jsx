const cursos = [
  {
    emoji: "🏛️",
    titulo: "Escola Virtual do Governo",
    texto: "Cursos gratuitos e certificados do governo federal. Informática, gestão, cidadania e muito mais. Totalmente gratuito e com certificado.",
    url: "https://escola.gov.br",
    botao: "🔗 Acessar",
  },
  {
    emoji: "📖",
    titulo: "Aprenda Mais — MEC",
    texto: "Portal oficial do MEC com recursos educacionais gratuitos para estudantes e professores.",
    url: "https://aprendamais.mec.gov.br",
    botao: "🔗 Acessar",
  },
  {
    emoji: "💼",
    titulo: "SEBRAE — Cursos Gratuitos",
    texto: "Cursos gratuitos para quem quer empreender ou desenvolver habilidades profissionais. Certificado gratuito ao concluir.",
    url: "https://educacao.sebrae.com.br",
    botao: "🔗 Acessar",
  },
  {
    emoji: "🚛",
    titulo: "SEST SENAT — Cursos Online",
    texto: "Cursos gratuitos voltados para trabalhadores do transporte e outras áreas profissionais. Certificado gratuito ao concluir.",
    url: "https://digital.sestsenat.org.br",
    botao: "🔗 Acessar",
  },
  {
    emoji: "🏫",
    titulo: "Institutos Federais (IFs)",
    texto: "Os Institutos Federais oferecem cursos técnicos e superiores 100% gratuitos em todo o Brasil. Procure o IF mais próximo de você.",
    url: "https://redefederal.mec.gov.br",
    botao: "🔗 Encontrar meu IF",
  },
  {
    emoji: "🎓",
    titulo: "Universidades Federais",
    texto: "As universidades federais oferecem graduação gratuita em diversas áreas. O ingresso é pelo SISU usando a nota do ENEM.",
    url: "https://mec.gov.br",
    botao: "🔗 Conhecer universidades",
  },
  {
    emoji: "💻",
    titulo: "EaD Gratuito — UAB",
    texto: "A Universidade Aberta do Brasil oferece graduação a distância gratuita em universidades públicas. Estude de casa pelo computador ou celular.",
    url: "https://uab.capes.gov.br",
    botao: "🔗 Acessar UAB",
  },
  {
    emoji: "⚙️",
    titulo: "SENAI — Cursos Técnicos",
    texto: "Cursos técnicos gratuitos pelo programa Pronatec. Eletricidade, mecânica, informática e muito mais. Procure uma unidade perto de você.",
    url: "https://senai.br",
    botao: "🔗 Acessar SENAI",
  },
  {
    emoji: "🛎️",
    titulo: "SENAC — Cursos Profissionais",
    texto: "Cursos profissionalizantes gratuitos pelo Pronatec. Gastronomia, beleza, comércio, informática e muito mais.",
    url: "https://senac.br",
    botao: "🔗 Acessar SENAC",
  },
  {
    emoji: "🌐",
    titulo: "Fundação Bradesco",
    texto: "Cursos online gratuitos de informática, administração, contabilidade e mais. Certificado gratuito ao concluir.",
    url: "https://escola.bradesco",
    botao: "🔗 Acessar",
  },
  {
    emoji: "📋",
    titulo: "ENCCEJA — Certificado do Ensino Médio",
    texto: "Se você ainda não concluiu o Ensino Médio, o ENCCEJA é uma prova gratuita do governo para obter o certificado. Sem ele não é possível fazer o ENEM nem acessar o SISU ou PROUNI.",
    url: "https://encceja.inep.gov.br",
    botao: "🔗 Acessar site oficial",
  },
];

export default function SecaoCursosGratuitos() {
  return (
    <div className="space-y-3">
      {cursos.map((c) => (
        <div key={c.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">{c.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm mb-1 leading-snug">{c.titulo}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.texto}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              {c.botao}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}