import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const menuItems = [
  {
    id: 1, title: "HYDERABADI DUM BIRYANI", category: "SIGNATURE", price: "₹850",
    tag: "Chef's Reserve", desc: "Slow-cooked for 8 hours with aged basmati, saffron, and tender goat meat.",
    stats: { grain: "8.5mm", aroma: "Intense", spice: "Balanced" }, origin: "Nizam's Kitchen, Hyderabad",
    isNonVeg: true, servings: "Serves 1-2", spiceLevel: "Medium", pieces: "4-5 Pcs",
    socialProof: "4.9 ★ 2k+", offer: "ROYAL100",
  },
  {
    id: 2, title: "AWADHI DUM PUKHT", category: "HERITAGE", price: "₹790",
    tag: "Heritage", desc: "The quintessential Lucknowi experience — fragrant, delicate, sealed in a clay pot.",
    stats: { grain: "7.8mm", aroma: "Floral", spice: "Mild" }, origin: "Royal Courts of Awadh",
    isNonVeg: true, servings: "Serves 1-2", spiceLevel: "Mild", pieces: "4 Pcs",
    socialProof: "4.8 ★ 1.5k+", offer: "HERITAGE20",
  },
  {
    id: 3, title: "MALABAR PRAWN BIRYANI", category: "SEASONAL", price: "₹920",
    tag: "Coastal Special", desc: "Short-grain Kaima rice infused with coconut milk and fresh Malabar prawns.",
    stats: { grain: "4.5mm", aroma: "Zesty", spice: "Medium" }, origin: "Coastal Malabar",
    isNonVeg: true, servings: "Serves 1", spiceLevel: "Spicy", pieces: "6-8 Prawns",
    socialProof: "4.7 ★ 800+", offer: "COASTAL15",
  },
  {
    id: 4, title: "KOLKATA SPECIAL BIRYANI", category: "SIGNATURE", price: "₹720",
    tag: "Classic", desc: "Famous for subtle spices and the iconic saffron-infused potato and egg.",
    stats: { grain: "8.0mm", aroma: "Sweet-Spice", spice: "Mild" }, origin: "Park Street, Kolkata",
    isNonVeg: true, servings: "Serves 1-2", spiceLevel: "Mild", pieces: "2 Pcs + Egg",
    socialProof: "4.6 ★ 3k+", offer: "KOLKATA10",
  },
  {
    id: 5, title: "SINDHI SPICE RESERVE", category: "HERITAGE", price: "₹680",
    tag: "High Spice", desc: "A robust, tangy blend with dried plums and complex aromatic spices.",
    stats: { grain: "7.5mm", aroma: "Sharp", spice: "High" }, origin: "Sindh Province",
    isNonVeg: true, servings: "Serves 1", spiceLevel: "Very Spicy", pieces: "4 Pcs",
    socialProof: "4.5 ★ 500+", offer: "SPICE25",
  },
  {
    id: 6, title: "VEGETABLE TEHRI", category: "ACCOMPANIMENTS", price: "₹550",
    tag: "Garden Fresh", desc: "A celebration of seasonal vegetables and heritage rice, rich in nutritional depth.",
    stats: { grain: "7.2mm", aroma: "Earthy", spice: "Balanced" }, origin: "North Indian Plains",
    isNonVeg: false, servings: "Serves 1-2", spiceLevel: "Medium", pieces: "Assorted Veg",
    socialProof: "4.8 ★ 1.1k+", offer: "VEGGIE20",
  },
];

const categories = ["ALL", "SIGNATURE", "HERITAGE", "SEASONAL", "ACCOMPANIMENTS"];

/* ── Icons ── */
const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="0" y="1" width="15" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="6.5" width="15" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="12" width="15" height="2" rx="1" fill="currentColor" />
  </svg>
);
const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="0" y="0" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
    <rect x="8.5" y="0" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
    <rect x="0" y="8.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
    <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
  </svg>
);

const DietDot = ({ isNonVeg }) => (
  <span
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 14, height: 14, border: `1.5px solid ${isNonVeg ? 'rgba(239,68,68,0.45)' : 'rgba(34,197,94,0.45)'}`,
      borderRadius: 2, flexShrink: 0,
    }}
  >
    <span style={{
      width: 7, height: 7, borderRadius: '50%',
      background: isNonVeg ? '#ef4444' : '#22c55e',
      boxShadow: isNonVeg ? '0 0 6px rgba(239,68,68,0.6)' : '0 0 6px rgba(34,197,94,0.6)',
    }} />
  </span>
);

