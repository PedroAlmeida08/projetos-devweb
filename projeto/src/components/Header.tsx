import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useUsuarioStore from '../store/UsuarioStore';

const Header: React.FC = () => {
  const { usuarioId, setUsuarioLogado } = useUsuarioStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuarioLogado(0);
    // Limpar favoritos do store ao deslogar
    useUsuarioStore.getState().setFavoritos([]);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary pt-4 pb-4">
      <div className="container-xxl">
        <NavLink className="navbar-brand" to="/">
          <span className="text-secondary fw-bold text-white">
            <i className="bi bi-book-half"></i> Meu Portfólio
          </span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/projects">Projetos</NavLink>
            </li>
            {/* Link condicional para Favoritos */}
            {usuarioId > 0 && (
              <li className="nav-item">
                <NavLink className="nav-link text-white fw-bold" to="/favoritos">Favoritos</NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/about">Sobre</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/contact">Contato</NavLink>
            </li>
            {/* Botão condicional de Login/Logout */}
            {usuarioId > 0 ? (
              <li className="nav-item ms-md-2 mt-2 mt-md-0">
                <button className="btn btn-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item ms-md-2 mt-2 mt-md-0">
                <NavLink className="btn btn-light" to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;