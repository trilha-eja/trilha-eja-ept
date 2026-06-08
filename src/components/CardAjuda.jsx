export default function CardAjuda() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">❓</span>
        <h3 className="font-bold text-sm text-blue-900">Precisa de ajuda?</h3>
      </div>
      <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">
        {`Você não precisa enfrentar as dificuldades sozinho(a).
O IFC possui profissionais e setores preparados para orientar estudantes sobre estudos, auxílios, bolsas, editais e oportunidades.

Procure:
- SISAE
- Coordenação do Curso
- Professores
- Secretaria Acadêmica`}
      </p>
    </div>
  );
}