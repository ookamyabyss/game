import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../../assets/sounds/click.mp3'; // Som para cliques
import itemFoundSound from '../../../../assets/sounds/success.mp3'; // Som quando um item é encontrado
import starImage from '../../../../assets/stars/star.png'; // Imagem da estrela colorida
import starGrayImage from '../../../../assets/stars/star-gray.png'; // Imagem da estrela cinza
import backgroundImage from '../../../../assets/background_levels/FirstModeOne_Two.png'; // Imagem de fundo do nível
import './TwoLevel.css'; // Arquivo de estilos do nível

const TwoLevel = () => {
    const navigate = useNavigate(); // Hook para navegação entre páginas

    // Estados do componente
    const [items, setItems] = useState([]); // Itens disponíveis para seleção
    const [itemsToFind, setItemsToFind] = useState([]); // Itens que o jogador deve encontrar
    const [foundItems, setFoundItems] = useState([]); // Itens que o jogador já encontrou
    const [timeRemaining, setTimeRemaining] = useState(300); // Tempo restante do jogo (em segundos)
    const [gameStatus, setGameStatus] = useState('playing'); // Status do jogo: 'playing', 'won', 'lost'
    const [isPaused, setIsPaused] = useState(false); // Controle de pausa do jogo
    const [hintItem, setHintItem] = useState(null); // Item de dica
    const [stars, setStars] = useState(0); // Contador de estrelas

    // Função para importar todas as imagens de itens de um diretório
    const importAll = (r) => {
        return r.keys().map((fileName) => ({
            name: fileName.replace('./', '').replace(/\.\w+$/, ''),
            image: r(fileName)
        }));
    };

    // Carrega todas as imagens dos itens disponíveis
    const allItems = importAll(require.context('../../../../assets/itensFirstMode', false, /\.(png|jpe?g|svg)$/));

    // Embaralha os itens e define os itens a serem encontrados
    useEffect(() => {
        // Embaralha e seleciona 60 itens
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        // Seleciona 10 itens aleatórios para encontrar
        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));
    }, []); // Executa uma vez quando o componente é montado

    // Controla o temporizador do jogo
    useEffect(() => {
        if (gameStatus === 'playing' && timeRemaining > 0 && !isPaused) {
            // Atualiza o tempo restante a cada segundo
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Limpa o intervalo quando o componente é desmontado ou a pausa é ativada
        } else if (timeRemaining === 0) {
            setGameStatus('lost'); // Define o status do jogo como 'lost' se o tempo acabar
        }
    }, [timeRemaining, gameStatus, isPaused]);

    // Função para lidar com o clique em um item
    const handleItemClick = (item) => {
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);
            playItemFoundSound();

            // Verifica se todos os itens foram encontrados
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

    // Função para tocar o som quando um item é encontrado
    const playItemFoundSound = () => {
        playSound(itemFoundSound);
    };

    // Calcula o número de estrelas com base no tempo gasto
    const calculateStars = () => {
        const timeSpent = 300 - timeRemaining;
        const percentageUsed = (timeSpent / 300) * 100;

        if (percentageUsed <= 20) {
            setStars(3); // Menos de 20% do tempo usado: 3 estrelas
        } else if (percentageUsed <= 50) {
            setStars(2); // Menos de 50% do tempo usado: 2 estrelas
        } else if (percentageUsed <= 80) {
            setStars(1); // Menos de 80% do tempo usado: 1 estrela
        } else {
            setStars(0); // Mais de 80% do tempo usado: 0 estrelas
        }
    };

    // Função para reiniciar o nível
    const restartLevel = () => {
        // Reinicializa os itens e o estado do jogo
        const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 60);
        setItems(shuffledItems);

        const itemsToFindSet = new Set();
        while (itemsToFindSet.size < 10) {
            itemsToFindSet.add(shuffledItems[Math.floor(Math.random() * shuffledItems.length)]);
        }
        setItemsToFind(Array.from(itemsToFindSet));

        setFoundItems([]);
        setTimeRemaining(300); // Reseta o tempo do jogo
        setGameStatus('playing'); // Reinicia o status do jogo
        setIsPaused(false);
        setHintItem(null);
        setStars(0); // Reseta as estrelas
    };

    // Função para ir ao menu principal
    const goToMenu = () => {
        playSound(clickSound);
        navigate("/first-mode");
    };

    // Função para avançar para o próximo nível
    const goToNextLevel = () => {
        playSound(clickSound);
        navigate('/first-mode-level/3');
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
    };

    // Função para continuar o jogo após a pausa
    const handleContinue = () => {
        playSound(clickSound);
        setIsPaused(false);
    };

    // Função para exibir uma dica
    const handleHint = () => {
        playSound(clickSound);
        if (itemsToFind.length > 0) {
            const randomItem = itemsToFind[Math.floor(Math.random() * itemsToFind.length)];
            setHintItem(randomItem);
            setTimeout(() => setHintItem(null), 3000); // Remove a dica após 3 segundos
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
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>NÍVEL 2</h1>

            <div className="game-area">
                {/* Grid de itens */}
                <div className="item-grid-one" style={{ visibility: isPaused ? 'hidden' : 'visible' }}>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found-one' : ''} ${hintItem === item ? 'hint' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>

                {/* Lista de itens a serem encontrados */}
                <div className="item-list">
                    <div className="status-one">
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
    );
};

export default TwoLevel;