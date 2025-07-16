// src/pages/Projetos.tsx
import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Importa o componente de card

// A interface pode ser movida para um arquivo de tipos compartilhado se usada em mais lugares
interface Projeto {
  title: string;
  imageUrl: string;
  link: string;
}

const Projetos: React.FC = () => {
  // ✅ Array agora contém todos os 5 projetos
  const projetos: Projeto[] = [
    {
      title: 'Painel PNE',
      imageUrl: '/assets/pne.png',
      link: 'https://dashboard.epe.gov.br/apps/pne/shiny.html',
    },
    {
      title: 'inova-e: Investimentos em PD&D',
      imageUrl: '/assets/inova-e.png',
      link: 'https://dashboard.epe.gov.br/apps/inova-e/dashboard.html',
    },
    {
      title: 'inova-e: Módulo de Patentes',
      imageUrl: '/assets/inova-e.png',
      link: 'https://dashboard.epe.gov.br/apps/inova-e/patentes.html',
    },
    {
      title: 'Formulário de Pesquisa',
      imageUrl: 'https://github.com/PedroAlmeida08/HTML-SurveyForm/blob/ac1461aa4aedad85d9de2c0a98f8b54e3675990f/styles/surveyForm.jpg?raw=true',
      link: 'https://pedroalmeida08.github.io/HTML-SurveyForm/',
    },
    {
      title: 'Página de Tributo',
      imageUrl: 'https://github.com/PedroAlmeida08/HTML-TributePage/blob/4d4efa82db1b1adb3490a2cf5441036bba508d69/styles/tributePage.jpg?raw=true',
      link: 'https://pedroalmeida08.github.io/HTML-TributePage/',
    },
  ];

  // Separa os projetos para renderizar em duas linhas, como no HTML original
  const primeiraLinha = projetos.slice(0, 3);
  const segundaLinha = projetos.slice(3, 5);

  return (
    <section id="examples" className="mt-2">
      <div className="container-lg">
        <div className="text-center mb-5">
            <h1 className="display-4">Meus Projetos</h1>
            <p className="lead text-muted">Uma seleção de trabalhos que desenvolvi e participei.</p>
        </div>
        <div className="container my-5">
          {/* Primeira linha */}
          <div className="row g-4 justify-content-center">
            {primeiraLinha.map((projeto) => (
              <div className="col-10 col-md-4 col-lg-3" key={projeto.title}>
                <ProjectCard projeto={projeto} />
              </div>
            ))}
          </div>

          {/* Segunda linha */}
          <div className="row g-4 justify-content-center mt-4">
            {segundaLinha.map((projeto) => (
              <div className="col-10 col-md-4 col-lg-3" key={projeto.title}>
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