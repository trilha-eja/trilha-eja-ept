import PageHeader from "../PageHeader";
import AccordionSection from "../AccordionSection";

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
      <PageHeader title="Cursos Gratuitos" subtitle="Conheça caminhos de aprendizado ao seu alcance" onBack={onBack} />
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

        <AccordionSection titulo="🏛️ Escola Virtual do Governo">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos gratuitos e certificados do governo federal. Informática, gestão, cidadania e muito mais.</p>
          <a href="https://www.escolavirtual.gov.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🏛️ ENAP">
          <p className="text-sm text-muted-foreground leading-relaxed">Escola Nacional de Administração Pública. Cursos gratuitos em gestão, liderança, tecnologia e cidadania.</p>
          <a href="https://www.enap.gov.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🌐 Fundação Bradesco">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos online gratuitos de informática, administração, contabilidade e mais. Certificado gratuito.</p>
          <a href="https://www.ev.org.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="💼 SEBRAE">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos gratuitos para quem quer empreender ou desenvolver habilidades profissionais.</p>
          <a href="https://sc.loja.sebrae.com.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🚛 SEST SENAT">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos gratuitos para trabalhadores do transporte e outras áreas. Certificado gratuito.</p>
          <a href="https://digital.sestsenat.org.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="📖 Aprenda Mais — MEC">
          <p className="text-sm text-muted-foreground leading-relaxed">Portal oficial do MEC com recursos educacionais gratuitos para estudantes e professores.</p>
          <a href="https://aprendamais.mec.gov.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="📚 MEC Livros">
          <p className="text-sm text-muted-foreground leading-relaxed">Biblioteca digital gratuita do governo federal com livros didáticos e de literatura.</p>
          <a href="https://meclivros.mec.gov.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🗣️ MEC Idiomas">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos gratuitos de idiomas oferecidos pelo governo federal — inglês, espanhol e outras línguas.</p>
          <a href="https://www.gov.br/mec/pt-br/mec-idiomas" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>

        {/* CATEGORIA 2 — Formação Técnica e Superior */}
        <CategoriaHeader
          titulo="🎓 Formação Técnica e Superior"
          subtitulo="Cursos técnicos e graduações totalmente gratuitos"
        />

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <p className="text-xs leading-relaxed text-foreground">💡 Os Institutos Federais e as Universidades Federais oferecem educação pública, gratuita e de qualidade. O ingresso é por processo seletivo — acompanhe os editais e inscrições.</p>
        </div>

        <AccordionSection titulo="🎓 IFC">
          <p className="text-sm text-muted-foreground leading-relaxed">O IFC oferece cursos técnicos, de graduação e pós-graduação gratuitos em Santa Catarina.</p>
          <a href="https://ingresso.ifc.edu.br/guia-de-cursos" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🎓 IFSC">
          <p className="text-sm text-muted-foreground leading-relaxed">O IFSC oferece cursos técnicos e superiores gratuitos em todo o estado de SC.</p>
          <a href="https://www.ifsc.edu.br/cursos" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>
        <AccordionSection titulo="🏫 Institutos Federais">
          <p className="text-sm text-muted-foreground leading-relaxed">Cursos técnicos e superiores 100% gratuitos em todo o Brasil. Pesquise: "Instituto Federal + sua cidade".</p>
        </AccordionSection>
        <AccordionSection titulo="🎓 Universidades Federais">
          <p className="text-sm text-muted-foreground leading-relaxed">Graduação gratuita em diversas áreas em todo o Brasil. Ingresso principal pelo SISU com nota do ENEM.</p>
        </AccordionSection>
        <AccordionSection titulo="💻 UAB">
          <p className="text-sm text-muted-foreground leading-relaxed">Graduação a distância gratuita em universidades públicas. Ideal para estudar de casa.</p>
          <a href="https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/articulacao-e-inovacao-em-educacao-aberta/sistema-universidade-aberta-do-brasil" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
        </AccordionSection>

        {/* SENAI e SENAC em acordeão */}
        <AccordionSection titulo="⚠️ SENAI e SENAC — Cursos com vagas gratuitas periódicas">
          <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3">
            <p className="text-xs leading-relaxed text-foreground">⚠️ <strong>Atenção:</strong> a maioria dos cursos é paga. Porém, periodicamente são abertas vagas gratuitas por editais e programas especiais. Fique atento e candidate-se quando abrirem.</p>
          </div>
          <AccordionSection titulo="⚙️ SENAI">
            <p className="text-sm text-muted-foreground leading-relaxed">Cursos técnicos na área industrial, incluindo eletricidade. Acompanhe os editais de vagas gratuitas.</p>
            <a href="https://sc.senai.br/pt-br/editais-gratuidade-senai" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
          </AccordionSection>
          <AccordionSection titulo="🛎️ SENAC">
            <p className="text-sm text-muted-foreground leading-relaxed">Cursos em comércio, gastronomia, beleza, informática e mais. Acompanhe as vagas gratuitas.</p>
            <a href="https://portal.sc.senac.br/cursos-gratuitos" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar</a>
          </AccordionSection>
        </AccordionSection>

        {/* Certificação da Educação Básica */}
        <CategoriaHeader titulo="📋 Certificação da Educação Básica" />

        <AccordionSection titulo="📋 ENCCEJA">
          <p className="text-sm text-muted-foreground leading-relaxed">O ENCCEJA é um exame gratuito do governo para quem não concluiu o Ensino Fundamental ou Médio e deseja obter a certificação. Ter o certificado do Ensino Médio amplia suas possibilidades de acesso a cursos, concursos e processos seletivos.</p>
          <a href="https://encceja.inep.gov.br" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">🔗 Acessar site oficial</a>
        </AccordionSection>

        <button onClick={onBack} className="w-full text-sm text-muted-foreground underline underline-offset-4 py-2">
          ← Voltar para Caminhos de Estudo
        </button>
      </div>
    </div>
  );
}