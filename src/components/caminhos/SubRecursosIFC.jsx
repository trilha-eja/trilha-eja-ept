import NavigationBar from "../NavigationBar";
import AccordionSection from "../AccordionSection";

export default function SubRecursosIFC({ onBack }) {
  return (
    <div>
      <NavigationBar onBack={onBack} />
      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-2 pb-3">
        <h1 className="font-extrabold text-lg leading-tight">Recursos do IFC</h1>
        <p className="text-sm text-muted-foreground">Auxílios, bolsas e apoio estudantil</p>
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
          <p className="text-xs text-muted-foreground leading-relaxed mt-2">
            💡 Para acessar o Moodle consulte a seção Ferramentas Digitais neste aplicativo.
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

        {/* Manual do SIGAA */}
        <AccordionSection titulo="📋 Manual do SIGAA — Orientações Iniciais">
          <p className="text-sm text-muted-foreground leading-relaxed">
            O SIGAA é o sistema acadêmico do IFC. Acesse o manual oficial com orientações iniciais para usar o sistema — consultas de notas, faltas, histórico e muito mais.
          </p>
          <a
            href="https://manuais.dti.ifc.edu.br/lib/exe/fetch.php?media=wiki:suporte_tecnico:sigaa:sistema_academico_orientacoes_iniciais.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
          >
            🔗 Acessar Manual
          </a>
        </AccordionSection>

      </div>
    </div>
  );
}