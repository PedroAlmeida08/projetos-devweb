import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type CheckoutDTO } from '../interfaces/CheckoutDTO'; // Supondo que seus DTOs estão em 'interfaces'

const criarPedido = async (checkoutData: CheckoutDTO): Promise<string> => {
  const response = await fetch('http://localhost:8080/api/pedidos/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkoutData),
  });

  const responseBody = await response.text();
  if (!response.ok) {
    throw new Error(responseBody || 'Não foi possível finalizar o pedido.');
  }
  return responseBody; // Retorna a mensagem de sucesso do backend
};

const useCriarPedidoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<string, Error, CheckoutDTO>({
    mutationFn: criarPedido,
    onSuccess: () => {
      // Opcional: invalidar queries relacionadas a histórico de pedidos, se houver
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
    },
  });
};

export default useCriarPedidoMutation;