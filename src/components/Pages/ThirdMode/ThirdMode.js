import React from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import BackButton from '../../Utils/BackButton/BackButton';
import './ThirdMode.css'; 

const ThirdMode = () => {

    return (
        <div className="third-mode">
            <BackgroundVideo />

            <BackButton />
        </div>
    );
};

export default ThirdMode;