/* ── Full ProductCard (desktop + list mobile) ── */
const ProductCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 7, rotateX: -y * 7, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
    gsap.to(imgRef.current, { x: x * 12, y: y * 12, scale: 1.06, duration: 0.4, ease: 'power2.out' });
    gsap.to(glowRef.current, { opacity: 0.35, duration: 0.3 });
  };
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1,0.4)' });
    gsap.to(glowRef.current, { opacity: 0.12, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-item"
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 100%)',
        border: '1px solid rgba(212,175,55,0.12)',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        transition: 'border-color 0.4s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.45)'; }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: 248, flexShrink: 0, overflow: 'hidden', background: '#111' }}>
        {/* Glow disc */}
        <div ref={glowRef} style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 60%, rgba(212,175,55,0.18) 0%, transparent 70%)',
          opacity: 0.12, transition: 'opacity 0.3s', pointerEvents: 'none',
        }} />

        {/* Badges top-left */}
        <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{
            padding: '3px 8px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,175,55,0.35)', color: '#D4AF37',
            fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>{item.pieces}</span>
          {item.tag && (
            <span style={{
              padding: '3px 8px', background: '#D4AF37', color: '#000',
              fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(212,175,55,0.3)',
            }}>{item.tag}</span>
          )}
        </div>

        {/* Rating top-right */}
        <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 20 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999,
          }}>
            <span style={{ color: '#FFD700', fontSize: 9, fontWeight: 800 }}>{item.socialProof.split(' ')[0]}</span>
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 8 }}>{item.socialProof.split(' ').slice(1).join(' ')}</span>
          </div>
        </div>

        {/* Food image */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 28 }}>
          <img
            ref={imgRef}
            src="/biryani.png"
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.95))', position: 'relative', zIndex: 10 }}
          />
        </div>

        {/* Bottom fade into content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 56,
          background: 'linear-gradient(to top, #111 0%, transparent 100%)', zIndex: 15
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '26px 24px', background: '#111' }}>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
          <div style={{ marginTop: 3, flexShrink: 0 }}><DietDot isNonVeg={item.isNonVeg} /></div>
          <h3 className="font-header" style={{
            fontSize: 17, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.35,
            margin: 0, minHeight: '2.8em', transition: 'color 0.3s',
          }}>{item.title}</h3>
        </div>

        {/* Meta tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18, minHeight: 28 }}>
          {[item.servings, item.spiceLevel].map(tag => (
            <span key={tag} style={{
              fontSize: 9, color: 'rgba(255,255,255,0.55)', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.12)', padding: '4px 10px',
              background: 'rgba(255,255,255,0.03)',
            }}>{tag}</span>
          ))}
          {item.offer && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: '#FFD700', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFD700', animation: 'pulse 1.5s infinite' }} />
              {item.offer}
            </span>
          )}
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          padding: '14px 0', marginBottom: 18,
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.015)',
        }}>
          {Object.entries(item.stats).map(([key, val], i, arr) => (
            <div key={key} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <span style={{ fontSize: 7, color: 'rgba(212,175,55,0.45)', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 4 }}>{key}</span>
              <span className="font-header" style={{ fontSize: 11, color: '#fff', letterSpacing: '0.06em' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="font-body" style={{
          fontSize: 13, color: 'rgba(200,200,200,0.7)', lineHeight: 1.7,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          marginBottom: 24, minHeight: 44, margin: '0 0 24px',
        }}>{item.desc}</p>

        {/* Price + CTA */}
        <div style={{
          marginTop: 'auto', paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 8, color: 'rgba(212,175,55,0.55)', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Reserve Price</div>
            <div className="font-header" style={{ fontSize: 26, color: '#FFD700', lineHeight: 1, textShadow: '0 0 20px rgba(255,215,0,0.18)' }}>{item.price}</div>
          </div>

          <button className="add-btn font-header" style={{
            padding: '11px 26px', background: 'transparent',
            border: '1px solid rgba(212,175,55,0.35)', color: '#D4AF37',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
            transition: 'border-color 0.4s, color 0.4s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#D4AF37'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#D4AF37'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Add Item</span>
            <span className="btn-fill" style={{
              position: 'absolute', inset: 0, background: '#D4AF37',
              transform: 'translateY(100%)', transition: 'transform 0.4s ease',
            }} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile Horizontal Card (Zomato Style) ── */
const MobileHorizontalCard = ({ item }) => {
  return (
    <div
      className="card-item"
      style={{
        display: 'flex',
        gap: '16px',
        padding: '24px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'transparent',
        width: '100%',
        alignItems: 'flex-start',
      }}
    >
      {/* Left Content (Text) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <DietDot isNonVeg={item.isNonVeg} />
          {item.tag && (
            <span style={{
              background: '#D4AF37',
              color: '#000',
              fontSize: '8px',
              fontWeight: '800',
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              {item.tag === "Chef's Reserve" ? "Bestseller" : item.tag}
            </span>
          )}
        </div>

        <h3 className="font-header" style={{
          fontSize: '18px',
          color: '#fff',
          margin: 0,
          letterSpacing: '0.01em',
          lineHeight: '1.3',
          fontWeight: '700'
        }}>{item.title}</h3>

        <div className="font-header" style={{
          fontSize: '16px',
          color: '#FFD700',
          marginTop: '2px',
          fontWeight: '600'
        }}>
          {item.price}
        </div>

        <p className="font-body" style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: '1.6',
          margin: '4px 0 8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.desc}
        </p>

        {item.offer && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: 'auto',
            padding: '4px 8px',
            background: 'rgba(34,197,94,0.08)',
            border: '1px dashed rgba(34,197,94,0.3)',
            width: 'fit-content'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
              <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: '10px', color: '#22c55e', fontWeight: '700', letterSpacing: '0.02em' }}>
              GET {item.offer} OFF
            </span>
          </div>
        )}
      </div>

      {/* Right Content (Image + Add Button) */}
      <div style={{ width: '130px', position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '16px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
        }}>
          {/* Top Badge/Ribbon */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: '#880808',
            color: '#fff',
            fontSize: '7px',
            padding: '3px 8px',
            zIndex: 10,
            fontWeight: '800',
            letterSpacing: '0.05em',
            borderBottomLeftRadius: '8px'
          }}>
            {item.id % 2 === 0 ? "NEWLY LAUNCHED" : "4.8k+ ORDERS"}
          </div>

          <div style={{ padding: '15px', width: '100%', height: '100%' }}>
            <img
              src="/biryani.png"
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.8))'
              }}
            />
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          className="font-header"
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFD700',
            color: '#000',
            border: '2px solid #000',
            borderRadius: '8px',
            padding: '8px 24px',
            fontSize: '13px',
            fontWeight: '900',
            boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
            zIndex: 20,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
          onPointerDown={e => e.currentTarget.style.transform = 'translateX(-50%) scale(0.95)'}
          onPointerUp={e => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}
        >
          ADD +
        </button>

        <div style={{
          textAlign: 'center',
          fontSize: '9px',
          color: 'rgba(255,255,255,0.4)',
          marginTop: '16px',
          fontWeight: '600'
        }}>
          Customizable
        </div>
      </div>
    </div>
  );
};

