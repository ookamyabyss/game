import React, { useState } from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import BackButton from '../../Utils/BackButton/BackButton';
import FistModeCarousel from '../../Utils/FistModeCarousel/FistModeCarousel';
import './FistMode.css'; 

const FistMode = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 10));
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleFinish = () => {
        console.log('Tutorial finalizado');
        // Adicione aqui a lógica para o que deve acontecer ao finalizar o tutorial
    };

    const handleLevelSelect = (level) => {
        console.log(`Level ${level} selecionado`);
        // Navegação para o nível específico
        // No carousel, isso já está lidado com navigate no handleLevelSelect
    };

    return (
        <div className="fist-mode">
            <BackgroundVideo />
            <FistModeCarousel 
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleFinish={handleFinish}
                handleLevelSelect={handleLevelSelect}
            />
            <BackButton />
        </div>
    );
};

export default FistMode;
