import React, { useState, useEffect } from 'react';
import BackgroundVideo from '../../../Utils/BackgroundVideo/BackgroundVideo';
import './OneLevel.css';

const OneLevel = () => {
    const [items, setItems] = useState([]);
    const [itemsToFind, setItemsToFind] = useState([]);
    const [foundItems, setFoundItems] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [gameStatus, setGameStatus] = useState('playing');

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
        if (gameStatus === 'playing' && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setGameStatus('lost');
        }
    }, [timeRemaining, gameStatus]);

    const handleItemClick = (item) => {
        if (itemsToFind.includes(item) && !foundItems.includes(item)) {
            setFoundItems([...foundItems, item]);

            if (foundItems.length + 1 === itemsToFind.length) {
                setGameStatus('won');
            }
        }
    };

    const restartLevel = () => {
        setFoundItems([]);
        setTimeRemaining(60);
        setGameStatus('playing');
    };

    return (
        <div className="level-container">
            <BackgroundVideo />
            <h1>LEVEL 1</h1>

            <div className="game-area">
                {/* Matriz de Itens com 8 colunas e ajustada automaticamente */}
                <div className="item-grid">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${foundItems.includes(item) ? 'found' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <img src={item.image} alt={item.name} />
                        </div>
                    ))}
                </div>

                {/* Lista de Itens a Serem Encontrados com Status */}
                <div className="item-list">
                    <div className="status">
                        <p>Tempo restante: {timeRemaining}s</p>
                        <p>Itens encontrados: {foundItems.length}/{itemsToFind.length}</p>
                    </div>
                    <h2>Encontre:</h2>
                    <ul>
                        {itemsToFind.map((item, index) => (
                            <li key={index} className={foundItems.includes(item) ? 'found' : ''}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Mensagem de Fim de Jogo */}
            {gameStatus !== 'playing' && (
                <div className="game-over-message">
                    {gameStatus === 'won' ? (
                        <>
                            <h2>Parabéns!</h2>
                            <p>Você encontrou todos os itens.</p>
                        </>
                    ) : (
                        <>
                            <h2>Que pena!</h2>
                            <p>Você não encontrou todos os itens.</p>
                        </>
                    )}
                    <button onClick={restartLevel}>Reiniciar</button>
                </div>
            )}
        </div>
    );
};

export default OneLevel;
