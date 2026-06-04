import PageHeader from "../components/PageHeader";
import { Download } from "lucide-react";

const materiais = [
  {
    emoji: "🗺️",
    titulo: "Mapa da Vida — Versão para Imprimir",
    descricao: "Versão em papel do Mapa da Vida com espaços para escrever à mão suas metas de 1, 5 e 10 anos.",
    cor: "bg-orange-50 border-orange-200",
    corBotao: "bg-primary hover:bg-primary/90",
    disponivel: false,
  },
  {
    emoji: "🛡️",
    titulo: "Cartilha de Direitos Trabalhistas",
    descricao: "Seus direitos garantidos por lei, em linguagem simples. Inclui CLT, NR-10 e dicas para se proteger.",
    cor: "bg-blue-50 border-blue-200",
    corBotao: "bg-chart-4 hover:bg-chart-4/90",
    disponivel: false,
  },
  {
    emoji: "📋",
    titulo: "Checklist ENEM/SISU/PROUNI",
    descricao: "Lista de documentos e prazos para não perder nenhuma oportunidade de continuar estudando.",
    cor: "bg-green-50 border-green-200",
    corBotao: "bg-accent hover:bg-accent/90",
    disponivel: false,
  },
  {
    emoji: "⚡",
    titulo: "Glossário do Eletricista — Versão para Imprimir",
    descricao: "Todos os termos técnicos em linguagem simples, formatados para colar no caderno ou na parede da oficina.",
    cor: "bg-yellow-50 border-yellow-200",
    corBotao: "bg-secondary hover:bg-secondary/90",
    disponivel: false,
  },
  {
    emoji: "📚",
    titulo: "Guia do Educador (PDF Completo)",
    descricao: "Para professores: orientações pedagógicas para uso do Trilha EJA-EPT em perspectiva emancipatória.",
    cor: "bg-purple-50 border-purple-200",
    corBotao: "bg-chart-5 hover:bg-chart-5/90",
    disponivel: false,
  },
];

export default function BaixarMateriais() {
  return (
    <div>
      <PageHeader title="Baixar Materiais" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 pb-2">
          <span className="text-5xl block">📥</span>
          <h2 className="text-xl font-extrabold">Materiais para Baixar e Imprimir</h2>
          <p className="text-sm text-muted-foreground italic">
            "Porque aprender também funciona no papel."
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {materiais.map((m) => (
            <div
              key={m.titulo}
              className={`border rounded-2xl p-4 flex items-start gap-4 ${m.cor}`}
            >
              <span className="text-3xl shrink-0 mt-0.5">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-snug mb-1">{m.titulo}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{m.descricao}</p>
                <button
                  disabled
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                >
                  <Download className="w-3.5 h-3.5" />
                  Em breve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota */}
        <div className="bg-muted/60 border border-border rounded-2xl px-4 py-4 text-xs text-muted-foreground leading-relaxed text-center">
          📄 Todos os materiais são gratuitos e podem ser reproduzidos para fins educacionais não-comerciais, desde que mantida a referência ao <strong>Trilha EJA-EPT / IFC</strong>.
        </div>
      </div>
    </div>
  );
}