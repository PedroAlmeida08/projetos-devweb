// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-muted">© 2025 Meu Portfólio, Inc</span>
        </div>
        {/* Se quiser adicionar ícones de redes sociais, este é um bom lugar. */}
      </footer>
    </div>
  );
};

export default Footer;