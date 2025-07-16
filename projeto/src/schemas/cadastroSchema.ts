// src/schemas/cadastroSchema.ts
import { z } from 'zod';

export const cadastroSchema = z.object({
  // ✅ Validação atualizada para nome de usuário
  username: z.string().min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres." }),
  senha: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
  confirmacaoSenha: z.string()
}).refine((data) => data.senha === data.confirmacaoSenha, {
  message: "As senhas não coincidem.",
  path: ["confirmacaoSenha"],
});

export type CadastroSchema = z.infer<typeof cadastroSchema>;