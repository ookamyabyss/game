import React, { useState, useEffect } from 'react'; // Adicione useState e useEffect aqui

// Importação de componentes utilitários para o layout da página Home
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import Menu from '../../Utils/Menu/Menu';
import FloatingMenu from '../../Utils/FloatingMenu/FloatingMenu';
import FullScreenButton from '../../Utils/FullScreenButton/FullScreenButton';
import GameTitle from '../../Utils/GameTitle/GameTitle';

// Componente Home: Página principal do jogo
const Home = () => {

    // TESTE PARA EXIBIR QUANTIDADE DE ESTRELAS

    const [totalStars, setTotalStars] = useState(0);

    // Função para recuperar a contagem de estrelas do sessionStorage
    const getTotalStars = () => {
        const stars = sessionStorage.getItem('totalStars');
        return stars ? parseInt(stars, 10) : 0;
    };

    useEffect(() => {
        // Atualiza o estado com a contagem de estrelas do sessionStorage ao carregar a página
        const stars = getTotalStars();
        setTotalStars(stars);
    }, []);

    // TESTE PARA EXIBIR QUANTIDADE DE ESTRELAS


    return (
        <div className="Home">
            {/* Componente do título do jogo, exibido no topo */}
            <GameTitle />      

            {/* Componente de vídeo de fundo, adicionado como background visual */}
            <BackgroundVideo />

            <p>Total de Estrelas: {totalStars}</p>

            {/* Menu principal com opções do jogo, como Story Mode, Challenge Mode, etc. */}
            <Menu />

            {/* Menu flutuante para acessos rápidos, geralmente com opções adicionais */}
            <FloatingMenu />

            {/* Botão de tela cheia, permite que o jogador ative o modo de tela cheia */}
            <FullScreenButton />
        </div>
    );
};

export default Home;