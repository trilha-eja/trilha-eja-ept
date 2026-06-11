import { ArrowLeft, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function EletricistaIndustrial({ onBack, onNavigate }) {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-lg leading-tight">O que faz um Eletricista Industrial?</h1>
            <p className="text-sm text-muted-foreground">Conheça sua profissão e seus caminhos</p>
          </div>
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

        {/* Card 1 — Principais atividades */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔧</span>
            <h2 className="font-bold text-sm">Principais atividades</h2>
          </div>
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
          <div className="bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Nem todas as empresas realizam as mesmas atividades. As funções podem variar conforme o local de trabalho e a experiência profissional.
            </p>
          </div>
        </div>

        {/* Card 2 — Onde posso atuar */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏭</span>
            <h2 className="font-bold text-sm">Onde posso atuar?</h2>
          </div>
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
          <div className="bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Cada trajetória é única. Algumas pessoas ingressam diretamente na área elétrica. Outras conciliam diferentes atividades profissionais ao longo da vida.
            </p>
          </div>
        </div>

        {/* Card 4 — Próximos passos */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔗</span>
            <h2 className="font-bold text-sm">Próximos passos</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`Quer continuar crescendo profissionalmente?
Explore outros módulos deste aplicativo:
- Criar Currículo — apresente sua trajetória
- Central de Oportunidades — onde buscar trabalho
- Caminhos de Estudo — continue aprendendo`}</p>
        </div>

      </div>
    </div>
  );
}