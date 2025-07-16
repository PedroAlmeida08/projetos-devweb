// src/schemas/loginSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  conta: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  senha: z.string().min(1, { message: "Por favor, insira sua senha." }), // Apenas verificamos que não está vazia
});

export type LoginSchema = z.infer<typeof loginSchema>;