import React, { useState } from 'react';
import './TypingTutorial.css'; // Arquivo CSS para estilização

const TypingTutorial = ({ onCorrectTyping }) => {
  const [inputValue, setInputValue] = useState('');
  const correctWord = 'sucesso'; // Palavra correta que o jogador precisa digitar

  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase(); // Converte a entrada para minúsculas
    setInputValue(userInput);

    // Verifica se a palavra digitada está correta (independente de maiúscula/minúscula)
    if (userInput === correctWord.toLowerCase()) {
      onCorrectTyping(); // Chama a função de sucesso ao digitar corretamente
    }
  };

  return (
    <div className="typing-tutorial-container">
      <p>Digite a palavra: <strong>sucesso</strong></p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="typing-input"
        placeholder="Digite aqui..."
        autoFocus // Campo de entrada já ativo automaticamente
      />
      {inputValue === correctWord.toLowerCase() && (
        <p className="success-message">Parabéns! Você digitou a palavra corretamente.</p>
      )}
    </div>
  );
};

export default TypingTutorial;
