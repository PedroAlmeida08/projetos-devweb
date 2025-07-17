import { useQuery } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

// Interface para a resposta paginada do Spring
export interface ProjetoPage {
  content: Projeto[];
  last: boolean;       // true se for a última página
  first: boolean;      // true se for a primeira página
  totalPages: number;
  totalElements: number;
  number: number;      // número da página atual (base 0)
}

const fetchProjetos = async (page: number, busca: string): Promise<ProjetoPage> => {
  const url = new URL('http://localhost:8080/projetos');
  url.searchParams.append('page', page.toString());
  url.searchParams.append('size', '2'); // Mantemos o tamanho da página como 2
  if (busca) {
    url.searchParams.append('busca', busca);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Falha ao buscar projetos');
  }
  return response.json();
};

const useProjetosPaginadosQuery = (page: number, busca: string) => {
  return useQuery<ProjetoPage, Error>({
    // A chave da query agora inclui a página, para que o React Query
    // busque novamente os dados sempre que a página mudar.
    queryKey: ['projetos', { page, busca }],
    queryFn: () => fetchProjetos(page, busca),
    // Mantém os dados anteriores enquanto a nova página carrega, para uma transição suave
    placeholderData: (previousData) => previousData,
  });
};

export default useProjetosPaginadosQuery;