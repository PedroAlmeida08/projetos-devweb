// src/hooks/useProjetosInfinitosQuery.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

interface ProjetoPage {
  content: Projeto[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  number: number;
}

const fetchProjetos = async ({ pageParam = 0, queryKey }: any): Promise<ProjetoPage> => {
  const [ , busca] = queryKey;
  const url = new URL('http://localhost:8080/projetos');
  url.searchParams.append('page', pageParam.toString());
  
  // ✅ ALTERAÇÃO AQUI: Mude o valor de '9' para '2' ✅
  url.searchParams.append('size', '2'); 

  if (busca) {
    url.searchParams.append('busca', busca);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Falha ao buscar projetos');
  }
  return response.json();
};

const useProjetosInfinitosQuery = (busca: string) => {
  return useInfiniteQuery<ProjetoPage, Error>({
    queryKey: ['projetos', busca],
    queryFn: fetchProjetos,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
      return undefined;
    },
  });
};

export default useProjetosInfinitosQuery;