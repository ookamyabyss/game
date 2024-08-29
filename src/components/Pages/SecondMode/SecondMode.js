import React from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import BackButton from '../../Utils/BackButton/BackButton';
import './SecondMode.css'; 

const SecondMode = () => {

    return (
        <div className="second-mode">
            <BackgroundVideo />

            <BackButton />
        </div>
    );
};

export default SecondMode;
