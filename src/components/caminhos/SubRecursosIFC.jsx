import { ArrowLeft } from "lucide-react";
import AccordionSection from "../AccordionSection";

export default function SubRecursosIFC({ onBack }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">Recursos do IFC</h1>
            <p className="text-sm text-muted-foreground">Auxílios, bolsas e apoio estudantil</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">

        {/* Intro */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">
            Muitos estudantes desconhecem os recursos e apoios disponíveis no IFC. Aqui você encontra informações sobre auxílios, bolsas, programas de permanência e outros serviços institucionais.
          </p>
        </div>

        {/* Portal do Estudante */}
        <AccordionSection titulo="🏫 Portal do Estudante IFC">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Acesse informações sobre auxílios estudantis, programas de permanência, bolsas, editais, apoio estudantil e outras oportunidades oferecidas pelo IFC.
          </p>
          <a
            href="https://estudante.ifc.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
          >
            🔗 Acessar Portal
          </a>
        </AccordionSection>

        {/* Auxílios e Apoio */}
        <AccordionSection titulo="💰 Auxílios e Apoio Estudantil">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {`Procure o SISAE — Serviço Integrado de Suporte e Acompanhamento Educacional do seu campus.\nA equipe orienta sobre:\n- Auxílios financeiros\n- Bolsas\n- Programas de permanência\n- Outros serviços de apoio\n\nVocê também pode procurar:\n- Coordenação do Curso\n- Professores\n- Secretaria Acadêmica\n\nVocê não precisa enfrentar as dificuldades sozinho(a).`}
          </p>
        </AccordionSection>

        {/* Portal de Ingresso */}
        <AccordionSection titulo="📋 Portal de Ingresso IFC">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Acompanhe processos seletivos, editais e oportunidades de ingresso nos cursos do IFC.
          </p>
          <a
            href="https://ingresso.ifc.edu.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all"
          >
            🔗 Acessar Portal
          </a>
        </AccordionSection>

        {/* Como acessar o Moodle */}
        <AccordionSection titulo="🎥 Como acessar o Moodle">
          <p className="text-sm text-muted-foreground leading-relaxed">
            O Moodle é a plataforma de ensino online do IFC. Muitos materiais, atividades e comunicados são disponibilizados por lá. Assista a tutoriais para aprender a usar.
          </p>
          <a
            href="https://www.youtube.com/results?search_query=como+acessar+moodle+tutorial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-xs font-bold px-4 py-2.5 rounded-xl bg-chart-5 text-white hover:opacity-90 active:scale-95 transition-all"
          >
            ▶️ Ver tutoriais no YouTube
          </a>
        </AccordionSection>

      </div>
    </div>
  );
}