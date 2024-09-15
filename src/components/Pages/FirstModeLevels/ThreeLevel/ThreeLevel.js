import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import itemFoundSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';        // Estrela colorida
import starGrayImage from '../../../../assets/stars/star-gray.png'; // Estrela em preto e branco
import backgroundImage from '../../../../assets/background_levels/FirstModeThree_Four.png';
import './ThreeLevel.css';

const ThreeLevel = () => {
    // Hook para navegação entre páginas
    const navigate = useNavigate();

    // Estados do componente
    const [items, setItems] = useState([]);  // Itens exibidos na tela
    const [itemsToFind, setItemsToFind] = useState([]);  // Itens que o usuário deve encontrar
    const [foundItems, setFoundItems] = useState([]);  // Itens encontrados pelo usuário
    const [timeRemaining, setTimeRemaining] = useState(180);  // Tempo restante para concluir o nível
    const [gameStatus, setGameStatus] = useState('playing');  // Status do jogo: 'playing', 'won', 'lost'
    const [isPaused, setIsPaused] = useState(false);  // Estado de pausa do jogo
    const [hintItem, setHintItem] = useState(null);  // Item para dica
    const [stars, setStars] = useState(0); // Estado para armazenar o número de estrelas

    // Função para importar todos os itens da pasta
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''),
            image: r(fileName)
        }));
    };

    // Importa todos os itens do diretório especificado
    const allItems = importAll(require.context('../../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

    // Efeito para inicializar o jogo quando o componente é montado
    useEffect(() => {
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));
    }, []);

    // Efeito para gerenciar o cronômetro do jogo
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

    // Função para lidar com o clique em um item
    const handleItemClick = (item) => {
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);
            playItemFoundSound();

            if (foundItems.length + 1 === itemsToFind.length) {
                calculateStars();
                setGameStatus('won');
            }
        }
    };

    // Função para tocar um som
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    // Função para tocar o som de item encontrado
    const playItemFoundSound = () => {
        playSound(itemFoundSound);
    };

    // Função para calcular o número de estrelas baseado no tempo gasto
    const calculateStars = () => {
        const timeSpent = 180 - timeRemaining; // Tempo gasto para concluir a fase
        const percentageUsed = (timeSpent / 180) * 100;

        if (percentageUsed <= 20) {
            setStars(3); // Menos de 20% do tempo usado: 3 estrelas
        } else if (percentageUsed <= 50) {
            setStars(2); // Menos de 50% do tempo usado: 2 estrelas
        } else if (percentageUsed <= 80) {
            setStars(1); // Menos de 80% do tempo usado: 1 estrela
        } else {
            setStars(0); // Tempo esgotado ou mais de 80% do tempo usado: 0 estrelas
        }
    };

    // Função para reiniciar o nível
    const restartLevel = () => {
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);
    
        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));
    
        setFoundItems([]);
        setTimeRemaining(180);
        setGameStatus('playing');
        setIsPaused(false);
        setHintItem(null);
        setStars(0); // Resetar estrelas ao reiniciar
    };

    // Função para ir ao menu principal
    const goToMenu = () => {
        playSound(clickSound);
        navigate("/first-mode");
    };

    // Função para ir para o próximo nível
    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/first-mode-level/4');
    };

    // Função para formatar o tempo restante
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Função para pausar o jogo
    const handlePause = () => {
        playSound(clickSound);
        setIsPaused(true);
    };

    // Função para continuar o jogo após pausa
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função para fornecer uma dica ao usuário
    const handleHint = () => {
        playSound(clickSound);
        if (itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setTimeout(() => setHintItem(null), 3000); // Remove a dica após 3 segundos
        }
    };

    // Função para renderizar as estrelas de feedback
    const renderStars = () => {
        const totalStars = 3;
        const starsArray = [];
    
        for (let i = 0; i < totalStars; i++) {
            starsArray.push(
                <img 
                    key={i} 
                    src={i < stars ? starImage : starGrayImage} 
                    alt="Estrela" 
                    className="star-icon"  // Adiciona uma classe CSS para as estrelas
                />
            );
        }
    
        return <div className="star-feedback">{starsArray}</div>;
    };    

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 3</h1>

            <div className="game-area">
                <div className="item-grid" style={{ visibility: isPaused ? 'hidden' : 'visible' }}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found' : ''} ${hintItem === item ? 'hint' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>

                <div className="item-list">
                    <div className="status">
                        <p>{formatTime(timeRemaining)}</p>
                        <p>Itens encontrados: </p>
                        <p>{foundItems.length}/{itemsToFind.length}</p>
                    </div>
                    <ul>
                        {itemsToFind.map((item, index) => (
                            <li key={index} className={foundItems.includes(item) ? 'found' : ''}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="controls-level-three">
                <button className="btn-control" onClick={handlePause}>||</button>
                <button className="btn-control" onClick={handleHint}>?</button>
            </div>

            {gameStatus !== 'playing' && (
                <div className="pause-overlay">
                    <div className="game-over-message">
                        {gameStatus === 'won' ? (
                            <>
                                {renderStars()} {/* Exibir estrelas coloridas e cinzas */}
                                <h2>PARABÉNS!</h2>
                                <p>Você encontrou todos os itens.</p>
                            </>
                        ) : (
                            <>
                                <h2>QUE PENA!</h2>
                                <p>Você não encontrou todos os itens.</p>
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

export default ThreeLevel;
