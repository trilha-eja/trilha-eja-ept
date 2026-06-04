import PageHeader from "../PageHeader";
import AbaDicasEstudo from "./AbaDicasEstudo";

export default function SubDicasEstudo({ onBack }) {
  return (
    <div>
      <PageHeader title="Dicas de Estudo" subtitle="Como estudar com pouco tempo" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <AbaDicasEstudo />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}