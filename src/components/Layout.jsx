import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Briefcase, Zap, BookOpen, Map, GraduationCap, BookMarked } from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/empregabilidade", icon: Briefcase, label: "Emprego" },
  { path: "/guia-pratico", icon: Zap, label: "Prática" },
  { path: "/microlearning", icon: BookOpen, label: "Aprenda" },
  { path: "/mapa-da-vida", icon: Map, label: "Mapa" },
  { path: "/caminhos", icon: GraduationCap, label: "Estudo" },
  { path: "/glossario", icon: BookMarked, label: "Glossário" },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-dvh flex flex-col bg-background"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <main className="flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        <Outlet />
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path, { replace: isActive })}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-0 select-none ${
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-semibold leading-tight truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}