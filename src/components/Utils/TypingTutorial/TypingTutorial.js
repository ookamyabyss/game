import React, { useState } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Importa o som de sucesso
import './TypingTutorial.css'; // Arquivo CSS para estilização

const TypingTutorial = () => {
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // Estado para exibir o balão de sucesso
  const correctWord = 'COMPUTADOR'; // Palavra correta que o jogador precisa digitar

  const playSound = (sound) => {
    const audio = new Audio(sound); // Cria um novo objeto de áudio
    audio.play(); // Toca o áudio
  };

  const handleInputChange = (e) => {
    const userInput = e.target.value.toLowerCase(); // Converte a entrada para minúsculas
    setInputValue(userInput);

    // Verifica se a palavra digitada está correta
    if (userInput === correctWord.toLowerCase()) {
      setShowSuccess(true); // Exibe o balão de sucesso
      playSound(successSound); // Toca o som de sucesso
    }
  };

  return (
    <div className="typing-tutorial-container">
      <p>Usando o teclado, digite a palavra abaixo:</p>
      <p>COMPUTADOR</p>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="typing-input"
          placeholder="Digite aqui..."
          autoFocus // Campo de entrada já ativo automaticamente
        />

        {/* Exibe o balão de sucesso próximo ao campo de digitação */}
        {showSuccess && (
          <div className="chat-bubble">
            Você acertou!
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTutorial;
