import { useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import AccordionSection from "../components/AccordionSection";

// Senha ofuscada em base64 para não expor em texto visível
const _k = atob("cHJvZmVwdDIwMjY=");

const conteudoPDF = [
  { tipo: "abertura", titulo: "Para o Educador — Trilha EJA-EPT", subtitulo: "Orientações pedagógicas para o uso do Trilha EJA-EPT em sala", texto: `"Para educadores que compreendem que ensinar na EJA é um ato político de esperança ativa."

Bem-vindo(a)! Este espaço reúne orientações fundamentadas na pesquisa Projeto de vida na EJA-EPT: perspectivas de continuidade dos estudos e inserção no mundo do trabalho, desenvolvida no ProfEPT/IFC Campus Blumenau.

O objetivo é apoiar você no uso crítico e transformador do Trilha EJA-EPT em sala de aula, reconhecendo as especificidades do estudante-trabalhador e a dimensão política da educação de jovens e adultos.` },
  { tipo: "bloco", titulo: "👤 Quem é o estudante da EJA-EPT?", subtitulo: "Um olhar que vai além da sala de aula", texto: `O estudante da EJA não é um "aluno com atraso". Ele é um trabalhador-estudante adulto cujas trajetórias foram interrompidas por desigualdades estruturais — de classe, raça, gênero, território e idade.

Ao usar este aplicativo, lembre-se: você não está ensinando alguém que não sabe. Você está mediando o conhecimento de quem já sabe muito.

Esses estudantes chegam à escola carregando saberes construídos no trabalho, na família, na comunidade e nas lutas cotidianas. Reconhecer esses saberes não é condescendência — é o ponto de partida de uma pedagogia comprometida com a formação humana integral.

A interseccionalidade nos convida a olhar para cada estudante em sua complexidade: uma mulher negra trabalhadora que retorna à escola enfrenta barreiras que vão muito além do conteúdo escolar. Nomear essas barreiras em sala é um ato pedagógico.`, refs: "ARROYO, M. G. Passageiros da noite. Petrópolis: Vozes, 2012.\nAKOTIRENE, K. Interseccionalidade. São Paulo: Pólen, 2019." },
  { tipo: "bloco", titulo: "🛑 EJA como Direito — não como oportunidade", subtitulo: "Atenção à linguagem que usamos", texto: `Muitas vezes, a sociedade trata a EJA como uma "segunda chance" ou um "favor" do Estado. Essa abordagem precisa ser questionada em sala.

A EJA é a reparação de uma dívida histórica e a restituição de um direito constitucionalmente negado na idade própria. Não é benesse — é direito.

Quando o educador muda esse vocabulário em sala, muda a postura do estudante: de grato e submisso para cidadão consciente de seus direitos.

Evite: "Você teve uma segunda chance."
Prefira: "Você está exercendo um direito que sempre foi seu."`, refs: "GADOTTI, M. Educação de adultos como direito humano. São Paulo: IPF, 2009." },
  { tipo: "bloco", titulo: "⚖️ Mundo do Trabalho x Mercado de Trabalho", subtitulo: "Uma distinção que é política", texto: `Este aplicativo usa intencionalmente a expressão Mundo do Trabalho — e não mercado de trabalho. Essa escolha não é acidental.

Formar para o mercado adapta o estudante às necessidades do capital, naturalizando a exploração e a precarização. Formar para o Mundo do Trabalho instrumentaliza o cidadão a compreender, questionar e transformar as relações de produção.

Use essa distinção nas suas aulas. Quando um estudante pergunta "onde vou trabalhar?", amplie a pergunta: "em que condições? com quais direitos? para construir qual projeto de vida?"`, refs: "FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Médio Integrado. São Paulo: Cortez, 2005." },
  { tipo: "bloco", titulo: "🗺️ Como mediar o Mapa da Vida sem cair na meritocracia", subtitulo: "O projeto de vida como ato político coletivo", texto: `A BNCC introduziu o "Projeto de Vida" no currículo — mas na EJA-EPT, ele não pode ser reduzido a um plano individualista de ascensão pessoal.

✓ FAÇA:
• Pergunte à turma quais barreiras estruturais — falta de transporte, cansaço do trabalho, cuidado de filhos — dificultam seus projetos. Debata soluções coletivas e direitos.
• Conecte as metas individuais a direitos coletivos: moradia, educação, saúde, trabalho digno.
• Valorize trajetórias não lineares — quem parou e voltou tem uma história que merece ser reconhecida.
• Use os blocos "De onde venho?" e "Onde estou?" como ponto de partida para rodas de conversa.

✗ EVITE:
• Frases como "basta querer", "é só se esforçar" ou "depende só de você".
• Culpar o estudante pelo cansaço — o esgotamento físico é reflexo da jornada de trabalho da classe trabalhadora.
• Tratar o projeto de vida como plano de carreira individual.
• Comparar trajetórias entre estudantes.

O Mapa da Vida é um ato político de esperança coletiva — não um plano de ascensão individual.`, refs: "FREIRE, P. Pedagogia da Esperança. Rio de Janeiro: Paz e Terra, 1992." },
  { tipo: "bloco", titulo: "💡 O educador como ponte contra o apagão informacional", subtitulo: "Mediação tecnológica como ato pedagógico", texto: `As entrevistas realizadas nesta pesquisa revelaram algo importante: muitos estudantes da EJA-EPT desconhecem informações fundamentais sobre continuidade dos estudos e mundo do trabalho — o que chamamos de apagão informacional.

Muitos não sabem o que é ENEM, SISU ou PROUNI. Nunca formataram um currículo. Desconhecem seus direitos trabalhistas básicos. Não sabem que podem fazer uma graduação gratuita.

O educador tem um papel insubstituível nesse processo:
- Mediar o acesso às informações do aplicativo em sala
- Desmistificar o ensino superior como algo inacessível
- Conectar o conteúdo técnico do curso aos direitos trabalhistas
- Usar o app como ponto de partida para rodas de conversa
- Mostrar que existem caminhos possíveis — sem impor nenhum deles

A mediação tecnológica não é apenas ensinar a usar um app. É ampliar horizontes e devolver ao estudante a consciência de suas possibilidades.` },
];

const encontrosPDF = [
  { titulo: "Encontro 1 — Quem somos? De onde viemos?", modulos: "Mapa da Vida — Blocos 1 e 2", proposta: "Roda de conversa inicial. Cada estudante compartilha algo da sua trajetória. Mediação com as perguntas: Por que paramos de estudar? O que nos trouxe de volta? A EJA como direito — não como favor.", tempo: "1h30" },
  { titulo: "Encontro 2 — Saberes, Trabalho e Direitos", modulos: "Valorize sua Experiência + Direitos Trabalhistas", proposta: "Levantamento coletivo dos saberes da turma. Quais experiências temos? O que já aprendemos fora da escola? Conexão com os direitos trabalhistas — carteira assinada, FGTS, segurança no trabalho. Discussão sobre trabalho formal x informal e precarização.", tempo: "1h30" },
  { titulo: "Encontro 3 — Mundo do Trabalho e Projetos Profissionais", modulos: "O que faz um Eletricista + Central de Oportunidades + Criar Currículo", proposta: "O que faz um eletricista industrial? Onde pode atuar? Laboratório de elaboração do currículo — individual ou em duplas, com apoio do educador. Uso do módulo Valorize sua Experiência para traduzir saberes da vida em habilidades profissionais.", tempo: "2h" },
  { titulo: "Encontro 4 — Caminhos de Estudo e Combate ao Apagão Informacional", modulos: "ENEM + SISU + PROUNI + Cursos Gratuitos", proposta: "Navegação guiada pelos módulos. Desmistificação do ensino superior. Roda de conversa: o que vocês sabiam sobre o ENEM antes de hoje? Quais caminhos parecem possíveis? Quais barreiras existem?", tempo: "1h30" },
  { titulo: "Encontro 5 — Mapa da Vida", modulos: "Mapa da Vida — todos os blocos", proposta: "Preenchimento coletivo e individual do Mapa da Vida. Roda de conversa com compartilhamento voluntário. Uso das Vozes da Trilha como inspiração — depoimentos de egressos. Atenção: não comparar trajetórias, não usar linguagem meritocrática.", tempo: "2h" },
  { titulo: "Encontro 6 — Síntese, Avaliação e Continuidade", modulos: "Sua Opinião Importa + Vozes da Trilha", proposta: "Avaliação coletiva do processo. O que aprendemos juntos? O que mudou na forma de ver nossos projetos de vida? Convite para deixar depoimento nas Vozes da Trilha. Avaliação do aplicativo pelo formulário Sua Opinião Importa.", tempo: "1h30" },
];

const HC_OPTS = {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: "#FFFFFF",
  logging: false,
  scrollX: 0,
  scrollY: 0,
  windowWidth: document.documentElement.scrollWidth,
  windowHeight: document.documentElement.scrollHeight,
};

function criarContainerHTML() {
  const el = document.createElement("div");
  el.style.cssText = "position:fixed;left:-9999px;top:0;z-index:-1;width:794px;background:#fff;font-family:Arial,sans-serif;box-sizing:border-box;color:#000;line-height:1.6;";
  return el;
}

function blocoParaHTML(bloco) {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "padding:0;margin:0;";

  const divisor = document.createElement("hr");
  divisor.style.cssText = "border:none;border-top:1px dashed #ccc;margin:0 0 10px 0;";
  wrapper.appendChild(divisor);

  const bTitulo = document.createElement("h2");
  bTitulo.style.cssText = "font-size:13px;font-weight:bold;color:#222;margin:0 0 2px 0;";
  bTitulo.textContent = bloco.titulo;
  wrapper.appendChild(bTitulo);

  const bSubtitulo = document.createElement("p");
  bSubtitulo.style.cssText = "font-size:10px;color:#888;margin:0 0 8px 0;";
  bSubtitulo.textContent = bloco.subtitulo;
  wrapper.appendChild(bSubtitulo);

  for (const p of bloco.texto.split("\n\n")) {
    const pEl = document.createElement("p");
    pEl.style.cssText = "font-size:11px;color:#222;margin:0 0 5px 0;";
    pEl.textContent = p.trim();
    wrapper.appendChild(pEl);
  }

  if (bloco.refs) {
    const refEl = document.createElement("p");
    refEl.style.cssText = "font-size:10px;font-style:italic;color:#555;margin:4px 0 0 0;";
    refEl.textContent = "Referências: " + bloco.refs.replace(/\n/g, " | ");
    wrapper.appendChild(refEl);
  }
  return wrapper;
}

function roteiroParaHTML() {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "padding:0;margin:0;";

  const divisor = document.createElement("hr");
  divisor.style.cssText = "border:none;border-top:1px dashed #ccc;margin:0 0 10px 0;";
  wrapper.appendChild(divisor);

  const titulo = document.createElement("h2");
  titulo.style.cssText = "font-size:13px;font-weight:bold;color:#222;margin:0 0 10px 0;";
  titulo.textContent = "📅 Roteiro Sugerido de 6 Encontros";
  wrapper.appendChild(titulo);

  for (const enc of encontrosPDF) {
    const encDiv = document.createElement("div");
    encDiv.style.cssText = "margin-bottom:10px;";

    const encTitulo = document.createElement("p");
    encTitulo.style.cssText = "font-size:11px;font-weight:bold;color:#222;margin:0 0 2px 0;";
    encTitulo.textContent = enc.titulo;
    encDiv.appendChild(encTitulo);

    const encMod = document.createElement("p");
    encMod.style.cssText = "font-size:10px;color:#555;margin:0;";
    encMod.textContent = "Módulos: " + enc.modulos;
    encDiv.appendChild(encMod);

    const encProp = document.createElement("p");
    encProp.style.cssText = "font-size:10px;color:#444;margin:0;";
    encProp.textContent = "Proposta: " + enc.proposta;
    encDiv.appendChild(encProp);

    const encTempo = document.createElement("p");
    encTempo.style.cssText = "font-size:10px;color:#666;margin:0;";
    encTempo.textContent = "Tempo sugerido: " + enc.tempo;
    encDiv.appendChild(encTempo);

    wrapper.appendChild(encDiv);
  }
  return wrapper;
}

async function renderizarBloco(wrapperEl) {
  const container = criarContainerHTML();
  container.appendChild(wrapperEl);
  document.body.appendChild(container);

  // força layout antes de capturar
  container.offsetHeight;

  const canvas = await window.html2canvas(container, HC_OPTS);
  document.body.removeChild(container);
  return canvas;
}

const MARGEM_MM = 20;
const PAGE_W_MM = 210;
const PAGE_H_MM = 297;
const USABLE_W_MM = PAGE_W_MM - 2 * MARGEM_MM;
const USABLE_H_MM = PAGE_H_MM - 2 * MARGEM_MM;
const RENDER_W_PX = 794;

function canvasHeightToMM(canvas) {
  return (canvas.height / canvas.width) * USABLE_W_MM;
}

function adicionarRodape(doc) {
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Trilha EJA-EPT | ProfEPT | IFC Campus Blumenau", PAGE_W_MM / 2, PAGE_H_MM - 12, { align: "center" });
}

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;
  if (!jsPDF || !html2canvas) { alert("PDF não disponível. Tente novamente."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  // ── Cabeçalho (página 1) ──
  const headerEl = criarContainerHTML();
  const tituloEl = document.createElement("h1");
  tituloEl.style.cssText = "font-size:16px;font-weight:bold;color:#E86826;text-align:center;margin:0 0 4px 0;padding:0;";
  tituloEl.textContent = "Guia do Educador — Trilha EJA-EPT";
  headerEl.appendChild(tituloEl);

  const subtituloP = document.createElement("p");
  subtituloP.style.cssText = "font-size:11px;color:#666;text-align:center;margin:0 0 16px 0;padding:0;";
  subtituloP.textContent = "Orientações pedagógicas para o uso do Trilha EJA-EPT em sala";
  headerEl.appendChild(subtituloP);

  const hrEl = document.createElement("hr");
  hrEl.style.cssText = "border:none;border-top:1px solid #ccc;margin:0 0 16px 0;";
  headerEl.appendChild(hrEl);

  const citacaoEl = document.createElement("p");
  citacaoEl.style.cssText = "font-size:12px;font-style:italic;color:#444;text-align:center;margin:0 0 10px 0;padding:0;";
  citacaoEl.textContent = '"Para educadores que compreendem que ensinar na EJA é um ato político de esperança ativa."';
  headerEl.appendChild(citacaoEl);

  const aberturaEl = document.createElement("p");
  aberturaEl.style.cssText = "font-size:11px;color:#222;margin:0 0 0 0;padding:0;";
  aberturaEl.textContent = "Bem-vindo(a)! Este espaço reúne orientações fundamentadas na pesquisa Projeto de vida na EJA-EPT: perspectivas de continuidade dos estudos e inserção no mundo do trabalho, desenvolvida no ProfEPT/IFC Campus Blumenau. O objetivo é apoiar você no uso crítico e transformador do Trilha EJA-EPT em sala de aula, reconhecendo as especificidades do estudante-trabalhador e a dimensão política da educação de jovens e adultos.";
  headerEl.appendChild(aberturaEl);

  document.body.appendChild(headerEl);
  headerEl.offsetHeight;
  const headerCanvas = await html2canvas(headerEl, HC_OPTS);
  document.body.removeChild(headerEl);

  // Posiciona cabeçalho na página 1
  const headerH = canvasHeightToMM(headerCanvas);
  doc.addImage(headerCanvas.toDataURL("image/png"), "PNG", MARGEM_MM, MARGEM_MM, USABLE_W_MM, headerH);
  adicionarRodape(doc);

  let cursorY = MARGEM_MM + headerH + 6; // 6mm de espaço após cabeçalho

  // ── Blocos (unidades indivisíveis) ──
  const blocos = conteudoPDF.filter(c => c.tipo === "bloco");
  for (const bloco of blocos) {
    const wrapper = blocoParaHTML(bloco);
    const canvas = await renderizarBloco(wrapper);
    const blocoH = canvasHeightToMM(canvas);

    // Se não couber na página atual, vai para a próxima
    if (cursorY + blocoH > MARGEM_MM + USABLE_H_MM) {
      doc.addPage();
      adicionarRodape(doc);
      cursorY = MARGEM_MM;
    }

    doc.addImage(canvas.toDataURL("image/png"), "PNG", MARGEM_MM, cursorY, USABLE_W_MM, blocoH);
    cursorY += blocoH + 2; // 2mm entre blocos
  }

  // ── Roteiro ──
  const roteiroWrapper = roteiroParaHTML();
  const roteiroCanvas = await renderizarBloco(roteiroWrapper);
  const roteiroH = canvasHeightToMM(roteiroCanvas);

  if (cursorY + roteiroH > MARGEM_MM + USABLE_H_MM) {
    doc.addPage();
    adicionarRodape(doc);
    cursorY = MARGEM_MM;
  }

  doc.addImage(roteiroCanvas.toDataURL("image/png"), "PNG", MARGEM_MM, cursorY, USABLE_W_MM, roteiroH);
  adicionarRodape(doc);

  doc.save("guia-do-educador-trilha-eja-ept.pdf");
}

export default function ParaOEducador() {
  const pdfRef = useRef(null);
  const [loading, setLoading] = useState(false);
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

  const handleDownload = async () => {
    setLoading(true);
    await generatePDF();
    setLoading(false);
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

        {/* Seção: Materiais para Aprofundar e Imprimir */}
        <div className="mt-6 pt-4 border-t border-border">
          <h2 className="font-extrabold text-base mb-2">📥 Materiais para Aprofundar e Imprimir</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Os blocos acima trazem a base teórica e prática para o uso do aplicativo em sala. Para um estudo mais aprofundado ou para levar para sua formação continuada, disponibilizamos os materiais completos abaixo.
          </p>

          {/* Card 1 — Guia Completo */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📘</span>
              <div>
                <h3 className="font-bold text-sm">Guia Completo do Educador</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Versão para impressão com todos os fundamentos teóricos e o roteiro de 6 encontros.</p>
              </div>
            </div>
            <a
              href="https://trilha-eja.github.io/materiais/OrientacoesPedagogicas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              ⬇️ Baixar e Imprimir
            </a>
          </div>

          {/* Card 2 — Arco de Maguerez */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <h3 className="font-bold text-sm">Arco de Maguerez — Projeto de Vida</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Estudo de caso aplicando a metodologia da problematização à realidade da EJA-EPT.</p>
              </div>
            </div>
            <a
              href="https://trilha-eja.github.io/materiais/ArcodeMaguerez.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              ⬇️ Baixar e Imprimir
            </a>
          </div>

          {/* Card 3 — Plano de Aula */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-3 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-bold text-sm">Plano de Aula — Arco de Maguerez</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Roteiro prático para aplicar o Arco de Maguerez em sala, complementar ao estudo de caso acima.</p>
              </div>
            </div>
            <a
              href="https://trilha-eja.github.io/materiais/PlanodeAulaMaguerez.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
            >
              ⬇️ Baixar e Imprimir
            </a>
          </div>

          <p className="text-xs text-muted-foreground italic mt-1">
            💡 Os dois materiais acima foram pensados para uso conjunto.
          </p>
        </div>

      </div>

      <div ref={pdfRef} style={{ display: "none" }} />
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