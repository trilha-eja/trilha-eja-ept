export default function CardNR10() {
  return (
    <div className="space-y-3">
      {/* Card principal */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">⚡</span>
          <h3 className="font-bold text-sm">Segurança Elétrica: Conheça seus Direitos</h3>
        </div>

      </div>

      {/* Card 1 — Capacitação Obrigatória */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🕒</span>
          <h3 className="font-bold text-sm">Capacitação Obrigatória</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {`Você tem direito a receber treinamento durante o horário de trabalho e sem custos.

- Treinamento Básico: 40 horas

Para atividades em Média ou Alta Tensão:
- Mais 16h para o Sistema Elétrico de Consumo (SEC)
- Mais 40h para o Sistema Elétrico de Potência (SEP)`}
        </p>

        {/* Box Você Sabia */}
        <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span>💡</span>
            <p className="font-bold text-xs text-blue-800">Você Sabia?</p>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed whitespace-pre-line">
            {`SEC (Sistema Elétrico de Consumo) é o sistema elétrico usado dentro das indústrias, comércios e residências — como painéis, motores e tomadas.

SEP (Sistema Elétrico de Potência) é o sistema de geração e distribuição de energia elétrica — como torres de transmissão e subestações.

A maioria dos eletricistas industriais atua no SEC.`}
          </p>
        </div>
      </div>

      {/* Card 2 — Equipamentos de Proteção */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🛡️</span>
          <h3 className="font-bold text-sm">Equipamentos de Proteção</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {`A empresa deve fornecer gratuitamente equipamentos adequados à atividade:

- Capacete
- Óculos de proteção
- Luvas isolantes
- Vestimentas apropriadas
- Calçados adequados para serviços elétricos`}
        </p>
      </div>

      {/* Card 3 — Informação Sobre os Riscos */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">📢</span>
          <h3 className="font-bold text-sm">Informação Sobre os Riscos</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {`Você tem direito de receber orientações sobre os perigos presentes no ambiente de trabalho e sobre os procedimentos seguros para executar suas atividades.

Exija essas informações — é seu direito e protege sua vida.`}
        </p>
      </div>

      {/* Card 4 — Direito de Recusa */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🛑</span>
          <h3 className="font-bold text-sm">Direito de Recusa</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {`Caso exista risco grave e iminente à sua segurança ou à de outras pessoas, você pode interromper a atividade e comunicar imediatamente o responsável pela supervisão.

Nenhuma empresa pode te punir por recusar um serviço inseguro.`}
        </p>
      </div>

      {/* Card 5 — Segurança em Primeiro Lugar */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">❤️</span>
          <h3 className="font-bold text-sm text-green-800">Segurança em Primeiro Lugar</h3>
        </div>
        <p className="text-sm text-green-700 leading-relaxed whitespace-pre-line">
          {`A NR-10 existe para proteger vidas. Trabalhar com eletricidade exige conhecimento técnico, atenção e respeito às normas de segurança.

Sua vida vale mais do que qualquer prazo ou serviço.`}
        </p>
      </div>

      {/* Base Legal + Botão */}
      <div className="p-4 bg-card border border-border rounded-2xl">
        <div className="bg-gray-100 rounded-xl p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span>📋</span>
            <p className="font-bold text-xs">Base Legal</p>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            NR-10 — Segurança em Instalações Elétricas e Serviços em Eletricidade{"\n"}
            Portaria MTE nº 737, de 29 de maio de 2026.
          </p>
        </div>
        <a
          href="https://www.in.gov.br/web/dou/-/portaria-mte-n-737-de-29-de-maio-de-2026-709524662"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
        >
          🔗 Acessar Portaria oficial da NR-10
        </a>
      </div>
    </div>
  );
}