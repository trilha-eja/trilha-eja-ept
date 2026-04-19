import { ChevronRight } from "lucide-react";

export default function ContentCard({ icon: Icon, title, description, onClick, color = "bg-primary" }) {
  return (
    <button
      onClick={onClick}
      style={{ minHeight: 64 }}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all active:scale-[0.98] text-left select-none"
    >
      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-foreground">{title}</h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  );
}