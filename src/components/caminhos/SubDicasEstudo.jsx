import PageHeader from "../PageHeader";
import AbaDicasEstudo from "./AbaDicasEstudo";

export default function SubDicasEstudo({ onBack }) {
  return (
    <div>
      <PageHeader title="Dicas de Estudo" subtitle="Estudar trabalhando é um desafio real — estas dicas são para quem vive essa realidade." backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <div className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Estas dicas foram pensadas para quem concilia trabalho, família e estudos. Não existe fórmula perfeita — o que importa é encontrar o que funciona para você.</p>
        </div>
        <AbaDicasEstudo />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}