/* ── Compact Card (mobile 2-col grid) ── */
const CompactCard = ({ item }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      className="card-item"
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(160deg, #181818 0%, #0a0a0a 100%)',
        border: '1px solid rgba(212,175,55,0.12)',
        overflow: 'hidden', height: '100%',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        filter: pressed ? 'brightness(1.15)' : 'none',
        transition: 'transform 0.2s, filter 0.2s',
      }}
    >
      {/* SAVE ribbon */}
      {item.offer && (
        <div style={{
          position: 'absolute', top: 0, right: 0, zIndex: 30,
          background: '#D4AF37', padding: '3px 7px',
        }}>
          <span style={{ fontSize: 7, fontWeight: 900, color: '#000', letterSpacing: '0.2em', textTransform: 'uppercase' }}>SAVE</span>
        </div>
      )}

      {/* Image zone */}
      <div style={{
        position: 'relative', height: 138, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 16,
        background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
      }}>
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 20 }}>
          <span style={{
            padding: '3px 7px', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37',
            fontSize: 7, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>{item.pieces}</span>
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 20 }}>
          <DietDot isNonVeg={item.isNonVeg} />
        </div>
        <img src="/biryani.png" alt={item.title} style={{
          width: '100%', height: '100%', objectFit: 'contain',
          filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.95))', zIndex: 10, position: 'relative',
        }} />
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '14px 13px', background: '#0d0d0d' }}>
        <h3 className="font-header" style={{
          fontSize: 12, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.4,
          margin: '0 0 9px', minHeight: '2.4em',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{item.title}</h3>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12, minHeight: 20 }}>
          <span style={{
            fontSize: 7.5, color: 'rgba(255,255,255,0.5)', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.1)', padding: '3px 7px',
          }}>{item.spiceLevel}</span>
        </div>

        <div style={{
          marginTop: 'auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', paddingTop: 11,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span className="font-header" style={{ fontSize: 14, color: '#FFD700', fontWeight: 700 }}>{item.price}</span>
          <button style={{
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.35)',
            borderRadius: '50%', cursor: 'pointer', color: '#D4AF37', fontSize: 20, fontWeight: 300,
            transition: 'background 0.25s',
          }}
            onTouchStart={e => e.currentTarget.style.background = '#D4AF37'}
            onTouchEnd={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}
          >+</button>
        </div>
      </div>
    </div>
  );
};
/* ── View Toggle ── */
const ViewToggle = ({ viewMode, onToggle }) => (
  <div style={{
    display: 'flex', gap: 2, padding: 4,
    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 999,
  }}>
    {[{ mode: 'list', Icon: ListIcon, label: 'List' }, { mode: 'grid', Icon: GridIcon, label: 'Grid' }].map(({ mode, Icon, label }) => (
      <button key={mode} onClick={() => onToggle(mode)} aria-label={label} style={{
        width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 999, border: 'none', cursor: 'pointer',
        background: viewMode === mode ? '#D4AF37' : 'transparent',
        color: viewMode === mode ? '#000' : 'rgba(107,114,128,1)',
        transition: 'background 0.2s, color 0.2s',
      }}><Icon /></button>
    ))}
  </div>
);

