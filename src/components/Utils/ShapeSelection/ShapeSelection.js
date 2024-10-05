import React, { useState, useEffect } from 'react';
import successSound from '../../../assets/sounds/success.mp3'; // Som de sucesso
import failSound from '../../../assets/sounds/fail.mp3'; // Som de falha
import './ShapeSelection.css'; // Estilos

const ShapeSelection = () => {
    const [selectedShape, setSelectedShape] = useState(null);
    const [shuffledShapes, setShuffledShapes] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');

    // Embaralha as formas e define a resposta correta
    const shuffleShapes = () => {
        const shapes = ['quadrado', 'triangulo', 'circulo', 'retangulo', 'losango', 'hexagono', 'pentagono', 'trapezio'];
        const shuffled = shapes.sort(() => 0.5 - Math.random()).slice(0, 6);
        setShuffledShapes(shuffled);
        setCorrectAnswer(shuffled[Math.floor(Math.random() * shuffled.length)]);
    };

    useEffect(() => {
        shuffleShapes(); // Embaralha as formas ao montar o componente
    }, []);

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        if (shape === correctAnswer) {
            playSound(successSound);
            setTimeout(() => {
                shuffleShapes();
                setSelectedShape(null);
            }, 60000);
        } else {
            playSound(failSound);
        }
    };

    const getBorderColor = (shape) => {
        if (selectedShape === shape) {
            return shape === correctAnswer ? 'green' : 'red';
        }
        return 'transparent';
    };

    function renderShape(shape, isOutline = false) {
        const shapeStyle = isOutline
            ? { backgroundColor: 'transparent', border: '2px dashed #ff0000' }  // Remover a borda vermelha ao exibir apenas contorno
            : { backgroundColor: shape.color };  // Forma preenchida para o grid
        
        switch (shape) {
            case 'quadrado':
                return <div className="shape-quadrado" style={shapeStyle}></div>;
            case 'triangulo':
                return <div className="shape-triangulo" style={shapeStyle}></div>;
            case 'losango':
                return <div className="shape-losango" style={shapeStyle}></div>;
            case 'circulo':
                return <div className="shape-circulo" style={shapeStyle}></div>;
            case 'hexagono':
                return <div className="shape-hexagono" style={shapeStyle}></div>;
            case 'pentagono':
                return <div className="shape-pentagono" style={shapeStyle}></div>;
            case 'trapezio':
                return <div className="shape-trapezio" style={shapeStyle}></div>;
            default:
                return null;
        }
    }      

    return (
        <div className="container">
            <div className="instructions">
                <p className="message-box">Escolha a forma correta para completa a imagem :</p>
            </div>

            <div className="selection-container">
                <div className="image-grid-3">
                    {shuffledShapes.map((shape, index) => (
                        <div
                            key={index}
                            className="selection-image-container"
                            style={{ borderColor: getBorderColor(shape) }}
                            onClick={() => handleShapeClick(shape)}
                        >
                            {renderShape(shape, false)}
                            {selectedShape === shape && shape === correctAnswer && (
                                <div className="chat-bubble-fist">
                                    Você escolheu certo!
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Imagem incompleta com o espaço faltando */}
                <div className="incomplete-image-3">
                    <div className="square">
                        {/* O triângulo faltando */}
                        <div className="missing-shape-3">
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {renderShape(correctAnswer, true)}  {/* Exibe apenas as bordas */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShapeSelection;