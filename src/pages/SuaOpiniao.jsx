import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const KEY_ESTUDANTE = "avaliacao_estudante_enviada";
const KEY_EDUCADOR = "avaliacao_educador_enviada";

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none transition-transform active:scale-90"
        >
          <Star
            className="w-9 h-9"
            fill={(hovered || value) >= n ? "#E86826" : "none"}
            stroke={(hovered || value) >= n ? "#E86826" : "#ccc"}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}

function PrivacyBox() {
  return (
    <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 space-y-2">
      <p className="font-bold text-sm">🔒 Sua privacidade está protegida</p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        Este aplicativo segue a LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018), a lei brasileira que garante que seus dados sejam usados de forma segura e respeitosa.
      </p>
      <ul className="text-xs text-muted-foreground space-y-0.5">
        <li>• Suas respostas são anônimas</li>
        <li>• Nenhum dado pessoal é coletado</li>
        <li>• Dados usados apenas para melhorar este aplicativo</li>
      </ul>
    </div>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            className="w-4 h-4 accent-primary"
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CharCounter({ current, max }) {
  const pct = current / max;
  const color = pct >= 1 ? "#dc2626" : pct >= 0.8 ? "#f97316" : "#888";
  return <p className="text-xs text-right" style={{ color }}>{current}/{max} caracteres</p>;
}

function FormEstudante({ onSuccess }) {
  const [estrelas, setEstrelas] = useState(0);
  const [melhoria, setMelhoria] = useState("");
  const [trabalha, setTrabalha] = useState("");
  const [faixa, setFaixa] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!estrelas) { setErro("Avalie o aplicativo com estrelas para continuar."); return; }
    setErro("");
    setLoading(true);
    await base44.entities.Avaliacao.create({
      perfil: "estudante",
      estrelas,
      melhoria: melhoria || undefined,
      trabalha: trabalha || undefined,
      faixa_etaria: faixa || undefined,
      data_envio: new Date().toISOString(),
    });
    localStorage.setItem(KEY_ESTUDANTE, "true");
    setLoading(false);
    onSuccess();
  }

  return (
    <div className="space-y-6">
      {/* Seção 1 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <h2 className="font-extrabold text-base">Como você avalia o aplicativo no geral?</h2>
        <StarRating value={estrelas} onChange={setEstrelas} />
        {erro && <p className="text-sm text-destructive font-semibold">{erro}</p>}
      </div>

      {/* Seção 2 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
        <h2 className="font-extrabold text-base">O que você mudaria ou melhoraria no aplicativo?</h2>
        <p className="text-xs text-muted-foreground">Opcional</p>
        <Textarea
          value={melhoria}
          onChange={(e) => setMelhoria(e.target.value.slice(0, 200))}
          placeholder="Escreva sua sugestão..."
          className="rounded-xl text-sm min-h-[90px] resize-none"
          maxLength={200}
        />
        <CharCounter current={melhoria.length} max={200} />
      </div>

      {/* Seção 3 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <h2 className="font-extrabold text-base">Sobre você <span className="text-muted-foreground font-normal text-sm">(opcional)</span></h2>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Você trabalha atualmente?</p>
          <RadioGroup options={["Sim", "Não"]} value={trabalha} onChange={setTrabalha} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Faixa etária:</p>
          <RadioGroup
            options={["18-25 anos", "26-35 anos", "36-45 anos", "46 anos ou mais"]}
            value={faixa}
            onChange={setFaixa}
          />
        </div>
      </div>

      <PrivacyBox />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-14 rounded-2xl text-base font-bold gap-2"
      >
        {loading ? "Enviando…" : "Enviar minha opinião ✓"}
      </Button>
    </div>
  );
}

function FormEducador({ onSuccess }) {
  const [estrelas, setEstrelas] = useState(0);
  const [dialogaEja, setDialogaEja] = useState("");
  const [sugestao, setSugestao] = useState("");
  const [anosEja, setAnosEja] = useState("");
  const [rede, setRede] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!estrelas) { setErro("Avalie o aplicativo com estrelas para continuar."); return; }
    setErro("");
    setLoading(true);
    await base44.entities.Avaliacao.create({
      perfil: "educador",
      estrelas,
      dialoga_eja: dialogaEja || undefined,
      sugestao: sugestao || undefined,
      anos_eja: anosEja || undefined,
      rede_ensino: rede || undefined,
      data_envio: new Date().toISOString(),
    });
    localStorage.setItem(KEY_EDUCADOR, "true");
    setLoading(false);
    onSuccess();
  }

  return (
    <div className="space-y-6">
      {/* Seção 1 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-3">
        <h2 className="font-extrabold text-base">Como você avalia o aplicativo no geral?</h2>
        <StarRating value={estrelas} onChange={setEstrelas} />
        {erro && <p className="text-sm text-destructive font-semibold">{erro}</p>}
      </div>

      {/* Seção 2 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
        <h2 className="font-extrabold text-base">O app dialoga com a realidade da EJA-EPT?</h2>
        <p className="text-xs text-muted-foreground">Opcional</p>
        <Textarea
          value={dialogaEja}
          onChange={(e) => setDialogaEja(e.target.value.slice(0, 200))}
          placeholder="Compartilhe sua percepção..."
          className="rounded-xl text-sm min-h-[90px] resize-none"
          maxLength={200}
        />
        <CharCounter current={dialogaEja.length} max={200} />
      </div>

      {/* Seção 3 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
        <h2 className="font-extrabold text-base">Que melhorias ou conteúdos você sugere?</h2>
        <p className="text-xs text-muted-foreground">Opcional</p>
        <Textarea
          value={sugestao}
          onChange={(e) => setSugestao(e.target.value.slice(0, 200))}
          placeholder="Sua sugestão pedagógica..."
          className="rounded-xl text-sm min-h-[90px] resize-none"
          maxLength={200}
        />
        <CharCounter current={sugestao.length} max={200} />
      </div>

      {/* Seção 4 */}
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <h2 className="font-extrabold text-base">Sobre você <span className="text-muted-foreground font-normal text-sm">(opcional)</span></h2>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Há quantos anos você atua na EJA?</p>
          <RadioGroup
            options={["Menos de 1 ano", "1 a 3 anos", "4 a 10 anos", "Mais de 10 anos"]}
            value={anosEja}
            onChange={setAnosEja}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Em qual rede você atua?</p>
          <RadioGroup
            options={["Federal", "Estadual", "Municipal", "Particular"]}
            value={rede}
            onChange={setRede}
          />
        </div>
      </div>

      <PrivacyBox />

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full h-14 rounded-2xl text-base font-bold gap-2"
      >
        {loading ? "Enviando…" : "Enviar minha opinião ✓"}
      </Button>
    </div>
  );
}

