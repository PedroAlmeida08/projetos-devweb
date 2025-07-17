import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useUsuarioStore from '../store/UsuarioStore';
import useProjetosPaginadosQuery from '../hooks/useProjetosPaginadosQuery';
import useProjetosInfinitosQuery from '../hooks/useProjetosInfinitosQuery';
import ProjectCard from '../components/ProjectCard';

// ===================================================================
// 1. Sub-componente para a visão com PAGINAÇÃO CLÁSSICA (outros usuários)
// ===================================================================
const ProjetosViewPaginada: React.FC<{ busca: string }> = ({ busca }) => {
  const [page, setPage] = useState(0);
  const { data: projetoPage, error, isLoading } = useProjetosPaginadosQuery(page, busca);
  
  // Reseta a página para a primeira (0) sempre que a busca mudar
  useEffect(() => {
    setPage(0);
  }, [busca]);

  const handlePaginaAnterior = () => setPage(p => Math.max(0, p - 1));
  const handleProximaPagina = () => {
    if (projetoPage && !projetoPage.last) setPage(p => p + 1);
  };

  if (isLoading) return <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div></div>;
  if (error) return <div className="alert alert-danger">Erro ao carregar projetos: {error.message}</div>;

  return (
    <>
      {projetoPage?.content && projetoPage.content.length > 0 ? (
        <div className="row g-4 justify-content-center">
          {projetoPage.content.map(projeto => (
            <div className="col-10 col-md-6 col-lg-4" key={`pag-${projeto.id}`}>
              <ProjectCard projeto={projeto} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum projeto encontrado.</p>
      )}

      {/* Controles de Paginação */}
      {projetoPage && projetoPage.totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <button className="btn btn-primary" onClick={handlePaginaAnterior} disabled={projetoPage?.first}>
            Página Anterior
          </button>
          <span className="mx-3">
            Página {projetoPage.number + 1} de {projetoPage.totalPages}
          </span>
          <button className="btn btn-primary" onClick={handleProximaPagina} disabled={projetoPage?.last}>
            Próxima Página
          </button>
        </div>
      )}
    </>
  );
};


// ===================================================================
// 2. Sub-componente para a visão com SCROLL INFINITO (para o Admin 'root')
// ===================================================================
const ProjetosViewInfinita: React.FC<{ busca: string }> = ({ busca }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useProjetosInfinitosQuery(busca);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const projetos = data?.pages.flatMap(page => page.content) ?? [];

  if (isLoading) return <div className="text-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div></div>;
  if (error) return <div className="alert alert-danger">Erro ao carregar projetos: {error.message}</div>;

  return (
    <>
      {projetos.length > 0 ? (
        <div className="row g-4 justify-content-center">
          {projetos.map(projeto => (
            <div className="col-10 col-md-6 col-lg-4" key={`inf-${projeto.id}`}>
              <ProjectCard projeto={projeto} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">Nenhum projeto encontrado.</p>
      )}

      {/* Elemento "sentinela" para carregar mais */}
      <div ref={ref} className="text-center my-4">
        {isFetchingNextPage ? (
          <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div>
        ) : !hasNextPage && projetos.length > 0 ? (
          <p className="text-muted">Você chegou ao fim.</p>
        ) : null}
      </div>
    </>
  );
};


// ===================================================================
// 3. Componente Principal - O Orquestrador
// ===================================================================
const Projetos: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [buscaDebounced, setBuscaDebounced] = useState('');
  const user = useUsuarioStore((s) => s.user);

  // Verifica se o usuário é o admin 'root'
  const isAdmin = user?.username === 'root' && user?.role === 'ADMIN';

  // Efeito para "debouncing" (evita chamadas excessivas à API enquanto digita)
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuscaDebounced(busca);
    }, 500); // Espera 500ms após o usuário parar de digitar
    return () => clearTimeout(timer);
  }, [busca]);

  return (
    <section id="projetos" className="mt-2">
      <div className="container-lg">
        {/* UI Comum: Título e Barra de Busca */}
        <div className="text-center mb-5">
          <h1 className="display-4">Meus Projetos</h1>
          <p className="lead text-muted">Uma seleção de trabalhos que desenvolvi e participei.</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar projetos pelo nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Renderização Condicional: Escolhe qual visão mostrar com base no papel do usuário */}
        {isAdmin ? (
          <ProjetosViewInfinita busca={buscaDebounced} />
        ) : (
          <ProjetosViewPaginada busca={buscaDebounced} />
        )}
      </div>
    </section>
  );
};

export default Projetos;