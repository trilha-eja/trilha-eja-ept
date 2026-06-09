import PageHeader from "../PageHeader";

function CardCurso({ emoji, titulo, texto, url, urlLabel, children }) {
  return (
    <div className="border border-border rounded-2xl p-4 bg-card flex items-start gap-3">
      <span className="text-xl shrink-0 mt-0.5">{emoji}</span>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-sm mb-1 leading-snug">{titulo}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{texto}</p>
        {children}
        {url && (
          <div className="mt-3">
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
              {urlLabel || "🔗 Acessar"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoriaHeader({ titulo, subtitulo }) {
  return (
    <div className="pt-2">
      <h2 className="font-extrabold text-base text-foreground leading-snug">{titulo}</h2>
      {subtitulo && <p className="text-xs text-muted-foreground mt-0.5">{subtitulo}</p>}
    </div>
  );
}

export default function SubCursosGratuitos({ onBack }) {
  return (
    <div>
      <PageHeader title="Cursos Gratuitos" subtitle="Conheça caminhos de aprendizado ao seu alcance" backTo="/" />
      <div className="max-w-lg mx-auto px-4 py-5 pb-10 space-y-3">

        {/* Abertura */}
        <div className="bg-chart-2/10 border border-chart-2/20 rounded-2xl p-4">
          <p className="text-sm leading-relaxed text-foreground">A <strong>educação</strong> é um direito. Aqui você encontra cursos, plataformas e instituições que podem ampliar sua formação — organizados para facilitar sua busca.</p>
        </div>

        {/* Card introdutório */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-xl shrink-0 mt-0.5">💡</span>
          <div>
            <p className="font-bold text-sm mb-1">Como escolher um curso?</p>
            <p className="text-xs text-muted-foreground leading-relaxed">Antes de se inscrever, reflita:</p>
            <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
              <li>• O que quero aprender ou melhorar?</li>
              <li>• Quero me qualificar para trabalhar ou continuar estudando?</li>
              <li>• Preciso de certificado?</li>
              <li>• Tenho disponibilidade para estudar online ou presencialmente?</li>
            </ul>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">Não existe escolha errada — o importante é dar o próximo passo.</p>
          </div>
        </div>

        {/* CATEGORIA 1 */}
        <CategoriaHeader
          titulo="📚 Cursos Livres e de Curta Duração"
          subtitulo="Plataformas gratuitas para aprender no seu tempo"
        />

        <CardCurso emoji="🏛️" titulo="Escola Virtual do Governo"
          texto="Cursos gratuitos e certificados do governo federal. Informática, gestão, cidadania e muito mais."
          url="https://www.escolavirtual.gov.br" />

        <CardCurso emoji="🏛️" titulo="ENAP"
          texto="Escola Nacional de Administração Pública. Cursos gratuitos em gestão, liderança, tecnologia e cidadania. Aberto a todos os cidadãos brasileiros."
          url="https://www.enap.gov.br" />

        <CardCurso emoji="🌐" titulo="Fundação Bradesco"
          texto="Cursos online gratuitos de informática, administração, contabilidade e mais. Certificado gratuito ao concluir."
          url="https://www.ev.org.br" />

        <CardCurso emoji="💼" titulo="SEBRAE — Cursos Gratuitos"
          texto="Cursos gratuitos para quem quer empreender ou desenvolver habilidades profissionais. Certificado gratuito ao concluir."
          url="https://sc.loja.sebrae.com.br" />

        <CardCurso emoji="🚛" titulo="SEST SENAT"
          texto="Cursos gratuitos para trabalhadores do transporte e outras áreas profissionais. Certificado gratuito ao concluir."
          url="https://digital.sestsenat.org.br" />

        <CardCurso emoji="📖" titulo="Aprenda Mais — MEC"
          texto="Portal oficial do MEC com recursos educacionais gratuitos para estudantes e professores."
          url="https://aprendamais.mec.gov.br" />

        <CardCurso emoji="📚" titulo="MEC Livros"
          texto="Biblioteca digital gratuita do governo federal com livros didáticos e de literatura. Acesse pelo celular ou computador."
          url="https://meclivros.mec.gov.br" urlLabel="🔗 Acessar biblioteca" />

        {/* CATEGORIA 2 */}
        <CategoriaHeader
          titulo="🎓 Formação Técnica e Superior"
          subtitulo="Cursos técnicos e graduações totalmente gratuitos"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-xs leading-relaxed text-foreground">💡 Os Institutos Federais e as Universidades Federais oferecem educação pública, gratuita e de qualidade. O ingresso é por processo seletivo — acompanhe os editais e inscrições.</p>
        </div>

        <CardCurso emoji="🎓" titulo="IFC — Instituto Federal Catarinense"
          texto="O IFC oferece cursos técnicos, de graduação e pós-graduação gratuitos em Santa Catarina. Explore os cursos disponíveis além do que você já conhece!"
          url="https://ingresso.ifc.edu.br/guia-de-cursos" urlLabel="🔗 Ver guia de cursos" />

        <CardCurso emoji="🎓" titulo="IFSC — Instituto Federal de Santa Catarina"
          texto="O IFSC oferece cursos técnicos e superiores gratuitos em todo o estado de Santa Catarina. Consulte os cursos disponíveis e as formas de ingresso."
          url="https://www.ifsc.edu.br/cursos" urlLabel="🔗 Ver cursos" />

        <CardCurso emoji="🏫" titulo="Institutos Federais (IFs)"
          texto={"Os Institutos Federais oferecem cursos técnicos e superiores 100% gratuitos em todo o Brasil. Para encontrar o IF mais próximo, pesquise no Google: 'Instituto Federal + sua cidade'."} />

        <CardCurso emoji="🎓" titulo="Universidades Federais"
          texto={"As universidades federais oferecem graduação gratuita em diversas áreas em todo o Brasil. O ingresso principal é pelo SISU, usando a nota do ENEM. Para encontrar opções próximas, pesquise no Google: 'Universidade Federal + seu estado'."} />

        <CardCurso emoji="💻" titulo="EaD Gratuito — UAB"
          texto="A Universidade Aberta do Brasil oferece graduação a distância gratuita em universidades públicas. Uma opção para quem precisa estudar de casa pelo celular ou computador."
          url="https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/articulacao-e-inovacao-em-educacao-aberta/sistema-universidade-aberta-do-brasil"
          urlLabel="🔗 Acessar UAB" />

        {/* CATEGORIA 3 */}
        <CategoriaHeader titulo="⚠️ SENAI e SENAC — Atenção: maioria dos cursos é paga" />

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
          <p className="text-xs leading-relaxed text-foreground">A maioria dos cursos do SENAI e do SENAC é paga. Porém, periodicamente são abertas vagas gratuitas por editais e programas especiais. Fique atento e candidate-se quando abrirem.</p>
        </div>

        <CardCurso emoji="⚙️" titulo="SENAI — Editais de Gratuidade"
          texto="Cursos técnicos na área industrial, incluindo eletricidade. Acompanhe os editais de vagas gratuitas disponíveis em SC."
          url="https://sc.senai.br/pt-br/editais-gratuidade-senai" urlLabel="🔗 Ver editais de gratuidade" />

        <CardCurso emoji="🛎️" titulo="SENAC — Cursos Gratuitos"
          texto="Cursos nas áreas de comércio, gastronomia, beleza, informática e mais. Acompanhe as vagas gratuitas disponíveis em SC."
          url="https://portal.sc.senac.br/cursos-gratuitos" urlLabel="🔗 Ver cursos gratuitos" />

        {/* CATEGORIA 4 */}
        <CategoriaHeader titulo="📋 Certificação da Educação Básica" />

        <CardCurso emoji="📋" titulo="ENCCEJA"
          texto="O ENCCEJA é um exame gratuito do governo para quem não concluiu o Ensino Fundamental ou Médio e deseja obter a certificação. Ter o certificado do Ensino Médio amplia suas possibilidades de acesso a cursos, concursos e processos seletivos."
          url="https://encceja.inep.gov.br" urlLabel="🔗 Acessar site oficial" />

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}