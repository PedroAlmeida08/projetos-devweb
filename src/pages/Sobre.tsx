// src/pages/Sobre.tsx
import React from 'react';

const Sobre: React.FC = () => {
  return (
    <section id="topics">
      <div className="container-md">
        <div className="text-center">
          <h2>Conheça um pouco sobre mim</h2>
          <p className="lead text-muted">Essas são algumas das minhas habilidades</p>
        </div>

        {/* Accordion */}
        <div className="accordion" id="chapters">
          <div className="accordion-item">
            <h2 className="accordion-header" id="heading-1">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#hability-1"
                aria-expanded="false"
                aria-controls="hability-1"
              >
                Inglês Avançado (Nível C1.3)
              </button>
            </h2>
            <div
              id="hability-1"
              className="accordion-collapse collapse"
              aria-labelledby="heading-1"
              data-bs-parent="#chapters"
            >
              <div className="accordion-body text-center">
                <p>Comecei aprendendo sozinho com vídeo-games na infância, mas é sempre bom aprofundar nossos conhecimentos, concorda?</p>
                <p>Por isso decidi investir em mim e cursei Inglês até o nível C1.3.</p>
                <p>De acordo com o Quadro Comumum Europeu de Referência (QCER), o nível C1 é o quinto nível de inglês, também chamado de "avançado".</p>
                <p>Isso significa que consigo me virar super bem em conversas, reuniões e projetos internacionais. Leitura, escrita e fala com naturalidade, tanto no dia a dia quanto em contextos mais técnicos ou profissionais. Fico à vontade com apresentações, vídeos, e-mails ou aquela conversa diretamente com o cliente.</p>
                <p>Então, se esse é o seu caso, dont worry!</p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="heading-2">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#hability-2"
                aria-expanded="false"
                aria-controls="hability-2"
              >
                HTML e CSS
              </button>
            </h2>
            <div
              id="hability-2"
              className="accordion-collapse collapse"
              aria-labelledby="heading-2"
              data-bs-parent="#chapters"
            >
              <div className="accordion-body text-center">
                <p>300 horas de HTML e CSS na freecodecamp®. Quer mais ou tá bom? .</p>
                <p>Enquanto o HTML (HyperText Markup Language) é a linguagem base da web, responsável por estruturar o conteúdo de páginas, como textos, links, imagens e seções, é o CSS (Cascading Style Sheets) que define o estilo visual dessas páginas, controlando cores, fontes, espaçamentos, layouts e efeitos responsivos para diferentes dispositivos.</p>
                <p>Durante o curso aprendi, dentre outras coisas, a criar interfaces gráficas (e funcionais) para um aplicativo de fotos, um menu de cafeteria, uma página de tributo.</p>
                <p>Um curso completamente orientado a projetos no qual são abordados desde os conceitos mais básicos até o uso de Flexbox e CSS Grid.</p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="heading-3">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#hability-3"
                aria-expanded="false"
                aria-controls="hability-3"
              >
                Shinyverse
              </button>
            </h2>
            <div
              id="hability-3"
              className="accordion-collapse collapse"
              aria-labelledby="heading-3"
              data-bs-parent="#chapters"
            >
              <div className="accordion-body text-center">
                <p>Dois anos de estágio na Empresa de Pesquisa Energética (EPE) me trouxeram sólidos conhecimentos na linguagem R.</p>
                <p>Participei da criação de artefatos para obtenção de dados brutos e da organização destes dados em um formato mais agradável ao público externo.</p>
                <p>Criei ferramentas para disponibilização destes dados.</p>
                <p>Tudo isso utilizando a linguagem R - principalmente o conjunto de bibliotecas tidyverse e seus agregados.</p>
                <p>Quer dar uma olhada em um exemplo? Acesse um dos <a href="https://dashboard.epe.gov.br/apps/inova-e/index.html" target="_blank" rel="noopener noreferrer">portais</a> que participei da criação!</p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="heading-4">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#hability-4"
                aria-expanded="false"
                aria-controls="hability-4"
              >
                Framework Spring
              </button>
            </h2>
            <div
              id="hability-4"
              className="accordion-collapse collapse"
              aria-labelledby="heading-4"
              data-bs-parent="#chapters"
            >
              <div className="accordion-body text-center">
                <p>Um dos frameworks mais populares para Java, o Spring é um framework de desenvolvimento de aplicativos que permite que os desenvolvedores se concentrem na lógica da aplicação, sem se preocupar com configurações de ambiente.</p>
                <p>O suporte a Injeção de Dependência (DI), a transações, desenvolvimento Web, persistência e acesso remoto são algumas das caraterísticas do framework.</p>
                <p>Meu conhecimento nessa podera ferramenta advem de aulas ministradas no meu curso de graduação (nota 5 no MEC) durante as cadeiras de Projeto de Software e Desenvolvimento Web</p>
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header" id="heading-5">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#hability-5"
                aria-expanded="false"
                aria-controls="hability-5"
              >
                Alguns curiosidades sobre mim
              </button>
            </h2>
            <div
              id="hability-5"
              className="accordion-collapse collapse"
              aria-labelledby="heading-5"
              data-bs-parent="#chapters"
            >
              <div className="accordion-body text-center">
                <p>Sou formado técnico em química pelo Instituto Federal Fluminense de Educação, Ciência e Tecnologia do Rio de Janeiro.</p>
                <p>Durante o curso fui aluno de Iniciação Científica realizando um estudo sobre íon de metais pesados em solução aquosa utilizando eletrodos compósitos de baixo custo, modificados por polímeros condutores eletrônicos.</p>
                <p>Inclusive, ao apresentar o projeto durante a XVII Jornada de Iniciação Científica e Tecnológica (XVII JIT) eu e minha equipe recebemos menção honrosa pelo terceiro lugar do nosso projeto!</p>
              </div>
            </div>
          </div>
        </div>
        <p className="lead text-muted text-center mt-3">
          As linguagens de programação C, Python, Ruby e SQL também fazem parte do meu cinto de ferramentas.
        </p>
      </div>
    </section>
  );
};

export default Sobre;