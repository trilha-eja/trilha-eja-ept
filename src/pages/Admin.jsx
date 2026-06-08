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

function exportCSV(avaliacoes) {
  const header = ["perfil","estrelas","melhoria","dialoga_eja","sugestao","trabalha","faixa_etaria","anos_eja","rede_ensino","data_envio"];
  const rows = avaliacoes.map((a) =>
    header.map((k) => `"${(a[k] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );
  const csv = [header.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `avaliacoes-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
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
function AvaliacoesSection() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    base44.entities.Avaliacao.list("-data_envio", 500).then((all) => {
      setAvaliacoes(all);
      setLoading(false);
    });
  }, []);

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
          { label: "⭐ Estudantes", value: mediaEst, color: "text-secondary" },
          { label: "⭐ Educadores", value: mediaEdu, color: "text-accent" },
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

      {loading && (
        <div className="flex justify-center py-8">
          <div className="w-7 h-7 border-4 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Estudantes */}
      {!loading && (
        <>
          <div>
            <h3 className="font-extrabold text-base mb-3">👨‍🎓 Avaliações de Estudantes ({estudantes.length})</h3>
            {estudantes.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhuma avaliação ainda.</p>
            ) : (
              <div className="space-y-3">
                {estudantes.map((a) => (
                  <div key={a.id} className="bg-card border border-border rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <StarDisplay n={a.estrelas} />
                      <span className="text-xs text-muted-foreground">{fmt(a.data_envio)}</span>
                    </div>
                    {a.melhoria && (
                      <p className="text-sm bg-muted rounded-xl p-3 leading-relaxed">"{a.melhoria}"</p>
                    )}
                    <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                      {a.trabalha && <span>Trabalha: {a.trabalha}</span>}
                      {a.faixa_etaria && <span>Faixa: {a.faixa_etaria}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Educadores */}
          <div>
            <h3 className="font-extrabold text-base mb-3">👨‍🏫 Avaliações de Educadores ({educadores.length})</h3>
            {educadores.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhuma avaliação ainda.</p>
            ) : (
              <div className="space-y-3">
                {educadores.map((a) => (
                  <div key={a.id} className="bg-card border border-border rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <StarDisplay n={a.estrelas} />
                      <span className="text-xs text-muted-foreground">{fmt(a.data_envio)}</span>
                    </div>
                    {a.dialoga_eja && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Dialoga com EJA-EPT:</p>
                        <p className="text-sm bg-muted rounded-xl p-3 leading-relaxed">"{a.dialoga_eja}"</p>
                      </div>
                    )}
                    {a.sugestao && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Sugestões:</p>
                        <p className="text-sm bg-muted rounded-xl p-3 leading-relaxed">"{a.sugestao}"</p>
                      </div>
                    )}
                    <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
                      {a.anos_eja && <span>Anos na EJA: {a.anos_eja}</span>}
                      {a.rede_ensino && <span>Rede: {a.rede_ensino}</span>}
                    </div>
                  </div>
                ))}
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