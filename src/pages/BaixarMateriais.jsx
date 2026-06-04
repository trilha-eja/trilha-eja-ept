import PageHeader from "../components/PageHeader";
import { Download } from "lucide-react";

// ── Gerador: Mapa da Vida para imprimir ─────────────────────────────────────
function gerarMapaVida() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert("PDF nao disponivel."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  const W = 297, H = 210;
  const cor = "#E86826";

  // Fundo creme
  doc.setFillColor(255, 248, 240);
  doc.rect(0, 0, W, H, "F");

  // Título
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(232, 104, 38);
  doc.text("Mapa da Vida - Para Preencher a Mao", W / 2, 16, { align: "center" });

  // Subtítulo
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text("Trilha EJA-EPT", W / 2, 23, { align: "center" });

  // Nome e Data
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text("Nome: _________________________________   Data: ___________", W / 2, 31, { align: "center" });

  // ── TRILHA HORIZONTAL ──
  const trilhaY = 105;
  const trilhaH = 10;
  const xIni = 18, xFim = 279;

  // Trilha fundo
  doc.setFillColor(196, 149, 106);
  doc.roundedRect(xIni, trilhaY - trilhaH / 2, xFim - xIni, trilhaH, 4, 4, "F");

  // Linha tracejada no meio
  doc.setDrawColor(255, 248, 240);
  doc.setLineWidth(0.5);
  doc.setLineDash([4, 3]);
  doc.line(xIni + 8, trilhaY, xFim - 8, trilhaY);
  doc.setLineDash([]);

  // Ponto de partida
  doc.setFillColor(232, 104, 38);
  doc.circle(xIni, trilhaY, 7, "F");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("HOJE", xIni, trilhaY + 0.5, { align: "center" });
  doc.setTextColor(232, 104, 38);
  doc.setFontSize(8);
  doc.text("Ponto de Partida", xIni, trilhaY + 11, { align: "center" });

  // Estrela final
  doc.setFontSize(16);
  doc.setTextColor(232, 104, 38);
  doc.text("*", xFim, trilhaY + 1, { align: "center" });
  doc.setFontSize(8);
  doc.text("Seu futuro", xFim, trilhaY + 11, { align: "center" });

  // Marcos
  const marcos = [
    { label: "1 ano",   x: xIni + (xFim - xIni) * 0.28 },
    { label: "5 anos",  x: xIni + (xFim - xIni) * 0.56 },
    { label: "10 anos", x: xIni + (xFim - xIni) * 0.82 },
  ];
  marcos.forEach(({ label, x }) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(232, 104, 38);
    doc.setLineWidth(0.8);
    doc.circle(x, trilhaY, 5.5, "FD");
    doc.setFontSize(6);
    doc.setTextColor(232, 104, 38);
    doc.setFont("helvetica", "bold");
    doc.text(label, x, trilhaY + 0.5, { align: "center" });
  });

  // Eixos
  const eixosAcima = [
    { emoji: "Trabalho",       gap: 1 },
    { emoji: "Estudos",        gap: 2 },
    { emoji: "Familia",        gap: 3 },
  ];
  const eixosAbaixo = [
    { emoji: "Eu Mesmo",       gap: 1 },
    { emoji: "Vida Material",  gap: 2 },
    { emoji: "Comunidade",     gap: 3 },
  ];
  const branchGap = 15;
  const lineLen = 28;

  doc.setFont("helvetica", "normal");

  marcos.forEach(({ x }) => {
    // Acima
    eixosAcima.forEach(({ emoji, gap }) => {
      const ty = trilhaY - trilhaH / 2 - gap * branchGap;
      // linha vertical
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.4);
      doc.line(x, trilhaY - trilhaH / 2, x, ty + 3);
      // círculo
      doc.setFillColor(232, 104, 38);
      doc.circle(x, ty, 3, "F");
      // label
      doc.setFontSize(6);
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "bold");
      doc.text(emoji, x, ty - 4.5, { align: "center" });
      // linha para escrever
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);
      doc.line(x - lineLen / 2, ty - 10, x + lineLen / 2, ty - 10);
    });

    // Abaixo
    eixosAbaixo.forEach(({ emoji, gap }) => {
      const ty = trilhaY + trilhaH / 2 + gap * branchGap;
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.4);
      doc.line(x, trilhaY + trilhaH / 2, x, ty - 3);
      doc.setFillColor(232, 104, 38);
      doc.circle(x, ty, 3, "F");
      doc.setFontSize(6);
      doc.setTextColor(80, 80, 80);
      doc.setFont("helvetica", "bold");
      doc.text(emoji, x, ty + 6, { align: "center" });
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);
      doc.line(x - lineLen / 2, ty + 11, x + lineLen / 2, ty + 11);
    });
  });

  // Legenda eixos
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(80, 80, 80);
  const legendas = ["Trabalho", "Estudos", "Familia", "Eu Mesmo", "Vida Material", "Comunidade"];
  legendas.forEach((l, i) => {
    doc.text(`• ${l}`, 4, 40 + i * 8);
  });

  // Rodapé
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Trilha EJA-EPT | ProfEPT", W / 2, H - 5, { align: "center" });

  doc.save("mapa-da-vida-para-preencher.pdf");
}

