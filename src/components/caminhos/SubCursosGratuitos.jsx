import PageHeader from "../PageHeader";

const cursos = [
  {
    emoji: "🏛️",
    titulo: "Escola Virtual do Governo",
    texto: "Cursos gratuitos e certificados do governo federal. Informática, gestão, cidadania e muito mais. Totalmente gratuito e com certificado.",
    botoes: [{ label: "🔗 Acessar", url: "https://www.escolavirtual.gov.br" }],
  },
  {
    emoji: "📖",
    titulo: "Aprenda Mais — MEC",
    texto: "Portal oficial do MEC com recursos educacionais gratuitos para estudantes e professores.",
    botoes: [{ label: "🔗 Acessar", url: "https://aprendamais.mec.gov.br" }],
  },
  {
    emoji: "💼",
    titulo: "SEBRAE — Cursos Gratuitos",
    texto: "Cursos gratuitos para quem quer empreender ou desenvolver habilidades profissionais. Certificado gratuito ao concluir.",
    botoes: [{ label: "🔗 Acessar", url: "https://sc.loja.sebrae.com.br" }],
  },
  {
    emoji: "🚛",
    titulo: "SEST SENAT — Cursos Online",
    texto: "Cursos gratuitos voltados para trabalhadores do transporte e outras áreas profissionais. Certificado gratuito ao concluir.",
    botoes: [{ label: "🔗 Acessar", url: "https://digital.sestsenat.org.br" }],
  },
  {
    emoji: "🏫",
    titulo: "Institutos Federais (IFs)",
    texto: "Os Institutos Federais oferecem cursos técnicos e superiores 100% gratuitos em todo o Brasil. Procure o IF mais próximo de você pesquisando no Google: 'Instituto Federal + sua cidade'.",
    botoes: [],
  },
  {
    emoji: "🎓",
    titulo: "Universidades Federais",
    texto: "As universidades federais oferecem graduação gratuita em diversas áreas. O ingresso é pelo SISU usando a nota do ENEM. Pesquise no Google: 'Universidade Federal + seu estado'.",
    botoes: [],
  },
  {
    emoji: "💻",
    titulo: "EaD Gratuito — UAB",
    texto: "A Universidade Aberta do Brasil oferece graduação a distância gratuita em universidades públicas. Estude de casa pelo celular ou computador.",
    botoes: [{ label: "🔗 Acessar UAB", url: "https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/articulacao-e-inovacao-em-educacao-aberta/sistema-universidade-aberta-do-brasil" }],
  },
  {
    emoji: "⚙️",
    titulo: "SENAI — Cursos Técnicos",
    texto: "O SENAI oferece cursos técnicos profissionalizantes. A maioria dos cursos é paga, mas periodicamente são abertos editais de vagas gratuitas. Fique atento aos editais de gratuidade e candidate-se quando abertos.",
    botoes: [
      { label: "🔗 Ver editais de gratuidade", url: "https://sc.senai.br/pt-br/editais-gratuidade-senai" },
    ],
  },
  {
    emoji: "🛎️",
    titulo: "SENAC — Cursos Profissionais",
    texto: "O SENAC oferece cursos nas áreas de comércio, gastronomia, beleza, informática e muito mais. A maioria dos cursos é paga, mas há vagas gratuitas disponíveis periodicamente. Consulte os cursos gratuitos disponíveis em SC.",
    botoes: [{ label: "🔗 Ver cursos gratuitos", url: "https://portal.sc.senac.br/cursos-gratuitos" }],
  },
  {
    emoji: "🏛️",
    titulo: "ENAP — Escola Nacional de Administração Pública",
    texto: "Cursos gratuitos e certificados nas áreas de gestão pública, liderança, tecnologia e cidadania. Aberto a todos os cidadãos brasileiros.",
    botoes: [{ label: "🔗 Acessar", url: "https://www.enap.gov.br" }],
  },
  {
    emoji: "🌐",
    titulo: "Fundação Bradesco",
    texto: "Cursos online gratuitos de informática, administração, contabilidade e mais. Certificado gratuito ao concluir.",
    botoes: [{ label: "🔗 Acessar", url: "https://www.ev.org.br" }],
  },
  {
    emoji: "🎓",
    titulo: "IFSC — Instituto Federal de Santa Catarina",
    texto: "O IFSC oferece cursos técnicos e superiores gratuitos em todo o estado de Santa Catarina. Consulte os cursos disponíveis e as formas de ingresso.",
    botoes: [{ label: "🔗 Ver cursos", url: "https://www.ifsc.edu.br/cursos" }],
  },
  {
    emoji: "🎓",
    titulo: "IFC — Instituto Federal Catarinense",
    texto: "O IFC oferece cursos técnicos, de graduação e pós-graduação gratuitos em Santa Catarina. Você já conhece o IFC — explore outros cursos disponíveis!",
    botoes: [{ label: "🔗 Ver guia de cursos", url: "https://ingresso.ifc.edu.br/guia-de-cursos" }],
  },
  {
    emoji: "📚",
    titulo: "MEC Livros — Livros Gratuitos",
    texto: "Biblioteca digital gratuita do governo federal com livros didáticos e de literatura. Acesse pelo celular ou computador sem precisar pagar nada.",
    botoes: [{ label: "🔗 Acessar biblioteca", url: "https://meclivros.mec.gov.br" }],
  },
  {
    emoji: "📋",
    titulo: "ENCCEJA",
    texto: "Se você ainda não concluiu o Ensino Médio, o ENCCEJA é uma prova gratuita do governo para obter o certificado. Sem ele não é possível fazer o ENEM nem acessar o SISU ou PROUNI.",
    botoes: [{ label: "🔗 Acessar site oficial", url: "https://encceja.inep.gov.br" }],
  },
];

export default function SubCursosGratuitos({ onBack }) {
  return (
    <div>
      <PageHeader title="Cursos Gratuitos" subtitle="Conheça caminhos de aprendizado ao seu alcance" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">
        <div className="bg-chart-2/10 border border-chart-2/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">A <strong>educação</strong> é um direito. Aqui você encontra cursos, plataformas e instituições que podem ampliar sua formação — muitos totalmente gratuitos.</p>
        </div>
        {cursos.map((c) => (
          <div key={c.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
            <span className="text-2xl shrink-0 mt-0.5">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm mb-1 leading-snug">{c.titulo}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{c.texto}</p>
              {c.botoes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {c.botoes.map((b) => (
                    <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
                      {b.label}
                    </a>
                  ))}
                </div>
              )}
              {c.nota && (
                <p className="text-xs text-muted-foreground italic mt-2 leading-relaxed">{c.nota}</p>
              )}
            </div>
          </div>
        ))}

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}