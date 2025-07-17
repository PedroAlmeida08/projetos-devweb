import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useDeletarProjetoMutation from '../hooks/useDeletarProjetoMutation';
import ProjetoForm from '../components/ProjetoForm';
import { type Projeto } from '../interfaces/Projeto';
import useCriarProjetoMutation from '../hooks/useCriarProjetoMutation';
import useAlterarProjetoMutation from '../hooks/useAlterarProjetoMutation';

const fetchProjetos = async (): Promise<Projeto[]> => {
  const response = await fetch('http://localhost:8080/projetos');
  if (!response.ok) throw new Error('Falha ao buscar projetos');
  return response.json();
};
const useProjetosQuery = () => useQuery<Projeto[], Error>({ queryKey: ['projetos'], queryFn: fetchProjetos });

const AdminPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [projetoEmEdicao, setProjetoEmEdicao] = useState<Projeto | undefined>(undefined);
  
  const { data: projetos, isLoading, error } = useProjetosQuery();
  const deletarMutation = useDeletarProjetoMutation();
  const criarMutation = useCriarProjetoMutation();
  const alterarMutation = useAlterarProjetoMutation();

  const handleDeletar = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      deletarMutation.mutate(id);
    }
  };

  const handleAbrirForm = (projeto?: Projeto) => {
    setProjetoEmEdicao(projeto);
    setShowForm(true);
  };

  const handleFecharForm = () => {
    setProjetoEmEdicao(undefined);
    setShowForm(false);
  };

  const handleSalvarProjeto = (data: any) => {
    // Converte autorId de string para número
    const dadosFormatados = { ...data, autorId: Number(data.autorId) };

    if (projetoEmEdicao) {
      alterarMutation.mutate({ ...projetoEmEdicao, ...dadosFormatados }, { onSuccess: handleFecharForm });
    } else {
      // O backend agora adiciona a data, então não precisamos mais enviar
      criarMutation.mutate(dadosFormatados, { onSuccess: handleFecharForm });
    }
  };
  
  if (isLoading) return <div className="container my-5"><p>Carregando projetos...</p></div>;
  if (error) return <div className="container my-5 alert alert-danger">Erro: {error.message}</div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">Gerenciar Projetos</h1>
        {!showForm && (
            <button className="btn btn-primary btn-lg" onClick={() => handleAbrirForm()}>
            Adicionar Novo Projeto
            </button>
        )}
      </div>

      {showForm && (
        <div className="card card-body mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-3">{projetoEmEdicao ? 'Editando Projeto' : 'Novo Projeto'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleFecharForm}></button>
          </div>
          <ProjetoForm 
            projeto={projetoEmEdicao}
            onSubmit={handleSalvarProjeto}
            onCancel={handleFecharForm}
            isSubmitting={criarMutation.isPending || alterarMutation.isPending}
          />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Autor</th>
              <th className="text-end">Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetos?.map(projeto => (
              <tr key={projeto.id}>
                <td>{projeto.id}</td>
                <td>{projeto.nome}</td>
                <td>{projeto.autor?.nome ?? 'N/A'}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => handleAbrirForm(projeto)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeletar(projeto.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;