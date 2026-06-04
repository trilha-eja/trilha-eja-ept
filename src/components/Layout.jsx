import { useRef, useCallback, useState } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { Home, Briefcase, Zap, BookOpen, Map, GraduationCap, BookMarked, RefreshCw, BookOpenCheck, Star, ShieldCheck, Menu, X, Sparkles, Download } from "lucide-react";
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
  { path: "/opiniao", icon: Star, label: "Opinião" },
];

const menuItems = [
  { path: "/", icon: Home, label: "Início" },
  { path: "/empregabilidade", icon: Briefcase, label: "Mundo do Trabalho" },
  { path: "/guia-pratico", icon: Zap, label: "Guia Prático" },
  { path: "/microlearning", icon: BookOpen, label: "Microlearning" },
  { path: "/mapa-da-vida", icon: Map, label: "Mapa da Vida" },
  { path: "/caminhos", icon: GraduationCap, label: "Caminhos de Estudo" },
  { path: "/glossario", icon: BookMarked, label: "Glossário do Eletricista" },
  { path: "/vozes", icon: Sparkles, label: "Vozes da Trilha" },
  { path: "/educador", icon: BookOpenCheck, label: "Para o Educador" },
  { path: "/opiniao", icon: Star, label: "Sua Opinião Importa" },
  { path: "/materiais", icon: Download, label: "Baixar Materiais" },
];



export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Top bar com menu hamburguer */}
      <div className="bg-background border-b border-border/50 px-4 py-1.5 flex justify-between items-center">
        <span className="text-xs font-bold text-primary">Trilha EJA-EPT</span>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Drawer menu lateral */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          {/* Painel */}
          <div className="relative ml-auto w-72 max-w-[85vw] h-full bg-card shadow-xl flex flex-col overflow-y-auto">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <span className="font-extrabold text-base">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-3 space-y-0.5">
              {menuItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Divisória + link admin único */}
            <div className="px-3 pb-6">
              <div className="border-t border-border/60 my-3" />
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                Admin
              </Link>
            </div>
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