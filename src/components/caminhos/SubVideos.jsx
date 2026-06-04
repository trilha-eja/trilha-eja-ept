import PageHeader from "../PageHeader";
import AbaVideos from "./AbaVideos";

export default function SubVideos({ onBack }) {
  return (
    <div>
      <PageHeader title="Vídeos Recomendados" subtitle="Aprenda assistindo" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <AbaVideos />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}