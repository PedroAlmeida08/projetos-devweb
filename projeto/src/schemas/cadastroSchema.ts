// src/schemas/cadastroSchema.ts
import { z } from 'zod';

export const cadastroSchema = z.object({
  conta: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  senha: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  confirmacaoSenha: z.string()
}).refine((data) => data.senha === data.confirmacaoSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmacaoSenha"], // Anexa o erro ao campo de confirmação
});

// Extrai o tipo TypeScript do schema para usar nos nossos componentes
export type CadastroSchema = z.infer<typeof cadastroSchema>;