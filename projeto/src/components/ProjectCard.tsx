import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Projeto } from '../interfaces/Projeto';
import useUsuarioStore from '../store/UsuarioStore';
import { useCarrinhoStore } from '../store/CarrinhoStore';
import useAdicionarFavoritoMutation from '../hooks/useAdicionarFavoritoMutation';
import useRemoverFavoritoMutation from '../hooks/useRemoverFavoritoMutation';

interface ProjectCardProps {
  projeto: Projeto;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  // --- HOOKS ---
  // Acessa os estados e ações dos stores globais
  const { user, favoritoIds } = useUsuarioStore();
  const { itens: itensNoCarrinho, adicionarItem, diminuirItem } = useCarrinhoStore();

  // Hook para navegação
  const navigate = useNavigate();
  
  // Hooks de mutação para favoritos
  const addFavoritoMutation = useAdicionarFavoritoMutation();
  const removeFavoritoMutation = useRemoverFavoritoMutation();

  // --- ESTADO DERIVADO ---
  // Verifica se este card específico é um favorito e se está no carrinho
  const isFavorito = user ? favoritoIds.has(projeto.id) : false;
  const itemNoCarrinho = itensNoCarrinho.find(item => item.projeto.id === projeto.id);

  // --- HANDLERS DE EVENTOS ---
  const handleToggleFavorito = () => {
    if (!user) {
      navigate('/login'); // Redireciona se não estiver logado
      return;
    }
    if (isFavorito) {
      removeFavoritoMutation.mutate({ usuarioId: user.id, projetoId: projeto.id });
    } else {
      addFavoritoMutation.mutate({ usuarioId: user.id, projetoId: projeto.id });
    }
  };

  const handleAdicionarAoCarrinho = () => {
    if (!user) {
      navigate('/login'); // Redireciona se não estiver logado
      return;
    }
    adicionarItem(projeto);
  };

  // --- LÓGICA DE FORMATAÇÃO ---
  const imageUrl = `/assets/${projeto.imagem}`;
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
            style={{ zIndex: 10, lineHeight: 0, border: 'none' }}
            aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
         >
            <img 
              src={isFavorito ? '/icons/heart-fill.svg' : '/icons/heart.svg'} 
              alt="Ícone de Favorito"
              style={{ width: '18px', height: '18px' }}
            />
         </button>
      )}

      <img src={imageUrl} className="card-img-top card-img-fixed" alt={projeto.nome} />
      
      <div className="card-body text-center py-4 d-flex flex-column">
        <h5 className="card-title">{projeto.nome}</h5>
        <p className="card-text text-muted flex-grow-1">{projeto.descricao}</p>
        
        <div className="mt-auto">
          <p className="h5 my-3">R$ {projeto.preco.toFixed(2)}</p>
          
          {/* Renderização condicional do botão do carrinho */}
          {itemNoCarrinho ? (
            // Se o item JÁ ESTÁ no carrinho, mostra o controle de quantidade
            <div className="d-flex justify-content-center align-items-center">
              <div className="input-group" style={{ width: '150px' }}>
                <button className="btn btn-outline-secondary" onClick={() => diminuirItem(projeto.id)}>-</button>
                <span className="form-control text-center fw-bold">{itemNoCarrinho.quantidade}</span>
                <button className="btn btn-outline-secondary" onClick={() => adicionarItem(projeto)}>+</button>
              </div>
            </div>
          ) : (
            // Se NÃO ESTÁ no carrinho, mostra o botão original
            <button onClick={handleAdicionarAoCarrinho} className="btn btn-primary">
              <i className="bi bi-cart-plus"></i> Adicionar ao Carrinho
            </button>
          )}
        </div>
      </div>

      <div className="card-footer text-muted" style={{ fontSize: '0.8rem' }}>
        <span className="float-start">Por: {projeto.autor.nome}</span>
        <span className="float-end">{dataFormatada}</span>
      </div>
    </div>
  );
};

export default ProjectCard;