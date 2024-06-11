import { useState, useEffect } from 'react'
import styles from "./style";
import fabLogo from './assets/Fab24_WhiteLogo.png'
// import './App.css'
import { Navbar } from './components/Navbar'
import { Inventary } from './components/Inventary'
import { Camara1 } from './components/Camara1';


function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);


  return (
    <>
      <div className='bg-primary w-full overflow-hidden'>
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className='{`${styles.boxWidth}`}'>
            <Navbar cartItems={0} toggleCartModal={0} />
          </div>
        </div>

        <div className='pt-20'>
          <div className={`${styles.boxWidth}`}>
            <h1 className={`${styles.heading2} text-center`}>Pinata control 🪅</h1>
          </div>
        </div>

        <main>

          {/* <Inventary addToCart={addToCart} /> */}
          <Camara1 />
        </main>

      </div>
    </>
  )
}

export default App
