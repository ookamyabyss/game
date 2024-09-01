import React, { useState, useEffect } from 'react';
import item1Img from '../../../assets/imagens_tutorial/gaviota.png';
import item2Img from '../../../assets/imagens_tutorial/morango.png';
import item3Img from '../../../assets/imagens_tutorial/picole.png';
import item4Img from '../../../assets/imagens_tutorial/skate.png';
import item5Img from '../../../assets/imagens_tutorial/cone.png';
import item6Img from '../../../assets/imagens_tutorial/hidrante.png';
import item7Img from '../../../assets/imagens_tutorial/mala.png';
import item8Img from '../../../assets/imagens_tutorial/bicicleta.png';


import './Mode1Animation.css'; // CSS para estilização

const Mode1Animation = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const items = [
        { name: 'item1', src: item1Img },
        { name: 'item2', src: item2Img },
        { name: 'item3', src: item3Img },
        { name: 'item4', src: item4Img },
        { name: 'item5', src: item5Img },
        { name: 'item6', src: item6Img },
        { name: 'item7', src: item7Img },
        { name: 'item8', src: item8Img }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightedIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % items.length;
                return newIndex;
            });
        }, 1000); // Altere o intervalo conforme necessário

        return () => clearInterval(interval);
    }, [items.length]);

    const getBorderColor = (index) => {
        if (index === highlightedIndex) {
            return 'green';
        }
        if (index === (highlightedIndex + 1) % items.length) {
            return 'red';
        }
        return 'transparent';
    };

    return (
        <div className="mode1-container">
            <div className="mode1-grid">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="mode1-item-container" 
                        style={{ borderColor: getBorderColor(index) }}
                    >
                        <img
                            src={item.src}
                            alt={item.name}
                            className="mode1-item-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mode1Animation;
