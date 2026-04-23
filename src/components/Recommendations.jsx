import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    name: 'Hyderabadi Biryani',
    spice: '4.5/5',
    aging: '18h',
  },
  {
    name: 'Special HOB Biryani',
    spice: '4.8/5',
    aging: '24h',
  },
  {
    name: 'Paneer Kathi Roll',
    spice: '3.2/5',
    aging: '12h',
  },
];

const Recommendations = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);
  const sliderRef = useRef(null);
  const glowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Label pill ──
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // ── Heading ──
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });

      // ── Dish items stagger ──
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.from(item, {
          y: 70,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          delay: i * 0.18,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });

      // ── Ambient glow pulse ──
      glowsRef.current.forEach((glow) => {
        if (!glow) return;
        gsap.to(glow, {
          opacity: 0.6,
          scale: 1.15,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // ── Slider bar ──
      if (sliderRef.current) {
        gsap.from(sliderRef.current, {
          scaleX: 0, opacity: 0,
          duration: 1.4,
          delay: 0.5,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recommendations"
      style={{
        position: 'relative',
        background: '#101010',
        padding: 'clamp(80px, 10vw, 140px) 0 clamp(60px, 8vw, 100px)',
        overflow: 'hidden',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* ── Ambient background radials ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.025) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 50% at 15% 60%, rgba(212,175,55,0.015) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 50% at 85% 60%, rgba(212,175,55,0.015) 0%, transparent 60%)',
      }} />

      {/* ── Top border line ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>

        {/* ── Modern Section Label ── */}
        <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', color: '#D4AF37', fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '0.15em' }}>
            02
          </div>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
          <span style={{
            fontSize: '14px', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)', fontFamily: '"Outfit", sans-serif', fontWeight: 400
          }}>
            Curated for You
          </span>
        </div>

        {/* ── Heading ── */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.1,
            margin: '0 0 12px',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 400,
          }}>
            Where to <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Begin</span>
          </h2>
          <p style={{
            fontSize: 'clamp(13px, 1.3vw, 16px)',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: '"Outfit", sans-serif',
            fontStyle: 'normal',
            margin: 0,
            letterSpacing: '0.04em',
          }}>
            Our chef's selection for first-time guests
          </p>
        </div>

        {/* ── Dishes Row ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 'clamp(32px, 6vw, 90px)',
          flexWrap: 'wrap',
        }}>
          {dishes.map((dish, i) => (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '0 1 300px',
                cursor: 'pointer',
              }}
            >
              {/* ── Circular Dish Image with ambient glow ── */}
              <div style={{
                position: 'relative',
                marginBottom: '32px',
              }}>
                {/* Ambient glow behind plate */}
                <div
                  ref={el => glowsRef.current[i] = el}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '110%', height: '110%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 50%, transparent 70%)',
                    opacity: 0.4,
                    pointerEvents: 'none',
                  }}
                />

                {/* Outer gold ring */}
                <div style={{
                  width: 'clamp(200px, 22vw, 280px)',
                  height: 'clamp(200px, 22vw, 280px)',
                  borderRadius: '50%',
                  padding: '3px',
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.05), rgba(212,175,55,0.25))',
                  position: 'relative',
                  transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.06) translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(212,175,55,0.1), 0 0 40px rgba(212,175,55,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Inner image circle */}
                  <div style={{
                    width: '100%', height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    background: '#0a0a0a',
                  }}>
                    <img
                      src="/biryani.png"
                      alt={dish.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        filter: 'brightness(0.92) contrast(1.05)',
                      }}
                    />
                    {/* Inner vignette */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      borderRadius: '50%',
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                    }} />
                  </div>
                </div>
              </div>

              {/* ── Dish Name ── */}
              <h3 style={{
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.88)',
                fontFamily: '"Outfit", sans-serif',
                margin: '0 0 10px',
                textAlign: 'center',
                letterSpacing: '0.03em',
                transition: 'color 0.3s ease',
              }}>
                {dish.name}
              </h3>

              {/* ── Specs line ── */}
              <p style={{
                fontSize: 'clamp(11px, 1.1vw, 14px)',
                color: 'rgba(255,255,255,0.3)',
                fontFamily: '"Outfit", sans-serif',
                margin: 0,
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}>
                Spice: {dish.spice}, Aging: {dish.aging}
              </p>
            </div>
          ))}
        </div>

        {/* ── Slider / Scroll Indicator ── */}
        <div
          ref={sliderRef}
          style={{
            maxWidth: '420px',
            margin: 'clamp(48px, 6vw, 80px) auto 0',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            transformOrigin: 'center center',
          }}
        >
          {/* Left track */}
          <div style={{
            flex: 1, height: '1.5px',
            background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 100%)',
            borderRadius: '1px',
          }} />

          {/* Glowing center dot */}
          <div style={{
            position: 'relative',
            width: '8px', height: '8px',
            flexShrink: 0,
            margin: '0 4px',
          }}>
            {/* Outer glow */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '24px', height: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
            }} />
            {/* Core dot */}
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.7)',
              boxShadow: '0 0 8px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.15)',
            }} />
          </div>

          {/* Right track */}
          <div style={{
            flex: 1, height: '1.5px',
            background: 'linear-gradient(to left, transparent 0%, rgba(255,255,255,0.08) 100%)',
            borderRadius: '1px',
          }} />
        </div>
      </div>

      {/* ── Bottom border line ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
      }} />
    </section>
  );
};

export default Recommendations;
