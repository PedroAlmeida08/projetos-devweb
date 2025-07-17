import { useQuery } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

/**
 * Interface para tipar a resposta paginada que vem do backend Spring.
 * O array de projetos está na propriedade 'content'.
 */
interface ProjetoPage {
  content: Projeto[];
  // ... outros campos de paginação que não usaremos aqui
}

/**
 * A função que faz a chamada à API para buscar os projetos.
 * @returns Uma promessa que resolve para um array de Projetos.
 */
const fetchProjetos = async (): Promise<Projeto[]> => {
  // Adicionamos '?size=200' para pedir uma página grande o suficiente
  // que contenha todos os projetos. Ajuste o número se necessário.
  const response = await fetch('http://localhost:8080/projetos?size=200');
  
  if (!response.ok) {
    throw new Error('Falha ao buscar projetos do backend.');
  }
  
  // Pega o objeto de Página completo da API
  const pageData: ProjetoPage = await response.json();
  
  // Retorna apenas o array de projetos que está dentro da propriedade "content"
  return pageData.content; 
};

/**
 * Hook customizado do React Query para buscar e gerenciar o estado da lista de projetos.
 * Componentes que usam este hook receberão automaticamente a lista de projetos,
 * o estado de carregamento, erros, e terão o cache gerenciado.
 */
const useProjetosQuery = () => {
  return useQuery<Projeto[], Error>({ 
    // 'projetos' é a chave de cache para esta requisição.
    queryKey: ['projetos'], 
    queryFn: fetchProjetos 
  });
};

export default useProjetosQuery;