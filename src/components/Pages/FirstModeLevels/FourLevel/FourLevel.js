import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3'; // Som para cliques
import itemFoundSound from '../../../../assets/sounds/success.mp3'; // Som quando um item é encontrado
import starImage from '../../../../assets/stars/star.png'; // Imagem da estrela colorida
import starGrayImage from '../../../../assets/stars/star-gray.png'; // Imagem da estrela cinza
import backgroundImage from '../../../../assets/background_levels/FirstModeThree_Four.png'; // Imagem de fundo do nível
import './FourLevel.css'; // Arquivo de estilos do nível

const FourLevel = () => {
    const navigate = useNavigate(); // Hook para navegação entre páginas

    // Estado do nível, inicializado com 1
    const [level, setLevel] = useState(1);

    // Estados do componente
    const [items, setItems] = useState([]); // Itens disponíveis para seleção
    const [itemsToFind, setItemsToFind] = useState([]); // Itens que o jogador deve encontrar
    const [foundItems, setFoundItems] = useState([]); // Itens que o jogador já encontrou
    const [timeRemaining, setTimeRemaining] = useState(480); // Inicializa com um valor padrão
    const [gameStatus, setGameStatus] = useState('playing'); // Status do jogo
    const [isPaused, setIsPaused] = useState(false); // Controle de pausa
    const [hintItem, setHintItem] = useState(null); // Item de dica
    const [stars, setStars] = useState(0); // Contador de estrelas
    const [itemVisibility, setItemVisibility] = useState({});
    const [visibilityInterval, setVisibilityInterval] = useState(null);
    const [hintsUsed, setHintsUsed] = useState(0); // Usar estado para controlar as dicas
    const [showHintLimitMessage, setShowHintLimitMessage] = useState(false); // Estado para controlar a exibição da mensagem de limite
    const [totalStars, setTotalStars] = useState(0);

    const MAX_HINTS = 4 + level - 1; // Dicas permitidas ajustadas pelo nível

    // Função para calcular o nível com base nas estrelas
    const calculateLevel = (stars) => {
        let currentLevel = 1;
        let starsNeeded = 10;

        while (stars >= starsNeeded) {
            currentLevel++;
            starsNeeded += 15;
        }

        return currentLevel;
    };

    // Função para recuperar a contagem de estrelas do sessionStorage
    const getTotalStars = () => {
        const stars = sessionStorage.getItem('totalStars');
        return stars ? parseInt(stars, 10) : 0;
    };

    // Função para adicionar estrelas ao sessionStorage
    const addStars = (stars) => {
        const currentStars = getTotalStars();
        const newTotal = currentStars + stars;
        sessionStorage.setItem('totalStars', newTotal);
        setTotalStars(newTotal); // Atualiza o estado local também
    };

    // Função que roda ao montar o componente para atualizar totalStars e o nível
    useEffect(() => {
        const starsFromStorage = getTotalStars();
        const currentLevel = calculateLevel(starsFromStorage);
        setLevel(currentLevel);
        setTimeRemaining(480 + (currentLevel - 1) * 30); // Ajusta o tempo inicial baseado no nível
    }, []);

    const handleFinishLevel = (earnedStars) => {
        addStars(earnedStars);
        const updatedStars = getTotalStars();
        setLevel(calculateLevel(updatedStars)); // Atualiza o nível após concluir o nível
    };

    // Função para carregar as imagens dos itens
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''),
            image: r(fileName)
        }));
    };

    // Carrega todas as imagens dos itens disponíveis
    const allItems = importAll(require.context('../../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // Inicializa o jogo embaralhando os itens e criando a lista de itens a serem encontrados
        const initializeGame = () => {
            const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
            setItems(shuffledItems);

            const itemsToFindSet = new Set();
            while (itemsToFindSet.size < 10) {
                itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
            }
            setItemsToFind(Array.from(itemsToFindSet));

            // Inicializa a visibilidade dos itens
            const visibility = {};
            shuffledItems.forEach(item => {
                visibility[item.name] = true;
            });
            setItemVisibility(visibility);
        };

        initializeGame();
    }, []);

    useEffect(() => {
        // Controla o intervalo de alternância de visibilidade dos itens
        const startVisibilityInterval = () => {
            const intervalId = setInterval(() => {
                setItemVisibility((prevVisibility) => {
                    const newVisibility = { ...prevVisibility };
                    items.forEach(item => {
                        if (Math.random() > 0.5) {
                            newVisibility[item.name] = !newVisibility[item.name];
                        }
                    });
                    return newVisibility;
                });
            }, 3000); // A cada 3 segundos
            setVisibilityInterval(intervalId);
        };

        if (!isPaused && gameStatus === 'playing') {
            startVisibilityInterval();
        }

        return () => clearInterval(visibilityInterval);
    }, [isPaused, gameStatus, items]);

    // Controla o temporizador do jogo
    useEffect(() => {
        // Controla o temporizador do jogo
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
            const updatedFoundItems = [...foundItems, item];
            setFoundItems(updatedFoundItems);
            playItemFoundSound();
    
            // Verifica se todos os itens foram encontrados
            if (updatedFoundItems.length === itemsToFind.length) {
                const earnedStars = calculateStars(timeRemaining, 480, hintsUsed); // Calcula estrelas
                setGameStatus('won');
                handleFinishLevel(earnedStars); // Atualiza o total de estrelas
            }
        }
    };

    // Função para tocar um som
    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    // Função para tocar o som quando um item é encontrado
    const playItemFoundSound = () => {
        playSound(itemFoundSound);
    };

    // Calcula o número de estrelas com base no tempo gasto
    const calculateStars = (timeRemaining, totalTime, hintsUsed) => {
        let calculatedStars = 1; // O jogador sempre começa com 1 estrela
        const percentageTimeLeft = (timeRemaining / totalTime) * 100;
    
        if (percentageTimeLeft >= 50) {
            calculatedStars = 2; // Se restar 50% ou mais do tempo, ganha 2 estrelas
        }
        if (percentageTimeLeft >= 75 && hintsUsed === 0) {
            calculatedStars = 3; // Se restar 75% ou mais do tempo e não usou dicas, ganha 3 estrelas
        }
    
        setStars(calculatedStars); // Atualiza o estado com o número de estrelas
        return calculatedStars; // Retorna o número de estrelas calculadas
    };

    // Função para reiniciar o nível
    const restartLevel = () => {
        // Reinicia o jogo mantendo o estado original de visibilidade e tempo
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));

        setFoundItems([]);
        setTimeRemaining(480 + (level - 1) * 30); // Ajusta o tempo baseado no nível
        setGameStatus('playing');
        setIsPaused(false);
        setHintItem(null);
        setStars(0);
        setHintsUsed(0); // Reseta o número de dicas usadas
        // Reinicializa a visibilidade
        const visibility = {};
        shuffledItems.forEach(item => {
            visibility[item.name] = true;
        });
        setItemVisibility(visibility);
    };

    // Função para ir ao menu principal
    const goToMenu = () => {
        playSound(clickSound);
        navigate("/first-mode");
    };

    // Função para avançar para o próximo nível
    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/first-mode-level/5');
    };

    // Formatação do tempo restante no formato MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    // Função para pausar o jogo
    const handlePause = () => {
        playSound(clickSound);
        setIsPaused(true);
        clearInterval(visibilityInterval); // Para a alternância de visibilidade
    
        // Define a visibilidade de todos os itens como false
        setItemVisibility((prevVisibility) => {
            const newVisibility = {};
            Object.keys(prevVisibility).forEach(item => {
                newVisibility[item] = false;
            });
            return newVisibility;
        });
    };

    // Função para continuar o jogo após a pausa
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função para exibir uma dica
    const handleHint = () => {
        playSound(clickSound);

        if (hintsUsed < MAX_HINTS && itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setHintsUsed(hintsUsed + 1);  // Atualiza o estado com uma nova dica usada
            // Remove a dica após 3 segundos
            setTimeout(() => setHintItem(null), 2000);
        } else {
            // Exibe a mensagem de limite de dicas
            setShowHintLimitMessage(true);

            // Remove a mensagem após 3 segundos
            setTimeout(() => setShowHintLimitMessage(false), 3000);
        }
    };

    // Função para renderizar as estrelas baseadas no desempenho do jogador
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
        <div className={`level-container ${isPaused ? 'paused' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 4</h1>
        
            <div className="game-area">
                {/* A classe paused é adicionada aqui para tornar a grade invisível */}
                <div className={`item-grid-one ${isPaused ? 'paused' : ''}`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found-one' : ''} ${hintItem === item ? 'hint' : ''}`}
                            onClick={() => handleItemClick(item)}
                            style={{ visibility: itemVisibility[item.name] ? 'visible' : 'hidden' }}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>
        
                <div className="item-list">
                    <div className="status-one">
                        <p>Tempo Limite: {formatTime(timeRemaining)}</p>
                        <p>Itens encontrados: {foundItems.length}/{itemsToFind.length} </p>
                        <p>Encontre os itens listado abaixo.</p>
                    </div>
                    <ul>
                        {itemsToFind.map((item, index) => (
                            <li key={index} className={foundItems.includes(item) ? 'found-one' : ''}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Overlay de pausa */}
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
        
            {showHintLimitMessage && (
                <div className="hint-limit-message-overlay">
                    <div className="hint-limit-message">
                        <h2>Limite de Dicas Atingido!</h2>
                    </div>
                </div>
            )}           

            <div className="controls-level-one">
                <button className="btn-control-one" onClick={handlePause}>||</button>
                <button className="btn-control-one" onClick={handleHint}>?</button>
            </div>
        
            {gameStatus !== 'playing' && (
                <div className="pause-overlay-one">
                    <div className="game-over-message-one">
                        {gameStatus === 'won' ? (
                            <>
                                {renderStars()} {/* Exibe estrelas coloridas e cinzas */}
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

        </div>
    );
};

export default FourLevel;