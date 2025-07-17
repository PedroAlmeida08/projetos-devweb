// src/hooks/useRemoverFavoritoMutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'; // 1. Importe o useQueryClient
import useUsuarioStore from '../store/UsuarioStore';

interface FavoritoPayload {
  usuarioId: number;
  projetoId: number;
}

const removerFavorito = async ({ usuarioId, projetoId }: FavoritoPayload): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/favoritos/${usuarioId}/${projetoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Não foi possível remover dos favoritos.');
  }
};

const useRemoverFavoritoMutation = () => {
  // 2. Obtenha o queryClient
  const queryClient = useQueryClient();
  const removerDoStore = useUsuarioStore((s) => s.removerFavorito);

  return useMutation<void, Error, FavoritoPayload>({
    mutationFn: removerFavorito,
    // 3. Adicione o callback onSuccess
    onSuccess: (data, variables) => {
      // Atualiza o estado global do Zustand (Update Otimista)
      removerDoStore(variables.projetoId);

      // Invalida as queries relacionadas a favoritos para forçar uma nova busca de dados.
      // Isso garantirá que a página de favoritos e os ícones de estrela em outras páginas sejam atualizados.
      queryClient.invalidateQueries({ queryKey: ['projetos', 'favoritos', variables.usuarioId] });
      queryClient.invalidateQueries({ queryKey: ['favoritos', variables.usuarioId, 'ids'] });
    },
  });
};

export default useRemoverFavoritoMutation;