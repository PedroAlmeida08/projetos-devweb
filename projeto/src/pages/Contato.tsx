// src/pages/Contato.tsx
import React from 'react';
import ContactForm from '../components/ContactForm'; // 1. Importe o novo componente

const Contato: React.FC = () => {
  return (
    <section id="contact">
      <div className="container-lg">
        <div className="text-center">
          <h2>Entre em contato comigo</h2>
          <p className="lead">
            Quer tirar sua ideia do papel? Preencha o formulário e assim que
            possível irei te responder!
          </p>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            {/* 2. Renderize o componente do formulário aqui */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;