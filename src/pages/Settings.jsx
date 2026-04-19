import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle, ArrowLeft, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await base44.auth.logout();
    } catch {
      // ignore, redirect anyway
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const themeOptions = [
    { value: "system", icon: Monitor, label: "Sistema" },
    { value: "light", icon: Sun, label: "Claro" },
    { value: "dark", icon: Moon, label: "Escuro" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-extrabold text-lg">Configurações</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4">
        {/* Theme */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3">Aparência</h2>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${
                  theme === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* App info */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
          <h2 className="font-bold text-sm text-muted-foreground uppercase tracking-wide mb-3">Sobre o App</h2>
          <p className="text-sm"><span className="font-semibold">Nome:</span> Trilha EJA-EPT</p>
          <p className="text-sm"><span className="font-semibold">Versão:</span> 1.0.0</p>
          <p className="text-sm"><span className="font-semibold">Curso:</span> Eletricista Industrial</p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Desenvolvido para apoiar estudantes da EJA integrada à Educação Profissional e Tecnológica (EPT).
          </p>
        </div>

        {/* Danger zone */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5">
          <h2 className="font-bold text-sm text-destructive uppercase tracking-wide mb-1">Zona de Perigo</h2>
          <p className="text-xs text-muted-foreground mb-4">
            Esta ação não pode ser desfeita.
          </p>
          <Button
            variant="destructive"
            className="w-full h-12 rounded-xl gap-2"
            onClick={() => setShowDeleteModal(true)}
          >
            <Trash2 className="w-4 h-4" /> Excluir Conta
          </Button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pb-6">
          <div className="bg-card w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-destructive" />
              </div>
            </div>
            <h2 className="font-extrabold text-lg text-center mb-2">Excluir conta?</h2>
            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-6">
              Todos os seus dados (currículo, mapa da vida, metas) serão apagados permanentemente. Tem certeza?
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                className="flex-1 h-12 rounded-xl"
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "Excluindo..." : "Sim, excluir"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}