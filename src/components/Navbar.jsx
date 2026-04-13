import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MenuOverlay from './MenuOverlay';
gsap.registerPlugin(ScrollTrigger);

const NavLink = ({ href, children }) => {
  const lineRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "left center"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.out",
      transformOrigin: "left center"
    });
  };

  return (
    <a
      href={href}
      className="relative text-white font-header tracking-widest text-sm hover:text-gold transition-colors duration-300 py-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span
        ref={lineRef}
        className="absolute left-0 bottom-0 w-full h-[1px] bg-gold scale-x-0"
        style={{ transformOrigin: 'left center' }}
      ></span>
    </a>
  );
};

const Navbar = ({ setView, currentView }) => {
  const navRef = useRef(null);
  const ribbonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const logoStackRef = useRef(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeline = useRef(null);

  useEffect(() => {
    // Scroll effect: keep navbar transparent but scale down ribbon
    const ctx = gsap.context(() => {
      // Slightly scale down the ribbon
      gsap.to(ribbonRef.current, {
        paddingTop: "1rem",
        paddingBottom: "1rem",
        duration: 0.3,
        scrollTrigger: {
          trigger: document.body,
          start: "100px top",
          toggleActions: "play none none reverse",
        }
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Menu morphing timeline
    timeline.current = gsap.timeline({ paused: true })
      // Smoothly merge the two lines vertically
      .to(line1Ref.current, { y: 4, duration: 0.3, ease: "back.in(1.2)" }, 0)
      .to(line2Ref.current, { y: -4, duration: 0.3, ease: "back.in(1.2)" }, 0)
      // Softly step back the main logo so the 'X' stands out clearly without colliding
      .to(logoStackRef.current, { y: 10, opacity: 0.3, scale: 0.95, duration: 0.4, ease: "power2.inOut" }, 0)
      // Snap the lines into a perfect 'X'
      .to(line1Ref.current, { rotation: 45, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" }, 0.25)
      .to(line2Ref.current, { rotation: -45, transformOrigin: "center", duration: 0.4, ease: "back.out(2)" }, 0.25);

    return () => {
      if (timeline.current) timeline.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      timeline.current.play();
    } else {
      timeline.current.reverse();
    }
  }, [isMenuOpen]);

  const handleNavigate = (view) => {
    setView(view);
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-50">
        <div className="flex justify-center">

          <div
            ref={ribbonRef}
            className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-md border border-t-0 border-gold/30 text-white px-4 md:px-8 py-3 md:py-6 shadow-[0_15px_40px_rgba(212,165,71,0.1)] min-h-[90px] md:min-h-[120px]"
            style={{
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px'
            }}
          >
            {/* Hamburger Button Lines */}
            <button 
              className="relative w-6 md:w-7 h-5 md:h-6 mb-1 md:mb-2 flex items-center justify-center cursor-pointer group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-full h-2.5">
                <span ref={line1Ref} className="absolute top-0 left-0 block w-full h-[2px] bg-gold group-hover:bg-white transition-colors origin-center"></span>
                <span ref={line2Ref} className="absolute bottom-0 left-0 block w-full h-[2px] bg-gold group-hover:bg-white transition-colors origin-center"></span>
              </div>
            </button>

            {/* Logo Icon and Text Stack */}
            <div ref={logoStackRef} className="flex flex-col items-center">
              <span className="text-2xl md:text-[40px] font-header font-bold text-gold leading-none">M</span>
              <span className="text-[7px] md:text-[10px] tracking-[0.3em] font-header text-gold uppercase mt-1 md:mt-2 font-medium">House of</span>
              <span className="text-[10px] md:text-sm tracking-widest font-header text-white uppercase mt-0.5">Biryani and Rolls</span>
            </div>
          </div>

        </div>
      </div>

      {/* Simple Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-40 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}
      >
        <ul className="flex flex-col items-center gap-8 text-3xl font-header tracking-[0.2em]">
          <li>
            <button 
              onClick={() => handleNavigate('home')} 
              className={`hover:text-gold transition-colors ${currentView === 'home' ? 'text-gold' : 'text-white'}`}
            >
              HOME
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate('menu')} 
              className={`hover:text-gold transition-colors ${currentView === 'menu' ? 'text-gold' : 'text-white'}`}
            >
              MENU
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate('contact')} 
              className={`hover:text-gold transition-colors ${currentView === 'contact' ? 'text-gold' : 'text-white'}`}
            >
              CONTACT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
