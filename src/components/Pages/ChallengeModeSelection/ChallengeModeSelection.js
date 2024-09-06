import React from 'react';

// Importação de componentes utilitários para o layout da página Home
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa ícones FontAwesome
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importa o ícone de seta para a esquerda
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo'; // Importa o componente de vídeo de fundo
import ChallengeTitle from '../../Utils/ChallengeTitle/ChallengeTitle'; // Importa o componente de título do desafio
import Mode from '../../Utils/Mode/Mode'; // Importa o componente de seleção de modo
import clickSound from '../../../assets/sounds/click.mp3'; // Importa o som de clique
import './ChallengeModeSelection.css'; // Importa o CSS para estilização

const ChallengeModeSelection = () => {
    // Hook para navegação
    const navigate = useNavigate();

    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função para lidar com o clique no botão de voltar
    const handleBackClick = () => {
        playSound(); // Toca o som de clique
        navigate("/"); // Navega para a página inicial
    };

    return (
        <div className="challenge-mode-selection">
            {/* Componente que exibe o título do desafio */}
            <ChallengeTitle/>
            
            {/* Componente que exibe o vídeo de fundo */}
            <BackgroundVideo />
            
            {/* Componente que exibe as opções de modo */}
            <Mode />
            
            {/* Contêiner para o botão de voltar */}
            <div className="back-menu">
                <button className="btn-back" onClick={handleBackClick}>
                    {/* Ícone de seta para a esquerda */}
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>
    );
};

export default ChallengeModeSelection;
