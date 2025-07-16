// src/components/ProjectCard.tsx
import React from 'react';

// Define a estrutura do objeto 'projeto' que o card espera receber
interface Projeto {
  title: string;
  imageUrl: string;
  link: string;
}

// Define as props que o nosso componente de Card vai aceitar
interface ProjectCardProps {
  projeto: Projeto;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projeto }) => {
  return (
    <div className="card border-1 h-100 shadow-sm">
      <img src={projeto.imageUrl} className="card-img-top card-img-fixed" alt={projeto.title} />
      <div className="card-body text-center py-4 d-flex flex-column justify-content-between">
        <h4 className="card-title">{projeto.title}</h4>
        <a
          href={projeto.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-lg mt-3"
        >
          Ver mais
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;