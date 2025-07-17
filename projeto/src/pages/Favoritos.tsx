import React from 'react';
import useUsuarioStore from '../store/UsuarioStore';
import useProjetosFavoritosQuery from '../hooks/useProjetosFavoritosQuery';
import ProjectCard from '../components/ProjectCard';

const Favoritos: React.FC = () => {
  // 1. Pega as informações do usuário logado do store global.
  const user = useUsuarioStore((s) => s.user);

  // 2. Usa o hook do React Query para buscar os projetos favoritos.
  // A exclamação '!' em user!.id diz ao TypeScript: "Eu garanto que 'user' não é nulo aqui",
  // pois esta página está protegida pela PrivateRoute.
  const { data: projetos, isLoading, error } = useProjetosFavoritosQuery(user!.id);

  // 3. Renderiza um estado de carregamento enquanto os dados são buscados.
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

  // 4. Renderiza uma mensagem de erro se a busca falhar.
  if (error) {
    return (
        <div className="container text-center my-5">
            <div className="alert alert-danger">
                <strong>Erro ao carregar favoritos:</strong> {error.message}
            </div>
        </div>
    );
  }

  // 5. Renderização principal quando os dados estão prontos.
  return (
    <section id="favoritos" className="mt-2">
      <div className="container-lg">
        <div className="text-center mb-5">
          <h1 className="display-4">Meus Projetos Favoritos</h1>
          <p className="lead text-muted">Seus projetos salvos em um só lugar para fácil acesso.</p>
        </div>
        <div className="container my-5">
          {/* Verifica se a lista de projetos favoritos não está vazia */}
          {projetos && projetos.length > 0 ? (
            <div className="row g-4 justify-content-center">
              {/* Mapeia a lista e renderiza um ProjectCard para cada projeto */}
              {projetos.map((projeto) => (
                <div className="col-10 col-md-6 col-lg-4" key={projeto.id}>
                  <ProjectCard projeto={projeto} />
                </div>
              ))}
            </div>
          ) : (
            // Mensagem exibida se a lista de favoritos estiver vazia
            <div className="text-center">
              <p className="lead">Você ainda não adicionou nenhum projeto aos seus favoritos.</p>
              <p className="text-muted">Clique no ícone de coração nos projetos que você gostar para adicioná-los aqui!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favoritos;