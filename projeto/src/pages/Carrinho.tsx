import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinhoStore } from '../store/CarrinhoStore';
import QuantityInput from '../components/QuantityInput'; // 1. Importa o componente reutilizável

const Carrinho: React.FC = () => {
  // Acessa os estados e as ações do store do carrinho
  const { itens, total, removerItem, adicionarItem, diminuirItem, setItemQuantidade, limparCarrinho } = useCarrinhoStore();

  const handleFinalizarCompra = () => {
    if (itens.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    alert('Compra efetuada com sucesso!');
    limparCarrinho();
  };

  return (
    <section id="carrinho">
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="display-4">Meu Carrinho de Compras</h1>
        </div>

        {itens.length === 0 ? (
          <div className="text-center">
            <p className="lead">Seu carrinho está vazio.</p>
            <Link to="/projects" className="btn btn-primary">Ver Projetos</Link>
          </div>
        ) : (
          <>
            <div className="card shadow-sm">
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {itens.map(item => (
                    <li key={item.projeto.id} className="list-group-item d-flex justify-content-between align-items-center flex-wrap px-0 py-3">
                      
                      {/* Informações do Produto */}
                      <div className="d-flex align-items-center col-12 col-md-5 mb-3 mb-md-0">
                        <img src={`/assets/${item.projeto.imagem}`} alt={item.projeto.nome} style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="me-3 rounded" />
                        <div>
                          <h6 className="my-0">{item.projeto.nome}</h6>
                          <small className="text-muted">R$ {item.projeto.preco.toFixed(2)} / unidade</small>
                        </div>
                      </div>
                      
                      {/* Controles de Quantidade e Preço */}
                      <div className="d-flex align-items-center justify-content-end col-12 col-md-7">
                        
                        {/* ✅ CONTROLE DE QUANTIDADE ATUALIZADO ✅ */}
                        <div className="me-3">
                          <QuantityInput 
                            quantidade={item.quantidade}
                            onAumentar={() => adicionarItem(item.projeto)}
                            onDiminuir={() => diminuirItem(item.projeto.id)}
                            onDefinir={(novaQtde) => setItemQuantidade(item.projeto.id, novaQtde)}
                          />
                        </div>

                        <span className="fw-bold me-3" style={{ minWidth: '90px', textAlign: 'right' }}>
                          R$ {(item.projeto.preco * item.quantidade).toFixed(2)}
                        </span>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => removerItem(item.projeto.id)} aria-label="Remover item">
                          &times;
                        </button>
                      </div>

                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Seção do Resumo e Ações */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
              <Link to="/projects" className="btn btn-outline-secondary mb-3 mb-md-0">
                Continuar Comprando
              </Link>
              <div className="d-flex align-items-center">
                <h4 className="mb-0 me-3">Total: <span className="fw-bold">R$ {total.toFixed(2)}</span></h4>
                <button className="btn btn-success btn-lg" onClick={handleFinalizarCompra}>
                  Finalizar Compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Carrinho;