/**
 * Representa um único item dentro do payload de checkout,
 * contendo apenas as informações essenciais para o backend.
 */
export interface ItemCarrinhoDTO {
  projetoId: number;
  quantidade: number;
}

/**
 * Representa o objeto completo (o "pacote de dados") enviado
 * para o endpoint POST /api/pedidos/checkout no backend.
 */
export interface CheckoutDTO {
  usuarioId: number;
  itens: ItemCarrinhoDTO[];
}