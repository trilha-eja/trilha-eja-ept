export const cards = [
  {
    emoji: "🤝",
    titulo: "Direito ao Sindicato",
    texto: "Todo trabalhador tem direito de se associar ao sindicato da sua categoria. O sindicato defende seus direitos nas negociações com os empregadores, presta assistência jurídica gratuita e representa os trabalhadores em acordos coletivos. Para encontrar seu sindicato: pesquise 'sindicato eletricista + sua cidade' no Google.",
    legal: "CF/88 Art. 8º",
  },
  {
    emoji: "📜",
    titulo: "Convenção Coletiva",
    texto: "É um acordo negociado entre o sindicato dos trabalhadores e o sindicato dos empregadores. Pode garantir direitos maiores que os previstos na CLT — mas atenção: desde a Reforma Trabalhista de 2017, acordos coletivos também podem flexibilizar alguns direitos. Fique atento ao que é negociado e consulte o sindicato da sua categoria.",
    legal: "CLT Art. 611 (com redação da Lei nº 13.467/2017)",
  },
  {
    emoji: "✊",
    titulo: "Direito de Greve",
    texto: "Os trabalhadores têm direito de fazer greve para defender seus interesses profissionais. A participação em greve legítima não caracteriza abandono de emprego nem justa causa para demissão. O sindicato deve comunicar o empregador com antecedência.",
    legal: "CF/88 Art. 9º e Lei nº 7.783/1989",
  },
  {
    emoji: "📞",
    titulo: "Onde Buscar Ajuda e Denunciar Violações?",
    texto: "Se seus direitos forem violados ou precisar de orientação, acesse estes canais:\n\n💡 Para consultar seus benefícios e documentos trabalhistas, acesse a subpágina Previdência Social e Contrato e Registro neste módulo.",
    legal: null,
    canais: [
      {
        nome: "Ministério do Trabalho",
        descricao: "Denúncias trabalhistas e fiscalização de empresas.",
        link: { url: "https://www.gov.br/trabalho", label: "🔗 Acessar" },
      },
      {
        nome: "Alô Trabalho",
        descricao: "Ligue 158 — gratuito, funciona como o 190. Para denúncias e orientações sobre direitos trabalhistas.",
        link: null,
      },
      {
        nome: "Ministério Público do Trabalho",
        descricao: "Defende os direitos coletivos dos trabalhadores.",
        link: { url: "https://mpt.mp.br", label: "🔗 Acessar" },
      },
      {
        nome: "Defensoria Pública",
        descricao: "Assistência jurídica gratuita para quem não pode pagar advogado. Procure a Defensoria Pública da sua cidade.",
        link: { url: "https://www.anadep.org.br", label: "🔗 Encontrar Defensoria" },
      },
      {
        nome: "OAB Assistência Jurídica",
        descricao: "A OAB oferece assistência jurídica gratuita para pessoas de baixa renda. Procure a seccional da OAB da sua cidade.",
        link: { url: "https://www.oabsp.org.br/jornaldaadvocacia/25-03-14-1106-assistencia-judiciaria-gratuita-oportunidade-profissional-para-a-advocacia-e-compromisso-social-com-a-justica", label: "🔗 Saiba mais" },
      },
      {
        nome: "CRAS",
        descricao: "O Centro de Referência de Assistência Social oferece orientação e encaminhamento para serviços sociais. Procure o CRAS mais próximo da sua casa.",
        link: null,
      },
    ],
  },
];