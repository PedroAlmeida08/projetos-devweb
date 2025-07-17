import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useEfetuarLogin from '../hooks/useEfetuarLogin';
import useUsuarioStore from '../store/UsuarioStore';
import { loginSchema, type LoginSchema } from '../schemas/loginSchema';
import { type TokenResponse } from '../interfaces/TokenResponse';

const LoginForm: React.FC = () => {
  // Acessamos as ações que vamos precisar do store
  const { setUsuario, setFavoritos } = useUsuarioStore();
  const [apiError, setApiError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [registrationMessage, setRegistrationMessage] = useState(location.state?.message);

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
        // 1. Salva os dados completos do usuário no store
        const userInfo = { 
          id: tokenResponse.token, 
          username: tokenResponse.username, 
          role: tokenResponse.role 
        };
        setUsuario(userInfo);
        
        // 2. Busca os IDs dos projetos favoritos deste usuário
        const response = await fetch(`http://localhost:8080/api/favoritos/${userInfo.id}/ids`);
        const favoritosIds: number[] = await response.json();
        setFavoritos(favoritosIds);

        // 3. Redireciona para a página de destino ou para a home
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