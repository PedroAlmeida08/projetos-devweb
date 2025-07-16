// src/pages/Contato.tsx
import React, { useEffect, useRef } from 'react';
import { Tooltip } from 'bootstrap'; // Importa o construtor do Tooltip

const Contato: React.FC = () => {
  // Cria uma referência para o elemento do formulário
  const formRef = useRef<HTMLFormElement>(null);

  // useEffect executa o código depois que o componente é renderizado
  useEffect(() => {
    // 1. Lógica de Inicialização dos Tooltips
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('.tt')
    );
    tooltipTriggerList.map(tooltipTriggerEl => {
      return new Tooltip(tooltipTriggerEl);
    });

    // 2. Lógica de Validação Customizada do Formulário
    const form = formRef.current;
    if (!form) return;

    // Mensagens de erro customizadas
    const fields: { [key: string]: string } = {
      email: "Por favor, preencha o campo de email.",
      name: "Por favor, informe seu nome completo.",
      subject: "Por favor, selecione um assunto.",
      query: "Por favor, escreva sua mensagem.",
    };

    // Adiciona os event listeners para validação
    Object.keys(fields).forEach((id) => {
      const field = form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`#${id}`);
      if (field) {
        const handleInvalid = () => {
          field.setCustomValidity(fields[id]);
        };
        const handleInput = () => {
          field.setCustomValidity(""); // Limpa o erro ao digitar
        };
        field.addEventListener("invalid", handleInvalid);
        field.addEventListener("input", handleInput);

        // Função de limpeza para remover os listeners quando o componente for desmontado
        return () => {
          field.removeEventListener("invalid", handleInvalid);
          field.removeEventListener("input", handleInput);
        };
      }
    });
    
  }, []); // O array vazio [] garante que este código rode apenas uma vez

  return (
    <section id="contact">
      <div className="container-lg">
        <div className="text-center">
          <h2>Entre em contato comigo</h2>
          <p className="lead">
            Quer tirar sua ideia do papel? Preencha o formulário e assim que possível irei te responder!
          </p>
        </div>

        <div className="row justify-content-center my-5">
          <div className="col-lg-6">
            {/* Adiciona a referência ao formulário e a classe de validação do Bootstrap */}
            <form ref={formRef} noValidate>
              <label htmlFor="email" className="form-label">Email:</label>
              <div className="input-group mb-4">
                <span className="input-group-text">
                  <i className="bi bi-envelope-fill text-secondary"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="ex: joao@exemplo.com"
                  required
                />
                <span className="input-group-text">
                  <span
                    className="tt"
                    data-bs-placement="bottom"
                    title="Escolha um email que você tenha acesso."
                  >
                    <i className="bi bi-question-circle text-muted"></i>
                  </span>
                </span>
              </div>

              <label htmlFor="name" className="form-label">Nome Completo:</label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill text-secondary"></i>
                </span>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="ex: João"
                  required
                />
                <span className="input-group-text">
                  <span
                    className="tt"
                    data-bs-placement="bottom"
                    title="Seu nome completo facilita sua identificação."
                  >
                    <i className="bi bi-question-circle text-muted"></i>
                  </span>
                </span>
              </div>

              <label htmlFor="subject" className="form-label">
                Sobre o que você deseja falar?
              </label>
              <div className="mb-4 input-group">
                <span className="input-group-text">
                  <i className="bi bi-chat-right-dots-fill text-secondary"></i>
                </span>
                <select className="form-select" id="subject" required>
                  <option value="" disabled>Selecione um assunto...</option>
                  <option value="pricing">Preciso de ajuda para criar um novo projeto</option>
                  <option value="content">Tenho um projeto e desejo tirar meu projeto do papel</option>
                  <option value="budget">Orçamento</option>
                  <option value="maintenance">Manutenção</option>
                  <option value="other">Outro assunto</option>
                </select>
              </div>

              <div className="mb-4 mt-5 form-floating">
                <textarea
                  className="form-control"
                  id="query"
                  style={{ height: '140px' }}
                  placeholder="query"
                  required
                ></textarea>
                <label htmlFor="query">Escreva aqui ...</label>
              </div>

              <div className="mb-4 text-center">
                <button type="submit" className="btn btn-secondary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contato;