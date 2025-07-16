// src/App.tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './routes/Router'; // 1. Importe seu novo componente de rotas

const App: React.FC = () => {
  return (
    <>
      <Header />
      <main className="py-4">
        <AppRouter /> {/* 2. Renderize o componente de rotas aqui */}
      </main>
      <Footer />
    </>
  );
};

export default App;