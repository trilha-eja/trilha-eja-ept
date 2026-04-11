import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ title, subtitle, backTo = "/" }) {
  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
        <Link
          to={backTo}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-extrabold text-lg leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}