// Caixinhas introdutórias coloridas por bloco
const ESTILOS = [
  { bg: "#E8F5E9", borda: "#5BAD6F" },  // 0 — De onde venho?
  { bg: "#E3F2FD", borda: "#4A90D9" },  // 1 — Onde estou?
  { bg: "#FFF3E0", borda: "#E86826" },  // 2 — Mundo do Trabalho
  { bg: "#E8EEF5", borda: "#2C5F8A" },  // 3 — Estudos
  { bg: "#F3E5F5", borda: "#9B59B6" },  // 4 — Eu Mesmo(a)
  { bg: "#FFF8E1", borda: "#F0A500" },  // 5 — Condições de Vida
  { bg: "#FCE4EC", borda: "#E74C6C" },  // 6 — Comunidade
  { bg: "#E8F5E9", borda: "#27AE60" },  // 7 — Síntese Final
];

export default function BlocoIntro({ bloco, emoji, titulo, intro }) {
  const estilo = ESTILOS[bloco] || ESTILOS[0];
  return (
    <div
      style={{
        background: estilo.bg,
        borderLeft: `4px solid ${estilo.borda}`,
        borderRadius: 8,
        padding: 12,
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: estilo.borda }}>
        {emoji} {titulo}
      </p>
      <p className="text-sm leading-relaxed text-foreground">{intro}</p>
    </div>
  );
}