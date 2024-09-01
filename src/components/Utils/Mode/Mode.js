import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clickSound from '../../../assets/sounds/click.mp3'; // Ajuste o caminho conforme necessário
import Mode1Animation from '../Mode1Animation/Mode1Animation';
import './Mode.css';

const Mode = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);

    const playSoundAndNavigate = (path) => {
        const audio = new Audio(clickSound);
        audio.play();
        navigate(path);
    };

    return (
        <div className="menu-mode">
            <button
                className="btn-mode"
                onClick={() => playSoundAndNavigate('/first-mode')}
                onMouseEnter={() => setHoveredButton('first')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                Modo 1
                {hoveredButton === 'first' && (
                    <>
                        <div className="info-container info-left">
                            {/* Aqui vai a animação do Modo 1 */}
                            <Mode1Animation/>
                        </div>
                        <div className="info-container info-right">
                            {/* Aqui vai a descrição do Modo 1 */}
                            <p>Encontre os itens da sua lista antes do tempo termina.</p>
                        </div>
                    </>
                )}
            </button>

            <button
                className="btn-mode"
                onClick={() => playSoundAndNavigate('/second-mode')}
                onMouseEnter={() => setHoveredButton('second')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                Modo 2
                {hoveredButton === 'second' && (
                    <>
                        <div className="info-container info-left">
                            {/* Aqui vai a animação do Modo 2 */}
                            <img src="caminho/para/animacao2.gif" alt="Animação Modo 2" />
                        </div>
                        <div className="info-container info-right">
                            {/* Aqui vai a descrição do Modo 2 */}
                            <p>Descrição do Modo 2: Detalhes e instruções sobre o modo 2.</p>
                        </div>
                    </>
                )}
            </button>

            <button
                className="btn-mode"
                onClick={() => playSoundAndNavigate('/third-mode')}
                onMouseEnter={() => setHoveredButton('third')}
                onMouseLeave={() => setHoveredButton(null)}
            >
                Modo 3
                {hoveredButton === 'third' && (
                    <>
                        <div className="info-container info-left">
                            {/* Aqui vai a animação do Modo 3 */}
                            <img src="caminho/para/animacao3.gif" alt="Animação Modo 3" />
                        </div>
                        <div className="info-container info-right">
                            {/* Aqui vai a descrição do Modo 3 */}
                            <p>Descrição do Modo 3: Detalhes e instruções sobre o modo 3.</p>
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};

export default Mode;
