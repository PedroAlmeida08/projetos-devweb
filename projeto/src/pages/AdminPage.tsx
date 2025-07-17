import React, { useState } from 'react';
import useProjetosQuery from '../hooks/useProjetosQuery';
import useAutoresQuery from '../hooks/useAutoresQuery';
import useDeletarProjetoMutation from '../hooks/useDeletarProjetoMutation';
import useCriarProjetoMutation from '../hooks/useCriarProjetoMutation';
import useAlterarProjetoMutation from '../hooks/useAlterarProjetoMutation';
import ProjetoForm from '../components/ProjetoForm';
import { type Projeto } from '../interfaces/Projeto';

const AdminPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [projetoEmEdicao, setProjetoEmEdicao] = useState<Projeto | undefined>(undefined);
  
  const { data: projetos, isLoading: isLoadingProjetos, error: errorProjetos } = useProjetosQuery();
  const { data: autores, isLoading: isLoadingAutores, error: errorAutores } = useAutoresQuery();
  
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

  /**
   * ✅ FUNÇÃO CORRIGIDA ✅
   * Esta função agora garante que os dados do formulário sejam convertidos para os tipos corretos
   * (números para preco e autorId) antes de serem enviados para a API.
   */
  const handleSalvarProjeto = (data: any) => {
    const dadosFormatados = {
      ...data,
      autorId: Number(data.autorId),
      preco: Number(data.preco)
    };

    if (!dadosFormatados.autorId) {
        alert("Por favor, selecione um autor.");
        return;
    }

    if (projetoEmEdicao) {
      // Alterar: envia o projeto completo com as novas informações
      alterarMutation.mutate({ ...projetoEmEdicao, ...dadosFormatados }, {
        onSuccess: handleFecharForm,
      });
    } else {
      // Criar: envia o DTO formatado
      // O backend irá adicionar a data de cadastro.
      criarMutation.mutate(dadosFormatados, {
        onSuccess: handleFecharForm,
      });
    }
  };
  
  if (isLoadingProjetos || isLoadingAutores) return <div className="container my-5 text-center"><p>Carregando dados do administrador...</p><div className="spinner-border text-primary" /></div>;
  if (errorProjetos) return <div className="container my-5 alert alert-danger">Erro ao carregar projetos: {errorProjetos.message}</div>;
  if (errorAutores) return <div className="container my-5 alert alert-danger">Erro ao carregar autores: {errorAutores.message}</div>;

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="display-4">Gerenciar Projetos</h1>
        {!showForm && (
            <button className="btn btn-primary btn-lg" onClick={() => handleAbrirForm()}>
            <i className="bi bi-plus-circle me-2"></i>
            Adicionar Novo Projeto
            </button>
        )}
      </div>

      {showForm && (
        <div className="card card-body mb-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{projetoEmEdicao ? `Editando: ${projetoEmEdicao.nome}` : 'Novo Projeto'}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleFecharForm}></button>
          </div>
          <hr/>
          <ProjetoForm 
            autores={autores || []}
            projeto={projetoEmEdicao}
            onSubmit={handleSalvarProjeto}
            onCancel={handleFecharForm}
            isSubmitting={criarMutation.isPending || alterarMutation.isPending}
          />
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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