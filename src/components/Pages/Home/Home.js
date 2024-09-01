import React from 'react';
import BackgroundVideo from '../../Utils/BackgroundVideo/BackgroundVideo';
import Menu from '../../Utils/Menu/Menu';
import FloatingMenu from '../../Utils/FloatingMenu/FloatingMenu';
import FullScreenButton from '../../Utils/FullScreenButton/FullScreenButton';
import GameTitle from '../../Utils/GameTitle/GameTitle';


const Home = () => {
    return (
        <div className="Home">
            <GameTitle />      
            
            <BackgroundVideo />

            <Menu />

            <FloatingMenu />

            <FullScreenButton />
        </div>
    );
};

export default Home;
