import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; 
import './FistModeCarousel.css'; 

const FistModeCarousel = ({ currentStep, handleNext, handlePrevious }) => {
    const navigate = useNavigate();
    
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    const handlePreviousClick = () => {
        playSound();
        handlePrevious();
    };

    const handleNextClick = () => {
        playSound();
        handleNext();
    };

    const handleLevelSelect = (level) => {
        playSound();
        console.log(`Navigating to level: ${level}`);
        navigate(`/fist-mode-level/${level}`);
    };

    const handleBackClick = () => {
        playSound();
        navigate(-1); // Volta para a página anterior
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                if (currentStep < steps.length) {
                    handleNextClick();
                }
                break;
            case 'ArrowLeft':
                if (currentStep > 1) {
                    handlePreviousClick();
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentStep]);

    const steps = Array.from({ length: 10 }, (_, index) => ({
        title: `Level ${index + 1}`,
        content: (
            <div>
                <p>Selecione o Level {index + 1}.</p>
                {/* O botão "Ir para o Level" será adicionado apenas na navegação */}
            </div>
        )
    }));

    if (currentStep < 1 || currentStep > steps.length) {
        return null;
    }

    return (
        <div className="fist-carousel-container">
            <h2 className="carousel-title">{steps[currentStep - 1].title}</h2>
            <div className={`carousel-step step-${currentStep}`}>
                {steps[currentStep - 1].content}
            </div>
            <div className="navigation-buttons">
                <button
                    className="btn-nav"
                    onClick={handlePreviousClick}
                    disabled={currentStep === 1}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button 
                    className="btn-nav level-button"
                    onClick={() => handleLevelSelect(currentStep)}
                >
                    Ir para o Level {currentStep}
                </button>
                {currentStep === steps.length ? (
                    <button className="btn-nav finish" onClick={handleBackClick}>
                        FIM
                    </button>
                ) : (
                    <button className="btn-nav" onClick={handleNextClick}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FistModeCarousel;
