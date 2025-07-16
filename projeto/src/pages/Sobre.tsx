// src/pages/Sobre.tsx
import React, { useState } from 'react';
import AccordionItem from '../components/AccordionItem';

const Sobre: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  // ✅ AGORA COM TODOS OS DADOS CORRETOS ✅
  const habilidades = [
    {
      id: '1',
      title: 'Inglês Avançado (Nível C1.3)',
      content: (
        <>
          <p>Comecei aprendendo sozinho com vídeo-games na infância, mas é sempre bom aprofundar nossos conhecimentos, concorda?</p>
          <p>Por isso decidi investir em mim e cursei Inglês até o nível C1.3.</p>
          <p>De acordo com o Quadro Comum Europeu de Referência (QCER), o nível C1 é o quinto nível de inglês, também chamado de "avançado".</p>
          <p>Isso significa que consigo me virar super bem em conversas, reuniões e projetos internacionais. Leitura, escrita e fala com naturalidade, tanto no dia a dia quanto em contextos mais técnicos ou profissionais. Fico à vontade com apresentações, vídeos, e-mails ou aquela conversa diretamente com o cliente.</p>
          <p>Então, se esse é o seu caso, dont worry!</p>
        </>
      )
    },
    {
      id: '2',
      title: 'HTML e CSS',
      content: (
        <>
          <p>300 horas de HTML e CSS na freecodecamp®. Quer mais ou tá bom? .</p>
          <p>Enquanto o HTML (HyperText Markup Language) é a linguagem base da web, responsável por estruturar o conteúdo de páginas, como textos, links, imagens e seções, é o CSS (Cascading Style Sheets) que define o estilo visual dessas páginas, controlando cores, fontes, espaçamentos, layouts e efeitos responsivos para diferentes dispositivos.</p>
          <p>Durante o curso aprendi, dentre outras coisas, a criar interfaces gráficas (e funcionais) para um aplicativo de fotos, um menu de cafeteria, uma página de tributo.</p>
          <p>Um curso completamente orientado a projetos no qual são abordados desde os conceitos mais básicos até o uso de Flexbox e CSS Grid.</p>
        </>
      )
    },
    {
      id: '3',
      title: 'Shinyverse',
      content: (
        <>
          <p>Dois anos de estágio na Empresa de Pesquisa Energética (EPE) me trouxeram sólidos conhecimentos na linguagem R.</p>
          <p>Participei da criação de artefatos para obtenção de dados brutos e da organização destes dados em um formato mais agradável ao público externo.</p>
          <p>Criei ferramentas para disponibilização destes dados.</p>
          <p>Tudo isso utilizando a linguagem R - principalmente o conjunto de bibliotecas tidyverse e seus agregados.</p>
          <p>Quer dar uma olhada em um exemplo? Acesse um dos <a href="https://dashboard.epe.gov.br/apps/inova-e/index.html" target="_blank" rel="noopener noreferrer">portais</a> que participei da criação!</p>
        </>
      )
    },
    {
      id: '4',
      title: 'Framework Spring',
      content: (
        <>
          <p>Um dos frameworks mais populares para Java, o Spring é um framework de desenvolvimento de aplicativos que permite que os desenvolvedores se concentrem na lógica da aplicação, sem se preocupar com configurações de ambiente.</p>
          <p>O suporte a Injeção de Dependência (DI), a transações, desenvolvimento Web, persistência e acesso remoto são algumas das caraterísticas do framework.</p>
          <p>Meu conhecimento nessa podera ferramenta advem de aulas ministradas no meu curso de graduação (nota 5 no MEC) durante as cadeiras de Projeto de Software e Desenvolvimento Web</p>
        </>
      )
    },
    {
      id: '5',
      title: 'Algumas curiosidades sobre mim',
      content: (
        <>
          <p>Sou formado técnico em química pelo Instituto Federal Fluminense de Educação, Ciência e Tecnologia do Rio de Janeiro.</p>
          <p>Durante o curso fui aluno de Iniciação Científica realizando um estudo sobre íon de metais pesados em solução aquosa utilizando eletrodos compósitos de baixo custo, modificados por polímeros condutores eletrônicos.</p>
          <p>Inclusive, ao apresentar o projeto durante a XVII Jornada de Iniciação Científica e Tecnológica (XVII JIT) eu e minha equipe recebemos menção honrosa pelo terceiro lugar do nosso projeto!</p>
        </>
      )
    }
  ];

  return (
    <section id="topics">
      <div className="container-md">
        <div className="text-center">
          <h2>Conheça um pouco sobre mim</h2>
          <p className="lead text-muted">Essas são algumas das minhas habilidades</p>
        </div>

        <div className="accordion">
          {habilidades.map((habilidade) => (
            <AccordionItem
              key={habilidade.id}
              id={habilidade.id}
              title={habilidade.title}
              isOpen={openId === habilidade.id}
              onToggle={() => setOpenId(openId === habilidade.id ? null : habilidade.id)}
            >
              {habilidade.content}
            </AccordionItem>
          ))}
        </div>
        
        <p className="lead text-muted text-center mt-3">
          As linguagens de programação C, Python, Ruby e SQL também fazem parte do meu cinto de ferramentas.
        </p>
      </div>
    </section>
  );
};

export default Sobre;