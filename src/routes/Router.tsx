// src/routes/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe suas páginas
import Home from '../pages/Home';
import Sobre from '../pages/Sobre';
import Projetos from '../pages/Projetos';
import Contato from '../pages/Contato';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Sobre />} />
      <Route path="/projects" element={<Projetos />} />
      <Route path="/contact" element={<Contato />} />
    </Routes>
  );
};

export default AppRouter;