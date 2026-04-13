import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ChefIntro from './components/ChefIntro'
import Recommendations from './components/Recommendations'
import MapLocation from './components/MapLocation'
import MenuOverlay from './components/MenuOverlay'
import ContactPage from './components/ContactPage'

function App() {
  const [currentView, setCurrentView] = useState('home');

  // Reset scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar setView={setCurrentView} currentView={currentView} />
      
      {currentView === 'home' && (
        <>
          <HeroSection />
          <ChefIntro />
          <Recommendations />
          <MapLocation />
        </>
      )}

      {currentView === 'menu' && (
        <MenuOverlay onBack={() => setCurrentView('home')} />
      )}

      {currentView === 'contact' && (
        <ContactPage onBack={() => setCurrentView('home')} />
      )}
    </div>
  )
}

export default App
