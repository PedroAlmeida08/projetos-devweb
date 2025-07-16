import React, { useState, useEffect } from 'react'; // 1. Importe useEffect
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useEfetuarLogin from '../hooks/useEfetuarLogin';
import useUsuarioStore from '../store/UsuarioStore';
import { loginSchema, type LoginSchema } from '../schemas/loginSchema';
import { type TokenResponse } from '../interfaces/TokenResponse';

const LoginForm: React.FC = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // 2. Cria um estado local para controlar a visibilidade da mensagem de cadastro
  const [registrationMessage, setRegistrationMessage] = useState(location.state?.message);

  // 3. useEffect para fazer a mensagem de sucesso desaparecer
  useEffect(() => {
    // Se existe uma mensagem...
    if (registrationMessage) {
      // Cria um temporizador para limpar a mensagem após 3 segundos
      const timer = setTimeout(() => {
        setRegistrationMessage(null);
      }, 3000);

      // Função de limpeza: se o usuário sair da página antes dos 3s, o temporizador é cancelado.
      return () => clearTimeout(timer);
    }
  }, [registrationMessage]); // O efeito roda sempre que a mensagem mudar

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: efetuarLogin, error: mutationError } = useEfetuarLogin();

  const onSubmit = (data: LoginSchema) => {
    setApiError(null);

    efetuarLogin(data, {
      onSuccess: (tokenResponse: TokenResponse) => {
        setUsuarioLogado(tokenResponse.token);
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
      {/* 4. A renderização da mensagem agora depende do estado local */}
      {registrationMessage && (
        <div className="alert alert-success" role="alert">
          {registrationMessage}
        </div>
      )}

      {apiError && (
        <div className="alert alert-danger" role="alert">
          {apiError}
        </div>
      )}

      {mutationError && !apiError && (
        <div className="alert alert-danger" role="alert">
          Erro de comunicação: {mutationError.message}
        </div>
      )}

      {/* O resto do formulário continua o mesmo */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nome de Usuário</label>
        <input 
          type="text" 
          id="username" 
          className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
          {...register('username')}
        />
        {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input 
          type="password" 
          id="senha" 
          className={`form-control ${errors.senha ? 'is-invalid' : ''}`} 
          {...register('senha')} 
        />
        {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="mt-3 text-center">
        Não tem uma conta?{' '}
        <Link to="/cadastrar">Cadastre-se aqui</Link>
      </p>
    </form>
  );
};

export default LoginForm;