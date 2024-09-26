import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/SecondModeNine_Ten.png';
import './TenLevel.css';

const TenLevel = () => {
  const navigate = useNavigate();
  const todasPalavras = [ 
    '1234ABCDETRA', '2345EFGHETRA', '3456IJKL2345', '234567MNOP23', '723458QRST34',
    '6789UVWXETRA', '7890YZABETRA', '8901CDEF2345', '234512GHIJ78', '223453JKLM89',
    '1357NOPQETRA', '2468RSTUETRA', '3579VWXY2345', '234580ZABC34', '923451DEFG45',
    '6802HIJKETRA', '7913LMNOETRA', '8024PQRS2345', '234535TUVW89', '423456XYZA90',
    '1358BCDEETRA', '2469FGHIETRA', '3570JKLM2345', '234581NOPQ78', '923452RSTU90',
    '6803VWXYETRA', '7914ZABCETRA', '8025DEFG2345', '234536HIJK78', '423457LMNO90' ];

  const [palavras, setPalavras] = useState([]);
  const [indicePalavraAtual, setIndicePalavraAtual] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState('');
  const [palavrasDigitadas, setPalavrasDigitadas] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [gameStatus, setGameStatus] = useState('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [hintPalavra, setHintPalavra] = useState(null);
  const [stars, setStars] = useState(0);
  const [highlightedSquares, setHighlightedSquares] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [palavrasOcultadas, setPalavrasOcultadas] = useState([]);

  const selecionarPalavrasAleatorias = () => {
    const palavrasSelecionadas = [];
    while (palavrasSelecionadas.length < 9) {
      const indexAleatorio = Math.floor(Math.random() * todasPalavras.length);
      const palavraSelecionada = todasPalavras[indexAleatorio];
      if (!palavrasSelecionadas.includes(palavraSelecionada)) {
        palavrasSelecionadas.push(palavraSelecionada);
      }
    }
    setPalavras(palavrasSelecionadas);
    setPalavrasOcultadas(palavrasSelecionadas); // Inicialmente exibe as palavras
  };

  useEffect(() => {
    selecionarPalavrasAleatorias();
  }, []);

  useEffect(() => {
    const ocultarTresLetrasAleatorias = (palavrasAtuais) => {
      const palavrasOcultadas = palavrasAtuais.map((palavra) => {
        let indicesAleatorios = [];
        while (indicesAleatorios.length < 3) {
          const indexAleatorio = Math.floor(Math.random() * palavra.length);
          if (!indicesAleatorios.includes(indexAleatorio)) {
            indicesAleatorios.push(indexAleatorio);
          }
        }
        let palavraComOcultacoes = palavra.split('');
        indicesAleatorios.forEach((index) => {
          palavraComOcultacoes[index] = '*';
        });
        return palavraComOcultacoes.join('');
      });
      setPalavrasOcultadas(palavrasOcultadas);
    };
  
    // Captura as palavras selecionadas inicialmente e oculta letras
    const palavrasSelecionadas = [...palavras]; // Clona as palavras atuais para garantir que sejam mantidas as mesmas
    const primeiroTimeout = setTimeout(() => {
      ocultarTresLetrasAleatorias(palavrasSelecionadas);
    }, 30000); // Oculta após 20 segundos
  
    const intervalo = setInterval(() => {
      ocultarTresLetrasAleatorias(palavrasSelecionadas); // Usa as palavras selecionadas inicialmente
    }, 5000); // Continua ocultando a cada 20 segundos
  
    // Limpa os timers ao desmontar o componente
    return () => {
      clearTimeout(primeiroTimeout);
      clearInterval(intervalo);
    };
  }, [palavras]); 
  
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
    if (textoDigitado.length === 12) {
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
    const timeSpent = 300 - timeRemaining;
    const percentageUsed = (timeSpent / 300) * 100;

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
    selecionarPalavrasAleatorias(); // Seleciona novas palavras aleatórias
    setIndicePalavraAtual(0);
    setPalavrasDigitadas([]);
    setTimeRemaining(300); // Reinicia o tempo
    setGameStatus('playing'); // Muda o status para "playing"
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
    navigate('/second-mode-level/9');
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
      <h1>NÍVEL 10</h1>

      <div className="game-area">
        <div className="typing-area">
          <div className="input-grid-10" onClick={handleClickOnSquare}>
            {Array(12).fill('').map((_, index) => (
              <React.Fragment key={index}>
                <div className="input-square">
                  {textoDigitado[index] || ''}
                  {index === cursorPosition && <span className="cursor" />}
                </div>
                {/* Exibir o traço entre o quarto e o quinto quadrado */}
                {index === 2 && <span className="dash-10">-</span>}
                {index === 5 && <span className="dash-10">-</span>}
                {index === 8 && <span className="dash-10">-</span>}
              </React.Fragment>
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

        <div className="item-list-10">
          <div className="status">
            <p>{formatTime(timeRemaining)}</p>
            <p>Palavras digitadas:</p>
            <p>{palavrasDigitadas.length}/{palavras.length}</p>
          </div>

          {/* Aplique a classe hidden-TWO diretamente no contêiner da lista de palavras */}
          <ul className={`palavras-list ${isPaused ? 'hidden' : ''}`}> 
            {palavrasOcultadas.map((palavra, index) => (
              <li key={index} className={palavrasDigitadas.includes(palavras[index]) ? 'found-one' : ''}>
                {palavra.slice(0, 3) + '-' + palavra.slice(3, 6) + '-' + palavra.slice(6, 9) + '-' + palavra.slice(9)}
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
                <p>Você digitou todas os códigos corretamente.</p>
              </>
            ) : (
              <>
                <h2>QUE PENA!</h2>
                <p>Você não conseguiu digitar todas os códigos a tempo.</p>
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

export default TenLevel;