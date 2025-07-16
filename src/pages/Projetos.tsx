// src/pages/Projetos.tsx
import React from 'react';

// (Opcional, mas boa prática) Define um "molde" para os objetos do projeto
interface Projeto {
  title: string;
  imageUrl: string;
  link: string;
}

const Projetos: React.FC = () => {
  // Centraliza todos os dados dos projetos em um único array
  const projetos: Projeto[] = [
    {
      title: 'Painel PNE',
      imageUrl: '/assets/pne.png', // Imagem local na pasta /public/assets
      link: 'https://dashboard.epe.gov.br/apps/pne/shiny.html',
    },
    {
      title: 'inova-e: Investimentos em PD&D',
      imageUrl: '/assets/inova-e.png', // Imagem local na pasta /public/assets
      link: 'https://dashboard.epe.gov.br/apps/inova-e/dashboard.html',
    },
    {
      title: 'inova-e: Módulo de Patentes',
      imageUrl: '/assets/inova-e.png', // Imagem local na pasta /public/assets
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

  // Separa os projetos para renderizar em duas linhas, como no original
  const primeiraLinha = projetos.slice(0, 3);
  const segundaLinha = projetos.slice(3, 5);

  return (
    <section id="examples" className="mt-2">
      <div className="container-lg">
        <div className="container my-5">
          {/* Primeira linha com 3 cards */}
          <div className="row g-4 justify-content-center">
            {primeiraLinha.map((projeto, index) => (
              <div className="col-10 col-md-4 col-lg-3" key={index}>
                <div className="card border-1 h-100">
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
              </div>
            ))}
          </div>

          {/* Segunda linha com 2 cards */}
          <div className="row g-4 justify-content-center mt-4">
            {segundaLinha.map((projeto, index) => (
              <div className="col-10 col-md-4 col-lg-3" key={index}>
                <div className="card border-1 h-100">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projetos;