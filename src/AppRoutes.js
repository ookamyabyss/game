import React from 'react'; // Importa a biblioteca React
import { Routes, Route } from 'react-router-dom'; // Importa os componentes 'Routes' e 'Route' do React Router para gerenciamento de rotas

// Importa os componentes das páginas principais
import Home from './components/Pages/Home/Home'; 
import Options from './components/Pages/Options/Options'; 
import Extras from './components/Pages/Extras/Extras'; 
import HowToPlay from './components/Pages/HowToPlay/HowToPlay'; 
import TutorialPage from './components/Pages/TutorialPage/TutorialPage';
import ChallengeModeSelection from './components/Pages/ChallengeModeSelection/ChallengeModeSelection';  
import FirstMode from './components/Pages/FirstMode/FirstMode';
import SecondMode from './components/Pages/SecondMode/SecondMode';
import ThirdMode from './components/Pages/ThirdMode/ThirdMode';

// Importa os componentes dos níveis do 'Fist Mode'
import FirstModeOneLevel from './components/Pages/FirstModeLevels/OneLevel/OneLevel';
import FirstModeTwoLevel from './components/Pages/FirstModeLevels/TwoLevel/TwoLevel';
import FirstModeThreeLevel from './components/Pages/FirstModeLevels/ThreeLevel/ThreeLevel';
import FirstModeFourLevel from './components/Pages/FirstModeLevels/FourLevel/FourLevel';
import FirstModeFiveLevel from './components/Pages/FirstModeLevels/FiveLevel/FiveLevel';
import FirstModeSixLevel from './components/Pages/FirstModeLevels/SixLevel/SixLevel';
import FirstModeSevenLevel from './components/Pages/FirstModeLevels/SevenLevel/SevenLevel';
import FirstModeEightLevel from './components/Pages/FirstModeLevels/EightLevel/EightLevel';
import FirstModeNineLevel from './components/Pages/FirstModeLevels/NineLevel/NineLevel';
import FirstModeTenLevel from './components/Pages/FirstModeLevels/TenLevel/TenLevel';

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
            <Route path="/first-mode" element={<FirstMode />} />

            {/* Define a rota para o 'Second Mode' */}
            <Route path="/second-mode" element={<SecondMode />} />

            {/* Define a rota para o 'Third Mode' */}
            <Route path="/third-mode" element={<ThirdMode />} />
            
            {/* Define as rotas para os níveis do 'Fist Mode' */}
            <Route path="/first-mode-level/1" element={<FirstModeOneLevel />} />
            <Route path="/first-mode-level/2" element={<FirstModeTwoLevel />} />
            <Route path="/first-mode-level/3" element={<FirstModeThreeLevel />} />
            <Route path="/first-mode-level/4" element={<FirstModeFourLevel />} />
            <Route path="/first-mode-level/5" element={<FirstModeFiveLevel />} />
            <Route path="/first-mode-level/6" element={<FirstModeSixLevel />} />
            <Route path="/first-mode-level/7" element={<FirstModeSevenLevel />} />
            <Route path="/first-mode-level/8" element={<FirstModeEightLevel />} />
            <Route path="/first-mode-level/9" element={<FirstModeNineLevel />} />
            <Route path="/first-mode-level/10" element={<FirstModeTenLevel />} />

            {/* Adicione rotas para outros níveis conforme necessário */}
        </Routes>
    );
};

export default AppRoutes; // Exporta o componente AppRoutes para uso em outras partes da aplicação
