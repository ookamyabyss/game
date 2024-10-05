import React, { useState, useEffect } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Importa o som de sucesso
import './ControlsTutorial.css'; // Arquivo CSS para estilização

const TypingTutorial = () => {


  // Função para tocar o som de sucesso
  const playSound = (sound) => {
    const audio = new Audio(sound); // Cria um novo objeto de áudio
    audio.play(); // Toca o áudio
  };



  return (
    <div className="controls-tutorial-container">
      <p className="message-box-4" >Usando o teclado, digite a palavra abaixo :</p>



    </div>
  );
};

export default TypingTutorial;