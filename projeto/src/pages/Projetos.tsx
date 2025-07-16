import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { type Projeto } from '../types';

const Projetos: React.FC = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch('http://localhost:8080/projetos');
        if (!response.ok) throw new Error('Falha ao buscar dados.');
        const data: Projeto[] = await response.json();
        setProjetos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjetos();
  }, []);

  if (isLoading) { /* ... JSX de loading ... */ }
  if (error) { /* ... JSX de erro ... */ }

  return (
    <section id="examples" className="mt-2">
      <div className="container-lg">
        <div className="text-center mb-5">
            <h1 className="display-4">Meus Projetos</h1>
            <p className="lead text-muted">Uma seleção de trabalhos que desenvolvi e participei.</p>
        </div>
        <div className="container my-5">
          <div className="row g-4 justify-content-center">
            {projetos.map((projeto) => (
              <div className="col-10 col-md-6 col-lg-4" key={projeto.id}>
                <ProjectCard projeto={projeto} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Projetos;