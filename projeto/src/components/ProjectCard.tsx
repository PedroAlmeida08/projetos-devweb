import React from 'react';
import { type Projeto } from '../interfaces/Projeto';

interface ProjectCardProps {
  projeto: Projeto;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  const imageUrl = `/assets/${projeto.imagem}`;
  let dataFormatada = 'Data indisponível';

  if (projeto.dataCadastro) {
    const partesData = projeto.dataCadastro.split('-');
    const dataUTC = new Date(Date.UTC(Number(partesData[0]), Number(partesData[1]) - 1, Number(partesData[2])));
    if (!isNaN(dataUTC.getTime())) {
      dataFormatada = dataUTC.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    }
  }

  return (
    <div className="card border-1 h-100 shadow-sm position-relative">
      {projeto.destaque && (
        <span className="badge bg-primary position-absolute top-0 end-0 m-2" style={{ zIndex: 1 }}>
          Destaque
        </span>
      )}
      <img src={imageUrl} className="card-img-top card-img-fixed" alt={projeto.nome} />
      <div className="card-body text-center py-4 d-flex flex-column">
        <h4 className="card-title">{projeto.nome}</h4>
        <p className="card-text text-muted flex-grow-1">{projeto.descricao}</p>
        <a href={projeto.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-lg mt-3">
          Ver mais
        </a>
      </div>
      <div className="card-footer text-muted" style={{ fontSize: '0.8rem' }}>
        <span className="float-start">Por: {projeto.autor.nome}</span>
        <span className="float-end">{dataFormatada}</span>
      </div>
    </div>
  );
};
export default ProjectCard;