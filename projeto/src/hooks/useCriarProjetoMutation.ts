import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Projeto } from '../interfaces/Projeto';

// A API espera receber um objeto Projeto, mas sem o ID, que será gerado no backend.
// Omit é um utilitário do TypeScript para criar um novo tipo omitindo certas chaves.
type NovoProjetoDTO = Omit<Projeto, 'id' | 'autor'> & { autorId: number };


const criarProjeto = async (novoProjeto: NovoProjetoDTO): Promise<Projeto> => {
  // ATENÇÃO: O endpoint e o DTO devem corresponder ao seu backend.
  // Pode ser necessário ajustar o DTO para enviar apenas o ID do autor, por exemplo.
  const response = await fetch(`http://localhost:8080/api/admin/projetos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoProjeto),
  });
  if (!response.ok) {
    throw new Error('Não foi possível criar o projeto.');
  }
  return response.json();
};

const useCriarProjetoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Projeto, Error, NovoProjetoDTO>({
    mutationFn: criarProjeto,
    onSuccess: () => {
      // Invalida a query de projetos para forçar a atualização da lista
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
    },
  });
};

export default useCriarProjetoMutation;