/* ── Main ── */
const MenuOverlay = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('list');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => { if (!isMobile) setViewMode('list'); }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.menu-header-item', { y: 48, opacity: 0, stagger: 0.09, duration: 1, ease: 'power4.out' });
      gsap.from('.card-item', { y: 72, opacity: 0, stagger: 0.07, duration: 1.1, ease: 'power4.out', delay: 0.25 });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('.card-item');
    if (!cards.length) return;
    gsap.fromTo(cards, { y: 22, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.42, ease: 'power3.out' });
  }, [viewMode, activeCategory]);

  const filtered = activeCategory === 'ALL' ? menuItems : menuItems.filter(i => i.category === activeCategory);
  const showCompact = isMobile && viewMode === 'grid';

  /* Add-btn hover fill effect via CSS injection */
  useEffect(() => {
    const id = 'menu-btn-style';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = `
        .add-btn:hover .btn-fill { transform: translateY(0) !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div style={{ position: 'relative', background: '#060606', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ── Subtle repeated diagonal grain — position:absolute, not fixed ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.06) 0.5px, transparent 0.5px)',
        backgroundSize: '28px 28px',
        opacity: 1,
      }} />

      {/* ── Gold vignette at the very top ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 320,
        background: 'linear-gradient(to bottom, rgba(212,175,55,0.06) 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1440, margin: '0 auto', padding: '160px 20px 120px' }}>

        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 88 }}>
          <div className="menu-header-item" style={{ marginBottom: 14 }}>
            <span className="font-header" style={{ color: '#D4AF37', fontSize: 11, letterSpacing: '0.75em', textTransform: 'uppercase' }}>
              The Master Selection
            </span>
          </div>
          <h1 className="menu-header-item font-header" style={{
            fontSize: 'clamp(52px, 10vw, 112px)', color: '#fff',
            fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 0.92,
            margin: '0 0 28px',
          }}>
            MENU{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'rgba(212,175,55,0.75)' }}>
              COLLECTION
            </em>
          </h1>
          <p className="menu-header-item font-body" style={{
            maxWidth: 560, margin: '0 auto', color: 'rgba(140,140,140,0.85)',
            fontSize: 14, lineHeight: 1.8, letterSpacing: '0.02em',
          }}>
            A curated journey through the heritage of the Indian subcontinent. Each dish is a signature
            reserve, prepared with artisanal grains and secret heirloom spices.
          </p>
        </header>

        {/* Filters + toggle */}
        <div className="menu-header-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, marginBottom: 72 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-header"
                style={{
                  padding: '8px 22px', borderRadius: 999,
                  fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
                  border: activeCategory === cat ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                  background: activeCategory === cat ? '#D4AF37' : 'transparent',
                  color: activeCategory === cat ? '#000' : 'rgba(160,160,160,0.9)',
                  cursor: 'pointer', fontWeight: 700,
                  transition: 'all 0.4s',
                }}
              >{cat}</button>
            ))}
          </div>
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 9, color: 'rgba(80,80,80,1)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>View</span>
              <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
            </div>
          )}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: showCompact ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
          gap: showCompact ? 10 : (isMobile ? 0 : 44),
        }}
          className="md:!grid-cols-2 lg:!grid-cols-4 md:!gap-10 items-stretch"
        >
          {filtered.map(item => {
            if (showCompact) return <CompactCard key={item.id} item={item} />;
            if (isMobile) return <MobileHorizontalCard key={item.id} item={item} />;
            return <ProductCard key={item.id} item={item} index={item.id} />;
          })}
        </div>

        {/* Footer */}
        <footer style={{ marginTop: 100, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <p style={{ fontSize: 9, color: 'rgba(80,80,80,0.8)', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            All prices are in INR · Selection subject to seasonal availability
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MenuOverlay;