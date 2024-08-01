import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from './components/Hero';
import { SelectorPlayer } from './components/SelectorPlayer';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex flex-col mt-5 justify-center items-center min-h-screen text-center">
      <Hero />
      <SelectorPlayer />
    </div>
  );
}

export default App;
