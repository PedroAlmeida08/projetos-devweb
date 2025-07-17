import { useQuery } from '@tanstack/react-query';
import { type Autor } from '../interfaces/Autor';

const fetchAutores = async (): Promise<Autor[]> => {
  const response = await fetch('http://localhost:8080/api/autores');
  if (!response.ok) {
    throw new Error('Não foi possível buscar os autores.');
  }
  return response.json();
};

const useAutoresQuery = () => {
  return useQuery<Autor[], Error>({
    queryKey: ['autores'],
    queryFn: fetchAutores,
  });
};

export default useAutoresQuery;