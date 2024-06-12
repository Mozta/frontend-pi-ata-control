import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Game } from './components/Game';
import { Header } from './components/Header';
import { Tutorial } from './components/Tutorial';
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router >
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
        {/* <App /> */}
      </Router>
    </ClerkProvider>
    {/* <Router>
      <App />
    </Router> */}
  </React.StrictMode>,
)
