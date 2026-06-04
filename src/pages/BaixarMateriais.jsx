import { useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Download } from "lucide-react";

// ── Utilitário: html2canvas → jsPDF ─────────────────────────────────────────
async function htmlToPDF(el, filename, orientation = "portrait") {
  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;
  if (!jsPDF || !html2canvas) { alert("PDF não disponível. Tente novamente."); return; }

  el.style.display = "block";
  await new Promise((r) => setTimeout(r, 150));

  // Para landscape (Mapa), capturar exatamente a div interna de altura fixa
  const innerEl = orientation === "landscape" ? el.firstElementChild : el;
  const captureH = orientation === "landscape" ? 794 : undefined;

  const canvas = await html2canvas(innerEl, {
    scale: 2,
    useCORS: true,
    backgroundColor: orientation === "landscape" ? "#FFF8F0" : "#ffffff",
    windowWidth: orientation === "landscape" ? 1122 : 794,
    width: orientation === "landscape" ? 1122 : undefined,
    height: captureH,
  });

  el.style.display = "none";

  const imgData = canvas.toDataURL("image/png");
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation });

  const pageW = orientation === "landscape" ? 297 : 210;
  const pageH = orientation === "landscape" ? 210 : 297;
  const imgW = pageW;
  const imgH = (canvas.height * pageW) / canvas.width;

  let position = 0;
  let remaining = imgH;
  while (remaining > 0) {
    doc.addImage(imgData, "PNG", 0, position, imgW, imgH);
    remaining -= pageH;
    if (remaining > 0) { doc.addPage(); position -= pageH; }
  }

  doc.save(filename);
}

// ── Templates HTML ocultos ───────────────────────────────────────────────────

