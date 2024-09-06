import React, { useState } from 'react';

// Importação de componentes utilitários
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import './TutorialPage.css';
import BackButton from '../../Utils/BackButton/BackButton';
import Carousel from '../../Utils/Carousel/Carousel';

const TutorialPage = () => {
    // Estado para controlar o passo atual no carrossel
    const [currentStep, setCurrentStep] = useState(1);
    
    // Estado para controlar se o tutorial deve ser desativado
    const [disableTutorial, setDisableTutorial] = useState(false);

    // Função para avançar para o próximo passo do tutorial
    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    // Função para voltar ao passo anterior do tutorial
    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // Função que lida com a finalização do tutorial
    const handleFinish = () => {
        const confirmFinish = window.confirm('Você realmente quer terminar o tutorial?');
        if (confirmFinish) {
            // Lógica para finalizar o tutorial
            // Ex: redirecionar para a página principal ou salvar preferências
        }
    };

    // Função para habilitar ou desabilitar o tutorial
    const handleDisableTutorial = (e) => {
        setDisableTutorial(e.target.checked);
    };

    // Função para fechar a mensagem que pergunta se o usuário quer desabilitar o tutorial
    const closeMessage = () => {
        setDisableTutorial(false);
    };

    return (
        <div className="tutorial-container">
            {/* Vídeo de fundo para a página de tutorial */}
            <BackgroundVideo />

            {/* Mensagem perguntando se o usuário quer desabilitar o tutorial */}
            {disableTutorial && (
                <div className="disable-message">
                    <p>Você quer desabilitar o tutorial?</p>
                    <input 
                        type="checkbox" 
                        checked={disableTutorial} 
                        onChange={handleDisableTutorial} 
                    /> Sim
                    {/* Botão para fechar a mensagem */}
                    <button onClick={closeMessage} className="close-button">X</button>
                </div>
            )}

            {/* Carrossel do tutorial que navega entre os passos */}
            <Carousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
            />

            {/* Botão de voltar para a página anterior */}
            <BackButton />
        </div>
    );
};

export default TutorialPage;