// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUsuarioStore from '../store/UsuarioStore';

const PrivateRoute: React.FC = () => {
  const usuarioId = useUsuarioStore((s) => s.usuarioId);

  // Se o usuário não estiver logado (ID = 0), redireciona para a página de login
  if (usuarioId === 0) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza a página filha (ex: Favoritos)
  return <Outlet />;
};

export default PrivateRoute;