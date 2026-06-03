import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function EducatorCard({ card }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left active:bg-muted/50 transition-colors"
      >
        <span className="text-2xl shrink-0">{card.emoji}</span>
        <span className="font-bold text-sm flex-1 leading-snug">{card.title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-3">
          {card.text && (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{card.text}</p>
          )}

          {card.encounters && (
            <div className="space-y-2">
              {card.encounters.map((enc, i) => (
                <div key={i} className="bg-muted rounded-xl p-3">
                  <p className="text-xs font-bold text-chart-4">{enc.label}</p>
                  <p className="text-sm font-semibold">{enc.desc}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{enc.detail}</p>
                </div>
              ))}
            </div>
          )}

          {card.reference && (
            <p className="text-xs text-muted-foreground/70 border-t border-border pt-2">
              📋 <span className="font-semibold">Referência:</span> {card.reference}
            </p>
          )}
        </div>
      )}
    </div>
  );
}