export default function SuaOpiniao() {
  const [perfil, setPerfil] = useState(null); // null | "estudante" | "educador"
  const [enviado, setEnviado] = useState(false);

  const jaEnviouEstudante = localStorage.getItem(KEY_ESTUDANTE) === "true";
  const jaEnviouEducador = localStorage.getItem(KEY_EDUCADOR) === "true";

  // Tela pós-envio
  if (enviado) {
    const isEducador = perfil === "educador";
    return (
      <div className="max-w-lg mx-auto px-4 py-10 flex flex-col items-center gap-6 text-center">
        <span className="text-7xl">✅</span>
        <h2 className="text-2xl font-extrabold">Obrigado pela sua opinião!</h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {isEducador
            ? "Sua visão pedagógica é fundamental para melhorar a educação de jovens e adultos trabalhadores."
            : "Sua voz ajuda a melhorar este app para outros trabalhadores-estudantes."}
        </p>
        <Link to="/">
          <Button className="h-12 px-8 rounded-2xl font-bold">Voltar ao início</Button>
        </Link>
      </div>
    );
  }

  // Tela de seleção de perfil
  if (!perfil) {
    return (
      <div>
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
            <Link to="/" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-extrabold text-lg">Sua Opinião Importa</h1>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-6">
          <span className="text-6xl">⭐</span>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold leading-tight">Sua Opinião Transforma Este Aplicativo</h2>
            <p className="text-muted-foreground text-sm">Rápido e anônimo — menos de 1 minuto.</p>
          </div>

          <p className="font-semibold text-base">Você é:</p>

          <div className="w-full space-y-3">
            <button
              onClick={() => {
                if (jaEnviouEstudante) return;
                setPerfil("estudante");
              }}
              className={`w-full h-16 rounded-2xl border-2 text-base font-bold flex items-center justify-center gap-3 transition-all
                ${jaEnviouEstudante
                  ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                  : "border-primary bg-primary/5 hover:bg-primary/10 text-foreground"}`}
            >
              👨‍🎓 Sou estudante
            </button>
            {jaEnviouEstudante && (
              <p className="text-xs text-center text-muted-foreground -mt-1">Você já enviou sua opinião neste dispositivo. Obrigado!</p>
            )}

            <button
              onClick={() => {
                if (jaEnviouEducador) return;
                setPerfil("educador");
              }}
              className={`w-full h-16 rounded-2xl border-2 text-base font-bold flex items-center justify-center gap-3 transition-all
                ${jaEnviouEducador
                  ? "border-border bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                  : "border-accent bg-accent/5 hover:bg-accent/10 text-foreground"}`}
            >
              👨‍🏫 Sou educador(a)
            </button>
            {jaEnviouEducador && (
              <p className="text-xs text-center text-muted-foreground -mt-1">Você já enviou sua opinião neste dispositivo. Obrigado!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Formulário
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => setPerfil(null)} className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-extrabold text-base">Sua Opinião Importa</h1>
            <p className="text-xs text-muted-foreground">{perfil === "estudante" ? "Formulário do Estudante" : "Formulário do Educador"}</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-10">
        {perfil === "estudante"
          ? <FormEstudante onSuccess={() => setEnviado(true)} />
          : <FormEducador onSuccess={() => setEnviado(true)} />
        }
      </div>
    </div>
  );
}