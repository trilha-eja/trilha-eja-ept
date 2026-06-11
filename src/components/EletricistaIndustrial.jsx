import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AccordionSection from "./AccordionSection";
import NavigationBar from "./NavigationBar";

export default function EletricistaIndustrial({ onBack, onNavigate }) {
  return (
    <div>
      <NavigationBar onBack={onBack} />
      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-1 pb-3">
        <div>
            <h1 className="font-extrabold text-lg leading-tight">O que faz um Eletricista Industrial?</h1>
            <p className="text-sm text-muted-foreground">Conheça sua profissão e seus caminhos</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">

        {/* Introdução */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⚡</span>
          </div>
          <p className="text-sm text-orange-900 leading-relaxed">
            O(a) eletricista industrial é um(a) profissional importante para o funcionamento seguro e eficiente de indústrias, empresas e diversos ambientes de trabalho. Seu trabalho envolve conhecimentos técnicos, responsabilidade, atenção à segurança e aprendizagem contínua. A formação recebida na EJA-EPT é uma etapa importante dessa trajetória.{"\n\n"}A área elétrica é exercida por homens e mulheres — e sua diversidade a fortalece.
          </p>
        </div>

        {/* Card 1 — Principais atividades (Acordeão) */}
        <AccordionSection titulo="🔧 Principais atividades">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`O(a) eletricista industrial pode atuar em atividades como:
- Instalação de equipamentos elétricos
- Manutenção preventiva
- Manutenção corretiva
- Montagem de painéis elétricos
- Ligação e testes de motores
- Leitura de diagramas elétricos
- Inspeções de segurança
- Medições e testes elétricos
- Identificação de falhas
- Apoio a equipes de manutenção`}</p>
          <div className="bg-muted rounded-xl p-3 mt-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nem todas as empresas realizam as mesmas atividades. As funções podem variar conforme o local de trabalho e a experiência profissional.
            </p>
          </div>
        </AccordionSection>

        {/* Card 2 — Onde posso atuar (Acordeão) */}
        <AccordionSection titulo="🏭 Onde posso atuar?">
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`A formação em Eletricista Industrial pode abrir oportunidades em diferentes espaços:
- Indústrias
- Empresas de manutenção elétrica
- Prestadoras de serviços
- Construção civil
- Cooperativas
- Agroindústrias
- Órgãos públicos
- Pequenas empresas
- Trabalho autônomo`}</p>
          <div className="bg-muted rounded-xl p-3 mt-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cada trajetória é única. Algumas pessoas ingressam diretamente na área elétrica. Outras conciliam diferentes atividades profissionais ao longo da vida.
            </p>
          </div>
        </AccordionSection>

        {/* Card 4 — Próximos passos */}
        <div className="bg-orange-50 border border-[#E86826] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔗</span>
            <h3 className="font-bold text-sm">Próximos passos</h3>
          </div>
          <p className="text-sm leading-relaxed text-orange-900 whitespace-pre-line">{`Quer continuar crescendo profissionalmente?
Explore outros módulos deste aplicativo:
• Criar Currículo — apresente sua trajetória
• Central de Oportunidades — onde buscar trabalho
• Caminhos de Estudo — continue aprendendo`}</p>
        </div>

      </div>
    </div>
  );
}