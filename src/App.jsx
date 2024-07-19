import React from 'react';
import { Hero } from './components/Hero';
import { SelectorPlayer } from './components/SelectorPlayer';

function App() {
  return (
    <div className="flex flex-col mt-5 justify-center items-center min-h-screen text-center">
      <Hero />
      <SelectorPlayer />
    </div>
  );
}

export default App;
