import { useMutation } from '@tanstack/react-query';
import { type Usuario } from '../interfaces/Usuario';
import { type TokenResponse } from '../interfaces/TokenResponse';

const efetuarLogin = async (usuario: Usuario): Promise<TokenResponse> => {
  // ✅ CORREÇÃO AQUI: Adicionado o prefixo /usuarios
  const response = await fetch('http://localhost:8080/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Conta ou senha inválida.');
  }

  return response.json();
};

const useEfetuarLogin = () => {
  return useMutation<TokenResponse, Error, Usuario>({
    mutationFn: efetuarLogin,
  });
};

export default useEfetuarLogin;