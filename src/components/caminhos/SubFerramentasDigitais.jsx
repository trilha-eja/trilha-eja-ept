import PageHeader from "../PageHeader";
import AbaFerramentasDigitais from "./AbaFerramentasDigitais";

export default function SubFerramentasDigitais({ onBack }) {
  return (
    <div>
      <PageHeader title="Ferramentas Digitais" subtitle="Seu celular como aliado nos estudos" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <AbaFerramentasDigitais />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}