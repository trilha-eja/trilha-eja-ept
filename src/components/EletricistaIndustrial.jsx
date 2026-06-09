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
            O(a) eletricista industrial é um(a) profissional importante para o funcionamento seguro e eficiente de indústrias, empresas e diversos ambientes de trabalho. Seu trabalho envolve conhecimentos técnicos, responsabilidade, atenção à segurança e aprendizagem contínua. A formação recebida na EJA-EPT é uma etapa importante dessa trajetória.
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

        {/* Card 3 — Segurança */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h2 className="font-bold text-sm">Segurança faz parte da profissão</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`Trabalhar com eletricidade exige responsabilidade e respeito às normas de segurança. Por isso é importante:
- Conhecer a NR-10
- Utilizar EPIs adequados
- Participar das capacitações obrigatórias
- Seguir procedimentos seguros
- Exercer o direito de recusa diante de situações de risco grave`}</p>
          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-xs text-yellow-800 leading-relaxed">
              Cuidar da segurança é uma forma de proteger a própria vida e a vida dos colegas de trabalho.
            </p>
          </div>
          <button
            onClick={() => onNavigate("rights")}
            className="w-full bg-accent text-accent-foreground font-bold text-sm py-3 rounded-xl hover:bg-accent/90 transition-colors active:scale-95"
          >
            🛡️ Conhecer meus Direitos Trabalhistas
          </button>
        </div>

        {/* Card 4 — Aprender */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <h2 className="font-bold text-sm">Aprender continua fazendo parte da caminhada</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`Concluir um curso é apenas uma etapa da formação. Muitos profissionais continuam aprendendo por meio de:
- Cursos de aperfeiçoamento
- Qualificações profissionais
- Cursos técnicos
- Graduação
- Especializações
- Experiências construídas no trabalho`}</p>
          <div className="bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Aprender ao longo da vida faz parte da construção profissional e pessoal.
            </p>
          </div>
          <Link
            to="/caminhos"
            className="flex items-center justify-center w-full bg-primary text-primary-foreground font-bold text-sm py-3 rounded-xl hover:bg-primary/90 transition-colors active:scale-95"
          >
            🎓 Explorar Caminhos de Estudo
          </Link>
        </div>

        {/* Card 5 — Trajetória tem valor */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <h2 className="font-bold text-sm text-green-900">Sua trajetória tem valor</h2>
          </div>
          <p className="text-sm text-green-800 leading-relaxed">
            Os conhecimentos adquiridos no trabalho, na família, na comunidade e na escola fazem parte da sua formação. A experiência de vida também produz saberes importantes.{"\n\n"}Cada estudante constrói seu projeto de vida de forma única. Não existe um único caminho correto — o importante é reconhecer suas possibilidades e seguir construindo seus próprios projetos.
          </p>
          <button
            onClick={() => onNavigate("skills")}
            className="w-full bg-green-600 text-white font-bold text-sm py-3 rounded-xl hover:bg-green-700 transition-colors active:scale-95"
          >
            🌟 Valorizar minha Experiência
          </button>
        </div>

        {/* Seção final — Continue sua jornada */}
        <div className="pt-2">
          <h3 className="font-bold text-sm text-center mb-3">🔗 Continue sua jornada</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("resume")}
              className="bg-card border border-border rounded-xl py-4 px-3 text-sm font-semibold text-center hover:bg-muted/50 transition-colors active:scale-95"
            >
              📄 Criar meu Currículo
            </button>
            <Link
              to="/caminhos"
              className="bg-card border border-border rounded-xl py-4 px-3 text-sm font-semibold text-center hover:bg-muted/50 transition-colors active:scale-95 flex items-center justify-center"
            >
              🎓 Caminhos de Estudo
            </Link>
            <button
              onClick={() => onNavigate("jobs")}
              className="bg-card border border-border rounded-xl py-4 px-3 text-sm font-semibold text-center hover:bg-muted/50 transition-colors active:scale-95"
            >
              💼 Central de Oportunidades
            </button>
            <Link
              to="/vozes"
              className="bg-card border border-border rounded-xl py-4 px-3 text-sm font-semibold text-center hover:bg-muted/50 transition-colors active:scale-95 flex items-center justify-center"
            >
              🗣️ Vozes da Trilha
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}