import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Temporary Delhi coordinates — update when location is confirmed
const LOCATION = {
  name: 'House of Biryani & Rolls',
  address: 'Connaught Place, New Delhi, Delhi 110001',
  lat: 28.6315,
  lng: 77.2167,
  googleMapsUrl: 'https://www.google.com/maps/place/Connaught+Place,+New+Delhi,+Delhi+110001',
};

const MapLocation = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const mapWrapRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });

      gsap.from(mapWrapRef.current, {
        y: 60, opacity: 0, scale: 0.96, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });

      gsap.from(infoRef.current, {
        y: 30, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMapClick = () => {
    window.open(LOCATION.googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="find-us"
      style={{
        position: 'relative',
        background: '#0a0a0a',
        padding: 'clamp(80px, 10vw, 130px) 0',
        overflow: 'hidden',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* ── Background accent ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(212,175,55,0.02) 0%, transparent 70%)',
      }} />

      {/* ── Top border ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>

        {/* ── Modern Section Label ── */}
        <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '14px', color: '#D4AF37', fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '0.15em' }}>
            03
          </div>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
          <span style={{
            fontSize: '14px', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)', fontFamily: '"Outfit", sans-serif', fontWeight: 400
          }}>
            Find Us
          </span>
        </div>

        {/* ── Heading ── */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 64px)' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.1, margin: '0 0 12px',
            color: 'rgba(255,255,255,0.9)',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 400,
          }}>
            Visit the <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Kitchen</span>
          </h2>
          <p style={{
            fontSize: 'clamp(13px, 1.3vw, 16px)',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: '"Outfit", sans-serif',
            fontStyle: 'normal',
            margin: 0,
          }}>
            Tap the map to get directions
          </p>
        </div>

        {/* ── Map Container ── */}
        <div
          ref={mapWrapRef}
          onClick={handleMapClick}
          role="button"
          tabIndex={0}
          aria-label="Open location in Google Maps"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleMapClick(); }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            aspectRatio: '16 / 9',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(212,175,55,0.15)',
            cursor: 'pointer',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
            e.currentTarget.style.boxShadow = '0 20px 80px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.06)';
            const overlay = e.currentTarget.querySelector('.map-hover-overlay');
            if (overlay) overlay.style.opacity = '1';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)';
            e.currentTarget.style.boxShadow = 'none';
            const overlay = e.currentTarget.querySelector('.map-hover-overlay');
            if (overlay) overlay.style.opacity = '0';
          }}
        >
          {/* Google Maps Embed — dark styled */}
          <iframe
            title="House of Biryani & Rolls Location"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.655!2d${LOCATION.lng}!3d${LOCATION.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0x5e2a1b0e45a9d3f0!2sConnaught%20Place!5e0!3m2!1sen!2sin!4v1`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2) saturate(0.3)',
              pointerEvents: 'none',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Dark tint overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.4) 100%)',
          }} />

          {/* Vignette edges */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.6)',
          }} />

          {/* Gold pin marker center */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            pointerEvents: 'none',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
          }}>
            <svg width="32" height="42" viewBox="0 0 24 32" fill="none">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z" fill="#D4AF37" />
              <circle cx="12" cy="12" r="5" fill="#0a0a0a" />
              <circle cx="12" cy="12" r="2.5" fill="#D4AF37" fillOpacity="0.6" />
            </svg>
            {/* Pulsing ring */}
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              width: '12px', height: '4px',
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.3)',
              filter: 'blur(2px)',
            }} />
          </div>

          {/* Hover overlay with "Open in Maps" */}
          <div
            className="map-hover-overlay"
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(10,10,10,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 32px',
              border: '1px solid rgba(212,175,55,0.5)',
              background: 'rgba(10,10,10,0.8)',
              backdropFilter: 'blur(8px)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span style={{
                fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#D4AF37', fontFamily: '"Outfit", sans-serif',
              }}>
                Open in Maps
              </span>
            </div>
          </div>
        </div>

        {/* ── Location Info Card ── */}
        <div
          ref={infoRef}
          style={{
            maxWidth: '900px',
            margin: '32px auto 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            padding: '24px 32px',
            background: 'rgba(212,175,55,0.02)',
            border: '1px solid rgba(212,175,55,0.1)',
          }}
        >
          {/* Left — Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: '1 1 300px' }}>
            <div style={{
              width: '36px', height: '36px',
              border: '1px solid rgba(212,175,55,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div style={{
                fontSize: '15px', color: 'rgba(255,255,255,0.85)',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 500, marginBottom: '4px',
              }}>
                {LOCATION.name}
              </div>
              <div style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.35)',
                fontFamily: '"Outfit", sans-serif',
                fontStyle: 'normal',
              }}>
                {LOCATION.address}
              </div>
            </div>
          </div>

          {/* Right — Get Directions CTA */}
          <a
            href={LOCATION.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="map-directions-cta"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 28px',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#D4AF37',
              fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase',
              textDecoration: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: '"Outfit", sans-serif',
              transition: 'all 0.3s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.7)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
            }}
          >
            <span>Get Directions</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Bottom border ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2) 30%, rgba(212,175,55,0.2) 70%, transparent)',
      }} />
    </section>
  );
};

export default MapLocation;
