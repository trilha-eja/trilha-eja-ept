import { useState } from "react";
import PageHeader from "../components/PageHeader";
import AccordionSection from "../components/AccordionSection";

// Senha ofuscada em base64 para não expor em texto visível
const _k = atob("cHJvZmVwdDIwMjY=");

export default function ParaOEducador() {
  const [acesso, setAcesso] = useState(() => sessionStorage.getItem("educador_acesso") === "1");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const handleAcessar = () => {
    if (senha === _k) {
      sessionStorage.setItem("educador_acesso", "1");
      setAcesso(true);
      setErro(false);
    } else {
      setErro(true);
    }
  };

  if (!acesso) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center space-y-1">
            <div className="text-5xl mb-2">👨‍🏫</div>
            <h1 className="font-extrabold text-2xl">Para o Educador</h1>
            <p className="text-sm text-muted-foreground leading-snug">
              Orientações pedagógicas para o uso do Trilha EJA-EPT em sala
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 text-sm leading-relaxed">
            <p>Este espaço é destinado a educadores(as) da EJA-EPT. Para receber a senha de acesso, entre em contato pelo e-mail:</p>
            <p className="font-semibold mt-2">📧 marileia.hillesheim@ifc.edu.br</p>
            <p className="text-muted-foreground mt-1">A senha será enviada em até 48 horas.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Digite a senha de acesso:</label>
            <input
              type="password"
              value={senha}
              onChange={e => { setSenha(e.target.value); setErro(false); }}
              onKeyDown={e => e.key === "Enter" && handleAcessar()}
              placeholder="Senha"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {erro && (
              <p className="text-destructive text-sm">
                Senha incorreta. Solicite o acesso pelo e-mail indicado.
              </p>
            )}
          </div>

          <button
            onClick={handleAcessar}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-base active:scale-95 transition-all"
          >
            Acessar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Para o Educador" subtitle="Orientações pedagógicas para o uso do Trilha EJA-EPT em sala" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10">
        {/* Texto de abertura — sempre visível */}
        <div className="space-y-3">
          <p className="text-sm italic text-muted-foreground leading-relaxed text-center">
            "Para educadores que compreendem que ensinar na EJA é um ato político de esperança ativa."
          </p>
          <div className="bg-muted/60 border border-border rounded-2xl p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bem-vindo(a)! Este espaço reúne orientações fundamentadas na pesquisa <strong>Projeto de vida na EJA-EPT: perspectivas de continuidade dos estudos e inserção no mundo do trabalho</strong>, desenvolvida no ProfEPT/IFC Campus Blumenau.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              O objetivo é apoiar você no uso crítico e transformador do Trilha EJA-EPT em sala de aula, reconhecendo as especificidades do estudante-trabalhador e a dimensão política da educação de jovens e adultos.
            </p>
          </div>
        </div>

        {/* Bloco 1 — Quem é o estudante da EJA-EPT? */}
        <AccordionSection titulo="👤 Quem é o estudante da EJA-EPT?">
          <p className="text-xs text-muted-foreground font-semibold">Um olhar que vai além da sala de aula</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`O estudante da EJA não é um "aluno com atraso". Ele é um trabalhador-estudante adulto cujas trajetórias foram interrompidas por desigualdades estruturais — de classe, raça, gênero, território e idade.

Ao usar este aplicativo, lembre-se: você não está ensinando alguém que não sabe. Você está mediando o conhecimento de quem já sabe muito.

Esses estudantes chegam à escola carregando saberes construídos no trabalho, na família, na comunidade e nas lutas cotidianas. Reconhecer esses saberes não é condescendência — é o ponto de partida de uma pedagogia comprometida com a formação humana integral.

A interseccionalidade nos convida a olhar para cada estudante em sua complexidade: uma mulher negra trabalhadora que retorna à escola enfrenta barreiras que vão muito além do conteúdo escolar. Nomear essas barreiras em sala é um ato pedagógico.`}</p>
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-bold mb-1">📋 Referências:</p>
            <p className="text-xs text-muted-foreground">ARROYO, M. G. Passageiros da noite. Petrópolis: Vozes, 2012.</p>
            <p className="text-xs text-muted-foreground">AKOTIRENE, K. Interseccionalidade. São Paulo: Pólen, 2019.</p>
          </div>
        </AccordionSection>

        {/* Bloco 2 — EJA como Direito */}
        <AccordionSection titulo="🛑 EJA como Direito — não como oportunidade">
          <p className="text-xs text-muted-foreground font-semibold">Atenção à linguagem que usamos</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`Muitas vezes, a sociedade trata a EJA como uma "segunda chance" ou um "favor" do Estado. Essa abordagem precisa ser questionada em sala.

A EJA é a reparação de uma dívida histórica e a restituição de um direito constitucionalmente negado na idade própria. Não é benesse — é direito.

Quando o educador muda esse vocabulário em sala, muda a postura do estudante: de grato e submisso para cidadão consciente de seus direitos.

Evite: "Você teve uma segunda chance."
Prefira: "Você está exercendo um direito que sempre foi seu."`}</p>
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-bold mb-1">📋 Referência:</p>
            <p className="text-xs text-muted-foreground">GADOTTI, M. Educação de adultos como direito humano. São Paulo: IPF, 2009.</p>
          </div>
        </AccordionSection>

        {/* Bloco 3 — Mundo do Trabalho x Mercado de Trabalho */}
        <AccordionSection titulo="⚖️ Mundo do Trabalho x Mercado de Trabalho">
          <p className="text-xs text-muted-foreground font-semibold">Uma distinção que é política</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`Este aplicativo usa intencionalmente a expressão Mundo do Trabalho — e não mercado de trabalho. Essa escolha não é acidental.

Formar para o mercado adapta o estudante às necessidades do capital, naturalizando a exploração e a precarização. Formar para o Mundo do Trabalho instrumentaliza o cidadão a compreender, questionar e transformar as relações de produção.

Use essa distinção nas suas aulas. Quando um estudante pergunta "onde vou trabalhar?", amplie a pergunta: "em que condições? com quais direitos? para construir qual projeto de vida?"`}</p>
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-bold mb-1">📋 Referência:</p>
            <p className="text-xs text-muted-foreground">FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Médio Integrado. São Paulo: Cortez, 2005.</p>
          </div>
        </AccordionSection>

        {/* Bloco 4 — Como mediar o Mapa da Vida */}
        <AccordionSection titulo="🗺️ Como mediar o Mapa da Vida sem cair na meritocracia">
          <p className="text-xs text-muted-foreground font-semibold">O projeto de vida como ato político coletivo</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`A BNCC introduziu o "Projeto de Vida" no currículo — mas na EJA-EPT, ele não pode ser reduzido a um plano individualista de ascensão pessoal.`}</p>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-xs font-bold text-green-800 mb-1">✓ FAÇA:</p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>• Pergunte à turma quais barreiras estruturais — falta de transporte, cansaço do trabalho, cuidado de filhos — dificultam seus projetos. Debata soluções coletivas e direitos.</li>
              <li>• Conecte as metas individuais a direitos coletivos: moradia, educação, saúde, trabalho digno.</li>
              <li>• Valorize trajetórias não lineares — quem parou e voltou tem uma história que merece ser reconhecida.</li>
              <li>• Use os blocos "De onde venho?" e "Onde estou?" como ponto de partida para rodas de conversa.</li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-3">
            <p className="text-xs font-bold text-red-800 mb-1">✗ EVITE:</p>
            <ul className="text-xs text-red-800 space-y-1">
              <li>• Frases como "basta querer", "é só se esforçar" ou "depende só de você".</li>
              <li>• Culpar o estudante pelo cansaço — o esgotamento físico é reflexo da jornada de trabalho da classe trabalhadora.</li>
              <li>• Tratar o projeto de vida como plano de carreira individual.</li>
              <li>• Comparar trajetórias entre estudantes.</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed italic">O Mapa da Vida é um ato político de esperança coletiva — não um plano de ascensão individual.</p>
          <div className="bg-muted/50 rounded-xl p-3">
            <p className="text-xs font-bold mb-1">📋 Referência:</p>
            <p className="text-xs text-muted-foreground">FREIRE, P. Pedagogia da Esperança. Rio de Janeiro: Paz e Terra, 1992.</p>
          </div>
        </AccordionSection>

        {/* Bloco 5 — O educador como ponte */}
        <AccordionSection titulo="💡 O educador como ponte contra o apagão informacional">
          <p className="text-xs text-muted-foreground font-semibold">Mediação tecnológica como ato pedagógico</p>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{`As entrevistas realizadas nesta pesquisa revelaram algo importante: muitos estudantes da EJA-EPT desconhecem informações fundamentais sobre continuidade dos estudos e mundo do trabalho — o que chamamos de apagão informacional.

Muitos não sabem o que é ENEM, SISU ou PROUNI. Nunca formataram um currículo. Desconhecem seus direitos trabalhistas básicos. Não sabem que podem fazer uma graduação gratuita.

O educador tem um papel insubstituível nesse processo:
- Mediar o acesso às informações do aplicativo em sala
- Desmistificar o ensino superior como algo inacessível
- Conectar o conteúdo técnico do curso aos direitos trabalhistas
- Usar o app como ponto de partida para rodas de conversa
- Mostrar que existem caminhos possíveis — sem impor nenhum deles

A mediação tecnológica não é apenas ensinar a usar um app. É ampliar horizontes e devolver ao estudante a consciência de suas possibilidades.`}</p>
        </AccordionSection>

        {/* Bloco 6 — Roteiro Sugerido de 6 Encontros */}
        <AccordionSection titulo="📅 Roteiro Sugerido de 6 Encontros">
          <p className="text-xs text-muted-foreground font-semibold">Adaptável à sua realidade e à da turma</p>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-foreground">
              Este roteiro é uma sugestão — não uma prescrição. Adapte conforme o tempo disponível, o perfil da turma e o contexto institucional. O importante é garantir espaço para a fala, a escuta e a reflexão coletiva.
            </p>
          </div>
          <EncontroCard
            titulo="Encontro 1 — Quem somos? De onde viemos?"
            modulos="Mapa da Vida — Blocos 1 e 2"
            proposta="Roda de conversa inicial. Cada estudante compartilha algo da sua trajetória. Mediação com as perguntas: Por que paramos de estudar? O que nos trouxe de volta? A EJA como direito — não como favor."
            tempo="1h30"
          />
          <EncontroCard
            titulo="Encontro 2 — Saberes, Trabalho e Direitos"
            modulos="Valorize sua Experiência + Direitos Trabalhistas"
            proposta="Levantamento coletivo dos saberes da turma. Quais experiências temos? O que já aprendemos fora da escola? Conexão com os direitos trabalhistas — carteira assinada, FGTS, segurança no trabalho. Discussão sobre trabalho formal x informal e precarização."
            tempo="1h30"
          />
          <EncontroCard
            titulo="Encontro 3 — Mundo do Trabalho e Projetos Profissionais"
            modulos="O que faz um Eletricista + Central de Oportunidades + Criar Currículo"
            proposta="O que faz um eletricista industrial? Onde pode atuar? Laboratório de elaboração do currículo — individual ou em duplas, com apoio do educador. Uso do módulo Valorize sua Experiência para traduzir saberes da vida em habilidades profissionais."
            tempo="2h"
          />
          <EncontroCard
            titulo="Encontro 4 — Caminhos de Estudo e Combate ao Apagão Informacional"
            modulos="ENEM + SISU + PROUNI + Cursos Gratuitos"
            proposta="Navegação guiada pelos módulos. Desmistificação do ensino superior. Roda de conversa: o que vocês sabiam sobre o ENEM antes de hoje? Quais caminhos parecem possíveis? Quais barreiras existem?"
            tempo="1h30"
          />
          <EncontroCard
            titulo="Encontro 5 — Mapa da Vida"
            modulos="Mapa da Vida — todos os blocos"
            proposta="Preenchimento coletivo e individual do Mapa da Vida. Roda de conversa com compartilhamento voluntário. Uso das Vozes da Trilha como inspiração — depoimentos de egressos. Atenção: não comparar trajetórias, não usar linguagem meritocrática."
            tempo="2h"
          />
          <EncontroCard
            titulo="Encontro 6 — Síntese, Avaliação e Continuidade"
            modulos="Sua Opinião Importa + Vozes da Trilha"
            proposta="Avaliação coletiva do processo. O que aprendemos juntos? O que mudou na forma de ver nossos projetos de vida? Convite para deixar depoimento nas Vozes da Trilha. Avaliação do aplicativo pelo formulário Sua Opinião Importa."
            tempo="1h30"
          />
        </AccordionSection>
      </div>
    </div>
  );
}

function EncontroCard({ titulo, modulos, proposta, tempo }) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 space-y-2">
      <h3 className="font-bold text-sm">{titulo}</h3>
      <p className="text-xs text-muted-foreground"><span className="font-semibold">Módulos:</span> {modulos}</p>
      <p className="text-xs text-muted-foreground leading-relaxed"><span className="font-semibold">Proposta:</span> {proposta}</p>
      <p className="text-xs text-muted-foreground"><span className="font-semibold">Tempo sugerido:</span> {tempo}</p>
    </div>
  );
}