// ── Gerador: Cartilha de Direitos ───────────────────────────────────────────
function gerarDireitos() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert("PDF nao disponivel."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const W = 210;
  let y = 20;

  // Cabeçalho
  doc.setFillColor(232, 104, 38);
  doc.rect(0, 0, W, 35, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Seus Direitos Trabalhistas", W / 2, 16, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Conhecer seus direitos e poder", W / 2, 26, { align: "center" });

  y = 48;

  const direitos = [
    {
      titulo: "Carteira Assinada (CTPS)",
      base: "CLT Art. 29 e 47",
      texto: "O empregador e obrigado a assinar sua carteira em ate 5 dias uteis apos a admissao. Trabalhar sem carteira assinada e ilegal. Voce pode denunciar ao Ministerio do Trabalho.",
    },
    {
      titulo: "Salario Minimo",
      base: "CF/88 Art. 7o IV",
      texto: "Nenhum trabalhador pode receber menos que o salario minimo nacional. Em 2024, o valor e R$ 1.412,00. Acordos coletivos podem fixar pisos maiores.",
    },
    {
      titulo: "Ferias Remuneradas",
      base: "CLT Art. 129 e 145",
      texto: "Apos 12 meses de trabalho, voce tem direito a 30 dias de ferias remuneradas com adicional de 1/3 do salario. Ferias nao tiradas devem ser pagas em dobro.",
    },
    {
      titulo: "13o Salario",
      base: "Lei 4.090/1962",
      texto: "Todo trabalhador com carteira assinada tem direito ao 13o salario. E pago em duas parcelas: ate 30/novembro e ate 20/dezembro. Proporcional se trabalhou menos de 12 meses.",
    },
    {
      titulo: "Jornada de Trabalho",
      base: "CLT Art. 59",
      texto: "Maximo de 8 horas por dia e 44 horas semanais. Horas extras devem ser pagas com adicional minimo de 50%. Limite de 2 horas extras por dia.",
    },
    {
      titulo: "FGTS",
      base: "Lei 8.036/1990 Art. 15",
      texto: "O empregador deposita 8% do seu salario mensalmente no FGTS. Voce pode sacar em caso de demissao sem justa causa, aposentadoria, doenca grave ou compra da casa propria.",
    },
    {
      titulo: "Seguro Desemprego",
      base: "Lei 7.998/1990",
      texto: "Trabalhadores demitidos sem justa causa e com pelo menos 12 meses de emprego tem direito ao seguro desemprego. Solicite em ate 120 dias apos a demissao.",
    },
    {
      titulo: "NR-10 — Seguranca Eletrica",
      base: "Portaria MTE 598/2004",
      texto: "A NR-10 garante seguranca a eletricistas. O empregador DEVE fornecer EPIs (luvas, oculos, botinas isolantes), treinamento certificado e equipamentos adequados. Sem EPI, recuse o trabalho — e seu direito!",
    },
  ];

  direitos.forEach((d) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    // Card fundo
    doc.setFillColor(255, 248, 240);
    doc.setDrawColor(232, 104, 38);
    doc.setLineWidth(0.3);
    doc.roundedRect(14, y, W - 28, 36, 3, 3, "FD");

    // Badge base legal
    doc.setFillColor(232, 104, 38);
    doc.roundedRect(W - 14 - 48, y + 3, 48, 7, 2, 2, "F");
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(d.base, W - 14 - 24, y + 7.5, { align: "center" });

    // Título
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 60);
    doc.text(d.titulo, 19, y + 9);

    // Texto
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 90);
    const linhas = doc.splitTextToSize(d.texto, W - 40);
    doc.text(linhas, 19, y + 16);

    y += 41;
  });

  // Rodapé
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Trilha EJA-EPT | ProfEPT", W / 2, 290, { align: "center" });

  doc.save("direitos-trabalhistas.pdf");
}

