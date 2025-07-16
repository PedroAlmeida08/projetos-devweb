// src/components/AccordionItem.tsx
import React from 'react';

// 1. Atualizamos as props que o componente espera receber
interface AccordionItemProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, isOpen, onToggle, children }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${id}`}>
        {/* 2. Removemos os atributos data-bs-* e adicionamos o evento onClick do React */}
        <button
          className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </h2>
      {/* 3. A classe 'show' (que torna o conteúdo visível) é controlada pela prop 'isOpen' */}
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
        aria-labelledby={`heading-${id}`}
      >
        <div className="accordion-body text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;