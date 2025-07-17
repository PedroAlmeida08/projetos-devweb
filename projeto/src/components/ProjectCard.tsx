import React from 'react';
import { type Projeto } from '../interfaces/Projeto';
import useUsuarioStore from '../store/UsuarioStore';
import useAdicionarFavoritoMutation from '../hooks/useAdicionarFavoritoMutation';
import useRemoverFavoritoMutation from '../hooks/useRemoverFavoritoMutation';

interface ProjectCardProps {
  projeto: Projeto;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  // Acessa o estado e as ações do store global
  const { user, favoritoIds } = useUsuarioStore();
  
  // Inicializa os hooks de mutação do React Query
  const addFavoritoMutation = useAdicionarFavoritoMutation();
  const removeFavoritoMutation = useRemoverFavoritoMutation();

  // Verifica se este card específico é um favorito
  const isFavorito = user ? favoritoIds.has(projeto.id) : false;

  // Função para alternar o estado de favorito
  const handleToggleFavorito = () => {
    // Impede a ação se o usuário não estiver logado
    if (!user) {
      alert("Você precisa estar logado para adicionar projetos aos favoritos.");
      return;
    }

    // Chama a mutação apropriada com base no estado atual
    if (isFavorito) {
      removeFavoritoMutation.mutate({ usuarioId: user.id, projetoId: projeto.id });
    } else {
      addFavoritoMutation.mutate({ usuarioId: user.id, projetoId: projeto.id });
    }
  };

  // Monta o caminho para a imagem do projeto
  const imageUrl = `/assets/${projeto.imagem}`;

  // Lógica robusta para formatar a data
  let dataFormatada = 'Data indisponível';
  if (projeto.dataCadastro) {
    const partesData = projeto.dataCadastro.split('-');
    const dataUTC = new Date(Date.UTC(Number(partesData[0]), Number(partesData[1]) - 1, Number(partesData[2])));

    if (!isNaN(dataUTC.getTime())) {
      dataFormatada = dataUTC.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }
  }

  return (
    <div className="card border-1 h-100 shadow-sm position-relative">
      
      {/* Botão de Favoritar: visível apenas para usuários logados */}
      {user && (
         <button 
            onClick={handleToggleFavorito} 
            className="btn btn-light btn-sm position-absolute top-0 start-0 m-2" 
            style={{ zIndex: 10, lineHeight: 0, border: 'none' }} // Estilos para o botão do ícone
            aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
         >
            <img 
              src={isFavorito ? '/icons/heart-fill.svg' : '/icons/heart.svg'} 
              alt="Ícone de Favorito"
              style={{ width: '18px', height: '18px' }} // Tamanho do ícone
            />
         </button>
      )}

      {/* Selo de Destaque: visível se projeto.destaque for true */}
      {projeto.destaque && (
        <span className="badge bg-primary position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
          Destaque
        </span>
      )}

      <img src={imageUrl} className="card-img-top card-img-fixed" alt={projeto.nome} />
      
      <div className="card-body text-center py-4 d-flex flex-column">
        <h4 className="card-title">{projeto.nome}</h4>
        <p className="card-text text-muted flex-grow-1">{projeto.descricao}</p>
        <a
          href={projeto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-lg mt-3"
        >
          Ver mais
        </a>
      </div>

      <div className="card-footer text-muted" style={{ fontSize: '0.8rem' }}>
        <span className="float-start">Por: {projeto.autor.nome}</span>
        <span className="float-end">{dataFormatada}</span>
      </div>
    </div>
  );
};

export default ProjectCard;