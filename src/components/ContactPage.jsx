import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ContactPage = ({ onBack }) => {
  const pageRef = useRef(null);

  const instagramLink =
    'https://www.instagram.com/houseofbiryaniandrolls?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
  const zomatoLink = 'https://link.zomato.com/xqzv/rshare?id=804595213056b3e3';
  const phoneNumber = '93540 19010';
  const mapsLink =
    'https://www.google.com/maps/search/AN+32c+Shalimar+Bagh+New+Delhi+110088';

  useEffect(() => {
    /* ── Google Fonts ── */
    if (!document.querySelector('#hob-fonts')) {
      const link = document.createElement('link');
      link.id = 'hob-fonts';
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@200;300;400&display=swap';
      document.head.appendChild(link);
    }

    const ctx = gsap.context(() => {
      /* curtain out → content in */
      const tl = gsap.timeline({ delay: 0.05 });
      tl.to('.hob-curtain-t', {
        yPercent: -100,
        duration: 1.15,
        ease: 'power4.inOut',
      })
        .to(
          '.hob-curtain-b',
          { yPercent: 100, duration: 1.15, ease: 'power4.inOut' },
          '<'
        )
        .from(
          '.hob-r',
          {
            autoAlpha: 0,
            y: 28,
            stagger: 0.09,
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.45'
        );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ── shared inline-style helpers ── */
  const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
  const sans = { fontFamily: "'Outfit', system-ui, sans-serif" };

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        @keyframes gold-flow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hob-gold {
          background: linear-gradient(
            90deg,
            #a06820, #e8c06a, #c9953a, #f5d988, #b07228, #e8c06a
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gold-flow 7s ease infinite;
        }
        .hob-phone { font-size: clamp(3.2rem, 11vw, 8.5rem); line-height: 0.9; letter-spacing: -0.03em; }
        .hob-rule {
          display: flex; align-items: center; gap: 14px; width: 100%;
        }
        .hob-rule::before, .hob-rule::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,149,58,0.35), transparent);
        }
        .hob-card {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          border-radius: 1.25rem;
          padding: 2rem 1.75rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transition: border-color 0.4s ease, background 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .hob-card:hover {
          border-color: rgba(201,149,58,0.35);
          background: rgba(201,149,58,0.04);
          transform: translateY(-4px);
        }
        .hob-card-label {
          font-size: 0.82rem;
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.02em;
          margin: 0;
        }
        .hob-card-sub {
          font-size: 9px;
          letter-spacing: 0.42em;
          color: rgba(255,255,255,0.22);
          text-transform: uppercase;
          margin: 0;
          margin-top: 2px;
        }
        .hob-back {
          background: none;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 0.6rem 1.6rem;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          transition: border-color 0.3s, color 0.3s;
        }
        .hob-back:hover {
          border-color: rgba(201,149,58,0.4);
          color: rgba(201,149,58,0.7);
        }
        .hob-diamond-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 2 L54 28 L28 54 L2 28 Z' fill='none' stroke='rgba(201,149,58,0.12)' stroke-width='0.6'/%3E%3Ccircle cx='28' cy='28' r='1.8' fill='rgba(201,149,58,0.1)'/%3E%3C/svg%3E");
          background-size: 56px 56px;
        }
        @media (max-width: 640px) {
          .hob-phone { letter-spacing: -0.02em; }
          .hob-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Root ── */}
      <div
        ref={pageRef}
        style={{
          background: '#07050A',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
        }}
      >
        {/* ── Curtains ── */}
        <div
          className="hob-curtain-t"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '52vh',
            background: '#07050A', zIndex: 200,
          }}
        />
        <div
          className="hob-curtain-b"
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, height: '52vh',
            background: '#07050A', zIndex: 200,
          }}
        />

        {/* ── Diamond lattice background ── */}
        <div
          className="hob-diamond-bg"
          style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }}
        />

        {/* ── Amber radial glow ── */}
        <div
          style={{
            position: 'absolute',
            top: '35%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '900px', height: '700px',
            background:
              'radial-gradient(ellipse at center, rgba(201,149,58,0.07) 0%, transparent 68%)',
            zIndex: 1, pointerEvents: 'none',
          }}
        />

        {/* ── Page content ── */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 7vw, 6rem)',
          }}
        >

          {/* ── Top bar ── */}
          <div
            className="hob-r"
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: '2.5rem',
            }}
          >
            <span
              style={{
                ...sans,
                fontSize: '9px', letterSpacing: '0.48em',
                color: 'rgba(201,149,58,0.5)', textTransform: 'uppercase',
              }}
            >
              House of Biryani &amp; Rolls
            </span>
            <button className="hob-back" style={sans} onClick={onBack}>
              ← Return
            </button>
          </div>

          {/* ── Hero ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>

            {/* Eyebrow */}
            <p
              className="hob-r"
              style={{
                ...sans, margin: '0 0 1.2rem',
                fontSize: '9px', letterSpacing: '0.5em',
                color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase',
              }}
            >
              Call to Order · New Delhi
            </p>

            {/* Phone number hero */}
            <div className="hob-r" style={{ marginBottom: '2.8rem' }}>
              <a href={`tel:+91${phoneNumber.replace(/\s/g, '')}`} style={{ textDecoration: 'none', display: 'block' }}>
                <h1
                  className="hob-phone hob-gold"
                  style={{ ...serif, fontWeight: 300, margin: 0 }}
                >
                  {phoneNumber}
                </h1>
              </a>
              <p
                style={{
                  ...sans, margin: '1rem 0 0',
                  fontSize: '9px', letterSpacing: '0.45em',
                  color: 'rgba(255,255,255,0.13)', textTransform: 'uppercase',
                }}
              >
                Tap to call instantly
              </p>
            </div>

            {/* Ornate divider */}
            <div className="hob-r hob-rule" style={{ marginBottom: '2.8rem' }}>
              <span
                style={{
                  ...sans,
                  fontSize: '10px', letterSpacing: '0.4em', flexShrink: 0,
                  color: 'rgba(201,149,58,0.35)', textTransform: 'uppercase',
                  padding: '0 1rem',
                }}
              >
                ✦ &nbsp; Connect With Us &nbsp; ✦
              </span>
            </div>

            {/* ── Three cards ── */}
            <div
              className="hob-r hob-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '3.5rem',
              }}
            >

              {/* Zomato */}
              <a href={zomatoLink} target="_blank" rel="noopener noreferrer" className="hob-card">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="rgba(226,55,68,0.85)">
                  <path d="M19.615 9.45l-1.258.473-.167.71-.446.021-.115.978h.408l-.211 1.51c-.131.939.036 1.381.865 1.381.488 0 .91-.175 1.135-.297l.145-.9c-.167.083-.436.19-.618.19-.247 0-.276-.13-.225-.488l.189-1.396h.843c.03-.206.131-.877.16-1h-.865zm-3.779 1.002c-.115.002-.236.01-.361.026a3.592 3.592 0 0 0-1.347.432l.26.789c.269-.15.615-.28.978-.326.538-.066.757.1.79.375.014.109.004.199-.005.289l-.014.056a3.46 3.46 0 0 0-1.097-.036c-.518.063-.943.273-1.204.6a1.324 1.324 0 0 0-.225 1.034c.127.583.553.84 1.199.76.45-.055.812-.27 1.076-.63a2.665 2.665 0 0 1-.03.304 1.74 1.74 0 0 1-.072.29l1.244.001a3.657 3.657 0 0 1-.001-.365c.036-.459.118-1.143.247-2.051a2.397 2.397 0 0 0-.002-.59c-.08-.644-.628-.969-1.436-.958zm6.536.063c-1.194 0-2.107 1.067-2.107 2.342 0 .959.552 1.693 1.628 1.693 1.2 0 2.107-1.067 2.107-2.35 0-.95-.538-1.685-1.628-1.685zm-11.777.041c-.538 0-1.12.465-1.52 1.236.102-.504.08-1.076.051-1.198a8.964 8.964 0 0 1-1.287.122 6.9 6.9 0 0 1-.073 1.243l-.167 1.145c-.066.45-.138.969-.211 1.297h1.353c.007-.199.058-.511.094-.786l.116-.786c.095-.511.502-1.114.815-1.114.182 0 .175.176.124.504l-.131.885c-.066.45-.138.969-.211 1.297h1.367c.008-.199.051-.512.088-.786l.116-.786c.094-.512.502-1.114.814-1.114.182 0 .175.168.146.396l-.327 2.29H13l.438-2.609c.095-.649.044-1.236-.676-1.236-.523 0-1.09.443-1.49 1.182.087-.61.036-1.182-.677-1.182zm-4.88.008c-1.177 0-2.08 1.053-2.08 2.312 0 .946.546 1.67 1.608 1.67 1.185 0 2.08-1.052 2.08-2.319 0-.938-.531-1.663-1.607-1.663zm-5.126.091c-.05.39-.102.778-.175 1.13.328-.008.619-.016 1.411-.016l-1.81 1.96-.015.703c.444-.03.997-.039 1.63-.039.566 0 1.134.008 1.497.039.065-.458.13-.763.21-1.137-.275.015-.755.023-1.512.023l1.81-1.969.023-.694c-.437.023-.83.03-1.52.03-.749 0-.975-.007-1.549-.03zm4.988.927c.255 0 .408.228.408.701 0 .687-.276 1.251-.626 1.251-.261 0-.414-.236-.414-.702 0-.694.283-1.25.632-1.25zm16.629 0c.254 0 .407.228.407.701 0 .687-.276 1.251-.625 1.251-.262 0-.415-.236-.415-.702 0-.694.284-1.25.633-1.25zM15.51 12.64c.206-.003.403.024.55.058l-.013.118c-.075.44-.39.881-.848.938-.31.037-.578-.148-.608-.39a.538.538 0 0 1 .114-.41c.117-.159.336-.268.599-.3.069-.009.138-.013.206-.014Z" />
                </svg>
                <div>
                  <p className="hob-card-label" style={serif}>Order Online</p>
                  <p className="hob-card-sub" style={sans}>via Zomato →</p>
                </div>
              </a>

              {/* Instagram */}
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="hob-card">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(240,96,178,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="rgba(240,96,178,0.85)" stroke="none" />
                </svg>
                <div>
                  <p className="hob-card-label" style={serif}>Follow Us</p>
                  <p className="hob-card-sub" style={sans}>@houseofbiryaniandrolls →</p>
                </div>
              </a>

              {/* Directions */}
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hob-card">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="rgba(201,149,58,0.85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                  <p className="hob-card-label" style={serif}>Find Us</p>
                  <p className="hob-card-sub" style={sans}>Get Directions →</p>
                </div>
              </a>

            </div>

            {/* ── Address block ── */}
            <div className="hob-r">
              <div
                style={{
                  width: '2rem', height: '1px',
                  background: 'rgba(201,149,58,0.3)',
                  marginBottom: '1.2rem',
                }}
              />
              <p
                style={{
                  ...serif,
                  fontStyle: 'italic', fontWeight: 300,
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                  color: 'rgba(255,255,255,0.38)',
                  lineHeight: 1.45, margin: '0 0 0.6rem',
                }}
              >
                An 32c, Shalimar Bagh,<br />New Delhi — 110088
              </p>
              <p
                style={{
                  ...sans,
                  fontSize: '9px', letterSpacing: '0.44em',
                  color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Daily · 11 AM – 11 PM
              </p>
            </div>

          </div>

          {/* ── Bottom spacer ── */}
          <div style={{ paddingTop: '2rem' }} />

        </div>
      </div>
    </>
  );
};

export default ContactPage;