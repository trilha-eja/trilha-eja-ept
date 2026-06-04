import { useState } from "react";
import PageHeader from "../components/PageHeader";
import AbaEnemSisu from "../components/caminhos/AbaEnemSisu";
import AbaCursosGratuitos from "../components/caminhos/AbaCursosGratuitos";
import AbaDicasEstudo from "../components/caminhos/AbaDicasEstudo";
import AbaFerramentasDigitais from "../components/caminhos/AbaFerramentasDigitais";
import AbaVideos from "../components/caminhos/AbaVideos";

const abas = [
  { id: "enem", label: "ENEM/SISU/PROUNI", emoji: "🎓" },
  { id: "cursos", label: "Cursos Gratuitos", emoji: "📚" },
  { id: "dicas", label: "Dicas de Estudo", emoji: "💡" },
  { id: "ferramentas", label: "Ferramentas Digitais", emoji: "📱" },
  { id: "videos", label: "Vídeos", emoji: "🎬" },
];

export default function CaminhosEstudo() {
  const [abaAtiva, setAbaAtiva] = useState("enem");

  return (
    <div>
      <PageHeader title="Caminhos de Estudo" subtitle="Continue crescendo!" />

      {/* Abas — scroll horizontal no mobile */}
      <div className="sticky top-[57px] z-30 bg-background border-b border-border">
        <div
          className="flex overflow-x-auto gap-1 px-3 py-2"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {abas.map((a) => (
            <button
              key={a.id}
              onClick={() => setAbaAtiva(a.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                abaAtiva === a.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{a.emoji}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da aba */}
      <div className="max-w-lg mx-auto px-4 py-5 pb-10">
        {abaAtiva === "enem" && <AbaEnemSisu />}
        {abaAtiva === "cursos" && <AbaCursosGratuitos />}
        {abaAtiva === "dicas" && <AbaDicasEstudo />}
        {abaAtiva === "ferramentas" && <AbaFerramentasDigitais />}
        {abaAtiva === "videos" && <AbaVideos />}
      </div>
    </div>
  );
}