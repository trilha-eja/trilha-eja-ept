import { ArrowLeft } from "lucide-react";
import AccordionSection from "./AccordionSection";
import NavigationBar from "./NavigationBar";

export default function TrabalhoPrecarizado({ onBack }) {
  return (
    <div>
      <NavigationBar onBack={onBack} />
      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-1 pb-3">
        <div>
            <h1 className="font-extrabold text-lg leading-tight">Trabalho Precarizado</h1>
            <p className="text-sm text-muted-foreground">Autonomia ou armadilha? Conheça os riscos</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">
        {/* Intro box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            ⚠️ Na área elétrica, ouvimos muito falar na "liberdade" de ser o próprio chefe. Mas cuidado: muitas vezes, essa <strong>autonomia</strong> esconde a <strong>precarização do trabalho</strong>.
          </p>
        </div>

        {/* Card 1 — Acordeão */}
        <AccordionSection titulo="🔴 A armadilha do &quot;Empreendedor de si mesmo&quot;">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Isso significa assumir <strong>todos os riscos sozinho</strong>, perdendo direitos básicos como férias e auxílio-doença e enfrentando jornadas exaustivas para dar conta do sustento.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Estudiosos do mundo do trabalho chamam isso de <strong>'precariado'</strong>: quando a perda de direitos sociais é disfarçada de empreendedorismo.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Quando a rotina incerta nos obriga a "sobreviver" ao dia de hoje, construir um <strong>projeto de vida</strong> parece distante — mas é exatamente aí que ele se torna mais necessário.
          </p>
        </AccordionSection>

        {/* Card 2 — Acordeão */}
        <AccordionSection titulo="🛡️ Proteja-se na prática!">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A precarização é um problema estrutural do mundo do trabalho, mas você tem ferramentas para não ficar desamparado:
          </p>
        </AccordionSection>

        {/* Card 3 — Acordeão */}
        <AccordionSection titulo="📋 Formalize-se como MEI">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Vai atuar por conta própria? O MEI é rápido, barato e garante direitos fundamentais:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
            <li>Contagem de tempo para aposentadoria</li>
            <li>Auxílio-doença — essencial se sofrer acidente ou precisar de afastamento e ficar sem renda</li>
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
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
        </AccordionSection>

        {/* Card 4 — Acordeão */}
        <AccordionSection titulo="🤝 Conheça seus Direitos Coletivos">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você não está sozinho! O sindicato da sua categoria é um aliado importante na luta contra a precarização.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            💡 Consulte a seção <strong>Direitos Coletivos</strong> neste aplicativo para saber como encontrar seu sindicato e o que ele pode fazer por você.
          </p>
        </AccordionSection>

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