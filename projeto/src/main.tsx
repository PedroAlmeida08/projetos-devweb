import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Adicione esta linha
import App from './App.tsx';

// Seus outros imports de CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';

// Import do JavaScript do Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Crie uma instância do cliente
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);