import React from 'react';
import './HowToPlay.css'; // Importa o arquivo de estilo para a página "Como Jogar"
import BackButton from '../../Utils/BackButton/BackButton'; // Importa o componente de botão de voltar

// Componente HowToPlay: Página com instruções de como jogar
const HowToPlay = () => {
    return (
        <div className="howtoplay-container">
            {/* Título da página "Como Jogar" */}
            <h1>HowToPlay</h1>

            {/* Botão para retornar à página anterior */}
            <BackButton />
        </div>
    );
};

export default HowToPlay;
