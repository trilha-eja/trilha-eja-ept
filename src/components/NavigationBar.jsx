import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavigationBar({ backTo, onBack }) {
  const showVoltar = (backTo && backTo !== "/") || onBack;

  return (
    <div className="max-w-lg mx-auto px-4 pt-3 pb-0 flex items-center gap-2">
      {showVoltar && (
        onBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            ← Voltar
          </button>
        ) : (
          <Link
            to={backTo}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            ← Voltar
          </Link>
        )
      )}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:bg-muted transition-colors"
      >
        <Home className="w-3 h-3" />
        🏠 Início
      </Link>
    </div>
  );
}