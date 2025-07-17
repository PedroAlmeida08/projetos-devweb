// src/routes/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUsuarioStore from '../store/UsuarioStore';

const AdminRoute: React.FC = () => {
  const user = useUsuarioStore((s) => s.user);

  // Redireciona se não estiver logado ou se não for admin
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />; // Redireciona para a home se não for admin
  }

  return <Outlet />;
};

export default AdminRoute;