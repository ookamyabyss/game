import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/SecondModeOne_Two.png';
import './OneLevel.css';

const OneLevel = () => {
  const navigate = useNavigate();
  const [palavras] = useState(['BANANA', 'AMIGOS', 'GAROTO', 'FUTURO', 'BRASIL', 'CARROS', 'PRAIAS', 'LIVROS']);
  const [indicePalavraAtual, setIndicePalavraAtual] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [palavrasDigitadas, setPalavrasDigitadas] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(60); // Tempo alterado para 1 minuto
  const [gameStatus, setGameStatus] = useState('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [hintPalavra, setHintPalavra] = useState(null);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0 && gameStatus === 'playing') {
      setGameStatus('lost');
    }
  }, [timeRemaining, gameStatus, isPaused]);

  useEffect(() => {
    if (textoDigitado.length === 6) {
      const palavraAtual = palavras.find((p) => p === textoDigitado);
      if (palavraAtual) {
        setPalavrasDigitadas([...palavrasDigitadas, textoDigitado]);
        playSuccessSound();

        if (palavrasDigitadas.length + 1 === palavras.length) {
          calculateStars();
          setGameStatus('won');
        }
        setTextoDigitado('');
      } else {
        // Optional: Provide feedback for incorrect word
        setTextoDigitado('');
      }
    }
  }, [textoDigitado, palavrasDigitadas]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const playSuccessSound = () => {
    playSound(successSound);
  };

  const calculateStars = () => {
    const timeSpent = 60 - timeRemaining;
    const percentageUsed = (timeSpent / 60) * 100;

    if (percentageUsed <= 20) {
      setStars(3);
    } else if (percentageUsed <= 50) {
      setStars(2);
    } else if (percentageUsed <= 80) {
      setStars(1);
    } else {
      setStars(0);
    }
  };

  const restartLevel = () => {
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(60); // Reset tempo para 1 minuto
    setGameStatus('playing');
    setIsPaused(false);
    setHintPalavra(null);
    setStars(0);
  };

  const goToMenu = () => {
    playSound(clickSound);
    navigate('/second-mode');
  };

  const goToNextLevel = () => {
    playSound(clickSound);
    navigate('/first-mode-level/2');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePause = () => {
    playSound(clickSound);
    setIsPaused(true);
  };

  const handleContinue = () => {
    playSound(clickSound);
    setIsPaused(false);
  };

  const handleHint = () => {
    playSound(clickSound);
    const randomPalavra = palavras[indicePalavraAtual];
    setHintPalavra(randomPalavra);
    setTimeout(() => setHintPalavra(null), 3000);
  };

  const renderStars = () => {
    const totalStars = 3;
    const starsArray = [];

    for (let i = 0; i < totalStars; i++) {
      starsArray.push(
        <img key={i} src={i < stars ? starImage : starGrayImage} alt="Estrela" className="star-icon" />
      );
    }

    return <div className="star-feedback">{starsArray}</div>;
  };

  return (
    <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>NÍVEL 1</h1>

      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid">
            {Array(6).fill('').map((_, index) => (
              <div key={index} className="input-square">
                {textoDigitado[index] || ''}
              </div>
            ))}
          </div>

          <input
            type="text"
            className="hidden-input"
            value={textoDigitado}
            onChange={(e) => setTextoDigitado(e.target.value)}
            autoFocus
          />
          {hintPalavra && <p className="hint-text">Dica: {hintPalavra}</p>}
        </div>

        <div className="item-list">
          <div className="status">
            <p>Tempo restante: {formatTime(timeRemaining)}</p>
            <p>Palavras digitadas: {palavrasDigitadas.length}/{palavras.length}</p>
          </div>

          <h2>Palavras para digitar</h2>
          <ul>
            {palavras.map((palavra, index) => (
              <li key={index} className={palavrasDigitadas.includes(palavra) ? 'found' : ''}>
                {palavra}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="controls">
        <button className="btn-control" onClick={handlePause}>||</button>
        <button className="btn-control" onClick={handleHint}>?</button>
      </div>

      {gameStatus !== 'playing' && (
        <div className="pause-overlay">
          <div className="game-over-message">
            {gameStatus === 'won' ? (
              <>
                {renderStars()}
                <h2>PARABÉNS!</h2>
                <p>Você digitou todas as palavras corretamente.</p>
              </>
            ) : (
              <>
                <h2>QUE PENA!</h2>
                <p>Você não conseguiu digitar todas as palavras a tempo.</p>
              </>
            )}
            <button onClick={goToMenu}>Menu</button>
            <button onClick={goToNextLevel}>Próximo</button>
            <button onClick={restartLevel}>Reiniciar</button>
          </div>
        </div>
      )}

      {isPaused && (
        <div className="pause-overlay">
          <div className="pause-message">
            <h2>Jogo Pausado</h2>
            <button onClick={handleContinue}>Continuar</button>
            <button onClick={goToMenu}>Desistir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneLevel;
