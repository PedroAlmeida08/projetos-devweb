// src/hooks/useEfetuarLogin.ts
import { useMutation } from '@tanstack/react-query';
import { type Usuario } from '../interfaces/Usuario';
import { type TokenResponse } from '../interfaces/TokenResponse';

// A função que realmente faz a chamada à API
const efetuarLogin = async (usuario: Usuario): Promise<TokenResponse> => {
  const response = await fetch('http://localhost:8080/login', { // Endpoint de login no backend
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    // Lança um erro que será capturado pelo React Query
    throw new Error('Conta ou senha inválida. Por favor, tente novamente.');
  }

  return response.json();
};

// O Hook customizado que usa a função acima
const useEfetuarLogin = () => {
  return useMutation<TokenResponse, Error, Usuario>({
    mutationFn: efetuarLogin,
  });
};

export default useEfetuarLogin;