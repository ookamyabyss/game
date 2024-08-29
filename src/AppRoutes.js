import React from 'react'; // Importa a biblioteca React
import { Routes, Route } from 'react-router-dom'; // Importa os componentes 'Routes' e 'Route' do React Router para gerenciamento de rotas

// Importa os componentes das páginas principais
import Home from './components/Pages/Home/Home'; 
import Options from './components/Pages/Options/Options'; 
import Extras from './components/Pages/Extras/Extras'; 
import HowToPlay from './components/Pages/HowToPlay/HowToPlay'; 
import TutorialPage from './components/Pages/TutorialPage/TutorialPage';
import ChallengeModeSelection from './components/Pages/ChallengeModeSelection/ChallengeModeSelection';  
import FistMode from './components/Pages/FistMode/FistMode';
import SecondMode from './components/Pages/SecondMode/SecondMode';
import ThirdMode from './components/Pages/ThirdMode/ThirdMode';

// Importa os componentes dos níveis do 'Fist Mode'
import FistModeOneLevel from './components/Pages/FistModeLevels/OneLevel/OneLevel';
import FistModeTwoLevel from './components/Pages/FistModeLevels/TwoLevel/TwoLevel';
import FistModeThreeLevel from './components/Pages/FistModeLevels/ThreeLevel/ThreeLevel';
import FistModeFourLevel from './components/Pages/FistModeLevels/FourLevel/FourLevel';
import FistModeFiveLevel from './components/Pages/FistModeLevels/FiveLevel/FiveLevel';
import FistModeSixLevel from './components/Pages/FistModeLevels/SixLevel/SixLevel';
import FistModeSevenLevel from './components/Pages/FistModeLevels/SevenLevel/SevenLevel';
import FistModeEightLevel from './components/Pages/FistModeLevels/EightLevel/EightLevel';
import FistModeNineLevel from './components/Pages/FistModeLevels/NineLevel/NineLevel';
import FistModeTenLevel from './components/Pages/FistModeLevels/TenLevel/TenLevel';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Define a rota para a página do tutorial */}
            <Route path="/tutorial" element={<TutorialPage />} />

            {/* Define a rota para a página inicial */}
            <Route path="/" element={<Home />} />

            {/* Define a rota para a página de opções */}
            <Route path="/options" element={<Options />} />

            {/* Define a rota para a página de extras */}
            <Route path="/extras" element={<Extras />} />

            {/* Define a rota para a página 'Como Jogar' */}
            <Route path="/how-to-play" element={<HowToPlay />} />

            {/* Define a rota para a seleção do modo desafio */}
            <Route path="/challenge-mode-selection" element={<ChallengeModeSelection />} />

            {/* Define a rota para o 'Fist Mode' */}
            <Route path="/fist-mode" element={<FistMode />} />

            {/* Define a rota para o 'Second Mode' */}
            <Route path="/second-mode" element={<SecondMode />} />

            {/* Define a rota para o 'Third Mode' */}
            <Route path="/third-mode" element={<ThirdMode />} />
            
            {/* Define as rotas para os níveis do 'Fist Mode' */}
            <Route path="/fist-mode-level/1" element={<FistModeOneLevel />} />
            <Route path="/fist-mode-level/2" element={<FistModeTwoLevel />} />
            <Route path="/fist-mode-level/3" element={<FistModeThreeLevel />} />
            <Route path="/fist-mode-level/4" element={<FistModeFourLevel />} />
            <Route path="/fist-mode-level/5" element={<FistModeFiveLevel />} />
            <Route path="/fist-mode-level/6" element={<FistModeSixLevel />} />
            <Route path="/fist-mode-level/7" element={<FistModeSevenLevel />} />
            <Route path="/fist-mode-level/8" element={<FistModeEightLevel />} />
            <Route path="/fist-mode-level/9" element={<FistModeNineLevel />} />
            <Route path="/fist-mode-level/10" element={<FistModeTenLevel />} />

            {/* Adicione rotas para outros níveis conforme necessário */}
        </Routes>
    );
};

export default AppRoutes; // Exporta o componente AppRoutes para uso em outras partes da aplicação
