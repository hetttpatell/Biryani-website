import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Decorative corner bracket SVG ──
const CornerBracket = ({ flip = false }) => (
  <svg
    width="32" height="32" viewBox="0 0 32 32" fill="none"
    style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
  >
    <path d="M2 30 L2 2 L30 2" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5" fill="none" />
    <circle cx="2" cy="2" r="2" fill="#D4AF37" fillOpacity="0.4" />
  </svg>
);

// ── Inline gold diamond divider ──
const GoldLineDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 0L6.3 3.7L10 5L6.3 6.3L5 10L3.7 6.3L0 5L3.7 3.7Z" fill="#D4AF37" fillOpacity="0.6" />
    </svg>
    <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
  </div>
);

const ChefIntro = () => {
  const sectionRef = useRef(null);
  const imageColRef = useRef(null);
  const textColRef = useRef(null);
  const imageFrameRef = useRef(null);
  const badgeRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const dividerRef = useRef(null);
  const quoteRef = useRef(null);
  const signatureRef = useRef(null);
  const statsRef = useRef([]);
  const bgLineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Section entry line ──
      gsap.from(bgLineRef.current, {
        scaleX: 0,
        duration: 1.6,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });

      // ── Label pill ──
      gsap.from(labelRef.current, {
        y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });

      // ── Image column ──
      gsap.from(imageColRef.current, {
        x: -80, opacity: 0, duration: 1.4, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      // ── Image frame border grow ──
      gsap.from(imageFrameRef.current, {
        scale: 0.88, opacity: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      // ── Heading ──
      const headingChars = headingRef.current.querySelectorAll('.char');
      if (headingChars.length) {
        gsap.from(headingChars, {
          y: 60, opacity: 0, rotateX: -25, stagger: 0.04,
          duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
        });
      }

      // ── Divider sweep ──
      gsap.from(dividerRef.current, {
        scaleX: 0, opacity: 0, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: dividerRef.current, start: 'top 85%' },
      });

      // ── Quote reveal ──
      gsap.from(quoteRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' },
      });

      // ── Signature ──
      gsap.from(signatureRef.current, {
        y: 25, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: signatureRef.current, start: 'top 88%' },
      });

      // ── Stats ──
      gsap.from(statsRef.current, {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current[0], start: 'top 88%' },
      });

      // ── Subtle image parallax on scroll ──
      gsap.to(imageColRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '20+', label: 'Years of Mastery' },
    { value: '400', label: 'Year Old Recipe Heritage' },
    { value: '∞', label: 'The Pursuit' },
  ];

  return (
    <section
      ref={sectionRef}
      id="chef-intro"
      style={{
        position: 'relative',
        background: '#070707',
        padding: '120px 0 140px',
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      {/* ── Background texture accents ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 15% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 85% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)',
      }} />

      {/* ── Vertical side accent lines ── */}
      <div style={{
        position: 'absolute', top: 0, left: '6%', width: '1px', height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08) 30%, rgba(212,175,55,0.08) 70%, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: '6%', width: '1px', height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.08) 30%, rgba(212,175,55,0.08) 70%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── Top entry line ── */}
      <div
        ref={bgLineRef}
        style={{
          position: 'absolute', top: 0, left: '0', right: '0',
          height: '1px', transformOrigin: 'left center',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.3) 70%, transparent)',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Modern Section Label ── */}
        <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
          <div style={{ fontSize: '14px', color: '#D4AF37', fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '0.15em' }}>
            01
          </div>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,175,55,0.4)' }} />
          <span style={{
            fontSize: '14px', letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.8)', fontFamily: '"Outfit", sans-serif', fontWeight: 400
          }}>
            The Curator's Perspective
          </span>
        </div>

        {/* ── Main two-column layout ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '80px',
          alignItems: 'center',
        }}>

          {/* ── LEFT — Portrait Column ── */}
          <div ref={imageColRef} style={{ position: 'relative' }}>

            {/* Outer decorative frame */}
            <div
              ref={imageFrameRef}
              style={{
                position: 'relative',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              {/* Corner accents */}
              <div style={{ position: 'absolute', top: '-16px', left: '-16px', zIndex: 2 }}>
                <CornerBracket />
              </div>
              <div style={{ position: 'absolute', bottom: '-16px', right: '-16px', zIndex: 2, transform: 'rotate(180deg)' }}>
                <CornerBracket />
              </div>

              {/* Gold frame border */}
              <div style={{
                border: '1px solid rgba(212,175,55,0.2)',
                padding: '10px',
                position: 'relative',
              }}>
                {/* Inner shadow overlay for premium depth */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                  boxShadow: 'inset 0 0 60px rgba(0,0,0,0.6)',
                }} />

                {/* Chef image */}
                <div style={{
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(135deg, #1a1208, #0a0806)',
                }}>
                  <img
                    src="/Chef.jpg"
                    alt="Chef — Executive Curator & Visionary"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      objectPosition: 'center top',
                      filter: 'sepia(20%) contrast(1.05) brightness(0.95)',
                      display: 'block',
                    }}
                    onError={(e) => {
                      // Graceful fallback — show monogram if image fails
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback monogram */}
                  <div style={{
                    display: 'none',
                    alignItems: 'center', justifyContent: 'center',
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, #120e04, #0a0806)',
                    flexDirection: 'column', gap: '16px',
                  }}>
                    <div style={{
                      width: '90px', height: '90px', border: '1px solid rgba(212,175,55,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '36px', color: 'rgba(212,175,55,0.5)',
                      fontFamily: '"Outfit", sans-serif', fontWeight: 300,
                      letterSpacing: '-1px',
                    }}>
                      CC
                    </div>
                  </div>

                  {/* Bottom gradient vignette on image */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '35%',
                    background: 'linear-gradient(to top, rgba(7,7,7,0.7) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* ── Role badge floating card ── */}
              <div
                ref={badgeRef}
                style={{
                  position: 'absolute',
                  bottom: '-30px',
                  right: '-20px',
                  zIndex: 10,
                  padding: '14px 22px',
                  background: '#0c0a05',
                  border: '1px solid rgba(212,175,55,0.25)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,175,55,0.05)',
                }}
              >
                <div style={{
                  fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: 'rgba(212,175,55,0.5)', fontFamily: '"Outfit", sans-serif', fontWeight: 500,
                  marginBottom: '4px',
                }}>
                  Executive Curator
                </div>
                <div style={{
                  fontSize: '16px', color: 'rgba(255,255,255,0.9)',
                  fontFamily: '"Outfit", sans-serif', fontWeight: 300,
                  letterSpacing: '0.05em',
                }}>
                  &amp; Visionary
                </div>
              </div>
            </div>

            {/* ── Stats Row below image ── */}
            <div style={{
              display: 'flex', gap: '0',
              marginTop: '64px',
              maxWidth: '440px',
              margin: '64px auto 0',
            }}>
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={el => statsRef.current[i] = el}
                  style={{
                    flex: 1,
                    padding: '16px 0',
                    textAlign: 'center',
                    borderLeft: i > 0 ? '1px solid rgba(212,175,55,0.1)' : 'none',
                  }}
                >
                  <div style={{
                    fontSize: 'clamp(26px, 3.5vw, 36px)',
                    color: '#D4AF37',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 300, lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '4px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: '"Outfit", sans-serif', fontWeight: 500,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Editorial Text Column ── */}
          <div ref={textColRef} style={{ padding: '20px 0' }}>

            {/* Heading */}
            <div
              ref={headingRef}
              style={{ marginBottom: '32px', overflow: 'hidden' }}
            >
              <h2 style={{
                fontSize: 'clamp(40px, 5.5vw, 76px)',
                lineHeight: 1.05, margin: 0,
                color: '#ffffff',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 300, letterSpacing: '-0.02em'
              }}>
                <span className="char" style={{ display: 'block', color: 'rgba(255,255,255,0.95)' }}>
                  Curator's
                </span>
                <span className="char" style={{
                  display: 'block',
                  color: '#D4AF37',
                  fontWeight: 400,
                }}>
                  Perspective
                </span>
              </h2>
            </div>

            {/* Divider */}
            <div ref={dividerRef} style={{ marginBottom: '36px', transformOrigin: 'left center' }}>
              <GoldLineDivider />
            </div>

            {/* Quote block */}
            <blockquote ref={quoteRef} style={{ margin: '0 0 32px', padding: 0, position: 'relative' }}>
              {/* Opening quote mark */}
              <div style={{
                fontSize: '80px', color: 'rgba(212,175,55,0.08)',
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1, marginBottom: '-20px',
                userSelect: 'none',
              }}>
                "
              </div>
              <p style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 300,
                margin: 0,
                paddingLeft: '4px',
              }}>
                Luxury is not just the ingredients; it is the kinetic energy of the craft.
                We treat every order as a commission — a piece of edible art that honours
                the archives of our royal culinary history.
              </p>
              <div style={{
                fontSize: '80px', color: 'rgba(212,175,55,0.08)',
                fontFamily: '"Outfit", sans-serif',
                lineHeight: 1, marginTop: '-10px', textAlign: 'right',
                userSelect: 'none',
              }}>
                "
              </div>
            </blockquote>

            {/* Chef signature block */}
            <div ref={signatureRef} style={{ marginBottom: '52px' }}>
              <div style={{
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                color: '#D4AF37',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 500, letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Julian Vane
              </div>
              <div style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: '"Outfit", sans-serif', fontWeight: 400,
              }}>
                Executive Curator &amp; Visionary
              </div>
            </div>

            {/* Editorial philosophy bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '52px' }}>
              {[
                { title: 'The Dum Principle', text: 'Every pot is sealed at the precise moment the steam reaches culinary equilibrium — a practice unchanged since the Mughal courts.' },
                { title: 'Hand-Selected Provenance', text: 'Our aged Basmati is sourced from a single valley in the Himalayan foothills, where altitude and glacial water create grain of unparalleled character.' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '20px', alignItems: 'flex-start',
                  padding: '18px',
                  background: 'rgba(212,175,55,0.025)',
                  border: '1px solid rgba(212,175,55,0.08)',
                  borderLeft: '2px solid rgba(212,175,55,0.35)',
                }}>
                  <div style={{ paddingTop: '2px' }}>
                    <div style={{
                      width: '24px', height: '24px', border: '1px solid rgba(212,175,55,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill="#D4AF37" fillOpacity="0.7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px', fontWeight: 600, letterSpacing: '0.15em',
                      color: 'rgba(255,255,255,0.9)', marginBottom: '8px',
                      fontFamily: '"Outfit", sans-serif', textTransform: 'uppercase',
                    }}>
                      {item.title}
                    </div>
                    <p style={{
                      fontSize: '14px', lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: '"Outfit", sans-serif', fontWeight: 300,
                      margin: 0,
                    }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#kitchen-promise"
              id="chef-intro-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 36px',
                border: '1px solid rgba(212,175,55,0.4)',
                color: '#D4AF37',
                fontSize: '11px',
                letterSpacing: '0.2em',
                fontWeight: 500,
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.7)';
                e.currentTarget.style.letterSpacing = '0.25em';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                e.currentTarget.style.letterSpacing = '0.2em';
              }}
            >
              <span>Discover the Kitchen's Promise</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom border ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: '0', right: '0',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.3) 70%, transparent)',
      }} />
    </section>
  );
};

export default ChefIntro;
