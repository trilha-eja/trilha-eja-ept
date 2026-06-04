const infos = [
  { emoji: "🎁", titulo: "O que é?", texto: "O PROUNI oferece bolsas em faculdades particulares. Pode ser bolsa integral (100%) ou parcial (50%)." },
  { emoji: "📋", titulo: "Quem pode?", texto: "Precisa ter feito o ENEM mais recente com pelo menos 450 pontos e não ter zerado a redação." },
  { emoji: "💰", titulo: "Renda familiar", texto: "Bolsa integral: renda de até 1,5 salário mínimo por pessoa. Parcial: até 3 salários." },
  { emoji: "🏫", titulo: "Cursos disponíveis", texto: "Tem de tudo: engenharia, administração, direito, tecnologia... Confira no site!" },
  { emoji: "📝", titulo: "Como se inscrever?", texto: "Acesse o site oficial no período de inscrições. Escolha até 2 opções." },
  { emoji: "📄", titulo: "Documentos", texto: "RG, CPF, comprovante de renda, comprovante de endereço e histórico escolar." },
];

export default function SecaoProuni() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground leading-relaxed px-1">
        Bolsas de estudo de 50% ou 100% em faculdades particulares.
      </p>

      {/* Infos */}
      {infos.map((i) => (
        <div key={i.titulo} className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">{i.emoji}</span>
          <div>
            <p className="font-bold text-sm mb-0.5">{i.titulo}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{i.texto}</p>
          </div>
        </div>
      ))}

      {/* Aviso de segurança */}
      <div className="rounded-2xl p-4 bg-orange-50 border border-orange-200">
        <p className="text-sm font-bold text-orange-800 mb-1">✅ Site oficial verificado</p>
        <p className="text-xs text-orange-700 leading-relaxed mb-3">
          <strong>prouniportal.mec.gov.br</strong><br />
          Desconfie de sites parecidos — use sempre o link oficial abaixo.
        </p>
        <a
          href="https://prouniportal.mec.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all"
        >
          🔗 Acessar site oficial do PROUNI
        </a>
      </div>
    </div>
  );
}