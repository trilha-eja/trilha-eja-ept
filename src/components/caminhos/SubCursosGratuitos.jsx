import PageHeader from "../PageHeader";
import GridCard2x2 from "../GridCard2x2";
import AccordionSection from "../AccordionSection";

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

        {/* CATEGORIA 1 — Cursos Livres */}
        <CategoriaHeader
          titulo="📚 Cursos Livres e de Curta Duração"
          subtitulo="Plataformas gratuitas para aprender no seu tempo"
        />

        <div className="grid grid-cols-2 gap-2">
          <GridCard2x2 emoji="🏛️" titulo="Escola Virtual do Governo"
            texto="Cursos gratuitos e certificados do governo federal. Informática, gestão, cidadania e muito mais."
            url="https://www.escolavirtual.gov.br" />
          <GridCard2x2 emoji="🏛️" titulo="ENAP"
            texto="Escola Nacional de Administração Pública. Cursos gratuitos em gestão, liderança, tecnologia e cidadania."
            url="https://www.enap.gov.br" />
          <GridCard2x2 emoji="🌐" titulo="Fundação Bradesco"
            texto="Cursos online gratuitos de informática, administração, contabilidade e mais. Certificado gratuito."
            url="https://www.ev.org.br" />
          <GridCard2x2 emoji="💼" titulo="SEBRAE"
            texto="Cursos gratuitos para quem quer empreender ou desenvolver habilidades profissionais."
            url="https://sc.loja.sebrae.com.br" />
          <GridCard2x2 emoji="🚛" titulo="SEST SENAT"
            texto="Cursos gratuitos para trabalhadores do transporte e outras áreas. Certificado gratuito."
            url="https://digital.sestsenat.org.br" />
          <GridCard2x2 emoji="📖" titulo="Aprenda Mais — MEC"
            texto="Portal oficial do MEC com recursos educacionais gratuitos para estudantes e professores."
            url="https://aprendamais.mec.gov.br" />
          <GridCard2x2 emoji="📚" titulo="MEC Livros"
            texto="Biblioteca digital gratuita do governo federal com livros didáticos e de literatura."
            url="https://meclivros.mec.gov.br" />
        </div>

        {/* CATEGORIA 2 — Formação Técnica e Superior */}
        <CategoriaHeader
          titulo="🎓 Formação Técnica e Superior"
          subtitulo="Cursos técnicos e graduações totalmente gratuitos"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-xs leading-relaxed text-foreground">💡 Os Institutos Federais e as Universidades Federais oferecem educação pública, gratuita e de qualidade. O ingresso é por processo seletivo — acompanhe os editais e inscrições.</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <GridCard2x2 emoji="🎓" titulo="IFC"
            texto="O IFC oferece cursos técnicos, de graduação e pós-graduação gratuitos em Santa Catarina."
            url="https://ingresso.ifc.edu.br/guia-de-cursos" />
          <GridCard2x2 emoji="🎓" titulo="IFSC"
            texto="O IFSC oferece cursos técnicos e superiores gratuitos em todo o estado de SC."
            url="https://www.ifsc.edu.br/cursos" />
          <GridCard2x2 emoji="🏫" titulo="Institutos Federais"
            texto="Cursos técnicos e superiores 100% gratuitos em todo o Brasil. Pesquise: 'Instituto Federal + sua cidade'." />
          <GridCard2x2 emoji="🎓" titulo="Universidades Federais"
            texto="Graduação gratuita em diversas áreas em todo o Brasil. Ingresso principal pelo SISU com nota do ENEM." />
          <GridCard2x2 emoji="💻" titulo="UAB"
            texto="Graduação a distância gratuita em universidades públicas. Ideal para estudar de casa."
            url="https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/articulacao-e-inovacao-em-educacao-aberta/sistema-universidade-aberta-do-brasil" />
        </div>

        {/* SENAI e SENAC em acordeão */}
        <AccordionSection titulo="⚠️ SENAI e SENAC — Cursos com vagas gratuitas periódicas">
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-foreground">⚠️ <strong>Atenção:</strong> a maioria dos cursos é paga. Porém, periodicamente são abertas vagas gratuitas por editais e programas especiais. Fique atento e candidate-se quando abrirem.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <GridCard2x2 emoji="⚙️" titulo="SENAI"
              texto="Cursos técnicos na área industrial, incluindo eletricidade. Acompanhe os editais de vagas gratuitas."
              url="https://sc.senai.br/pt-br/editais-gratuidade-senai" />
            <GridCard2x2 emoji="🛎️" titulo="SENAC"
              texto="Cursos em comércio, gastronomia, beleza, informática e mais. Acompanhe as vagas gratuitas."
              url="https://portal.sc.senac.br/cursos-gratuitos" />
          </div>
        </AccordionSection>

        {/* Certificação da Educação Básica */}
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