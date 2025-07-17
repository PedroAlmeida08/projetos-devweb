import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa todas as páginas da aplicação
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Projetos from '../pages/Projetos';
import Contato from '../pages/Contato';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Favoritos from '../pages/Favoritos';

// Importa o componente de Rota Privada
import PrivateRoute from './PrivateRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Sobre />} />
      <Route path="/projects" element={<Projetos />} />
      <Route path="/contact" element={<Contato />} />
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas Privadas (só acessíveis se o usuário estiver logado) */}
      <Route element={<PrivateRoute />}>
        <Route path="/favoritos" element={<Favoritos />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;