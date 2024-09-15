import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import clickSound from '../../../assets/sounds/click.mp3'; 
import ImageSelection from '../ImageSelection/ImageSelection';
import './Carousel.css'; 

const Carousel = ({ currentStep, handleNext, handlePrevious, handleFinish }) => {
    // Função para tocar o som de clique
    const playSound = () => {
        const audio = new Audio(clickSound);
        audio.play();
    };

    // Função chamada ao clicar no botão de "anterior"
    const handlePreviousClick = () => {
        playSound(); // Toca o som de clique
        handlePrevious(); // Chama a função para ir para o passo anterior
    };

    // Função chamada ao clicar no botão de "próximo"
    const handleNextClick = () => {
        playSound(); // Toca o som de clique
        handleNext(); // Chama a função para ir para o próximo passo
    };

    // Função para lidar com eventos de teclado
    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowRight':
                handleNextClick(); // Vai para o próximo passo se a tecla for a seta para a direita
                break;
            case 'ArrowLeft':
                handlePreviousClick(); // Vai para o passo anterior se a tecla for a seta para a esquerda
                break;
            default:
                break;
        }
    };

    // Adiciona e remove o event listener para o teclado quando o componente é montado e desmontado
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNextClick, handlePreviousClick]);

    // Função chamada quando a seleção correta é feita
    const handleCorrectSelection = () => {
        alert('Você escolheu corretamente!'); 
    };

    // Definição dos títulos e do conteúdo das etapas
    const steps = [
        {
            title: "Parte 1 : Escolha de Itens",
            content: <ImageSelection onCorrectSelection={handleCorrectSelection} />
        },
        {
            title: "Parte 2 do Tutorial: Como Usar o Painel",
            content: <p>Conteúdo explicando como usar o painel.</p>
        },
        {
            title: "Parte 3 do Tutorial: Resolvendo Desafios",
            content: <p>Conteúdo sobre resolver desafios.</p>
        },
        {
            title: "Parte 4 do Tutorial: Finalizando",
            content: <p>Conteúdo de finalização do tutorial.</p>
        }
    ];

    return (
        <div className="carousel-container">
            {/* Exibe o título da etapa atual */}
            <h2 className="carousel-title">{steps[currentStep - 1].title}</h2>
            {/* Exibe o conteúdo da etapa atual */}
            <div className={`carousel-step step-${currentStep}`}>
                {steps[currentStep - 1].content}
            </div>
            <div className="navigation-buttons">
                {/* Botão para ir para o passo anterior */}
                <button
                    className="btn-nav"
                    onClick={handlePreviousClick}
                    disabled={currentStep === 1}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                {/* Botão para terminar o tutorial ou para ir para o próximo passo */}
                {currentStep === steps.length ? (
                    <button className="btn-finish" onClick={handleFinish}>
                        Terminar Tutorial
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

export default Carousel;
