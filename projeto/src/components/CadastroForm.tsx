// src/components/CadastroForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cadastroSchema, type CadastroSchema } from '../schemas/cadastroSchema';

const CadastroForm: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CadastroSchema>({
    resolver: zodResolver(cadastroSchema)
  });

  const onSubmit = async (data: CadastroSchema) => {
    setServerError(null);
    setSuccessMessage(null);
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
      
      setSuccessMessage(responseBody);

    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      <div className="mb-3">
        <label htmlFor="conta" className="form-label">Email (Conta)</label>
        <input type="email" id="conta" className={`form-control ${errors.conta ? 'is-invalid' : ''}`} {...register('conta')} />
        {errors.conta && <div className="invalid-feedback">{errors.conta.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="senha" className="form-label">Senha</label>
        <input type="password" id="senha" className={`form-control ${errors.senha ? 'is-invalid' : ''}`} {...register('senha')} />
        {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmacaoSenha" className="form-label">Confirmação de Senha</label>
        <input type="password" id="confirmacaoSenha" className={`form-control ${errors.confirmacaoSenha ? 'is-invalid' : ''}`} {...register('confirmacaoSenha')} />
        {errors.confirmacaoSenha && <div className="invalid-feedback">{errors.confirmacaoSenha.message}</div>}
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </button>
    </form>
  );
};

export default CadastroForm;