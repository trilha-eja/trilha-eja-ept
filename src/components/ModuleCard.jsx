import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ModuleCard({ to, icon: Icon, title, description, color }) {
  return (
    <Link
      to={to}
      style={{ minHeight: 64 }}
      className={`flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all active:scale-[0.98] group select-none`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color}`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-snug mt-0.5">
          {description}
        </p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
    </Link>
  );
}