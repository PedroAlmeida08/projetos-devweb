import { create } from 'zustand';
import { type Projeto } from '../interfaces/Projeto';

/**
 * Define a 'forma' de um item dentro do carrinho.
 * A palavra 'export' permite que outros arquivos importem esta interface.
 */
export interface ItemCarrinho {
  projeto: Projeto;
  quantidade: number;
}

/**
 * Define a 'forma' completa do nosso store: os dados que ele armazena 
 * e as ações disponíveis para modificar esses dados.
 */
interface CarrinhoState {
  itens: ItemCarrinho[];
  total: number;
  totalItens: number;
  adicionarItem: (projeto: Projeto) => void;
  removerItem: (projetoId: number) => void;
  diminuirItem: (projetoId: number) => void;
  setItemQuantidade: (projetoId: number, quantidade: number) => void;
  limparCarrinho: () => void;
}

/**
 * Função auxiliar para recalcular os totais, evitando repetição de código.
 * @param itens A lista atual de itens no carrinho.
 * @returns Um objeto com o novo valor total e a nova quantidade total de itens.
 */
const recalcularTotais = (itens: ItemCarrinho[]) => {
  const novoTotal = itens.reduce((acc, item) => acc + (item.projeto.preco * item.quantidade), 0);
  const novoTotalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  return { novoTotal, novoTotalItens };
};

export const useCarrinhoStore = create<CarrinhoState>((set) => ({
  // --- ESTADO INICIAL ---
  itens: [],
  total: 0,
  totalItens: 0,

  // --- AÇÕES ---
  
  /** Adiciona um projeto ao carrinho ou incrementa sua quantidade se já existir. */
  adicionarItem: (projeto) => {
    set((state) => {
      const itemExistente = state.itens.find(item => item.projeto.id === projeto.id);
      let novosItens;
      if (itemExistente) {
        novosItens = state.itens.map(item => 
          item.projeto.id === projeto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        novosItens = [...state.itens, { projeto, quantidade: 1 }];
      }
      const { novoTotal, novoTotalItens } = recalcularTotais(novosItens);
      return { itens: novosItens, total: novoTotal, totalItens: novoTotalItens };
    });
  },

  /** Diminui a quantidade de um item. Se a quantidade for 1, o item é removido. */
  diminuirItem: (projetoId) => {
    set((state) => {
      const itemExistente = state.itens.find(item => item.projeto.id === projetoId);
      if (!itemExistente) return {};

      let novosItens;
      if (itemExistente.quantidade > 1) {
        novosItens = state.itens.map(item => 
          item.projeto.id === projetoId ? { ...item, quantidade: item.quantidade - 1 } : item
        );
      } else {
        novosItens = state.itens.filter(item => item.projeto.id !== projetoId);
      }
      const { novoTotal, novoTotalItens } = recalcularTotais(novosItens);
      return { itens: novosItens, total: novoTotal, totalItens: novoTotalItens };
    });
  },

  /** Define uma quantidade específica para um item. Se a quantidade for <= 0, o item é removido. */
  setItemQuantidade: (projetoId, quantidade) => {
    set((state) => {
      let novosItens;
      if (quantidade <= 0) {
        novosItens = state.itens.filter(item => item.projeto.id !== projetoId);
      } else {
        novosItens = state.itens.map(item => 
          item.projeto.id === projetoId ? { ...item, quantidade: quantidade } : item
        );
      }
      const { novoTotal, novoTotalItens } = recalcularTotais(novosItens);
      return { itens: novosItens, total: novoTotal, totalItens: novoTotalItens };
    });
  },

  /** Remove um item completamente do carrinho, independente da quantidade. */
  removerItem: (projetoId) => {
    set((state) => {
      const novosItens = state.itens.filter(item => item.projeto.id !== projetoId);
      const { novoTotal, novoTotalItens } = recalcularTotais(novosItens);
      return { itens: novosItens, total: novoTotal, totalItens: novoTotalItens };
    });
  },

  /** Esvazia completamente o carrinho. */
  limparCarrinho: () => set({ itens: [], total: 0, totalItens: 0 }),
}));