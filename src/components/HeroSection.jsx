import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ── Smoke Frame Config ──
const TOTAL_FRAMES = 240;
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const idx = String(i + 1).padStart(3, '0');
  return `/Smoke-webp/frame-${idx}.webp`;
});

// ── Golden Particle System ──
const ParticleCanvas = ({ isLoaded }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const COUNT = 60;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += 0.015;
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

        if (p.y < -10) { p.y = window.innerHeight + 10; p.x = Math.random() * window.innerWidth; }
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 71, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 71, ${alpha * 0.15})`;
        ctx.fill();
      });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isLoaded]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[3] pointer-events-none"
      aria-hidden="true"
    />
  );
};

// ── Decorative SVG Border Ornament ──
const OrnamentCorner = ({ className = '', style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 115 Q5 5 115 5" stroke="url(#goldGrad)" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M15 115 Q15 15 115 15" stroke="url(#goldGrad)" strokeWidth="0.5" fill="none" opacity="0.3"/>
    <circle cx="10" cy="10" r="2" fill="url(#goldGrad)" opacity="0.6"/>
    <circle cx="115" cy="5" r="1.5" fill="url(#goldGrad)" opacity="0.4"/>
    <circle cx="5" cy="115" r="1.5" fill="url(#goldGrad)" opacity="0.4"/>
    {/* Flourish */}
    <path d="M60 5 Q55 25 40 35 Q55 30 60 50 Q65 30 80 35 Q65 25 60 5Z" fill="url(#goldGrad)" opacity="0.15"/>
    <path d="M5 60 Q25 55 35 40 Q30 55 50 60 Q30 65 35 80 Q25 65 5 60Z" fill="url(#goldGrad)" opacity="0.15"/>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8C36A"/>
        <stop offset="50%" stopColor="#D4A547"/>
        <stop offset="100%" stopColor="#B8862D"/>
      </linearGradient>
    </defs>
  </svg>
);

// ── Horizontal Decorative Divider ──
const GoldDivider = ({ className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill="#D4A547" opacity="0.5"/>
    </svg>
    <div className="h-[0.5px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
  </div>
);


const HeroSection = () => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const imgWrapRef = useRef(null);

  const scrollHintRef = useRef(null);

  // Story panels
  const story1Ref = useRef(null);
  const story2Ref = useRef(null);
  const story3Ref = useRef(null);

  // Smoke canvas refs
  const smokeCanvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const loadingOverlayRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollTriggerRef = useRef(null);

  // ── Draw a smoke frame on canvas with "cover" scaling ──
  const drawFrame = useCallback((frameIndex) => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // ── Resize canvas to viewport ──
  const resizeCanvas = useCallback(() => {
    const canvas = smokeCanvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Preload all smoke frames ──
  useEffect(() => {
    let loaded = 0;
    const images = [];

    const loadPromises = framePaths.map((src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.src = src;
        images[index] = img;
      });
    });

    Promise.all(loadPromises).then(() => {
      framesRef.current = images;
      setIsLoaded(true);
    });
  }, []);

  // ── GSAP Animations (after frames loaded) ──
  useEffect(() => {
    if (!isLoaded) return;

    resizeCanvas();
    drawFrame(0);
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Fade out loading overlay
    if (loadingOverlayRef.current) {
      gsap.to(loadingOverlayRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loadingOverlayRef.current) loadingOverlayRef.current.style.display = 'none';
        },
      });
    }

    const ctx = gsap.context(() => {
      // ── Set initial states ──
      gsap.set(imgRef.current, { scale: 0.5, opacity: 0, filter: 'blur(40px)' });
      gsap.set(scrollHintRef.current, { opacity: 0 });

      // ── Grand Entrance Timeline ──
      const entTl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 });

      entTl
        // Image blooms in
        .to(imgRef.current, {
          scale: 1, opacity: 1, filter: 'blur(0px)',
          duration: 2.0, ease: 'power3.out',
        })
        // Scroll hint
        .to(scrollHintRef.current, { opacity: 1, duration: 1.2 }, '-=0.6');

      // ── Scroll-linked Animation ──
      const mm = gsap.matchMedia(containerRef);

      mm.add({
        isDesktop: '(min-width: 768px)',
        isMobile: '(max-width: 767px)',
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        // Initial states for story panels
        gsap.set([story1Ref.current, story2Ref.current, story3Ref.current], {
          xPercent: isMobile ? -50 : 0,
          yPercent: isMobile ? 0 : -50,
        });
        gsap.set(story1Ref.current, { opacity: 0, x: isMobile ? 0 : -60, y: 60, filter: 'blur(20px)' });
        gsap.set(story2Ref.current, { opacity: 0, x: isMobile ? 0 : 60, y: 60, filter: 'blur(20px)' });
        gsap.set(story3Ref.current, { opacity: 0, y: 60, filter: 'blur(20px)', xPercent: -50 });

        // Proxy for smoke frame index
        const frameObj = { value: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: isMobile ? '+=5000' : '+=6000',
            scrub: 0.4,
            pin: true,
            anticipatePin: 1,
            onRefresh: (self) => { scrollTriggerRef.current = self; },
          },
        });

        tl
          // ── Smoke frame scrubbing — synced to full timeline duration ──
          .to(frameObj, {
            value: TOTAL_FRAMES - 1,
            duration: 16.7,
            ease: 'none',
            onUpdate: () => {
              const frame = Math.round(frameObj.value);
              if (frame !== currentFrameRef.current) {
                currentFrameRef.current = frame;
                drawFrame(frame);
              }
            },
          }, 0)

          // ── Stage 1 — Image scales up majestically ──
          .to(scrollHintRef.current, { opacity: 0, duration: 0.8 }, 0)
          .to(imgWrapRef.current, {
            scale: isMobile ? 1.3 : 1.5,
            yPercent: isMobile ? -35 : 0,
            duration: 2.5, ease: 'power2.inOut',
          }, 0)

          // ── Stage 2 — Image drifts, story 1 (The Grain) fades in ──
          .to(imgWrapRef.current, {
            xPercent: isMobile ? 0 : 32,
            yPercent: isMobile ? -45 : 0,
            duration: 3, ease: 'power2.inOut',
          }, 1.5)
          .to(story1Ref.current, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' }, 2.5)
          .to(story1Ref.current, { opacity: 0, x: isMobile ? 0 : -40, y: -30, filter: 'blur(20px)', duration: 1.8, ease: 'power2.in' }, 5.5)

          // ── Stage 3 — Image drifts opposite, story 2 (The Dum) fades in ──
          .to(imgWrapRef.current, {
            xPercent: isMobile ? 0 : -32,
            yPercent: isMobile ? -45 : 0,
            duration: 3, ease: 'power2.inOut',
          }, 6.5)
          .to(story2Ref.current, { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' }, 7.5)
          .to(story2Ref.current, { opacity: 0, x: isMobile ? 0 : 40, y: -30, filter: 'blur(20px)', duration: 1.8, ease: 'power2.in' }, 10.5)

          // ── Stage 4 — Center, story 3 (The Promise) ──
          .to(imgWrapRef.current, {
            xPercent: 0,
            yPercent: isMobile ? -45 : -8,
            scale: isMobile ? 1.4 : 1.6,
            duration: 2.5, ease: 'power2.inOut',
          }, 11)
          .to(story3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.2, ease: 'power2.out' }, 12)
          .to(story3Ref.current, { opacity: 0, y: -30, filter: 'blur(20px)', duration: 1.8, ease: 'power2.in' }, 14.5)

          // ── Stage 5 — Return to origin ──
          .to(imgWrapRef.current, { xPercent: 0, yPercent: 0, scale: 1, duration: 2.5, ease: 'power3.inOut' }, 14)
          .to(scrollHintRef.current, { opacity: 1, duration: 1.2 }, 15.5);
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isLoaded, drawFrame, resizeCanvas]);

  // ── Auto Scroll Logic (Mobile Only) ──
  const handleAutoScroll = () => {
    if (!scrollTriggerRef.current || isAutoScrolling) return;
    
    setIsAutoScrolling(true);
    const trigger = scrollTriggerRef.current;
    
    gsap.to(window, {
      scrollTo: trigger.start + (window.innerWidth < 768 ? 5000 : 6000),
      duration: 4,
      ease: "sine.inOut",
      onComplete: () => setIsAutoScrolling(false)
    });
  };

  // ── Mouse Parallax (desktop only) ──
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const xP = e.clientX / window.innerWidth - 0.5;
    const yP = e.clientY / window.innerHeight - 0.5;
    gsap.to(imgRef.current, {
      x: xP * 30, y: yP * 20,
      rotationY: xP * -6, rotationX: yP * 6,
      duration: 1.8, ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      x: 0, y: 0, rotationX: 0, rotationY: 0,
      duration: 1.8, ease: 'power3.out',
    });
  };

  return (
    <div ref={rootRef} className="bg-black">
      <div
        ref={containerRef}
        id="hero-section"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black font-body"
        style={{ perspective: '1200px' }}
      >
        {/* ── Loading Overlay ── */}
        <div
          ref={loadingOverlayRef}
          className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-black"
          style={{ display: isLoaded ? 'none' : 'flex' }}
        >
          {/* Ornate loader */}
          <div className="relative w-24 h-24 mb-10">
            <div className="absolute inset-0 rounded-full" style={{
              border: '1px solid rgba(212, 165, 71, 0.15)',
              animation: 'loaderSpin 4s linear infinite',
            }}/>
            <div className="absolute inset-2 rounded-full" style={{
              border: '1px solid rgba(212, 165, 71, 0.25)',
              animation: 'loaderSpin 3s linear infinite reverse',
            }}/>
            <div className="absolute inset-4 rounded-full" style={{
              border: '1px solid rgba(212, 165, 71, 0.4)',
              animation: 'loaderPulse 2s ease-in-out infinite',
            }}/>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill="#D4A547" opacity="0.6"/>
              </svg>
            </div>
          </div>

          <p className="text-gold/40 text-xs font-body tracking-[0.4em] uppercase mb-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            House of Biryani
          </p>
          <p className="text-white/20 text-[10px] font-body tracking-[0.6em] uppercase">
            Preparing the Experience
          </p>

          <div className="mt-6 w-56 h-[1px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, transparent, #D4A547, #E8C36A, #D4A547, transparent)',
              }}
            />
          </div>
          <p className="text-white/15 text-[10px] font-body mt-2 tabular-nums tracking-[0.3em]">
            {loadProgress}%
          </p>
        </div>

        {/* ── Smoke Canvas Background (z-0) ── */}
        <canvas
          ref={smokeCanvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
          aria-hidden="true"
        />

        {/* ── Golden Particle System ── */}
        <ParticleCanvas isLoaded={isLoaded} />

        {/* ── Subtle warm glow at bottom ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 120% 80% at 50% 120%, rgba(139, 90, 20, 0.06) 0%, transparent 60%)',
          }}
        />



        {/* ── Fine Horizontal Lines (decorative) ── */}
        <div className="absolute top-0 left-0 right-0 z-[6] pointer-events-none"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,71,0.15) 20%, rgba(212,165,71,0.15) 80%, transparent)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-[6] pointer-events-none"
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,165,71,0.15) 20%, rgba(212,165,71,0.15) 80%, transparent)' }}
        />

        {/* ── Central Biryani Image ── */}
        <div
          ref={imgWrapRef}
          className="absolute z-10 flex items-center justify-center pointer-events-none"
          style={{
            width: 'min(98vw, 720px)',
            height: 'min(98vw, 720px)',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.8)) drop-shadow(0 0 100px rgba(139,90,20,0.15))',
          }}
        >
          <img
            ref={imgRef}
            src="/biryani.png"
            alt="Royal Biryani — House of Biryani and Rolls"
            className="w-full h-full object-contain will-change-transform"
          />
        </div>

        {/* ── Mobile Auto-Explore Button ── */}
        <div className="absolute z-[40] md:hidden bottom-24 flex flex-col items-center">
          <button
            onClick={handleAutoScroll}
            className={`group relative flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-md border border-gold/30 rounded-full transition-all duration-500 ${isAutoScrolling ? 'opacity-50 pointer-events-none' : 'opacity-100 hover:border-gold'}`}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              {/* Spinning Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="10" cy="10" r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold/20"
                />
                <circle
                  cx="10" cy="10" r="8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="50"
                  strokeDashoffset={isAutoScrolling ? "0" : "50"}
                  className="text-gold transition-all duration-[4000ms] linear"
                />
              </svg>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="relative z-10">
                <path d="M7 4L2 1V7L7 4Z" fill="currentColor" className="text-gold" />
              </svg>
            </div>
            <span className="text-gold text-[10px] tracking-[0.3em] font-header uppercase whitespace-nowrap">
              {isAutoScrolling ? 'Experiencing...' : 'Auto Explore'}
            </span>
          </button>
          <p className="text-white/20 text-[7px] mt-2 tracking-[0.2em] uppercase font-body">
            3-Second Cinematic Journey
          </p>
        </div>

        {/* ── Scroll Indicator ── */}
        <div
          ref={scrollHintRef}
          className="absolute z-[25] pointer-events-none flex flex-col items-center"
          style={{ bottom: 32, left: '50%', transform: 'translateX(-50%)' }}
        >
          <p className="text-white/15 text-[8px] font-body tracking-[0.45em] uppercase mb-3">
            Scroll to Discover
          </p>
          <div className="relative w-[1px] h-12 overflow-hidden">
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(212,165,71,0.6), transparent)',
                animation: 'scrollLine 2.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* ── Story Panel: Chapter I — The Grain ── */}
        <div
          ref={story1Ref}
          className="absolute z-20 text-center md:text-left pointer-events-none flex flex-col w-[85%] md:w-auto md:max-w-[400px] left-1/2 md:left-[7%] bottom-[12%] md:bottom-auto md:top-1/2"
        >
          <span className="text-[#E8C36A] text-[11px] md:text-[9px] uppercase tracking-[0.6em] font-body mb-2 font-semibold">
            Chapter I
          </span>
          <div className="w-8 h-[1px] bg-[#E8C36A]/50 mb-3 md:mb-4 mx-auto md:mx-0" />
          <h2
            className="text-white font-header tracking-tight mb-2 md:mb-4"
            style={{ fontSize: 'clamp(36px, 10vw, 52px)', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,1)' }}
          >
            The Grain.
          </h2>
          <p className="text-white/90 font-body text-sm md:text-lg lg:text-xl leading-relaxed max-w-sm" style={{ textShadow: '0 2px 15px rgba(0,0,0,1), 0 4px 25px rgba(0,0,0,0.8)' }}>
            Aged Basmati — selected not by machines, but by masters.
            Every grain elongates to its absolute limit, providing the
            perfect canvas for our ancestral spice blends.
          </p>
        </div>

        {/* ── Story Panel: Chapter II — The Dum ── */}
        <div
          ref={story2Ref}
          className="absolute z-20 text-center md:text-right pointer-events-none flex flex-col w-[85%] md:w-auto md:max-w-[400px] left-1/2 md:left-auto md:right-[7%] bottom-[12%] md:bottom-auto md:top-1/2"
        >
          <span className="text-[#E8C36A] text-[11px] md:text-[9px] uppercase tracking-[0.6em] font-body mb-2 md:text-right font-semibold">
            Chapter II
          </span>
          <div className="w-8 h-[1px] bg-[#E8C36A]/50 mb-3 md:mb-4 mx-auto md:ml-auto md:mr-0" />
          <h2
            className="text-white font-header tracking-tight mb-2 md:mb-4"
            style={{ fontSize: 'clamp(36px, 10vw, 52px)', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,1)' }}
          >
            The Dum.
          </h2>
          <p className="text-white/90 font-body text-sm md:text-lg lg:text-xl leading-relaxed max-w-sm md:ml-auto" style={{ textShadow: '0 2px 15px rgba(0,0,0,1), 0 4px 25px rgba(0,0,0,0.8)' }}>
            Sealed in steam. Left undisturbed. The pot breathes in silence
            as ingredients meld into a state of pure, unhurried harmony.
            True flavor needs patience — not shortcuts.
          </p>
        </div>

        {/* ── Story Panel: Chapter III — The Promise ── */}
        <div
          ref={story3Ref}
          className="absolute z-20 text-center pointer-events-none flex flex-col items-center w-[85%] md:w-auto md:max-w-[500px] left-1/2 bottom-[10%] md:bottom-auto md:top-[78%]"
          style={{ transform: 'translateX(-50%)' }}
        >
          <span className="text-[#E8C36A] text-[11px] md:text-[9px] uppercase tracking-[0.6em] font-body mb-2 font-semibold">
            Chapter III
          </span>
          <div className="w-8 h-[1px] bg-[#E8C36A]/50 mb-3 md:mb-4" />
          <h2
            className="text-white font-header tracking-tight mb-2 md:mb-4"
            style={{ fontSize: 'clamp(36px, 10vw, 52px)', lineHeight: 1.05, textShadow: '0 4px 30px rgba(0,0,0,1)' }}
          >
            The Promise.
          </h2>
          <p className="text-white/90 font-body text-sm md:text-lg lg:text-xl leading-relaxed max-w-md bg-black/40 md:bg-transparent rounded-lg md:rounded-none px-4 py-3 md:p-0 border border-gold/10 md:border-none backdrop-blur-md md:backdrop-blur-none" style={{ textShadow: '0 2px 15px rgba(0,0,0,1), 0 4px 25px rgba(0,0,0,0.8)' }}>
            From our kitchen to your table — every biryani and every roll
            is a promise of authenticity. No compromises. No shortcuts.
            Just the relentless pursuit of perfection.
          </p>
          <div className="mt-4 md:mt-6">
            <GoldDivider className="w-32" />
          </div>
        </div>

        {/* ── Keyframes ── */}
        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          @keyframes loaderPulse {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          @keyframes loaderSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default HeroSection;