import { Outlet, Link, useLocation } from "react-router-dom";
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 pb-24 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-0 ${
                  isActive
                    ? "text-primary scale-105"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : ""}`} />
                <span className="text-[10px] font-semibold leading-tight truncate">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}