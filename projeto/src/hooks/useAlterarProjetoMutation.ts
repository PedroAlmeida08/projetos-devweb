import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

const alterarProjeto = async (projeto: Projeto): Promise<Projeto> => {
  const response = await fetch(`http://localhost:8080/api/admin/projetos/${projeto.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projeto),
  });
  if (!response.ok) {
    throw new Error('Não foi possível alterar o projeto.');
  }
  return response.json();
};

const useAlterarProjetoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Projeto, Error, Projeto>({
    mutationFn: alterarProjeto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
    },
  });
};

export default useAlterarProjetoMutation;