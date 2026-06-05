import { ArrowLeft } from "lucide-react";

export default function TrabalhoPrecarizado({ onBack }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Trabalho Precarizado</h1>
            <p className="text-sm text-muted-foreground">Autonomia ou armadilha? Conheça os riscos</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">
        {/* Intro box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            ⚠️ Na área elétrica, ouvimos muito falar na "liberdade" de ser o próprio chefe. Mas cuidado: muitas vezes, essa <strong>autonomia</strong> esconde a <strong>precarização do trabalho</strong>.
          </p>
        </div>

        {/* Card 1 */}
        <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">🔴</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-sm mb-2">A armadilha do "Empreendedor de si mesmo"</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Isso significa assumir <strong>todos os riscos sozinho</strong>, perdendo direitos básicos como férias e auxílio-doença e enfrentando jornadas exaustivas para dar conta do sustento.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Estudiosos do mundo do trabalho, como <strong>Ricardo Antunes</strong>, chamam isso de <strong>'precariado'</strong>: quando a perda de direitos sociais é disfarçada de empreendedorismo.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Quando a rotina incerta nos obriga a "sobreviver" ao dia de hoje, construir um <strong>projeto de vida</strong> parece distante — mas é exatamente aí que ele se torna mais necessário. Conhecer seus direitos é o primeiro passo para mudar essa realidade.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">🛡️</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-sm mb-2">Proteja-se na prática!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A precarização é um problema estrutural do mercado, mas você tem ferramentas para não ficar desamparado:
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">📋</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-sm mb-2">Formalize-se como MEI</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Vai atuar por conta própria? O MEI é rápido, barato e garante direitos fundamentais:
            </p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1 list-disc list-inside">
              <li>Contagem de tempo para aposentadoria</li>
              <li>Auxílio-doença — essencial se sofrer acidente ou precisar de afastamento e ficar sem renda</li>
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              ⚠️ Atenção: evite sites que cobram taxas para abrir o MEI — use sempre o portal oficial do Governo Federal.
            </p>
            <a
              href="https://www.gov.br/mei"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all mt-3"
            >
              🔗 Abrir MEI gratuitamente
            </a>
          </div>
        </div>

        {/* Card 4 */}
        <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-2xl shrink-0 mt-0.5">🤝</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-sm mb-2">Conheça seus Direitos Coletivos</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Você não está sozinho! O sindicato da sua categoria é um aliado importante na luta contra a precarização.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              💡 Consulte a seção <strong>Direitos Coletivos</strong> neste aplicativo para saber como encontrar seu sindicato e o que ele pode fazer por você.
            </p>
          </div>
        </div>

        {/* Final box */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Conhecer a realidade do mundo do trabalho é o primeiro passo para <strong>não aceitar menos do que você merece</strong>. Seu trabalho tem valor — e você tem direitos.
          </p>
        </div>
      </div>
    </div>
  );
}