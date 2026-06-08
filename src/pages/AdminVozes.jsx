import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, LogOut, CheckCircle, XCircle, Trash2 } from "lucide-react";

const ADMIN_PASSWORD = "trilhaeja2024";

export default function AdminVozes() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_vozes") === "ok");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const [depoimentos, setDepoimentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("pendente");

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

  const load = async () => {
    setLoading(true);
    const all = await base44.entities.Depoimento.list("-data_envio", 200);
    setDepoimentos(all);
    setLoading(false);
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const update = async (id, status) => {
    await base44.entities.Depoimento.update(id, { status });
    setDepoimentos((prev) => prev.map((d) => d.id === id ? { ...d, status } : d));
  };

  const remove = async (id) => {
    await base44.entities.Depoimento.delete(id);
    setDepoimentos((prev) => prev.filter((d) => d.id !== id));
  };

  const counts = {
    pendente: depoimentos.filter((d) => d.status === "pendente").length,
    aprovado: depoimentos.filter((d) => d.status === "aprovado").length,
    recusado: depoimentos.filter((d) => d.status === "recusado").length,
  };

  const filtered = depoimentos.filter((d) => d.status === tab);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm space-y-5">
          <div className="text-center space-y-1">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto" />
            <h1 className="font-extrabold text-xl">Moderação — Vozes da Trilha</h1>
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
            <Button onClick={login} className="w-full h-12 rounded-xl text-base font-bold">
              Entrar
            </Button>
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
          <div>
            <h1 className="font-extrabold text-lg">Moderação — Vozes da Trilha</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
        {/* Counters */}
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

        {/* List */}
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
                <div>
                  <p className="font-bold">{d.nome}{d.idade ? `, ${d.idade} anos` : ""}</p>
                  <p className="text-sm text-muted-foreground">{d.curso} • {d.ano_conclusao}{d.cidade_estado ? ` • ${d.cidade_estado}` : ""}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enviado em: {d.data_envio ? new Date(d.data_envio).toLocaleDateString("pt-BR") : "—"}
                  </p>
                </div>
                {d.texto_conciliar && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Como foi conciliar trabalho, família e estudos</p>
                    <p className="text-sm leading-relaxed bg-muted rounded-xl p-3">"{d.texto_conciliar}"</p>
                  </div>
                )}
                {d.texto_apos && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">O que aconteceu após o curso</p>
                    <p className="text-sm leading-relaxed bg-muted rounded-xl p-3">"{d.texto_apos}"</p>
                  </div>
                )}
                {d.texto && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Depoimento (legado)</p>
                    <p className="text-sm leading-relaxed bg-muted rounded-xl p-3">"{d.texto}"</p>
                  </div>
                )}
                {d.contribuicao_projetos && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Contribuição para projetos de vida:</span> {d.contribuicao_projetos}
                  </p>
                )}
                {d.situacao_atual && d.situacao_atual.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Situação após o curso:</span> {d.situacao_atual.join(", ")}
                  </p>
                )}
                {d.mensagem && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Mensagem para quem está estudando</p>
                    <p className="text-sm leading-relaxed bg-muted rounded-xl p-3">"{d.mensagem}"</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Autorização: {d.autorizado ? "✅ Sim" : "❌ Não"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {tab === "pendente" && (
                    <>
                      <Button size="sm" onClick={() => update(d.id, "aprovado")}
                        className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90">
                        <CheckCircle className="w-4 h-4" /> Aprovar e publicar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => update(d.id, "recusado")}
                        className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                        <XCircle className="w-4 h-4" /> Recusar
                      </Button>
                    </>
                  )}
                  {tab === "aprovado" && (
                    <Button size="sm" variant="outline" onClick={() => remove(d.id)}
                      className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" /> Remover
                    </Button>
                  )}
                  {tab === "recusado" && (
                    <>
                      <Button size="sm" onClick={() => update(d.id, "aprovado")}
                        className="gap-1.5 rounded-xl bg-accent hover:bg-accent/90">
                        <CheckCircle className="w-4 h-4" /> Aprovar mesmo assim
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => remove(d.id)}
                        className="gap-1.5 rounded-xl text-destructive border-destructive/40 hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" /> Excluir
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}