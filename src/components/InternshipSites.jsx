import { ArrowLeft, ExternalLink } from "lucide-react";

const secoes = [
  {
    titulo: "📋 Cadastre-se e receba vagas",
    subtitulo: "Crie seu perfil nesses sites e as empresas entram em contato com você",
    sites: [
      { emoji: "🎓", name: "CIEE — Nacional", url: "https://portal.ciee.org.br", description: "Principal portal do país para estágios e jovem aprendiz. Cadastre seu perfil e receba indicações de vagas." },
      { emoji: "🎓", name: "CIEE — Santa Catarina", url: "https://cieesc.org.br", description: "Portal dedicado a SC com vagas presenciais na região de Blumenau e Vale do Itajaí. Ideal para quem mora na região." },
      { emoji: "💼", name: "Nube", url: "https://www.nube.com.br", description: "Portal com foco em estudantes de ensino médio, técnico e superior. Cadastre seu perfil, faça testes gratuitos e receba vagas." },
      { emoji: "🏭", name: "IEL — Estágios na Indústria", url: "https://www.iel.org.br", description: "Instituto Euvaldo Lodi — especializado em estágios na área industrial. Ideal para quem busca estágio na área técnica e elétrica." },
      { emoji: "🌱", name: "Jovem Aprendiz", url: "https://www.gov.br/trabalho/pt-br/assuntos/aprendizagem-profissional", description: "Programa do governo federal para jovens de 14 a 24 anos. Trabalho com carteira assinada, salário e aprendizagem profissional. Cadastre-se pelo portal oficial." },
    ],
  },
  {
    titulo: "🔍 Busque vagas abertas",
    subtitulo: "Pesquise vagas disponíveis agora e candidate-se diretamente",
    sites: [
      { emoji: "🏢", name: "Companhia de Estágios", url: "https://www.ciadeestagios.com.br", description: "Vagas em grandes empresas nacionais e multinacionais. Forte em programas de estágio remoto e presencial." },
      { emoji: "⭐", name: "Super Estágios", url: "https://www.superestagios.com.br", description: "Milhares de vagas de estágio distribuídas pelo Brasil. Busque por área, cidade e nível de escolaridade." },
      { emoji: "🔎", name: "Estagiar", url: "https://www.estagiar.com.br", description: "Portal com vagas de estágio em todo o Brasil. Busque por região e área de interesse." },
      { emoji: "🔍", name: "Indeed — Estágios", url: "https://br.indeed.com/jobs?q=estagio", description: "Milhares de vagas de estágio em todo o Brasil. Muito fácil de usar pelo celular." },
      { emoji: "💼", name: "LinkedIn — Estágios", url: "https://www.linkedin.com/jobs/search/?keywords=estagio", description: "Rede profissional com vagas de estágio em empresas de todo o Brasil. Crie seu perfil profissional e apareça para os recrutadores." },
    ],
  },
  {
    titulo: "🔄 Cadastre-se E busque vagas",
    subtitulo: "Nesses sites você faz as duas coisas",
    sites: [
      { emoji: "🏛️", name: "Emprega Brasil", url: "https://servicos.mte.gov.br/spme-v2/#/login", description: "Portal oficial do governo federal. Cadastre seu perfil E busque vagas de estágio e emprego em todo o Brasil. Totalmente gratuito." },
    ],
  },
];

export default function InternshipSites({ onBack }) {
  return (
    <div>
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg">Sites de Estágio</h1>
            <p className="text-xs text-muted-foreground">Clique para abrir o site diretamente 👇</p>
          </div>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-5 pb-10">
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-xs text-orange-800 leading-relaxed">
            💡 Alguns sites servem para você se <strong>CADASTRAR</strong> e receber indicações de vagas. Outros servem para <strong>BUSCAR</strong> vagas abertas e se candidatar. Veja a diferença em cada um!
          </p>
        </div>

        {secoes.map((s) => (
          <div key={s.titulo} className="space-y-3">
            <div>
              <h2 className="font-extrabold text-sm">{s.titulo}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{s.subtitulo}</p>
            </div>
            {s.sites.map((site, i) => (
              <a
                key={i}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span className="text-2xl">{site.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm">{site.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}