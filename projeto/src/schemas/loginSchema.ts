// src/schemas/loginSchema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Por favor, insira seu nome de usuário." }), // ✅ Renomeado de 'conta'
  senha: z.string().min(1, { message: "Por favor, insira sua senha." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;