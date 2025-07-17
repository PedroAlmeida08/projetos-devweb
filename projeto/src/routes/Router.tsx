import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes de Página
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Projetos from '../pages/Projetos';
import Contato from '../pages/Contato';
import Cadastro from '../pages/Cadastro';
import Login from '../pages/Login';
import Favoritos from '../pages/Favoritos';
import AdminPage from '../pages/AdminPage';

// Componentes de Rota Protegida
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* --- Rotas Públicas (acessíveis a todos) --- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Sobre />} />
      <Route path="/projects" element={<Projetos />} />
      <Route path="/contact" element={<Contato />} />
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />

      {/* --- Rotas Privadas (para qualquer usuário logado) --- */}
      <Route element={<PrivateRoute />}>
        <Route path="/favoritos" element={<Favoritos />} />
      </Route>

      {/* --- Rotas de Administrador (apenas para usuários com role 'ADMIN') --- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;