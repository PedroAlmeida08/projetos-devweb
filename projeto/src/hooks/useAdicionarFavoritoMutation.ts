// src/hooks/useAdicionarFavoritoMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUsuarioStore from '../store/UsuarioStore';

interface FavoritoPayload {
  usuarioId: number;
  projetoId: number;
}

const adicionarFavorito = async ({ usuarioId, projetoId }: FavoritoPayload): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/favoritos/${usuarioId}/${projetoId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Não foi possível adicionar aos favoritos.');
  }
};

const useAdicionarFavoritoMutation = () => {
  const queryClient = useQueryClient();
  const adicionarAoStore = useUsuarioStore((s) => s.adicionarFavorito);

  return useMutation<void, Error, FavoritoPayload>({
    mutationFn: adicionarFavorito,
    onSuccess: (data, variables) => {
      // Atualiza o estado global do Zustand (Update Otimista)
      adicionarAoStore(variables.projetoId);

      // Invalida as queries para forçar a atualização dos dados
      queryClient.invalidateQueries({ queryKey: ['projetos', 'favoritos', variables.usuarioId] });
      queryClient.invalidateQueries({ queryKey: ['favoritos', variables.usuarioId, 'ids'] });
    },
  });
};

export default useAdicionarFavoritoMutation;