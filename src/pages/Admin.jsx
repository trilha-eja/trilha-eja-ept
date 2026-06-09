import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, LogOut, CheckCircle, XCircle, Trash2, Download } from "lucide-react";

const ADMIN_PASSWORD = "trilhaeja2024";

function StarDisplay({ n }) {
  return (
    <span className="text-primary font-bold">
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

function fmt(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("pt-BR");
}

function avg(arr) {
  if (!arr.length) return "—";
  return (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1);
}

const KEY_ESTUDANTE = "avaliacao_estudante_enviada";
const KEY_EDUCADOR = "avaliacao_educador_enviada";

function exportCSV(avaliacoes) {
  const cols = [
    "perfil",
    "data_envio",
    "avaliacao_estrelas",
    "ajudou_oportunidades",
    "o_que_mais_ajudou",
    "o_que_melhorar",
    "trabalha_atualmente",
    "faixa_etaria",
    "contribui_orientar_eja",
    "o_que_considerou_relevante",
    "sugestoes_melhoria",
    "anos_na_eja",
    "rede_atuacao",
  ];

  const getVal = (a, col) => {
    const map = {
      perfil: a.perfil,
      data_envio: a.data_envio ? new Date(a.data_envio).toLocaleString("pt-BR") : "",
      avaliacao_estrelas: a.estrelas ?? "",
      // estudante
      ajudou_oportunidades: a.perfil === "estudante" ? (a.dialoga_eja ?? "") : "",
      o_que_mais_ajudou: a.perfil === "estudante" ? (a.sugestao ?? "") : "",
      o_que_melhorar: a.perfil === "estudante" ? (a.melhoria ?? "") : "",
      trabalha_atualmente: a.perfil === "estudante" ? (a.trabalha ?? "") : "",
      faixa_etaria: a.perfil === "estudante" ? (a.faixa_etaria ?? "") : "",
      // educador
      contribui_orientar_eja: a.perfil === "educador" ? (a.dialoga_eja ?? "") : "",
      o_que_considerou_relevante: a.perfil === "educador" ? (a.melhoria ?? "") : "",
      sugestoes_melhoria: a.perfil === "educador" ? (a.sugestao ?? "") : "",
      anos_na_eja: a.perfil === "educador" ? (a.anos_eja ?? "") : "",
      rede_atuacao: a.perfil === "educador" ? (a.rede_ensino ?? "") : "",
    };
    return `"${String(map[col] ?? "").replace(/"/g, '""')}"`;
  };

  const rows = avaliacoes.map((a) => cols.map((c) => getVal(a, c)).join(";"));
  const csv = [cols.join(";"), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const el = document.createElement("a");
  el.href = url;
  el.download = `avaliacoes-${new Date().toISOString().slice(0, 10)}.csv`;
  el.click();
  URL.revokeObjectURL(url);
}

// ── Seção: Vozes da Trilha ──────────────────────────────────────────────────
function Campo({ label, value }) {
  const display = value && String(value).trim() ? String(value) : "Não informado";
  return (
    <p className="text-xs text-muted-foreground">
      <span className="font-semibold">{label}:</span> {display}
    </p>
  );
}

function VozesSection() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pendente");
  const [confirmId, setConfirmId] = useState(null);

  const load = async () => {
    setLoading(true);
    const all = await base44.entities.Depoimento.list("-data_envio", 200);
    setDepoimentos(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await base44.entities.Depoimento.update(id, { status });
    setDepoimentos((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
  };

  const remove = async (id) => {
    await base44.entities.Depoimento.delete(id);
    setDepoimentos((prev) => prev.filter((d) => d.id !== id));
    setConfirmId(null);
  };

  const counts = {
    pendente: depoimentos.filter((d) => d.status === "pendente").length,
    aprovado: depoimentos.filter((d) => d.status === "aprovado").length,
    recusado: depoimentos.filter((d) => d.status === "recusado").length,
  };
  const filtered = depoimentos.filter((d) => d.status === tab);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: "pendente", label: "Pendentes", color: "text-secondary" },
          { key: "aprovado", label: "Aprovados", color: "text-accent" },
          { key: "recusado", label: "Recusados", color: "text-destructive" },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`bg-card border rounded-2xl p-3 text-center transition-all ${tab === key ? "border-primary ring-1 ring-primary" : "border-border"}`}
          >
            <p className={`text-2xl font-extrabold ${color}`}>{counts[key]}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-7 h-7 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-sm text-muted-foreground">
          Nenhum depoimento {tab === "pendente" ? "pendente" : tab === "aprovado" ? "aprovado" : "recusado"}.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((d) => (
            <div key={d.id} className="bg-card border border-border rounded-2xl p-4 space-y-3">
              {/* Cabeçalho */}
              <div className="space-y-0.5">
                <Campo label="Nome" value={d.nome} />
                <Campo label="Idade" value={d.idade} />
                <Campo label="Ano de conclusão" value={d.ano_conclusao} />
                <Campo label="Curso" value={d.curso} />
                <Campo label="Cidade" value={d.cidade_estado} />
                <Campo label="Como conciliou" value={d.texto_conciliar} />
                <Campo label="Após conclusão" value={d.texto_apos} />
                <Campo label="Contribuição" value={d.contribuicao_projetos} />
                <Campo
                  label="Situação atual"
                  value={d.situacao_atual && d.situacao_atual.length > 0 ? d.situacao_atual.join(", ") : null}
                />
                <Campo label="Mensagem" value={d.mensagem} />
                {d.texto && <Campo label="Depoimento (legado)" value={d.texto} />}
                <p className="text-xs text-muted-foreground pt-1">
                  Autorização: {d.autorizado ? "✅ Sim" : "❌ Não"} •{" "}
                  Enviado em: {d.data_envio ? new Date(d.data_envio).toLocaleDateString("pt-BR") : "—"}
                </p>
              </div>

              {/* Confirmação de remoção */}
              {confirmId === d.id ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2">
                  <p className="text-sm font-semibold text-red-800">
                    Tem certeza que deseja remover este depoimento? Esta ação não pode ser desfeita.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => remove(d.id)}
                      className="gap-1.5 rounded-xl bg-destructive hover:bg-destructive/90 text-white">
                      <Trash2 className="w-4 h-4" /> Sim, remover
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmId(null)}
                      className="rounded-xl">
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {tab === "pendente" && (
                    <>
                      <Button size="sm" onClick={() => update(d.id, "aprovado")} className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90">
                        <CheckCircle className="w-4 h-4" /> Aprovar e publicar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => update(d.id, "recusado")} className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                        <XCircle className="w-4 h-4" /> Recusar
                      </Button>
                    </>
                  )}
                  {tab === "aprovado" && (
                    <Button size="sm" onClick={() => update(d.id, "recusado")} variant="outline" className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                      <XCircle className="w-4 h-4" /> Despublicar
                    </Button>
                  )}
                  {tab === "recusado" && (
                    <Button size="sm" onClick={() => update(d.id, "aprovado")} className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90">
                      <CheckCircle className="w-4 h-4" /> Aprovar mesmo assim
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setConfirmId(d.id)}
                    className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" /> 🗑️ Remover
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Seção: Avaliações do App ────────────────────────────────────────────────
function CampoAv({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <p className="text-xs text-muted-foreground">
      <span className="font-semibold text-foreground">{label}:</span> {String(value)}
    </p>
  );
}

function CardAvaliacao({ a, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const isEst = a.perfil === "estudante";

  return (
    <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <p className="text-xs font-bold">{isEst ? "👨‍🎓 Perfil: Estudante" : "👨‍🏫 Perfil: Educador(a)"}</p>
          <p className="text-xs text-muted-foreground">Data: {fmt(a.data_envio)}</p>
        </div>
        <StarDisplay n={a.estrelas} />
      </div>

      <div className="space-y-1 pt-1 border-t border-border">
        {isEst ? (
          <>
            <CampoAv label="Ajudou a conhecer oportunidades" value={a.dialoga_eja} />
            <CampoAv label="O que mais ajudou" value={a.sugestao} />
            <CampoAv label="O que melhorar" value={a.melhoria} />
            <CampoAv label="Trabalha" value={a.trabalha} />
            <CampoAv label="Faixa etária" value={a.faixa_etaria} />
          </>
        ) : (
          <>
            <CampoAv label="Contribui para orientar estudantes" value={a.dialoga_eja} />
            <CampoAv label="O que considerou relevante" value={a.melhoria} />
            <CampoAv label="Sugestões de melhoria" value={a.sugestao} />
            <CampoAv label="Anos na EJA" value={a.anos_eja} />
            <CampoAv label="Rede de atuação" value={a.rede_ensino} />
          </>
        )}
      </div>

      {confirm ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2">
          <p className="text-sm font-semibold text-red-800">
            Tem certeza que deseja excluir esta avaliação? Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onDelete(a.id)}
              className="gap-1.5 rounded-xl bg-destructive hover:bg-destructive/90 text-white">
              <Trash2 className="w-4 h-4" /> Sim, excluir
            </Button>
            <Button size="sm" variant="outline" onClick={() => setConfirm(false)} className="rounded-xl">
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setConfirm(true)}
          className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
          <Trash2 className="w-4 h-4" /> 🗑️ Excluir
        </Button>
      )}
    </div>
  );
}

function AvaliacoesSection() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  const load = async () => {
    setLoading(true);
    const all = await base44.entities.Avaliacao.list("-data_envio", 500);
    setAvaliacoes(all);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    await base44.entities.Avaliacao.delete(id);
    setAvaliacoes((prev) => prev.filter((a) => a.id !== id));
  };

  const handleResetDispositivo = () => {
    localStorage.removeItem(KEY_ESTUDANTE);
    localStorage.removeItem(KEY_EDUCADOR);
    setResetConfirm(false);
    setResetMsg("✅ Dispositivo resetado. Você pode enviar um novo teste.");
    setTimeout(() => setResetMsg(""), 4000);
  };

  const estudantes = avaliacoes.filter((a) => a.perfil === "estudante");
  const educadores = avaliacoes.filter((a) => a.perfil === "educador");
  const mediaEst = avg(estudantes.map((a) => a.estrelas).filter(Boolean));
  const mediaEdu = avg(educadores.map((a) => a.estrelas).filter(Boolean));

  return (
    <div className="space-y-6">
      {/* Resumo */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total", value: avaliacoes.length, color: "text-primary" },
          { label: "Estudantes", value: estudantes.length, color: "text-chart-4" },
          { label: "Educadores", value: educadores.length, color: "text-accent" },
          { label: "⭐ Média Estudantes", value: mediaEst, color: "text-secondary" },
          { label: "⭐ Média Educadores", value: mediaEdu, color: "text-accent" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-3 text-center">
            <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={() => exportCSV(avaliacoes)} className="w-full rounded-xl gap-2 font-bold">
        <Download className="w-4 h-4" /> ⬇️ Exportar avaliações em CSV
      </Button>

      {/* Resetar dispositivo para teste */}
      {resetConfirm ? (
        <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 space-y-2">
          <p className="text-sm font-semibold text-yellow-900">
            Isso permitirá um novo envio de teste neste dispositivo. As respostas já salvas no banco não serão afetadas.
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleResetDispositivo}
              className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-bold">
              Sim, resetar
            </Button>
            <Button size="sm" variant="outline" onClick={() => setResetConfirm(false)} className="rounded-xl">
              Cancelar
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => setResetConfirm(true)}
          className="w-full rounded-xl gap-2 font-bold text-yellow-700 border-yellow-400 hover:bg-yellow-50">
          🔄 Resetar meu dispositivo para novo teste
        </Button>
      )}
      {resetMsg && <p className="text-sm text-accent font-semibold text-center">{resetMsg}</p>}

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-7 h-7 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {!loading && (
        <>
          <div>
            <h3 className="font-extrabold text-base mb-3">👨‍🎓 Avaliações de Estudantes ({estudantes.length})</h3>
            {estudantes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhuma avaliação ainda.</p>
            ) : (
              <div className="space-y-3">
                {estudantes.map((a) => <CardAvaliacao key={a.id} a={a} onDelete={handleDelete} />)}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-extrabold text-base mb-3">👨‍🏫 Avaliações de Educadores ({educadores.length})</h3>
            {educadores.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhuma avaliação ainda.</p>
            ) : (
              <div className="space-y-3">
                {educadores.map((a) => <CardAvaliacao key={a.id} a={a} onDelete={handleDelete} />)}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── Painel principal ────────────────────────────────────────────────────────
export default function Admin({ initialSecao = "vozes" }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_vozes") === "ok");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [secao, setSecao] = useState(initialSecao);

  const login = () => {
    if (senha === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_vozes", "ok");
      setAuthed(true);
      setErro(false);
    } else {
      setErro(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_vozes");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center space-y-1">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto" />
            <h1 className="font-extrabold text-xl">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Acesso restrito ao administrador</p>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Senha de administrador"
              value={senha}
              onChange={(e) => { setSenha(e.target.value); setErro(false); }}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="h-12 rounded-xl text-base"
            />
            {erro && <p className="text-sm text-destructive font-semibold">Senha incorreta.</p>}
            <Button onClick={login} className="w-full h-12 rounded-xl text-base font-bold">Entrar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-extrabold text-lg">Painel Admin</h1>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
        {/* Abas */}
        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          <button
            onClick={() => setSecao("vozes")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${secao === "vozes" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            🎙️ Vozes da Trilha
          </button>
          <button
            onClick={() => setSecao("avaliacoes")}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${secao === "avaliacoes" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            ⭐ Avaliações do App
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5">
        {secao === "vozes" ? <VozesSection /> : <AvaliacoesSection />}
      </div>
    </div>
  );
}