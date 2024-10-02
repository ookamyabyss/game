import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import successSound from '../../../../assets/sounds/success.mp3';

import errorSound from '../../../../assets/sounds/click.mp3'; // Som para escolhas erradas

import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/ThirdModeOne_Two.png';
import './OneLevel.css';

const OneLevel = () => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(480);
    const [gameStatus, setGameStatus] = useState('playing');
    const [isPaused, setIsPaused] = useState(false);
    const [stars, setStars] = useState(0);
    const [hintsUsed, setHintsUsed] = useState(0);
    const MAX_HINTS = 6;
    const [showHintLimitMessage, setShowHintLimitMessage] = useState(false);

    // Estado para acompanhar as formas selecionadas e a correta
    const [selectedShape, setSelectedShape] = useState(null);
    const [correctShape, setCorrectShape] = useState('quadrado'); // A forma correta para completar a imagem

    const shapes = ['quadrado', 'triângulo', 'losango', 'quadrado', 'triângulo', 'losango', 'quadrado', 'triângulo', 'losango', 'quadrado', 'triângulo', 'losango'];

    const getTotalStars = () => {
        const stars = sessionStorage.getItem('totalStars');
        return stars ? parseInt(stars, 10) : 0;
    };

    const addStars = (stars) => {
        const currentStars = getTotalStars();
        const newTotal = currentStars + stars;
        sessionStorage.setItem('totalStars', newTotal);
    };

    const handleFinishLevel = (earnedStars) => {
        addStars(earnedStars);
    };

    // Controla o temporizador do jogo
    useEffect(() => {
        if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setGameStatus('lost');
        }
    }, [timeRemaining, gameStatus, isPaused]);

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const calculateStars = (timeRemaining, totalTime, hintsUsed) => {
        let calculatedStars = 1;
        const percentageTimeLeft = (timeRemaining / totalTime) * 100;

        if (percentageTimeLeft >= 50) {
            calculatedStars = 2;
        }
        if (percentageTimeLeft >= 75 && hintsUsed === 0) {
            calculatedStars = 3;
        }

        setStars(calculatedStars);
        return calculatedStars;
    };

    const restartLevel = () => {
        setTimeRemaining(480);
        setGameStatus('playing');
        setIsPaused(false);
        setSelectedShape(null);
        setStars(0);
        setHintsUsed(0);
    };

    const goToMenu = () => {
        playSound(clickSound);
        navigate("/third-mode");
    };

    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/third-mode-level/2');
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

    // Função para verificar a escolha da forma correta
    const handleShapeSelection = (shape) => {
        setSelectedShape(shape);
        if (shape === correctShape) {
            playSound(successSound);
            setGameStatus('won'); // Se a escolha estiver correta, o jogador vence
        } else {
            playSound(errorSound);
            // Pode adicionar lógica para penalizar o jogador ou exibir uma mensagem de erro
        }
    };

    const renderStars = () => {
        const totalStars = 3;
        const starsArray = [];

        for (let i = 0; i < totalStars; i++) {
            starsArray.push(
                <img
                    key={i}
                    src={i < stars ? starImage : starGrayImage}
                    alt="Estrela"
                    className="star-icon"
                />
            );
        }

        return <div className="star-feedback">{starsArray}</div>;
    };

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 1</h1>

            <div className="game-area-3">
                {/* Grade onde o jogador escolhe as formas geométricas */}
                <div className='item-grid-three'>
                    {/* Formas à esquerda */}
                    <div className="shapes-selection left">
                        {shapes.slice(0, 6).map((shape, index) => (
                            <div
                                key={index}
                                className={`shape ${shape}`}
                                onClick={() => handleShapeSelection(shape)}
                            >
                                {shape}
                            </div>
                        ))}
                    </div>

                    {/* Imagem incompleta com o espaço faltando */}
                    <div className="incomplete-image">
                        <div className="square">
                            {/* O triângulo faltando */}
                            <div className="missing-shape">
                                {/* Espaço para a forma faltante */}
                            </div>
                        </div>
                    </div>

                    {/* Formas à direita */}
                    <div className="shapes-selection right">
                        {shapes.slice(6, 12).map((shape, index) => (
                            <div
                                key={index}
                                className={`shape ${shape}`}
                                onClick={() => handleShapeSelection(shape)}
                            >
                                {shape}
                            </div>
                        ))}
                    </div>
                </div>



                <div className="item-list">
                    <div className="status-one">
                        <p>{formatTime(timeRemaining)}</p>
                    </div>
                </div>
            </div>


            {showHintLimitMessage && (
                <div className="hint-limit-message-overlay">
                    <div className="hint-limit-message">
                        <h2>Limite de Dicas Atingido!</h2>
                    </div>
                </div>
            )}

            <div className="controls-level-two">
                <button className="btn-control-two" onClick={handlePause}>||</button>
                <button className="btn-control-two" onClick={handlePause}>?</button>
            </div>

            {gameStatus !== 'playing' && (
                <div className="pause-overlay-one">
                    <div className="game-over-message-one">
                        {gameStatus === 'won' ? (
                            <>
                                {renderStars()}
                                <h2>PARABÉNS!</h2>
                                <p>Você completou a imagem a tempo.</p>
                            </>
                        ) : (
                            <>
                                <h2>QUE PENA!</h2>
                                <p>Você não completou a imagem a tempo.</p>
                            </>
                        )}
                        <button onClick={goToMenu}>Menu</button>
                        <button onClick={goToNextLevel}>Próximo</button>
                        <button onClick={restartLevel}>Reiniciar</button>
                    </div>
                </div>
            )}

            {isPaused && (
                <div className="pause-overlay-one">
                    <div className="pause-message-one">
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
