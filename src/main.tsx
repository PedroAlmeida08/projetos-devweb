// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Importe o BrowserRouter
import App from './App.tsx';

// ... Seus outros imports de CSS e JS ...
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Envolva todo o <App /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);