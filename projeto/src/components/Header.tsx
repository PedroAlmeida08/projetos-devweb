// src/components/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
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
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/about">Sobre</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white fw-bold" to="/contact">Contato</NavLink>
            </li>
            <li className="nav-item ms-md-2 mt-2 mt-md-0">
              <NavLink className="btn btn-light" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;