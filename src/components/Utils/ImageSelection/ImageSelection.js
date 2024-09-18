import React, { useState } from 'react';
import gaivotaImg from '../../../assets/imagens_tutorial/gaviota.png'; // Importa a imagem da gaivota
import skateImg from '../../../assets/imagens_tutorial/skate.png'; // Importa a imagem do skate
import morangoImg from '../../../assets/imagens_tutorial/morango.png'; // Importa a imagem do morango
import picoleImg from '../../../assets/imagens_tutorial/picole.png'; // Importa a imagem do picolé
import barcoImg from '../../../assets/itensFirstMode/Barco.png' // Importa a imagem do barco
import melanciaImg from '../../../assets/itensFirstMode/Melancia.png' // Importa a imagem do barco
import successSound from '../../../assets/sounds/success.mp3'; // Importa o som de sucesso
import failSound from '../../../assets/sounds/fail.mp3'; // Importa o som de falha
import './ImageSelection.css'; // Importa o CSS para estilização

const ImageSelection = () => {
    // Estado para armazenar a imagem selecionada
    const [selectedImage, setSelectedImage] = useState(null);
    const correctAnswer = 'picole'; // Resposta correta

    // Função para tocar um som específico
    const playSound = (sound) => {
        const audio = new Audio(sound); // Cria um novo objeto de áudio
        audio.play(); // Toca o áudio
    };

    // Função para lidar com o clique na imagem
    const handleImageClick = (imageName) => {
        setSelectedImage(imageName); // Define a imagem selecionada
        if (imageName === correctAnswer) {
            playSound(successSound); // Toca o som de sucesso se a resposta estiver correta
        } else {
            playSound(failSound); // Toca o som de falha se a resposta estiver incorreta
        }
    };

    // Função para determinar a cor da borda com base na imagem selecionada
    const getBorderColor = (imageName) => {
        if (selectedImage === imageName) {
            return imageName === correctAnswer ? 'green' : 'red'; // Verde para a resposta correta, vermelho para incorreta
        }
        return 'transparent'; // Sem borda se a imagem não for selecionada
    };

    return (
        <div className="image-selection-container">
            {/* Caixa de mensagem instruindo o usuário a escolher a imagem do picolé */}
            <p className="message-box">Usando o mouse escolha a imagem abaixo:</p>
            <p className="message-box">PICOLÉ</p>

            <div className="image-grid">
                {/* Mapeia as imagens e cria um contêiner para cada uma */}
                {[ 
                    { name: 'gaivota', src: gaivotaImg }, 
                    { name: 'skate', src: skateImg }, 
                    { name: 'morango', src: morangoImg }, 
                    { name: 'picole', src: picoleImg },
                    { name: 'barco', src: barcoImg },
                    { name: 'melancia', src: melanciaImg }
                ].map((image, index) => (
                    <div 
                        key={index} 
                        className="selection-image-container" 
                        style={{ borderColor: getBorderColor(image.name) }} // Aplica a cor da borda com base na imagem selecionada
                        onClick={() => handleImageClick(image.name)} // Define a função de clique para cada imagem
                    >
                        <img
                            src={image.src} // Define a fonte da imagem
                            alt={image.name} // Define o texto alternativo da imagem
                            className="selection-image" // Aplica a classe CSS para estilização
                        />
                        {/* Mostra a bolha de chat se a imagem selecionada estiver correta */}
                        {selectedImage === image.name && image.name === correctAnswer && (
                            <div className="chat-bubble-fist">
                                Você escolheu certo.
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageSelection;