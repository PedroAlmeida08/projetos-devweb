import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useUsuarioStore from '../store/UsuarioStore';

const PrivateRoute: React.FC = () => {
  // Acessa o objeto 'user' do nosso store global (Zustand)
  const user = useUsuarioStore((s) => s.user);

  // Se NÃO houver um usuário logado...
  if (!user) {
    // Redireciona o usuário para a página de login.
    // O 'replace' evita que a rota privada fique no histórico do navegador.
    return <Navigate to="/login" replace />;
  }

  // Se houver um usuário logado, renderiza o componente da rota aninhada (ex: <Favoritos />)
  return <Outlet />;
};

export default PrivateRoute;