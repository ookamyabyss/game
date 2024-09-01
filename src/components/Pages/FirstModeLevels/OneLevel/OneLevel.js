import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundVideo from '../../../Utils/BackgroundVideo/BackgroundVideo';
import clickSound from '../../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import itemFoundSound from '../../../../assets/sounds/success.mp3'; // Novo som para item encontrado
import './OneLevel.css';

const OneLevel = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [itemsToFind, setItemsToFind] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [gameStatus, setGameStatus] = useState('playing');
    const [isPaused, setIsPaused] = useState(false); // Novo estado para pausa
    const [hintItem, setHintItem] = useState(null); // Novo estado para dica

    // Função para importar todas as imagens da pasta
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''), // "sorvete" se o arquivo for "sorvete.jpg"
            image: r(fileName) // Caminho da imagem
        }));
    };

    // Importar todas as imagens da pasta
    const allItems = importAll(require.context('../../../../assets/itensFistMode', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        // Embaralha todos os itens e seleciona 60 para exibir na grade
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        // Seleciona 10 itens aleatórios da lista de itens exibidos para a lista de itens a serem encontrados
        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));
    }, []);

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
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);
            playItemFoundSound(); // Tocar som quando item encontrado

            if (foundItems.length + 1 === itemsToFind.length) {
                setGameStatus('won');
            }
        }
    };

    const playSound = (soundFile) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    const playItemFoundSound = () => {
        playSound(itemFoundSound); // Tocar som específico para item encontrado
    };

    const restartLevel = () => {
        setFoundItems([]);
        setTimeRemaining(60);
        setGameStatus('playing');
        setIsPaused(false); // Resetar o estado de pausa
        setHintItem(null); // Resetar a dica
    };

    const goToMenu = () => {
        playSound(clickSound);
        navigate(-1); // Ajuste o caminho conforme necessário
    };

    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/fist-mode-level/2'); // Ajuste o caminho conforme necessário
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleBackClick = () => {
        playSound(clickSound);
        navigate(-1); // Volta para a página anterior
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
        if (itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setTimeout(() => setHintItem(null), 3000); // Resetar dica após 3 segundos
        }
    };

    return (
        <div className="level-container">
            <BackgroundVideo />
            <h1>NÍVEL 1</h1>

            <div className="game-area">
                {/* Matriz de Itens com 8 colunas e ajustada automaticamente */}
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

                {/* Lista de Itens a Serem Encontrados com Status */}
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

            {/* Botões de Controle */}
            <div className="controls">
                <button className="btn-control" onClick={handlePause}>||</button>
                <button className="btn-control" onClick={handleHint}>?</button>
            </div>

            {/* Mensagem de Fim de Jogo */}
            {gameStatus !== 'playing' && (
                <div className="pause-overlay">
                    <div className="game-over-message">
                        {gameStatus === 'won' ? (
                            <>
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
                        <button onClick={goToNextLevel}>Próximo Nível</button>
                        <button onClick={restartLevel}>Reiniciar</button>
                    </div>
                </div>
            )}

            {/* Sobreposição de Pausa */}
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
