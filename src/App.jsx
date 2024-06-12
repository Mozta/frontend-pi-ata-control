import { useState, useEffect } from 'react'
import { Home } from './components/Home';
import { Game } from './components/Game';
import { Header } from './components/Header';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


function App() {
  const [enterGame, setEnterGame] = useState(false)

  return (
    <>
      <Home />
    </>
  )
}

export default App
