// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link para botões de navegação interna

const Home: React.FC = () => {
  return (
    <section id="intro">
      <div className="container-lg">
        <div className="row g-4 justify-content-center align-items-center">
          <div className="col-md-5 text-center text-md-start">
            <h1>
              <div className="display-2">Olá!</div>
              <div className="display-5 text-muted">Tudo bem?</div>
            </h1>
            <p className="lead my-4 text-muted">
              Me chamo João! <br />
              Apaixonado por tecnologia desde a infância. <br />
              Graduando em Ciência da Computação pela UFF. <br />
              Deseja saber mais? Continue navegando!
            </p>
            <Link to="/projects" className="btn btn-primary btn-lg text-white">
              Explorar
            </Link>
          </div>
          <div className="col-md-5 text-center d-none d-md-block">
            {/* Lembre-se de que a imagem deve estar na pasta /public/assets/ */}
            <img src="/assets/hello-world.png" className="img-fluid" alt="Hello World" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;