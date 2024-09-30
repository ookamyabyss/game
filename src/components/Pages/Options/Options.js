import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o hook para navegação
import clickSound from '../../../assets/sounds/click.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Options.css'; // Importa o arquivo de estilo para a página de opções
import backgroundImage from '../../../assets/background_options/Background_options.png'; // Imagem de fundo do nível

// Componente Options: Página de configurações do jogo
const Options = () => {
    const navigate = useNavigate(); // Certifique-se de que está dentro do componente

    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função para lidar com o clique no botão de voltar, tocando o som e navegando para a página anterior
    const handleBackClick = () => {
        playSound();
        navigate("/"); 
    };

    return (
        <div className="level-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="options-container">
                <p>Opções</p>
            </div>
    
            <div className="options-back-menu">
                <button className="options-btn-back" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
        </div>
    );
    
};

export default Options;
