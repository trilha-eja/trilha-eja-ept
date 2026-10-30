import { Button } from "@/components/ui/button";

export default function ConsentModal({ open, onConcordo, onNaoConcordo }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl">
        <h2 className="text-base font-extrabold">Geração do texto reflexivo</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Para gerar seu texto reflexivo personalizado, seu nome ou apelido e algumas de suas respostas serão enviados à Anthropic (Claude API) e processados de acordo com a política de privacidade da Anthropic.
        </p>
        <a
          href="https://www.anthropic.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline text-sm break-all"
        >
          Política de privacidade da Anthropic → https://www.anthropic.com/privacy
        </a>
        <div className="space-y-2 pt-1">
          <Button onClick={onConcordo} className="w-full h-12 rounded-xl text-sm font-bold">
            Concordo — gerar meu Mapa com reflexão
          </Button>
          <Button onClick={onNaoConcordo} variant="outline" className="w-full h-12 rounded-xl text-sm font-bold">
            Não concordo — gerar só o Mapa
          </Button>
        </div>
      </div>
    </div>
  );
}