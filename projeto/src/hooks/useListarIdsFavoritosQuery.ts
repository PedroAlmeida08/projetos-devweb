import { useQuery } from '@tanstack/react-query';

const fetchIdsFavoritos = async (usuarioId: number): Promise<number[]> => {
  if (usuarioId === 0) return []; // Não busca se não houver usuário logado
  const response = await fetch(`http://localhost:8080/api/favoritos/${usuarioId}/ids`);
  if (!response.ok) {
    throw new Error('Não foi possível buscar os IDs dos favoritos.');
  }
  return response.json();
};

const useListarIdsFavoritosQuery = (usuarioId: number) => {
  return useQuery<number[], Error>({
    queryKey: ['favoritos', usuarioId, 'ids'],
    queryFn: () => fetchIdsFavoritos(usuarioId),
    enabled: usuarioId > 0, // O query só será executado se o usuarioId for válido
  });
};

export default useListarIdsFavoritosQuery;