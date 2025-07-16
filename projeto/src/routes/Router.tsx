import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa todas as páginas da aplicação
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Projetos from '../pages/Projetos';
import Contato from '../pages/Contato';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Rota para a página inicial */}
      <Route path="/" element={<Home />} />

      {/* Rota para a página "Sobre" */}
      <Route path="/about" element={<Sobre />} />

      {/* Rota para a página "Projetos" */}
      <Route path="/projects" element={<Projetos />} />

      {/* Rota para a página "Contato" */}
      <Route path="/contact" element={<Contato />} />
      
      {/* Rota para a página de Cadastro de Usuário */}
      <Route path="/cadastrar" element={<Cadastro />} />

      {/* Rota para a página de Login */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;