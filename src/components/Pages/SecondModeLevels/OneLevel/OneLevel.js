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
  const [palavras] = useState(['BANANA', 'AMIGOS', 'GAROTO', 'FUTURO', 'BRASIL', 'CARROS']);
  const [indicePalavraAtual, setIndicePalavraAtual] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [palavrasDigitadas, setPalavrasDigitadas] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(480);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [hintPalavra, setHintPalavra] = useState(null);
  const [stars, setStars] = useState(0);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0); // Adicionado

  useEffect(() => {
    const inputField = document.querySelector('.hidden-input');
    if (inputField && !isPaused) {
      inputField.focus();
      inputField.setSelectionRange(textoDigitado.length, textoDigitado.length); // Coloca o cursor no final
    }
  }, [textoDigitado, isPaused]);

  useEffect(() => {
    // Atualiza a posição do cursor
    setCursorPosition(textoDigitado.length);
  }, [textoDigitado]);
  
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
      const palavraAtual = palavras.find((p) => p === textoDigitado.toUpperCase());
      if (palavraAtual) {
        setPalavrasDigitadas([...palavrasDigitadas, textoDigitado]);
        setHighlightedSquares([...highlightedSquares, textoDigitado]);
        playSuccessSound();

        setHintIndex(0);

        if (palavrasDigitadas.length + 1 === palavras.length) {
          calculateStars();
          setGameStatus('won');
        }
        setTextoDigitado('');
      } else {
        setTextoDigitado('');
      }
    }
  }, [textoDigitado, palavrasDigitadas, highlightedSquares]);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const playSuccessSound = () => {
    playSound(successSound);
  };

  const calculateStars = () => {
    const timeSpent = 480 - timeRemaining;
    const percentageUsed = (timeSpent / 480) * 100;

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

  const handleClickOnSquare = () => {
    document.querySelector('.hidden-input').focus();
  };

  const restartLevel = () => {
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(480);
    setGameStatus('playing');
    setIsPaused(false);
    setHintPalavra(null);
    setStars(0);
    setHighlightedSquares([]);
    setTextoDigitado('');
    setHintIndex(0);
  };

  const goToMenu = () => {
    playSound(clickSound);
    navigate('/second-mode');
  };

  const goToNextLevel = () => {
    playSound(clickSound);
    navigate('/second-mode-level/2');
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
    let palavraEmProgresso = palavras.find(
      (p) => p.startsWith(textoDigitado) && !palavrasDigitadas.includes(p)
    );

    if (!palavraEmProgresso) {
      palavraEmProgresso = palavras.find((p) => !palavrasDigitadas.includes(p));
      setTextoDigitado('');
    }

    if (palavraEmProgresso) {
      const letrasRestantes = palavraEmProgresso.slice(textoDigitado.length);
      if (letrasRestantes.length > 0) {
        const novaLetra = letrasRestantes[0];
        setTextoDigitado((prevTexto) => prevTexto + novaLetra);
        setHintIndex(hintIndex + 1);
        setTimeout(() => setHintPalavra(null), 3000);
      }
    }
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

  const handleInputChange = (e) => {
    setTextoDigitado(e.target.value.toUpperCase());
    setCursorPosition(e.target.value.length); // Atualiza a posição do cursor
  };

  return (
    <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1>NÍVEL 1</h1>

      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid" onClick={handleClickOnSquare}>
            {Array(6).fill('').map((_, index) => (
              <div key={index} className="input-square">
                {textoDigitado[index] || ''}
                {index === cursorPosition && <span className="cursor" />}
              </div>
            ))}
          </div>

          <input
            type="text"
            className="hidden-input"
            value={textoDigitado}
            onChange={handleInputChange}
            autoFocus
          />

          {highlightedSquares.length > 0 && (
            <div className="correto-grid">
              {highlightedSquares.map((palavra, index) => (
                <div key={index} className="correct">
                  {palavra.split('').map((letra, letraIndex) => (
                    <span key={letraIndex}>{letra}</span>
                  ))}
                </div>
              ))}
            </div>
          )}

          {hintPalavra && <p className="hint-text">Dica: {hintPalavra}</p>}
        </div>

        <div className="item-list">
          <div className="status">
            <p>{formatTime(timeRemaining)}</p>
            <p>Palavras digitadas:</p>
            <p>{palavrasDigitadas.length}/{palavras.length}</p>
          </div>

          {/* Aplique a classe hidden-TWO diretamente no contêiner da lista de palavras */}
          <ul className={`palavras-list ${isPaused ? 'hidden' : ''}`}>
            {palavras.map((palavra, index) => (
              <li
                key={index}
                className={`${
                  palavrasDigitadas.includes(palavra) ? 'found-one' : ''
                } ${palavra === hintPalavra ? 'highlight' : ''}`}
              >
                {palavra}
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="controls-second">
        <button className="second-btn-control" onClick={handlePause}>||</button>
        <button className="second-btn-control" onClick={handleHint}>?</button>
      </div>

      {gameStatus !== 'playing' && (
        <div className="pause-overlay-two">
          <div className="game-over-message-two">
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
        <div className="pause-overlay-two">
          <div className="pause-message-two">
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