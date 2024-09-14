import React, { useState, useEffect } from 'react';
import './Mode2Animation.css'; // CSS para estilização

const Mode2Animation = () => {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const items = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' }
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
                        <span className="mode1-item-text">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mode2Animation;