function TemplateMapa({ refEl }) {
  // Eixos acima: índice 0 = mais próximo da trilha (Trabalho), índice 2 = mais longe (Família)
  const eixosAcima = [
    { cor: "#E86826", label: "🔧 Trabalho" },
    { cor: "#4A90D9", label: "📚 Estudos" },
    { cor: "#5BAD6F", label: "👨‍👩‍👧 Família" },
  ];
  // Eixos abaixo: índice 0 = mais próximo da trilha (Eu Mesmo), índice 2 = mais longe (Comunidade)
  const eixosAbaixo = [
    { cor: "#9B59B6", label: "🌟 Eu Mesmo" },
    { cor: "#F0A500", label: "🏠 Vida Material" },
    { cor: "#E74C6C", label: "🤝 Comunidade" },
  ];
  const marcos = ["1 ano", "5 anos", "10 anos"];

  // Layout: trilha no centro vertical da área de conteúdo
  // Área de conteúdo: y=120 até y=750 (630px de altura)
  // Trilha: y=380 (centro aproximado)
  const TRILHA_Y = 370;
  const TRILHA_H = 36;
  const GAP = 52; // espaçamento mínimo entre eixos (≥50px)
  const LABEL_H = 28; // altura de cada bloco de label + linha

  return (
    <div ref={refEl} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
      <div style={{
        width: "1122px",
        height: "794px",
        backgroundColor: "#FFF8F0",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>
        {/* Cabeçalho */}
        <div style={{ textAlign: "center", paddingTop: "22px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#E86826", margin: "0 0 4px 0" }}>
            Mapa da Vida — Para Preencher à Mão
          </h1>
          <p style={{ fontSize: "12px", color: "#888", margin: "0 0 6px 0" }}>Trilha EJA-EPT</p>
          <p style={{ fontSize: "11px", color: "#555", margin: 0 }}>
            Nome: _________________________ &nbsp;&nbsp;&nbsp; Data: ___________
          </p>
        </div>

        {/* Trilha horizontal */}
        <div style={{
          position: "absolute",
          left: "100px", right: "100px",
          top: `${TRILHA_Y}px`,
          height: `${TRILHA_H}px`,
          backgroundColor: "#C4956A",
          borderRadius: "18px",
        }} />

        {/* Ponto Hoje */}
        <div style={{ position: "absolute", left: "40px", top: `${TRILHA_Y - 12}px`, textAlign: "center", width: "60px" }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "50%",
            backgroundColor: "#E86826", display: "flex", alignItems: "center",
            justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "11px",
          }}>Hoje</div>
          <div style={{ fontSize: "9px", color: "#E86826", marginTop: "3px" }}>Ponto de Partida</div>
        </div>

        {/* Estrela futuro */}
        <div style={{ position: "absolute", right: "30px", top: `${TRILHA_Y - 12}px`, textAlign: "center", width: "60px" }}>
          <div style={{ fontSize: "30px", lineHeight: 1 }}>⭐</div>
          <div style={{ fontSize: "9px", color: "#E86826", marginTop: "2px" }}>Seu futuro</div>
        </div>

        {/* Marcos + ramificações */}
        {[230, 530, 810].map((marcoLeft, mi) => {
          const cx = marcoLeft + 18;
          return (
            <div key={mi}>
              {/* Círculo marco */}
              <div style={{
                position: "absolute",
                left: `${marcoLeft}px`,
                top: `${TRILHA_Y}px`,
                width: "36px", height: "36px",
                borderRadius: "50%",
                backgroundColor: "white",
                border: "2.5px solid #E86826",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "7px", fontWeight: "bold", color: "#E86826",
                textAlign: "center", lineHeight: "1.1",
                zIndex: 2,
              }}>{marcos[mi]}</div>

              {/* ACIMA: eixo 0 = mais próximo (Trabalho), eixo 2 = mais longe (Família) */}
              {eixosAcima.map((e, ei) => {
                // ei=0 → mais próximo da trilha → menor distância
                const blockY = TRILHA_Y - TRILHA_H / 2 - (ei + 1) * GAP - LABEL_H;
                const lineStartY = TRILHA_Y - TRILHA_H / 2;
                const lineEndY = blockY + LABEL_H + 4;
                return (
                  <div key={ei}>
                    {/* Linha vertical */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 1}px`,
                      top: `${lineEndY}px`,
                      width: "2px",
                      height: `${lineStartY - lineEndY}px`,
                      backgroundColor: e.cor,
                    }} />
                    {/* Círculo no ponto de conexão */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 5}px`,
                      top: `${lineEndY - 5}px`,
                      width: "10px", height: "10px",
                      borderRadius: "50%",
                      backgroundColor: e.cor,
                    }} />
                    {/* Label + linha para escrever */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 58}px`,
                      top: `${blockY}px`,
                      width: "116px",
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: "8px", fontWeight: "bold", color: e.cor, marginBottom: "4px" }}>{e.label}</div>
                      <div style={{ borderBottom: `1.5px solid ${e.cor}`, color: "#ccc", fontSize: "9px" }}>________________________</div>
                    </div>
                  </div>
                );
              })}

              {/* ABAIXO: eixo 0 = mais próximo (Eu Mesmo), eixo 2 = mais longe (Comunidade) */}
              {eixosAbaixo.map((e, ei) => {
                const blockY = TRILHA_Y + TRILHA_H / 2 + (ei + 1) * GAP;
                const lineStartY = TRILHA_Y + TRILHA_H / 2;
                const lineEndY = blockY - 6;
                return (
                  <div key={ei}>
                    {/* Linha vertical */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 1}px`,
                      top: `${lineStartY}px`,
                      width: "2px",
                      height: `${lineEndY - lineStartY}px`,
                      backgroundColor: e.cor,
                    }} />
                    {/* Círculo */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 5}px`,
                      top: `${lineEndY}px`,
                      width: "10px", height: "10px",
                      borderRadius: "50%",
                      backgroundColor: e.cor,
                    }} />
                    {/* Label + linha para escrever */}
                    <div style={{
                      position: "absolute",
                      left: `${cx - 58}px`,
                      top: `${blockY + 6}px`,
                      width: "116px",
                      textAlign: "center",
                    }}>
                      <div style={{ borderBottom: `1.5px solid ${e.cor}`, color: "#ccc", fontSize: "9px", marginBottom: "4px" }}>________________________</div>
                      <div style={{ fontSize: "8px", fontWeight: "bold", color: e.cor }}>{e.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Rodapé */}
        <div style={{ position: "absolute", bottom: "8px", left: 0, right: 0, textAlign: "center" }}>
          <p style={{ fontSize: "9px", fontStyle: "italic", color: "#888", margin: "0 0 2px 0" }}>
            "Cada passo conta. Você já chegou até aqui."
          </p>
          <p style={{ fontSize: "8px", color: "#bbb", margin: 0 }}>Trilha EJA-EPT | ProfEPT</p>
        </div>
      </div>
    </div>
  );
}

function TemplateDireitos({ refEl }) {
  const direitos = [
    { titulo: "Carteira Assinada (CTPS)", base: "CLT Art. 29 e 47", texto: "O empregador é obrigado a assinar sua carteira em até 5 dias úteis após a admissão. Trabalhar sem carteira assinada é ilegal. Você pode denunciar ao Ministério do Trabalho." },
    { titulo: "Salário Mínimo", base: "CF/88 Art. 7º IV", texto: "Nenhum trabalhador pode receber menos que o salário mínimo nacional. Acordos coletivos podem fixar pisos maiores." },
    { titulo: "Férias Remuneradas", base: "CLT Art. 129 e 145", texto: "Após 12 meses de trabalho, você tem direito a 30 dias de férias remuneradas com adicional de 1/3 do salário. Férias não tiradas devem ser pagas em dobro." },
    { titulo: "13º Salário", base: "Lei 4.090/1962", texto: "Todo trabalhador com carteira assinada tem direito ao 13º salário. Pago em duas parcelas: até 30/novembro e até 20/dezembro. Proporcional se trabalhou menos de 12 meses." },
    { titulo: "Jornada de Trabalho", base: "CLT Art. 59", texto: "Máximo de 8 horas por dia e 44 horas semanais. Horas extras devem ser pagas com adicional mínimo de 50%. Limite de 2 horas extras por dia." },
    { titulo: "FGTS", base: "Lei 8.036/1990 Art. 15", texto: "O empregador deposita 8% do seu salário mensalmente no FGTS. Você pode sacar em caso de demissão sem justa causa, aposentadoria, doença grave ou compra da casa própria." },
    { titulo: "Seguro Desemprego", base: "Lei 7.998/1990", texto: "Trabalhadores demitidos sem justa causa e com pelo menos 12 meses de emprego têm direito ao seguro desemprego. Solicite em até 120 dias após a demissão." },
    { titulo: "NR-10 — Segurança Elétrica", base: "Portaria MTE 598/2004", texto: "A NR-10 garante segurança a eletricistas. O empregador DEVE fornecer EPIs (luvas, óculos, botinas isolantes), treinamento certificado e equipamentos adequados. Sem EPI, recuse o trabalho — é seu direito!" },
  ];
  return (
    <div ref={refEl} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
      <div style={{ width: "794px", backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif", boxSizing: "border-box" }}>
        {/* Header */}
        <div style={{ backgroundColor: "#E86826", padding: "28px 40px 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "white", margin: "0 0 6px 0" }}>Seus Direitos Trabalhistas</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0 }}>Conhecer seus direitos é poder</p>
        </div>
        <div style={{ padding: "24px 40px 40px" }}>
          {direitos.map((d, i) => (
            <div key={i} style={{
              backgroundColor: "#FFF8F0",
              border: "1px solid #E86826",
              borderRadius: "8px",
              padding: "14px 16px",
              marginBottom: "14px",
              position: "relative",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px", gap: "8px" }}>
                <h3 style={{ fontSize: "13px", fontWeight: "bold", color: "#333", margin: 0, flexShrink: 0 }}>{d.titulo}</h3>
                <span style={{ fontSize: "9px", backgroundColor: "#E86826", color: "white", padding: "3px 4px", borderRadius: "6px", lineHeight: "1.3", textAlign: "center", maxWidth: "110px", flexShrink: 0 }}>{d.base}</span>
              </div>
              <p style={{ fontSize: "11px", color: "#555", lineHeight: "1.6", margin: 0 }}>{d.texto}</p>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "12px", textAlign: "center", marginTop: "8px" }}>
            <p style={{ fontSize: "10px", color: "#aaa", margin: 0 }}>Trilha EJA-EPT | ProfEPT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateChecklist({ refEl }) {
  const secoes = [
    {
      titulo: "ENEM", cor: "#E86826",
      itens: [
        "Verificar período de inscrições (maio/junho — enem.inep.gov.br)",
        "Verificar se tem direito à isenção",
        "Pagar a taxa (R$ 85 aprox.)",
        "Confirmar local de prova",
        "Levar documento com foto no dia da prova",
      ],
    },
    {
      titulo: "SISU", cor: "#5BAD6F",
      itens: [
        "Aguardar divulgação das notas do ENEM (janeiro/fevereiro)",
        "Acessar sisu.mec.gov.br",
        "Escolher até 2 opções de curso",
        "Verificar nota de corte do curso desejado",
        "Fazer matrícula na universidade se aprovado",
      ],
    },
    {
      titulo: "PROUNI", cor: "#4A90D9",
      itens: [
        "Acessar prouniportal.mec.gov.br",
        "Verificar renda familiar (integral: até 1,5 sal. mínimo / parcial: até 3 sal.)",
        "Escolher até 2 opções de curso",
        "Separar RG e CPF",
        "Separar comprovante de renda",
        "Separar comprovante de endereço",
        "Separar histórico escolar",
      ],
    },
  ];
  return (
    <div ref={refEl} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
      <div style={{ width: "794px", backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif", boxSizing: "border-box" }}>
        <div style={{ backgroundColor: "#5BAD6F", padding: "28px 40px 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "white", margin: "0 0 6px 0" }}>Checklist — Caminhos de Estudo</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0 }}>Não perca nenhum prazo</p>
        </div>
        <div style={{ padding: "24px 40px 40px" }}>
          {secoes.map((s, si) => (
            <div key={si} style={{ marginBottom: "24px" }}>
              <div style={{ backgroundColor: s.cor, borderRadius: "8px", padding: "8px 16px", marginBottom: "12px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: "bold", color: "white", margin: 0 }}>{s.titulo}</h2>
              </div>
              {s.itens.map((item, ii) => (
                <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                  <div style={{
                    width: "16px", height: "16px", border: `2px solid ${s.cor}`,
                    borderRadius: "3px", flexShrink: 0, marginTop: "1px",
                  }} />
                  <p style={{ fontSize: "12px", color: "#444", margin: 0, lineHeight: "1.5" }}>{item}</p>
                </div>
              ))}
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "12px", textAlign: "center" }}>
            <p style={{ fontSize: "10px", color: "#aaa", margin: 0 }}>Trilha EJA-EPT | ProfEPT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateGlossario({ refEl }) {
  const termos = [
    { term: "FASE", emoji: "⚡", simple: "O fio que carrega a eletricidade", detail: "É o fio 'vivo' do circuito. Geralmente preto, vermelho ou marrom. Nunca toque sem desligar o disjuntor! Tensão: 127V ou 220V.", tip: "Fio vermelho ou preto = PERIGO, é o fase!" },
    { term: "NEUTRO", emoji: "🔵", simple: "O fio de retorno da energia", detail: "Ele completa o circuito, permitindo que a corrente 'volte' após passar pela carga. Geralmente azul. Sem tensão, mas ainda perigoso!", tip: "Fio azul = NEUTRO. Cuidado!" },
    { term: "TERRA", emoji: "🌱", simple: "O fio de segurança que protege você", detail: "Conectado ao chão. Se houver vazamento de energia, conduz a corrente para o solo, evitando choque. Obrigatório (NBR 5410).", tip: "Fio verde = TERRA. Sua proteção!" },
    { term: "DISJUNTOR", emoji: "🔲", simple: "O 'guarda-costas' do circuito", detail: "Quando passa corrente demais ou há curto-circuito, desliga automaticamente para proteger a fiação e evitar incêndios.", tip: "Se o disjuntor caiu: descubra o porquê antes de religar!" },
    { term: "CURTO-CIRCUITO", emoji: "💥", simple: "Quando a eletricidade toma um atalho perigoso", detail: "Acontece quando o fio fase toca o neutro sem passar por nenhuma carga. Gera calor, faísca e risco de incêndio.", tip: "Faísca + disjuntor caindo = sinal de curto! Chame um técnico." },
    { term: "TENSÃO (VOLTAGEM)", emoji: "🌊", simple: "A 'pressão' que empurra a eletricidade", detail: "Medida em Volts (V). No Brasil: 127V ou 220V. Sempre confira a tensão antes de ligar um aparelho!", tip: "127V ou 220V — sempre confira!" },
    { term: "CORRENTE (AMPERAGEM)", emoji: "🌊", simple: "A quantidade de eletricidade que flui", detail: "Medida em Ampères (A). Fios têm limite de corrente — passar mais do que isso aquece e pode causar incêndio.", tip: "Amperagem alta = fio mais grosso necessário!" },
    { term: "RESISTÊNCIA", emoji: "🌀", simple: "O quanto algo 'dificulta' a passagem da eletricidade", detail: "Medida em Ohms (Ω). Quando a corrente passa por uma resistência, gera calor — é assim que chuveiros funcionam!", tip: "Quanto mais fio, mais resistência. Use o mínimo!" },
    { term: "POTÊNCIA", emoji: "💪", simple: "Quanto de energia um aparelho usa ou produz", detail: "Medida em Watts (W). A conta de luz é em kWh. Um chuveiro elétrico usa ~5.500W!", tip: "W = V × A. Quanto maior o W, mais energia consome!" },
    { term: "ATERRAMENTO", emoji: "⏚", simple: "Ligar a instalação à terra para segurança", detail: "Conecta partes metálicas ao solo. Se houver falha elétrica, a energia vai para a terra, não para você.", tip: "Sem aterramento = risco de choque. Exija aterramento!" },
    { term: "DISJUNTOR DR", emoji: "🛡️", simple: "O protetor que salva vidas de choques", detail: "Detecta pequenas fugas de corrente — inclusive pelo corpo humano — e desliga em milissegundos.", tip: "DR no banheiro e cozinha = proteção essencial!" },
    { term: "SOBRECARGA", emoji: "🔥", simple: "Quando passa mais energia do que o fio aguenta", detail: "Ocorre com aparelhos demais num mesmo circuito. O fio esquenta, pode derreter o isolamento e causar incêndio.", tip: "Não use benjamins! Distribua os aparelhos." },
    { term: "MULTÍMETRO", emoji: "🔬", simple: "O instrumento que 'lê' a eletricidade", detail: "Mede tensão (V), corrente (A) e resistência (Ω). É a ferramenta mais importante do eletricista.", tip: "Todo eletricista tem um multímetro. É o seu melhor amigo!" },
    { term: "EPI", emoji: "🧤", simple: "Equipamento que protege seu corpo no trabalho", detail: "EPI = Equipamento de Proteção Individual. Luvas isolantes, óculos, capacete, botina isolante e roupa anti-chama. A empresa DEVE fornecer gratuitamente.", tip: "Sem EPI, não trabalhe. É seu direito e é sua vida!" },
  ];

  // dois por linha
  const pares = [];
  for (let i = 0; i < termos.length; i += 2) pares.push(termos.slice(i, i + 2));

  return (
    <div ref={refEl} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
      <div style={{ width: "794px", backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif", boxSizing: "border-box" }}>
        <div style={{ backgroundColor: "#4A90D9", padding: "28px 40px 20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "white", margin: "0 0 6px 0" }}>Glossário do Eletricista</h1>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0 }}>Termos técnicos em linguagem simples</p>
        </div>
        <div style={{ padding: "20px 32px 40px" }}>
          {pares.map((par, pi) => (
            <div key={pi} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              {par.map((t, ti) => (
                <div key={ti} style={{
                  flex: 1,
                  backgroundColor: "#F5F8FF",
                  border: "1px solid #B4C8E6",
                  borderRadius: "8px",
                  padding: "10px 12px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "16px" }}>{t.emoji}</span>
                    <span style={{ fontSize: "11px", fontWeight: "bold", color: "#4A90D9" }}>{t.term}</span>
                  </div>
                  <p style={{ fontSize: "10px", fontWeight: "bold", color: "#333", margin: "0 0 4px 0" }}>{t.simple}</p>
                  <p style={{ fontSize: "9.5px", color: "#666", lineHeight: "1.5", margin: "0 0 5px 0" }}>{t.detail}</p>
                  <p style={{ fontSize: "9px", fontStyle: "italic", color: "#888", margin: 0 }}>💡 {t.tip}</p>
                </div>
              ))}
              {par.length === 1 && <div style={{ flex: 1 }} />}
            </div>
          ))}
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "12px", textAlign: "center", marginTop: "8px" }}>
            <p style={{ fontSize: "10px", color: "#aaa", margin: 0 }}>Trilha EJA-EPT | ProfEPT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateGuiaEducador({ refEl }) {
  return (
    <div ref={refEl} style={{ display: "none", position: "fixed", left: "-9999px", top: 0, zIndex: -1 }}>
      <div style={{ width: "794px", backgroundColor: "#ffffff", color: "#000000", fontFamily: "Arial, sans-serif", padding: "75px 76px", boxSizing: "border-box" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold", textAlign: "center", margin: "0 0 8px 0" }}>
          Guia do Educador — Trilha EJA-EPT
        </h1>
        <p style={{ fontSize: "13px", color: "#666", textAlign: "center", margin: "0 0 16px 0" }}>
          Orientações pedagógicas para uso em sala
        </p>
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "28px" }} />

        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0" }}>1. Quem é o estudante da EJA-EPT?</h2>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 8px 0" }}>
          O estudante da EJA-EPT é um trabalhador-estudante adulto que carrega saberes construídos na vida, no trabalho e nas lutas cotidianas. Como disse Miguel Arroyo, ele é um passageiro da noite — não por falta de esforço, mas porque as condições estruturais da sociedade o afastaram da escola. Ao usar este aplicativo, lembre-se: você não está ensinando alguém que não sabe. Você está reconhecendo quem já sabe muito.
        </p>
        <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
          Referência: ARROYO, M. G. Passageiros da noite. Petrópolis: Vozes, 2012.
        </p>

        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0" }}>2. Mundo do Trabalho x Mercado de Trabalho</h2>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 8px 0" }}>
          Este aplicativo usa intencionalmente Mundo do Trabalho, não mercado de trabalho. A diferença é política: formar para o mercado adapta o estudante às necessidades do capital. Formar para o mundo do trabalho instrumentaliza o cidadão a compreender, questionar e transformar as relações de produção. Use essa distinção em suas aulas.
        </p>
        <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
          Referência: FRIGOTTO, G.; CIAVATTA, M.; RAMOS, M. (Orgs.). Ensino Médio Integrado. São Paulo: Cortez, 2005.
        </p>

        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 12px 0" }}>3. Como usar o Mapa da Vida sem cair na meritocracia</h2>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#2a7a2a", margin: "0 0 4px 0" }}>FAÇA:</p>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 4px 8px" }}>— Pergunte à turma quais barreiras estruturais (falta de transporte, cansaço, cuidado de filhos) dificultam seus projetos e debata soluções coletivas.</p>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 14px 8px" }}>— Conecte as metas individuais a direitos coletivos (moradia, educação, saúde).</p>
        <p style={{ fontSize: "12px", fontWeight: "bold", color: "#b02020", margin: "0 0 4px 0" }}>EVITE:</p>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 4px 8px" }}>— Frases como "basta querer" ou "quem se esforça chega lá".</p>
        <p style={{ fontSize: "12px", lineHeight: "1.7", margin: "0 0 14px 8px" }}>— Tratar o projeto de vida como plano individual de ascensão.</p>
        <p style={{ fontSize: "12px", fontStyle: "italic", lineHeight: "1.7", margin: "0 0 8px 0" }}>O Mapa da Vida é um ato político de esperança coletiva, não um plano de carreira.</p>
        <p style={{ fontSize: "11px", fontStyle: "italic", color: "#555", margin: "0 0 32px 0" }}>
          Referência: FREIRE, P. Pedagogia da Esperança. Rio de Janeiro: Paz e Terra, 1992.
        </p>

        <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 12px 0" }}>4. Roteiro Sugerido de 4 Encontros</h2>
        {[
          { label: "Encontro 1 — Mundo do Trabalho + Direitos", detail: "Módulos de direitos trabalhistas + NR-10" },
          { label: "Encontro 2 — Empregabilidade Crítica", detail: "Gerador de currículo em grupo + Valorize sua Experiência" },
          { label: "Encontro 3 — Mapa da Vida", detail: "Em roda de conversa, com relatos de egressos — Vozes da Trilha" },
          { label: "Encontro 4 — Caminhos de Estudo", detail: "Use os módulos ENEM/SISU/PROUNI como ponto de partida para uma roda de conversa sobre os projetos de futuro da turma." },
        ].map((enc, i) => (
          <div key={i} style={{ marginBottom: "14px" }}>
            <p style={{ fontSize: "12px", fontWeight: "bold", margin: "0 0 2px 0" }}>{enc.label}</p>
            <p style={{ fontSize: "12px", color: "#444", margin: 0 }}>{enc.detail}</p>
          </div>
        ))}

        <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#888", margin: 0 }}>Trilha EJA-EPT | Produto Educacional — ProfEPT | IFC</p>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function BaixarMateriais() {
  const refMapa = useRef(null);
  const refDireitos = useRef(null);
  const refChecklist = useRef(null);
  const refGlossario = useRef(null);
  const refGuia = useRef(null);
  const [loading, setLoading] = useState(null);

  const materiais = [
    {
      id: "mapa",
      emoji: "🗺️",
      titulo: "Mapa da Vida — Versão para Imprimir",
      descricao: "Versão em papel do Mapa da Vida com espaços para escrever à mão suas metas de 1, 5 e 10 anos.",
      cor: "bg-orange-50 border-orange-200",
      link: "https://trilha-eja.github.io/materiais/mapa-da-vida.pdf",
    },
    {
      id: "direitos",
      emoji: "🛡️",
      titulo: "Cartilha de Direitos Trabalhistas",
      descricao: "Seus direitos garantidos por lei, em linguagem simples. Inclui CLT, NR-10 e dicas para se proteger.",
      cor: "bg-blue-50 border-blue-200",
      link: "https://trilha-eja.github.io/materiais/conhecer-meus-direitos.pdf",
    },
    {
      id: "checklist",
      emoji: "📋",
      titulo: "Checklist ENEM/SISU/PROUNI",
      descricao: "Lista de documentos e prazos para não perder nenhuma oportunidade de continuar estudando.",
      cor: "bg-green-50 border-green-200",
      gerar: () => htmlToPDF(refChecklist.current, "checklist-enem-sisu-prouni.pdf", "portrait"),
    },
    {
      id: "glossario",
      emoji: "⚡",
      titulo: "Glossário do Eletricista — Versão para Imprimir",
      descricao: "Todos os termos técnicos em linguagem simples, formatados para colar no caderno ou na parede da oficina.",
      cor: "bg-yellow-50 border-yellow-200",
      gerar: () => htmlToPDF(refGlossario.current, "glossario-eletricista.pdf", "portrait"),
    },
    {
      id: "guia",
      emoji: "📚",
      titulo: "Guia do Educador (PDF Completo)",
      descricao: "Para professores: orientações pedagógicas para uso do Trilha EJA-EPT em perspectiva emancipatória.",
      cor: "bg-purple-50 border-purple-200",
      gerar: () => htmlToPDF(refGuia.current, "guia-do-educador-trilha-eja-ept.pdf", "portrait"),
    },
  ];

  const handleGerar = async (m) => {
    setLoading(m.id);
    await m.gerar();
    setLoading(null);
  };

  return (
    <div>
      <PageHeader title="Baixar Materiais" backTo="/" />

      {/* Templates ocultos */}
      <TemplateMapa refEl={refMapa} />
      <TemplateDireitos refEl={refDireitos} />
      <TemplateChecklist refEl={refChecklist} />
      <TemplateGlossario refEl={refGlossario} />
      <TemplateGuiaEducador refEl={refGuia} />

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
            <div key={m.id} className={`border rounded-2xl p-4 flex items-start gap-4 ${m.cor}`}>
              <span className="text-3xl shrink-0 mt-0.5">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm leading-snug mb-1">{m.titulo}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{m.descricao}</p>
                {m.link ? (
                  <a
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    ⬇️ Baixar e Imprimir
                  </a>
                ) : (
                  <button
                    onClick={() => handleGerar(m)}
                    disabled={loading === m.id}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {loading === m.id ? "Gerando…" : "⬇️ Baixar e Imprimir"}
                  </button>
                )}
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