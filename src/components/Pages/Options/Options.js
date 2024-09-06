import React from 'react';
import './Options.css'; // Importa o arquivo de estilo para a página de opções
import BackButton from '../../Utils/BackButton/BackButton'; // Importa o componente de botão de voltar

// Componente Options: Página de configurações do jogo
const Options = () => {
    return (
        <div className="options-container">
            {/* Título da página de opções */}
            <h1>Opções</h1>
            
            {/* Botão para retornar à página anterior */}
            <BackButton />
        </div>
    );
};

export default Options;
