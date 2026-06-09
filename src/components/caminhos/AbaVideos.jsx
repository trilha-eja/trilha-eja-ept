import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const blocos = [
  {
    titulo: "📚 Continuar Estudando",
    subtitulo: "Para quem quer manter o ritmo e não desistir",
    cards: [
      {
        titulo: "Como estudar trabalhando",
        texto: "Técnicas para quem tem pouco tempo disponível.",
        url: "https://www.youtube.com/results?search_query=como+estudar+trabalhando+pouco+tempo",
      },
      {
        titulo: "Como voltar a estudar depois de adulto",
        texto: "Orientações para quem ficou anos afastado da escola.",
        url: "https://www.youtube.com/results?search_query=como+voltar+a+estudar+depois+de+adulto+dicas",
      },
      {
        titulo: "Como organizar uma rotina de estudos",
        texto: "Como criar hábitos de estudo mesmo com agenda cheia.",
        url: "https://www.youtube.com/results?search_query=como+organizar+rotina+de+estudos+trabalhando",
      },
    ],
  },
  {
    titulo: "🎓 Caminhos para o Ensino Superior",
    subtitulo: "Entenda como funciona o acesso à universidade pública",
    cards: [
      {
        titulo: "O que é o ENEM e como funciona",
        texto: "Para quem nunca fez o ENEM e quer entender antes de se inscrever.",
        url: "https://www.youtube.com/results?search_query=enem+do+zero+o+que+e+como+funciona",
      },
      {
        titulo: "Como ingressar em uma universidade pública",
        texto: "SISU, PROUNI e outros caminhos explicados de forma simples.",
        url: "https://www.youtube.com/results?search_query=como+entrar+universidade+publica+sisu+prouni",
      },
      {
        titulo: "EJA e continuidade dos estudos",
        texto: "Histórias e possibilidades de quem seguiu estudando após a EJA.",
        url: "https://www.youtube.com/results?search_query=eja+continuidade+estudos+ensino+superior",
      },
    ],
  },
  {
    titulo: "⚡ Formação Profissional",
    subtitulo: "Conheça mais sobre a área elétrica e seus caminhos",
    cards: [
      {
        titulo: "O que faz um eletricista industrial",
        texto: "Atividades, áreas de atuação e possibilidades profissionais.",
        url: "https://www.youtube.com/results?search_query=o+que+faz+eletricista+industrial+areas+atuacao",
      },
      {
        titulo: "Segurança elétrica e NR-10",
        texto: "A importância da segurança na profissão do eletricista.",
        url: "https://www.youtube.com/results?search_query=seguranca+eletrica+nr10+eletricista+industrial",
      },
      {
        titulo: "Cursos técnicos gratuitos na área elétrica",
        texto: "Como encontrar cursos de qualificação gratuitos na área.",
        url: "https://www.youtube.com/results?search_query=cursos+tecnicos+gratuitos+eletrica+eletricista",
      },
    ],
  },
  {
    titulo: "💻 Aprendizagem Digital",
    subtitulo: "Como usar a tecnologia a favor dos seus estudos",
    cards: [
      {
        titulo: "Como usar inteligência artificial para estudar",
        texto: "Dicas para usar IA como apoio ao aprendizado — sem substituir o esforço próprio.",
        url: "https://www.youtube.com/results?search_query=como+usar+inteligencia+artificial+para+estudar+dicas",
      },
      {
        titulo: "Como estudar pelo celular",
        texto: "Ferramentas e estratégias para aprender usando o celular.",
        url: "https://www.youtube.com/results?search_query=como+estudar+pelo+celular+dicas+ferramentas+gratuitas",
      },
      {
        titulo: "Como encontrar informações confiáveis na internet",
        texto: "Como identificar fontes seguras e evitar desinformação.",
        url: "https://www.youtube.com/results?search_query=como+encontrar+informacoes+confiaveis+internet+dicas",
      },
    ],
  },
];

function BlocoVideos({ bloco }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-card">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors active:scale-[0.99]"
      >
        <div>
          <p className="font-extrabold text-sm">{bloco.titulo}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{bloco.subtitulo}</p>
        </div>
        {aberto ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>

      {aberto && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          {bloco.cards.map((c) => (
            <div key={c.titulo} className="border border-border rounded-xl p-3 bg-background flex items-start gap-3">
              <span className="text-lg shrink-0 mt-0.5">🎬</span>
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
      )}
    </div>
  );
}

export default function AbaVideos() {
  return (
    <div className="space-y-3">
      {blocos.map((b) => (
        <BlocoVideos key={b.titulo} bloco={b} />
      ))}
    </div>
  );
}