// ── Gerador: Checklist ENEM/SISU/PROUNI ────────────────────────────────────
function gerarChecklist() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert("PDF nao disponivel."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const W = 210;
  let y = 20;

  // Cabeçalho
  doc.setFillColor(91, 173, 111);
  doc.rect(0, 0, W, 35, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Checklist - Caminhos de Estudo", W / 2, 16, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Nao perca nenhum prazo", W / 2, 26, { align: "center" });

  y = 45;

  const secoes = [
    {
      titulo: "ENEM",
      cor: [232, 104, 38],
      itens: [
        "Verificar periodo de inscricoes (maio/junho - enem.inep.gov.br)",
        "Verificar se tem direito a isencao",
        "Pagar a taxa (R$ 85 aprox.)",
        "Confirmar local de prova",
        "Levar documento com foto no dia da prova",
      ],
    },
    {
      titulo: "SISU",
      cor: [91, 173, 111],
      itens: [
        "Aguardar divulgacao das notas do ENEM (janeiro/fevereiro)",
        "Acessar sisu.mec.gov.br",
        "Escolher ate 2 opcoes de curso",
        "Verificar nota de corte do curso desejado",
        "Fazer matricula na universidade se aprovado",
      ],
    },
    {
      titulo: "PROUNI",
      cor: [74, 144, 217],
      itens: [
        "Acessar prouniportal.mec.gov.br",
        "Verificar renda familiar (integral: ate 1,5 sal. minimo / parcial: ate 3 sal.)",
        "Escolher ate 2 opcoes de curso",
        "Separar RG e CPF",
        "Separar comprovante de renda",
        "Separar comprovante de endereco",
        "Separar historico escolar",
      ],
    },
  ];

  secoes.forEach((s) => {
    if (y > 240) { doc.addPage(); y = 20; }

    // Titulo seção
    doc.setFillColor(...s.cor);
    doc.roundedRect(14, y, W - 28, 11, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text(s.titulo, W / 2, y + 7.5, { align: "center" });
    y += 15;

    s.itens.forEach((item) => {
      if (y > 270) { doc.addPage(); y = 20; }
      // Checkbox
      doc.setDrawColor(...s.cor);
      doc.setLineWidth(0.5);
      doc.rect(18, y - 3.5, 5, 5);
      // Texto
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const linhas = doc.splitTextToSize(item, W - 44);
      doc.text(linhas, 27, y);
      y += linhas.length * 5 + 2;
    });

    y += 8;
  });

  // Rodapé
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Trilha EJA-EPT | ProfEPT", W / 2, 290, { align: "center" });

  doc.save("checklist-enem-sisu-prouni.pdf");
}

// ── Gerador: Glossário ──────────────────────────────────────────────────────
function gerarGlossario() {
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { alert("PDF nao disponivel."); return; }

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const W = 210;
  let y = 20;

  // Cabeçalho
  doc.setFillColor(74, 144, 217);
  doc.rect(0, 0, W, 35, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("Glossario do Eletricista", W / 2, 16, { align: "center" });
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Termos tecnicos em linguagem simples", W / 2, 26, { align: "center" });

  y = 44;

  const termos = [
    { term: "FASE", emoji: "⚡", simple: "O fio que carrega a eletricidade", detail: "E o fio 'vivo' do circuito. Geralmente preto, vermelho ou marrom. Nunca toque sem desligar o disjuntor! Tensao: 127V ou 220V.", tip: "Fio vermelho ou preto = PERIGO, e o fase!" },
    { term: "NEUTRO", emoji: "", simple: "O fio de retorno da energia", detail: "Ele completa o circuito, permitindo que a corrente 'volte' apos passar pela carga. Geralmente azul. Sem tensao, mas ainda perigoso!", tip: "Fio azul = NEUTRO. Sem tensao, mas cuidado!" },
    { term: "TERRA", emoji: "", simple: "O fio de seguranca que protege voce", detail: "Conectado diretamente ao chao. Se houver vazamento de energia, conduz a corrente para o solo, evitando choque.", tip: "Fio verde = TERRA. Sua protecao!" },
    { term: "DISJUNTOR", emoji: "", simple: "O guarda-costas do circuito", detail: "Fica no quadro de distribuicao. Quando passa corrente demais ou ha curto-circuito, desliga automaticamente para proteger.", tip: "Se o disjuntor caiu: descubra o porque antes de religar!" },
    { term: "CURTO-CIRCUITO", emoji: "", simple: "Quando a eletricidade toma um atalho perigoso", detail: "Acontece quando o fio fase toca o neutro sem passar por nenhuma carga. Gera calor, faisca e risco de incendio.", tip: "Faisca + disjuntor caindo = sinal de curto! Chame um tecnico." },
    { term: "TENSAO (VOLTAGEM)", emoji: "", simple: "A pressao que empurra a eletricidade", detail: "Medida em Volts (V). No Brasil: 127V ou 220V. Sempre confira a tensao antes de ligar um aparelho!", tip: "127V ou 220V - sempre confira!" },
    { term: "CORRENTE (AMPERAGEM)", emoji: "", simple: "A quantidade de eletricidade que flui", detail: "Medida em Amperes (A). Fios tem limite de corrente - passar mais que isso aquece e pode causar incendio.", tip: "Amperagem alta = fio mais grosso necessario!" },
    { term: "RESISTENCIA", emoji: "", simple: "O quanto algo dificulta a passagem da eletricidade", detail: "Medida em Ohms. Fios finos tem mais resistencia. Quando corrente passa por resistencia, gera calor.", tip: "Quanto mais fio, mais resistencia. Use o minimo!" },
    { term: "POTENCIA", emoji: "", simple: "Quanto de energia um aparelho usa", detail: "Medida em Watts (W). A conta de luz e em kWh. Um chuveiro eletrico usa ~5.500W - o aparelho mais 'guloso'!", tip: "W = V x A. Quanto maior o W, mais energia consome!" },
    { term: "ATERRAMENTO", emoji: "", simple: "Ligar a instalacao a terra para seguranca", detail: "Conecta partes metalicas ao solo. Se houver falha eletrica, a energia vai para a terra, nao para voce. Obrigatorio (NBR 5410).", tip: "Sem aterramento = risco de choque. Exija aterramento!" },
    { term: "DISJUNTOR DR", emoji: "", simple: "O protetor que salva vidas de choques", detail: "Detecta pequenas fugas de corrente - inclusive pelo corpo humano - e desliga em milissegundos.", tip: "DR no banheiro e cozinha = protecao essencial!" },
    { term: "SOBRECARGA", emoji: "", simple: "Quando passa mais energia do que o fio aguenta", detail: "Ocorre com aparelhos demais num mesmo circuito. O fio esquenta, pode derreter o isolamento e causar incendio.", tip: "Nao use benjamins! Distribua os aparelhos." },
    { term: "MULTIMETRO", emoji: "", simple: "O instrumento que le a eletricidade", detail: "Mede tensao (V), corrente (A) e resistencia. E a ferramenta mais importante do eletricista.", tip: "Todo eletricista tem um multimetro. E seu melhor amigo!" },
    { term: "EPI", emoji: "", simple: "Equipamento que protege seu corpo no trabalho", detail: "EPI = Equipamento de Protecao Individual. Luvas isolantes, oculos, capacete, botina isolante e roupa anti-chama. A empresa DEVE fornecer gratuitamente.", tip: "Sem EPI, nao trabalhe. E seu direito e e sua vida!" },
  ];

  // Dois por linha
  const colW = (W - 28) / 2;
  let col = 0;

  termos.forEach((t) => {
    const xBase = col === 0 ? 14 : 14 + colW + 4;
    const cardH = 34;

    if (y + cardH > 275) {
      if (col === 1) { col = 0; y += cardH + 4; }
      else { doc.addPage(); y = 20; col = 0; }
    }

    doc.setFillColor(245, 248, 255);
    doc.setDrawColor(180, 200, 230);
    doc.setLineWidth(0.3);
    doc.roundedRect(xBase, y, colW, cardH, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(74, 144, 217);
    doc.text(t.term, xBase + 3, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(60, 60, 60);
    const simLines = doc.splitTextToSize(t.simple, colW - 6);
    doc.text(simLines, xBase + 3, y + 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(100, 100, 100);
    const detLines = doc.splitTextToSize(t.detail, colW - 6);
    const maxLines = detLines.slice(0, 3);
    doc.text(maxLines, xBase + 3, y + 12 + simLines.length * 4 + 2);

    if (col === 0) {
      col = 1;
    } else {
      col = 0;
      y += cardH + 4;
    }
  });

  if (col === 1) y += 34 + 4; // flush última linha se ímpar

  // Rodapé
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Trilha EJA-EPT | ProfEPT", W / 2, 290, { align: "center" });

  doc.save("glossario-eletricista.pdf");
}

// ── Gerador: Guia do Educador (delegado para ParaOEducador) ─────────────────
function gerarGuiaEducador() {
  // Redireciona para o módulo que já tem a geração funcionando
  window.location.href = "/educador";
}

// ── Lista de materiais ───────────────────────────────────────────────────────
const materiais = [
  {
    emoji: "🗺️",
    titulo: "Mapa da Vida — Versão para Imprimir",
    descricao: "Versão em papel do Mapa da Vida com espaços para escrever à mão suas metas de 1, 5 e 10 anos.",
    cor: "bg-orange-50 border-orange-200",
    gerar: gerarMapaVida,
  },
  {
    emoji: "🛡️",
    titulo: "Cartilha de Direitos Trabalhistas",
    descricao: "Seus direitos garantidos por lei, em linguagem simples. Inclui CLT, NR-10 e dicas para se proteger.",
    cor: "bg-blue-50 border-blue-200",
    gerar: gerarDireitos,
  },
  {
    emoji: "📋",
    titulo: "Checklist ENEM/SISU/PROUNI",
    descricao: "Lista de documentos e prazos para não perder nenhuma oportunidade de continuar estudando.",
    cor: "bg-green-50 border-green-200",
    gerar: gerarChecklist,
  },
  {
    emoji: "⚡",
    titulo: "Glossário do Eletricista — Versão para Imprimir",
    descricao: "Todos os termos técnicos em linguagem simples, formatados para colar no caderno ou na parede da oficina.",
    cor: "bg-yellow-50 border-yellow-200",
    gerar: gerarGlossario,
  },
  {
    emoji: "📚",
    titulo: "Guia do Educador (PDF Completo)",
    descricao: "Para professores: orientações pedagógicas para uso do Trilha EJA-EPT em perspectiva emancipatória.",
    cor: "bg-purple-50 border-purple-200",
    gerar: gerarGuiaEducador,
  },
];

// ── Componente principal ─────────────────────────────────────────────────────
export default function BaixarMateriais() {
  return (
    <div>
      <PageHeader title="Baixar Materiais" backTo="/" />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Hero */}
        <div className="text-center space-y-2 pb-2">
          <span className="text-5xl block">📥</span>
          <h2 className="text-xl font-extrabold">Materiais para Baixar e Imprimir</h2>
          <p className="text-sm text-muted-foreground italic">
            "Porque aprender também funciona no papel."
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {materiais.map((m) => (
            <div
              key={m.titulo}
              className={`border rounded-2xl p-4 flex items-start gap-4 ${m.cor}`}
            >
              <span className="text-3xl shrink-0 mt-0.5">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-snug mb-1">{m.titulo}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{m.descricao}</p>
                <button
                  onClick={m.gerar}
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  ⬇️ Baixar PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Nota */}
        <div className="bg-muted/60 border border-border rounded-2xl px-4 py-4 text-xs text-muted-foreground leading-relaxed text-center">
          📄 Todos os materiais são gratuitos e podem ser reproduzidos para fins educacionais não-comerciais, desde que mantida a referência ao <strong>Trilha EJA-EPT / IFC</strong>.
        </div>
      </div>
    </div>
  );
}