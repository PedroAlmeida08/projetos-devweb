// src/pages/Login.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <section id="login">
      <div className="container-lg">
        <div className="text-center">
          <h2>Acessar sua Conta</h2>
          <p className="lead text-muted">Bem-vindo de volta!</p>
        </div>
        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;