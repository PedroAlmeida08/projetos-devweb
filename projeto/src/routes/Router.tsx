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
import Carrinho from '../pages/Carrinho'; // 1. Importe a nova página do Carrinho

// Componentes de Rota Protegida
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Sobre />} />
      <Route path="/projects" element={<Projetos />} />
      <Route path="/contact" element={<Contato />} />
      <Route path="/cadastrar" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />

      {/* --- Rotas Privadas (para qualquer usuário logado) --- */}
      <Route element={<PrivateRoute />}>
        <Route path="/favoritos" element={<Favoritos />} />
        {/* ✅ ADICIONE A NOVA ROTA DO CARRINHO AQUI ✅ */}
        <Route path="/carrinho" element={<Carrinho />} />
      </Route>

      {/* --- Rotas de Administrador --- */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;