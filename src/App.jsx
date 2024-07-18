import { useState } from 'react';
import { Home } from './components/Home';
import { Hero } from './components/Hero';
import { SelectorPlayer } from './components/SelectorPlayer';
import { Game } from './components/Game';

function App() {
  const [enterGame, setEnterGame] = useState(false);
  const [showSelector, setShowSelector] = useState(false);

  const handleEnterGame = () => {
    setEnterGame(true);
    setShowSelector(false);
  };

  const handleShowSelector = () => {
    setShowSelector(true);
  };

  const handleBack = () => {
    setEnterGame(false);
    setShowSelector(false);
  };

  return (
    <>
      <div className="flex flex-col mt-5 justify-center items-center min-h-screen text-center">
        {showSelector
          ? (
            <SelectorPlayer backState={handleBack} onEnterGame={handleEnterGame} />
          )
          : (
            <>
              <Hero />
              <Home onEnterSelector={handleShowSelector} />
            </>
          )}
        {enterGame && showSelector && (
          <button
            className="bg-secondary text-light px-10 py-2 rounded-full mt-10"
            onClick={handleShowSelector}>
            Select Player
          </button>
        )}
      </div>
    </>
  );
}

export default App;
