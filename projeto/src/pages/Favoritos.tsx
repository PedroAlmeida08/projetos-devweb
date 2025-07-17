import React from 'react';
import { Link } from 'react-router-dom';
import useUsuarioStore from '../store/UsuarioStore';
import useProjetosFavoritosQuery from '../hooks/useProjetosFavoritosQuery';
import { useCarrinhoStore } from '../store/CarrinhoStore';
import useRemoverFavoritoMutation from '../hooks/useRemoverFavoritoMutation';
import QuantityInput from '../components/QuantityInput'; // Importa o novo componente

const Favoritos: React.FC = () => {
  const user = useUsuarioStore((s) => s.user);
  
  // Acessa o estado e as ações do carrinho
  const { itens: itensNoCarrinho, adicionarItem, diminuirItem, setItemQuantidade } = useCarrinhoStore();
  
  const { data: projetosFavoritos, isLoading, error } = useProjetosFavoritosQuery(user!.id);
  const removerFavoritoMutation = useRemoverFavoritoMutation();

  const handleRemoverFavorito = (projetoId: number) => {
    removerFavoritoMutation.mutate({ usuarioId: user!.id, projetoId });
  };

  if (isLoading) return <div className="container text-center my-5"><div className="spinner-border text-primary" /></div>;
  if (error) return <div className="container text-center my-5 alert alert-danger">Erro: {error.message}</div>;

  return (
    <section id="favoritos">
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="display-4">Meus Projetos Favoritos</h1>
          <p className="lead text-muted">Gerencie seus projetos e adicione-os ao carrinho diretamente daqui.</p>
        </div>

        {projetosFavoritos && projetosFavoritos.length > 0 ? (
          <ul className="list-group shadow-sm">
            <li className="list-group-item d-none d-md-flex bg-light">
              <div className="col-md-5 fw-bold">Projeto</div>
              <div className="col-md-2 fw-bold text-center">Preço Unitário</div>
              <div className="col-md-2 fw-bold text-center">Quantidade no Carrinho</div>
              <div className="col-md-2 fw-bold text-end">Preço Total</div>
              <div className="col-md-1 fw-bold text-end">Ação</div>
            </li>

            {projetosFavoritos.map(projeto => {
              const itemNoCarrinho = itensNoCarrinho.find(i => i.projeto.id === projeto.id);
              const quantidade = itemNoCarrinho?.quantidade || 0;
              const precoTotal = projeto.preco * quantidade;

              return (
                <li key={projeto.id} className="list-group-item d-flex align-items-center flex-wrap">
                  <div className="col-12 col-md-5 d-flex align-items-center mb-2 mb-md-0">
                    <img src={`/assets/${projeto.imagem}`} alt={projeto.nome} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="me-3 rounded" />
                    <span>{projeto.nome}</span>
                  </div>
                  <div className="col-4 col-md-2 text-md-center">
                    <span className="d-md-none">Preço: </span>R$ {projeto.preco.toFixed(2)}
                  </div>
                  <div className="col-8 col-md-2 d-flex justify-content-end justify-content-md-center">
                    
                    {/* ✅ USANDO O NOVO COMPONENTE CONTROLADO ✅ */}
                    <QuantityInput 
                      quantidade={quantidade}
                      onAumentar={() => adicionarItem(projeto)}
                      onDiminuir={() => diminuirItem(projeto.id)}
                      onDefinir={(novaQtde) => setItemQuantidade(projeto.id, novaQtde)}
                    />

                  </div>
                  <div className="col-6 col-md-2 text-md-end fw-bold">
                    <span className="d-md-none">Total: </span>R$ {precoTotal.toFixed(2)}
                  </div>
                  <div className="col-6 col-md-1 text-end">
                    <button 
                      onClick={() => handleRemoverFavorito(projeto.id)}
                      className="btn btn-sm btn-outline-danger"
                      aria-label="Remover dos favoritos"
                      title="Remover dos favoritos"
                    >
                      <img src='/icons/heart-fill.svg' alt="Remover favorito" style={{ width: '16px' }}/>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center">
            <p className="lead">Você ainda não adicionou nenhum projeto aos seus favoritos.</p>
            <Link to="/projects" className="btn btn-primary">Ver Projetos</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Favoritos;