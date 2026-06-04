import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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

      </div>
    </div>
  );
}