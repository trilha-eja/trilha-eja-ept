import PageHeader from "../PageHeader";
import AbaVideos from "./AbaVideos";

export default function SubVideos({ onBack }) {
  return (
    <div>
      <PageHeader title="Vídeos Recomendados" subtitle="Vídeos gratuitos sobre estudo, carreira e aprendizado" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-4">
        <div className="bg-chart-5/10 border border-chart-5/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">Ao clicar em <strong>"Ver vídeos"</strong>, o YouTube abrirá com uma busca já feita sobre o tema. Escolha o vídeo que parecer mais claro e confiável para você. Estes vídeos complementam os estudos — mas não substituem as aulas, os materiais do curso ou as orientações dos professores.</p>
        </div>
        <AbaVideos />
        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}