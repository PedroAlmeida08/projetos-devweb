import { useQuery } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

const fetchProjetosFavoritos = async (usuarioId: number): Promise<Projeto[]> => {
  if (usuarioId === 0) return [];
  const response = await fetch(`http://localhost:8080/api/favoritos/${usuarioId}`);
  if (!response.ok) {
    throw new Error('Não foi possível buscar os projetos favoritos.');
  }
  return response.json();
};

const useProjetosFavoritosQuery = (usuarioId: number) => {
  return useQuery<Projeto[], Error>({
    queryKey: ['projetos', 'favoritos', usuarioId],
    queryFn: () => fetchProjetosFavoritos(usuarioId),
    enabled: usuarioId > 0,
  });
};

export default useProjetosFavoritosQuery;