// src/pages/Cadastro.tsx
import React from 'react';
import CadastroForm from '../components/CadastroForm'

const Cadastro: React.FC = () => {
  return (
    <section id="cadastro">
      <div className="container-lg">
        <div className="text-center">
          <h2>Crie sua Conta</h2>
          <p className="lead text-muted">Junte-se à nossa plataforma.</p>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <CadastroForm />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Cadastro;