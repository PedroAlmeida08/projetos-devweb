import { useMutation, useQueryClient } from '@tanstack/react-query';

const deletarProjeto = async (projetoId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/api/admin/projetos/${projetoId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Não foi possível deletar o projeto.');
  }
};

const useDeletarProjetoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deletarProjeto,
    onSuccess: () => {
      // Invalida todas as queries que dependem de projetos ou favoritos
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      queryClient.invalidateQueries({ queryKey: ['favoritos'] });
    },
  });
};

export default useDeletarProjetoMutation;