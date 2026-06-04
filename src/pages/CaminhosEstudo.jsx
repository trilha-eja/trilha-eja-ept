import PageHeader from "../components/PageHeader";
import SecaoEnem from "../components/caminhos/SecaoEnem";
import SecaoSisu from "../components/caminhos/SecaoSisu";
import SecaoProuni from "../components/caminhos/SecaoProuni";
import SecaoCursosGratuitos from "../components/caminhos/SecaoCursosGratuitos";
import AbaDicasEstudo from "../components/caminhos/AbaDicasEstudo";
import AbaFerramentasDigitais from "../components/caminhos/AbaFerramentasDigitais";
import AbaVideos from "../components/caminhos/AbaVideos";

function SecaoTitulo({ emoji, titulo, subtitulo, cor }) {
  return (
    <div className={`rounded-2xl px-4 py-3 ${cor}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <div>
          <h2 className="font-extrabold text-base leading-tight">{titulo}</h2>
          {subtitulo && <p className="text-xs opacity-80">{subtitulo}</p>}
        </div>
      </div>
    </div>
  );
}

export default function CaminhosEstudo() {
  return (
    <div>
      <PageHeader title="Caminhos de Estudo" subtitle="Continue crescendo!" />

      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-8">

        {/* ── ENEM ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="📝" titulo="ENEM" subtitulo="Exame Nacional do Ensino Médio" cor="bg-primary/10 text-foreground" />
          <SecaoEnem />
        </section>

        {/* ── SISU ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="🏛️" titulo="SISU" subtitulo="Sistema de Seleção Unificada" cor="bg-accent/10 text-foreground" />
          <SecaoSisu />
        </section>

        {/* ── PROUNI ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="🎓" titulo="PROUNI" subtitulo="Programa Universidade para Todos" cor="bg-chart-4/10 text-foreground" />
          <SecaoProuni />
        </section>

        {/* ── Cursos Gratuitos ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="📚" titulo="Cursos Gratuitos" subtitulo="Outras formas de continuar estudando" cor="bg-chart-2/10 text-foreground" />
          <SecaoCursosGratuitos />
        </section>

        {/* ── Dicas de Estudo ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="💡" titulo="Dicas de Estudo" subtitulo="Para quem trabalha e estuda" cor="bg-secondary/30 text-foreground" />
          <AbaDicasEstudo />
        </section>

        {/* ── Ferramentas Digitais ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="📱" titulo="Ferramentas Digitais" subtitulo="Seu celular pode ser seu melhor aliado" cor="bg-muted text-foreground" />
          <AbaFerramentasDigitais />
        </section>

        {/* ── Vídeos ── */}
        <section className="space-y-3">
          <SecaoTitulo emoji="🎬" titulo="Vídeos Recomendados" subtitulo="Busca direta no YouTube" cor="bg-destructive/10 text-foreground" />
          <AbaVideos />
        </section>

      </div>
    </div>
  );
}