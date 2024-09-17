import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3';
import itemFoundSound from '../../../../assets/sounds/success.mp3';
import starImage from '../../../../assets/stars/star.png';
import starGrayImage from '../../../../assets/stars/star-gray.png';
import backgroundImage from '../../../../assets/background_levels/FirstModeNine_Ten.png';
import lockIcon from '../../../../assets/icons/lock.png'; // Ícone de cadeado
import './TenLevel.css';

const TenLevel = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [itemsToFind, setItemsToFind] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(200);
    const [gameStatus, setGameStatus] = useState('playing');
    const [isPaused, setIsPaused] = useState(false);
    const [hintItem, setHintItem] = useState(null);
    const [stars, setStars] = useState(0);
    const [itemVisibility, setItemVisibility] = useState({});
    const [visibilityInterval, setVisibilityInterval] = useState(null);
    const [lockedItems, setLockedItems] = useState([]);

    // Função para carregar as imagens dos itens
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''),
            image: r(fileName)
        }));
    };

    const allItems = importAll(require.context('../../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        const initializeGame = () => {
            const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
            setItems(shuffledItems);
    
            const itemsToFindSet = new Set();
            while (itemsToFindSet.size < 18) {
                itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
            }
            setItemsToFind(Array.from(itemsToFindSet));
    
            // Inicializa a visibilidade dos itens
            const visibility = {};
            shuffledItems.forEach(item => {
                visibility[item.name] = true;
            });
            setItemVisibility(visibility);
    
            // Inicializa itens bloqueados
            const initialLockedItems = Array.from(itemsToFindSet).slice(0, 6); // Ajuste a quantidade conforme necessário
            setLockedItems(Array.from(allItems.sort(() => 0.5 - Math.random()).slice(0, 30)).slice(0, 45));
        };
    
        initializeGame();
    }, []);

    useEffect(() => {
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

    const handleItemClick = (item) => {
        if (lockedItems.includes(item)) {
            return; // Não faz nada se o item estiver bloqueado
        }
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);
            playItemFoundSound();

            // Desbloquear itens conforme encontrados
            if (lockedItems.length > 0) {
                const newLockedItems = lockedItems.slice(1); // Remove o item bloqueado mais à frente
                setLockedItems(newLockedItems);
            }

            if (foundItems.length + 1 === itemsToFind.length) {
                calculateStars();
                setGameStatus('won');
            }
        }
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const playItemFoundSound = () => {
        playSound(itemFoundSound);
    };

    const calculateStars = () => {
        const timeSpent = 200 - timeRemaining;
        const percentageUsed = (timeSpent / 200) * 100;

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
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 18) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));

        setFoundItems([]);
        setTimeRemaining(200);
        setGameStatus('playing');
        setIsPaused(false);
        setHintItem(null);
        setStars(0);

        // Reinicializa a visibilidade
        const visibility = {};
        shuffledItems.forEach(item => {
            visibility[item.name] = true;
        });
        setItemVisibility(visibility);

        // Reinicia os itens bloqueados
        const initialLockedItems = Array.from(itemsToFindSet).slice(0, 6); // Ajuste a quantidade conforme necessário
        setLockedItems(initialLockedItems);
    };

    const goToMenu = () => {
        playSound(clickSound);
        navigate("/first-mode");
    };

    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/first-mode-level/1');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

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

    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    const handleHint = () => {
        playSound(clickSound);
        if (itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setTimeout(() => setHintItem(null), 3000);
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
        <div className={`level-container ${isPaused ? 'paused' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 10</h1>
        
            <div className="game-area">
                <div className={`item-grid ${isPaused ? 'paused' : ''}`}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found-one' : ''} ${hintItem === item ? 'hint' : ''}`}
                            onClick={() => handleItemClick(item)}
                            style={{ visibility: itemVisibility[item.name] ? 'visible' : 'hidden' }}
                        >
                            <img src={item.image} alt={item.name} />
                            {lockedItems.includes(item) && (
                                <img src={lockIcon} alt="Cadeado" className="lock-icon" />
                            )}
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
                            <li key={index} className={foundItems.includes(item) ? 'found-one' : ''}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Tela de pausa */}
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
        
            {/* Controles do jogo */}
            <div className="controls-level-one">
                <button className="btn-control-one" onClick={handlePause}>||</button>
                <button className="btn-control-one" onClick={handleHint}>?</button>
            </div>
        
            {/* Tela de Game Over ou vitória */}
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

export default TenLevel;
