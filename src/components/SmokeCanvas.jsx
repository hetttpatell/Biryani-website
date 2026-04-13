import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const SCROLL_HEIGHT = 5000; // px of scroll distance for full animation

// Generate frame paths
const framePaths = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const idx = String(i + 1).padStart(3, '0');
  return `/Smoke-webp/frame-${idx}.webp`;
});

// Narrative text overlays positioned at specific scroll percentages
const narrativeOverlays = [
  {
    id: 'aroma',
    title: 'Aroma of Royalty',
    subtitle: 'The first whisper of saffron rises\u2026 ancient and intoxicating.',
    startPercent: 5,
    endPercent: 22,
  },
  {
    id: 'craft',
    title: 'Experience the Craft',
    subtitle: 'Hands that have perfected the art across generations.',
    startPercent: 30,
    endPercent: 47,
  },
  {
    id: 'tradition',
    title: 'Centuries of Tradition',
    subtitle: 'Every grain carries the weight of a thousand feasts.',
    startPercent: 55,
    endPercent: 72,
  },
  {
    id: 'sealed',
    title: 'Sealed in Perfection',
    subtitle: 'When the dum is broken, legend escapes.',
    startPercent: 80,
    endPercent: 94,
  },
];

const SmokeCanvas = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const overlayRefs = useRef([]);
  const loadingRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Draw a specific frame on canvas with "cover" scaling
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[frameIndex];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "cover" fit: scale image to fully cover canvas, crop overflow
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  // Resize canvas to match viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for perf
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all frames
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
          resolve(); // Don't reject — continue with missing frames
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

  // Setup canvas, scroll animation, and overlays after loading
  useEffect(() => {
    if (!isLoaded) return;

    // Initial canvas setup
    resizeCanvas();
    drawFrame(0);

    // Resize handler
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    // Fade out loading screen
    if (loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loadingRef.current) loadingRef.current.style.display = 'none';
        },
      });
    }

    const ctx = gsap.context(() => {
      // Proxy object for GSAP to tween
      const frameObj = { value: 0 };

      // --- Main scroll-linked frame animation ---
      gsap.to(frameObj, {
        value: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${SCROLL_HEIGHT}`,
          scrub: 0.5, // Slight smoothing for buttery feel
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const frame = Math.round(frameObj.value);
            if (frame !== currentFrameRef.current) {
              currentFrameRef.current = frame;
              drawFrame(frame);
            }
          },
        },
      });

      // --- Parallax text overlays ---
      narrativeOverlays.forEach((overlay, i) => {
        const el = overlayRefs.current[i];
        if (!el) return;

        const fadeInStart = overlay.startPercent / 100;
        const peakStart = (overlay.startPercent + 4) / 100;
        const peakEnd = (overlay.endPercent - 4) / 100;
        const fadeOutEnd = overlay.endPercent / 100;

        // Set initial state
        gsap.set(el, { opacity: 0, y: 60, filter: 'blur(8px)' });

        // Create timeline for this overlay driven by the same scroll
        const overlayTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${SCROLL_HEIGHT}`,
            scrub: 0.6,
          },
        });

        // Total duration normalized to 1
        overlayTl
          .to(el, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: peakStart - fadeInStart,
            ease: 'power2.out',
          }, fadeInStart)
          .to(el, {
            opacity: 1,
            y: 0,
            duration: peakEnd - peakStart,
          }, peakStart)
          .to(el, {
            opacity: 0,
            y: -40,
            filter: 'blur(8px)',
            duration: fadeOutEnd - peakEnd,
            ease: 'power2.in',
          }, peakEnd);
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isLoaded, drawFrame, resizeCanvas]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      aria-label="Smoke animation section"
    >
      {/* Loading Screen */}
      <div
        ref={loadingRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
        style={{ display: isLoaded ? 'none' : 'flex' }}
      >
        {/* Pulsing golden ring */}
        <div className="relative w-20 h-20 mb-8">
          <div
            className="absolute inset-0 rounded-full border border-amber-500/30"
            style={{
              animation: 'loaderPulse 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-2 rounded-full border border-amber-500/60"
            style={{
              animation: 'loaderPulse 2s ease-in-out infinite 0.3s',
            }}
          />
          <div
            className="absolute inset-4 rounded-full border border-amber-400/80"
            style={{
              animation: 'loaderPulse 2s ease-in-out infinite 0.6s',
            }}
          />
        </div>
        <p
          className="text-white/40 text-sm font-body tracking-[0.3em] uppercase"
          aria-live="polite"
        >
          Preparing the Experience
        </p>
        <div className="mt-4 w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${loadProgress}%`,
              background: 'linear-gradient(90deg, #D4A547, #E8C36A)',
            }}
          />
        </div>
        <p className="text-white/20 text-xs font-body mt-2 tabular-nums tracking-widest">
          {loadProgress}%
        </p>
      </div>

      {/* Canvas — fills the entire pinned viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
        aria-hidden="true"
      />

      {/* Subtle vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Narrative text overlays */}
      {narrativeOverlays.map((overlay, i) => (
        <div
          key={overlay.id}
          ref={(el) => (overlayRefs.current[i] = el)}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center"
          style={{ opacity: 0 }}
        >
          <span className="text-amber-400/70 text-[10px] md:text-xs uppercase tracking-[0.5em] font-body mb-4">
            {overlay.id === 'aroma'
              ? 'Chapter I'
              : overlay.id === 'craft'
                ? 'Chapter II'
                : overlay.id === 'tradition'
                  ? 'Chapter III'
                  : 'Chapter IV'}
          </span>
          <h2
            className="text-white/90 font-header tracking-tight mb-4 md:mb-6"
            style={{
              fontSize: 'clamp(28px, 7vw, 80px)',
              lineHeight: 1,
              textShadow: '0 4px 30px rgba(0,0,0,0.8)',
            }}
          >
            {overlay.title}
          </h2>
          <p
            className="text-white/50 font-body font-light max-w-md md:max-w-lg tracking-wide"
            style={{
              fontSize: 'clamp(14px, 2vw, 20px)',
              lineHeight: 1.6,
              textShadow: '0 2px 20px rgba(0,0,0,0.9)',
            }}
          >
            {overlay.subtitle}
          </p>
        </div>
      ))}

      {/* Inline keyframes for loader */}
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default SmokeCanvas;
