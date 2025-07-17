import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type Projeto } from '../interfaces/Projeto';
import useAutoresQuery from '../hooks/useAutoresQuery';

// O formulário agora lida com um DTO que envia o autorId
type ProjetoFormData = Omit<Projeto, 'id' | 'autor' | 'dataCadastro'> & { autorId: string };

interface ProjetoFormProps {
  projeto?: Projeto;
  onSubmit: (data: ProjetoFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProjetoForm: React.FC<ProjetoFormProps> = ({ projeto, onSubmit, onCancel, isSubmitting }) => {
  const { data: autores, isLoading: isLoadingAutores } = useAutoresQuery();
  
  const { register, handleSubmit, reset } = useForm<ProjetoFormData>({
    defaultValues: {
      nome: projeto?.nome || '',
      descricao: projeto?.descricao || '',
      url: projeto?.url || '',
      imagem: projeto?.imagem || '',
      destaque: projeto?.destaque || false,
      autorId: projeto?.autor?.id?.toString() || '',
    }
  });

  useEffect(() => {
    const defaultVals = {
      nome: projeto?.nome || '',
      descricao: projeto?.descricao || '',
      url: projeto?.url || '',
      imagem: projeto?.imagem || '',
      destaque: projeto?.destaque || false,
      autorId: projeto?.autor?.id?.toString() || '',
    };
    reset(defaultVals);
  }, [projeto, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome do Projeto</label>
        <input type="text" id="nome" className="form-control" {...register('nome')} required />
      </div>

      {/* NOVO CAMPO DE SELEÇÃO DE AUTOR */}
      <div className="mb-3">
        <label htmlFor="autorId" className="form-label">Autor</label>
        <select 
          id="autorId" 
          className="form-select" 
          {...register('autorId')} 
          disabled={isLoadingAutores}
          required
        >
          <option value="" disabled>
            {isLoadingAutores ? 'Carregando autores...' : 'Selecione um autor'}
          </option>
          {autores?.map(autor => (
            <option key={autor.id} value={autor.id}>{autor.nome}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="descricao" className="form-label">Descrição</label>
        <textarea id="descricao" className="form-control" {...register('descricao')} required />
      </div>
      <div className="mb-3">
        <label htmlFor="url" className="form-label">URL do Projeto</label>
        <input type="url" id="url" className="form-control" {...register('url')} required />
      </div>
      <div className="mb-3">
        <label htmlFor="imagem" className="form-label">Nome do Arquivo da Imagem (ex: pne.png)</label>
        <input type="text" id="imagem" className="form-control" {...register('imagem')} required />
      </div>
      <div className="form-check mb-3">
        <input type="checkbox" id="destaque" className="form-check-input" {...register('destaque')} />
        <label htmlFor="destaque" className="form-check-label">Marcar como Destaque</label>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Projeto'}
        </button>
      </div>
    </form>
  );
};

export default ProjetoForm;