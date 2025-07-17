import React from 'react';
import useUsuarioStore from '../store/UsuarioStore';
import useProjetosFavoritosQuery from '../hooks/useProjetosFavoritosQuery';
import ProjectCard from '../components/ProjectCard';

const Favoritos: React.FC = () => {
  const usuarioId = useUsuarioStore((s) => s.usuarioId);
  const { data: projetos, isLoading, error } = useProjetosFavoritosQuery(usuarioId);

  if (isLoading) {
    return (
      <div className="container text-center my-5">
        <p className="lead">Carregando seus favoritos...</p>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container text-center my-5 alert alert-danger">Erro: {error.message}</div>;
  }

  return (
    <section id="favoritos" className="mt-2">
      <div className="container-lg">
        <div className="text-center mb-5">
          <h1 className="display-4">Meus Projetos Favoritos</h1>
          <p className="lead text-muted">Seus projetos salvos em um só lugar.</p>
        </div>
        <div className="container my-5">
          {projetos && projetos.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {projetos.map((projeto) => (
                <div className="col-10 col-md-6 col-lg-4" key={projeto.id}>
                  <ProjectCard projeto={projeto} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p>Você ainda não adicionou nenhum projeto aos seus favoritos.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favoritos;