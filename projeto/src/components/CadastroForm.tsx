// src/components/CadastroForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { cadastroSchema, type CadastroSchema } from '../schemas/cadastroSchema';

const CadastroForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  // Não precisamos mais da mensagem de sucesso neste componente
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const navigate = useNavigate(); 

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm<CadastroSchema>({
    resolver: zodResolver(cadastroSchema)
  });

  const onSubmit = async (data: CadastroSchema) => {
    setServerError(null);

    try {
      const response = await fetch('http://localhost:8080/usuarios/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const responseBody = await response.text();

      if (!response.ok) {
        throw new Error(responseBody || 'Falha ao cadastrar.');
      }
      
      // ✅ LÓGICA DE REDIRECIONAMENTO IMEDIATO ✅
      // Navega para a página de login e passa uma mensagem de sucesso no 'state'
      navigate('/login', { 
        state: { message: responseBody } 
      });

    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    // O formulário continua o mesmo, apenas a lógica do onSubmit foi alterada.
    // Opcionalmente, podemos remover a renderização da mensagem de sucesso daqui.
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      
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

      <div className="mb-3">
        <label htmlFor="confirmacaoSenha" className="form-label">Confirmação de Senha</label>
        <input 
          type="password" 
          id="confirmacaoSenha" 
          className={`form-control ${errors.confirmacaoSenha ? 'is-invalid' : ''}`} 
          {...register('confirmacaoSenha')} 
        />
        {errors.confirmacaoSenha && <div className="invalid-feedback">{errors.confirmacaoSenha.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default CadastroForm;