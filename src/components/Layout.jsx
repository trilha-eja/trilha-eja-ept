import { useRef, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Briefcase, Zap, BookOpen, Map, GraduationCap, BookMarked, RefreshCw, BookOpenCheck } from "lucide-react";
import { usePullToRefresh } from "../hooks/usePullToRefresh";
import { useScrollRestore } from "../hooks/useScrollRestore";

const navItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/empregabilidade", icon: Briefcase, label: "Trabalho" },
  { path: "/guia-pratico", icon: Zap, label: "Prática" },
  { path: "/microlearning", icon: BookOpen, label: "Aprenda" },
  { path: "/mapa-da-vida", icon: Map, label: "Mapa" },
  { path: "/caminhos", icon: GraduationCap, label: "Estudo" },
  { path: "/glossario", icon: BookMarked, label: "Glossário" },
  { path: "/educador", icon: BookOpenCheck, label: "Educador" },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useScrollRestore(scrollRef);

  const handleRefresh = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 700));
    window.location.reload();
  }, []);

  const { pulling, pullY, refreshing } = usePullToRefresh(scrollRef, handleRefresh);

  return (
    <div
      className="h-dvh flex flex-col bg-background"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {/* Pull-to-refresh indicator */}
      {(pulling || refreshing) && (
        <div
          className="fixed left-0 right-0 flex justify-center items-center z-40 pointer-events-none transition-all duration-150"
          style={{ top: `calc(env(safe-area-inset-top) + ${pullY}px - 32px)` }}
        >
          <div className={`w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center ${refreshing ? "animate-spin" : ""}`}>
            <RefreshCw className="w-4 h-4 text-primary" />
          </div>
        </div>
      )}

      <main
        ref={scrollRef}
        className="flex-1 overflow-y-scroll overscroll-y-none"
        style={{
          paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))',
          transform: pulling ? `translateY(${pullY}px)` : undefined,
          transition: pulling ? 'none' : 'transform 0.25s ease',
        }}
      >
        <Outlet />
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50 select-none"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center py-1 px-1 overflow-x-auto gap-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path, { replace: isActive })}
                style={{ minHeight: 44, minWidth: 56 }}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 rounded-xl transition-all shrink-0 select-none ${
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