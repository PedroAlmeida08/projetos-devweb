import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useEfetuarLogin from '../hooks/useEfetuarLogin';
import useUsuarioStore from '../store/UsuarioStore';
import { loginSchema, type LoginSchema } from '../schemas/loginSchema';
import { type TokenResponse } from '../interfaces/TokenResponse';
import useListarIdsFavoritosQuery from '../hooks/useListarIdsFavoritosQuery';

const LoginForm: React.FC = () => {
  const { setUsuarioLogado, setFavoritos } = useUsuarioStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState(location.state?.message);
  
  // Hook para buscar os favoritos APÓS o login
  const { refetch: refetchFavoritos } = useListarIdsFavoritosQuery(useUsuarioStore.getState().usuarioId);

  useEffect(() => {
    if (registrationMessage) {
      const timer = setTimeout(() => setRegistrationMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationMessage]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: efetuarLogin, error: mutationError } = useEfetuarLogin();

  const onSubmit = (data: LoginSchema) => {
    setApiError(null);
    efetuarLogin(data, {
      onSuccess: async (tokenResponse: TokenResponse) => {
        const userId = tokenResponse.token;
        setUsuarioLogado(userId);
        
        // Busca os favoritos do usuário que acabou de logar
        const response = await fetch(`http://localhost:8080/api/favoritos/${userId}/ids`);
        const favoritosIds: number[] = await response.json();
        setFavoritos(favoritosIds);

        const destino = location.state?.destino || "/";
        navigate(destino);
      },
      onError: (error) => {
        setApiError(error.message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {registrationMessage && <div className="alert alert-success">{registrationMessage}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}
      {mutationError && !apiError && <div className="alert alert-danger">Erro de comunicação: {mutationError.message}</div>}
      
      {/* Inputs do formulário... */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nome de Usuário</label>
        <input type="text" id="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} {...register('username')} />
        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input type="password" id="senha" className={`form-control ${errors.senha ? 'is-invalid' : ''}`} {...register('senha')} />
        {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
      <p className="mt-3 text-center">
        Não tem uma conta? <Link to="/cadastrar">Cadastre-se aqui</Link>
      </p>
    </form>
  );
};
export default LoginForm;