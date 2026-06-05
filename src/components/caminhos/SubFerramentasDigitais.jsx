import PageHeader from "../PageHeader";
import AbaFerramentasDigitais from "./AbaFerramentasDigitais";

export default function SubFerramentasDigitais({ onBack }) {
  return (
    <div>
      <PageHeader title="Ferramentas Digitais" subtitle="Tecnologia a serviço da sua formação" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <div className="bg-chart-1/10 border border-chart-1/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Ferramentas <strong>gratuitas e acessíveis</strong> que podem transformar seu celular em um aliado poderoso nos estudos.</p>
        </div>
        <AbaFerramentasDigitais />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}