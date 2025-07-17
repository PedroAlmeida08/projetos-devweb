import React from 'react';

// A interface agora define as props que o componente espera receber
interface QuantityInputProps {
  quantidade: number;
  onAumentar: () => void;
  onDiminuir: () => void;
  onDefinir: (novaQuantidade: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ quantidade, onAumentar, onDiminuir, onDefinir }) => {
  
  // Lógica para o input editável
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value, 10);
    if (!isNaN(valor)) {
      onDefinir(valor);
    }
  };

  return (
    <div className="input-group" style={{ width: '150px' }}>
      <button className="btn btn-outline-secondary" onClick={onDiminuir}>-</button>
      <input 
        type="number" 
        className="form-control text-center fw-bold" 
        value={quantidade}
        onChange={handleInputChange}
        min="0"
      />
      <button className="btn btn-outline-secondary" onClick={onAumentar}>+</button>
    </div>
  );
};

export default QuantityInput;