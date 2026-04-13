import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const menuItems = [
  {
    id: 1,
    title: "HYDERABADI DUM BIRYANI",
    category: "SIGNATURE",
    price: "₹850",
    tag: "Chef's Reserve",
    desc: "A culinary masterpiece slow-cooked for 8 hours with aged basmati, saffron, and tender goat meat.",
    stats: { grain: "8.5mm", aroma: "Intense", spice: "Balanced" },
    origin: "Nizam's Kitchen, Hyderabad"
  },
  {
    id: 2,
    title: "AWADHI DUM PUKHT",
    category: "HERITAGE",
    price: "₹790",
    tag: "Heritage",
    desc: "The quintessential Lucknowi experience. Fragrant, delicate, and cooked in a sealed clay pot.",
    stats: { grain: "7.8mm", aroma: "Floral", spice: "Mild" },
    origin: "Royal Courts of Awadh"
  },
  {
    id: 3,
    title: "MALABAR PRAWN BIRYANI",
    category: "SEASONAL",
    price: "₹920",
    tag: "Coastal Special",
    desc: "Short-grain Kaima rice infused with coconut milk and fresh Malabar prawns.",
    stats: { grain: "4.5mm", aroma: "Zesty", spice: "Medium" },
    origin: "Coastal Malabar"
  },
  {
    id: 4,
    title: "KOLKATA SPECIAL BIRYANI",
    category: "SIGNATURE",
    price: "₹720",
    tag: "Classic",
    desc: "Famous for its subtle spices and the iconic saffron-infused potato and egg.",
    stats: { grain: "8.0mm", aroma: "Sweet-Spice", spice: "Mild" },
    origin: "Park Street, Kolkata"
  },
  {
    id: 5,
    title: "SINDHI SPICE RESERVE",
    category: "HERITAGE",
    price: "₹680",
    tag: "High Spice",
    desc: "A robust, tangy blend with dried plums and a complex layer of aromatic spices.",
    stats: { grain: "7.5mm", aroma: "Sharp", spice: "High" },
    origin: "Sindh Province"
  },
  {
    id: 6,
    title: "VEGETABLE TEHRI",
    category: "ACCOMPANIMENTS",
    price: "₹550",
    tag: "Garden Fresh",
    desc: "A celebration of seasonal vegetables and heritage rice, packed with nutritional richness.",
    stats: { grain: "7.2mm", aroma: "Earthy", spice: "Balanced" },
    origin: "North Indian Plains"
  }
];

const categories = ["ALL", "SIGNATURE", "HERITAGE", "SEASONAL", "ACCOMPANIMENTS"];

// ── Icons ──
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="0" y="1.5" width="16" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="7" width="16" height="2" rx="1" fill="currentColor" />
    <rect x="0" y="12.5" width="16" height="2" rx="1" fill="currentColor" />
  </svg>
);

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="0" y="0" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="9" y="0" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="0" y="9" width="7" height="7" rx="1.5" fill="currentColor" />
    <rect x="9" y="9" width="7" height="7" rx="1.5" fill="currentColor" />
  </svg>
);

// ── Full Card — List view & Desktop ──
const ProductCard = ({ item }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 1000, duration: 0.4, ease: 'power2.out' });
    gsap.to(imgRef.current, { x: x * 20, y: y * 20, scale: 1.1, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="card-entrance relative flex flex-col glass-card min-h-[420px] overflow-hidden group cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gold/5 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
      <div className="absolute top-6 left-6 z-20">
        <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.2em] uppercase rounded-full">{item.tag}</span>
      </div>
      <div className="relative h-72 flex items-center justify-center p-4 overflow-visible">
        <div className="absolute w-48 h-48 bg-gold/10 rounded-full blur-[70px] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
        <img ref={imgRef} src="/biryani.png" alt={item.title} className="w-[95%] h-[95%] object-contain relative z-10 floating-img-shadow transition-transform duration-500" />
        <div className="absolute bottom-4 w-40 h-5 bg-black/60 blur-xl rounded-full transform scale-x-150 opacity-40" />
      </div>
      <div className="flex-grow p-8 flex flex-col items-center text-center relative z-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="w-full mb-6">
          <div className="flex flex-col items-center mb-4">
            <h3 className="font-header text-2xl text-white tracking-[0.15em] leading-tight mb-2 group-hover:text-gold transition-colors">{item.title}</h3>
            <span className="font-header text-gold text-xl gold-glow">{item.price}</span>
          </div>
          <p className="text-gray-400 font-body text-xs leading-relaxed opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:text-white max-w-md mx-auto">
            {item.desc}
          </p>
        </div>
        
        <div className="w-full">
          <div className="grid grid-cols-3 gap-6 border-y border-white/10 py-6 mb-6">
            {Object.entries(item.stats).map(([key, val]) => (
              <div key={key} className="text-center">
                <p className="text-[8px] text-gold/60 uppercase tracking-widest mb-1">{key}</p>
                <p className="text-[10px] text-white font-header">{val}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-[10px] text-gold/40 font-body uppercase tracking-[0.3em] italic">{item.origin}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Compact Card — Mobile 2-Column Grid ──
const CompactCard = ({ item }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      className="card-entrance relative flex flex-col overflow-hidden cursor-pointer"
      style={{
        borderRadius: '4px',
        border: '1px solid rgba(212,175,55,0.18)',
        background: 'linear-gradient(160deg, rgba(255,255,255,0.035) 0%, rgba(0,0,0,0.55) 100%)',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        transition: 'transform 0.15s ease',
        minHeight: '260px',
      }}
    >
      {/* Image Zone */}
      <div
        className="relative flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{
          height: '140px',
          background: 'radial-gradient(ellipse at 50% 65%, rgba(212,175,55,0.09) 0%, transparent 70%)',
        }}
      >
        {/* Tag top-left */}
        <div className="absolute top-2 left-2 z-20">
          <span style={{
            fontSize: '7px',
            letterSpacing: '0.1em',
            padding: '2px 7px',
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.28)',
            borderRadius: '99px',
            color: '#D4AF37',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}>
            {item.tag}
          </span>
        </div>

        {/* Gold glow blob */}
        <div style={{
          position: 'absolute', width: '70px', height: '70px', borderRadius: '50%',
          background: 'rgba(212,175,55,0.1)', filter: 'blur(28px)',
        }} />

        <img
          src="/biryani.png"
          alt={item.title}
          style={{ width: '82%', height: '82%', objectFit: 'contain', position: 'relative', zIndex: 10 }}
        />

        {/* Drop shadow pedestal */}
        <div style={{
          position: 'absolute', bottom: '4px',
          width: '60px', height: '8px', borderRadius: '50%',
          background: 'rgba(0,0,0,0.45)', filter: 'blur(7px)',
        }} />
      </div>

      {/* Thin gold separator */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.28), transparent)', flexShrink: 0 }} />

      {/* Content Zone */}
      <div className="flex flex-col flex-grow" style={{ padding: '10px 10px 10px', gap: '8px' }}>

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-1">
          <h3 style={{
            fontFamily: 'inherit',
            fontSize: '10px',
            letterSpacing: '0.07em',
            lineHeight: 1.3,
            color: '#fff',
            fontWeight: 600,
            flexGrow: 1,
          }}>
            {item.title}
          </h3>
          <span style={{
            fontSize: '11px',
            color: '#D4AF37',
            fontWeight: 700,
            flexShrink: 0,
            lineHeight: 1.2,
          }}>
            {item.price}
          </span>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '7px', gap: '2px',
        }}>
          {Object.entries(item.stats).map(([key, val]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '6px', letterSpacing: '0.1em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginBottom: '2px' }}>{key}</p>
              <p style={{ fontSize: '8px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{val}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

// ── View Toggle — mobile only ──
const ViewToggle = ({ viewMode, onToggle }) => (
  <div style={{
    display: 'flex', gap: '2px', padding: '4px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '99px',
  }}>
    {[
      { mode: 'list', Icon: ListIcon, label: 'List view' },
      { mode: 'grid', Icon: GridIcon, label: 'Grid view' },
    ].map(({ mode, Icon, label }) => (
      <button
        key={mode}
        onClick={() => onToggle(mode)}
        aria-label={label}
        style={{
          width: 34, height: 34,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '99px', border: 'none', cursor: 'pointer',
          background: viewMode === mode ? '#D4AF37' : 'transparent',
          color: viewMode === mode ? '#000' : 'rgba(107,114,128,1)',
          transition: 'background 0.2s ease, color 0.2s ease',
        }}
      >
        <Icon />
      </button>
    ))}
  </div>
);

// ── Main ──
const MenuOverlay = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState("list");
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset to list on desktop
  useEffect(() => {
    if (!isMobile) setViewMode('list');
  }, [isMobile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".menu-header-item", { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: "power4.out" });
      gsap.from(".card-entrance", { y: 80, opacity: 0, stagger: 0.08, duration: 1.2, ease: "power4.out", delay: 0.3 });
    });
    return () => ctx.revert();
  }, []);

  // Animate cards on view/filter change
  useEffect(() => {
    const cards = document.querySelectorAll('.card-entrance');
    if (!cards.length) return;
    gsap.fromTo(cards,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.45, ease: "power3.out" }
    );
  }, [viewMode, activeCategory]);

  const filteredItems = activeCategory === "ALL"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  // Show compact 2-col grid only when: mobile AND grid mode
  const showCompactGrid = isMobile && viewMode === 'grid';

  return (
    <div className="relative z-10 bg-[#050505] min-h-screen overflow-x-hidden selection:bg-gold/30">
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at center, #D4AF37 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

      <nav className="fixed top-0 left-0 w-full z-[60] px-10 py-8 flex justify-end items-center mix-blend-difference">
        <div className="hidden md:flex items-center gap-8">
          <span className="text-gold/40 text-[10px] tracking-[0.5em] uppercase">Private Selection 2026</span>
          <div className="w-12 h-[1px] bg-gold/20" />
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-40 pb-32 relative z-10">

        <header ref={headerRef} className="mb-24 text-center">
          <div className="menu-header-item inline-block mb-4">
            <span className="text-gold text-xs tracking-[0.8em] uppercase font-header">The Master Selection</span>
          </div>
          <h1 className="menu-header-item text-6xl md:text-8xl lg:text-9xl font-header font-extrabold text-white tracking-tighter leading-none mb-8">
            MENU <span className="font-light italic text-gold/80">EDITORIAL</span>
          </h1>
          <p className="menu-header-item max-w-2xl mx-auto text-gray-500 font-body text-sm md:text-base leading-relaxed tracking-wide">
            A curated journey through the heritage of the Indian subcontinent. Each dish is a signature reserve,
            prepared with artisanal grains and secret heirloom spices.
          </p>
        </header>

        {/* Filters + Toggle */}
        <div className="menu-header-item flex flex-col items-center gap-5 mb-20">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-header transition-all duration-500 border ${activeCategory === cat
                    ? 'bg-gold text-black border-gold'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-gold/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toggle — conditionally rendered, mobile only */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '9px', color: 'rgba(75,85,99,1)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                View
              </span>
              <ViewToggle viewMode={viewMode} onToggle={setViewMode} />
            </div>
          )}
        </div>

        {/* ── Card Grid ── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            // Mobile: 2-col compact OR 1-col full; Desktop via className override
            gridTemplateColumns: showCompactGrid ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
            gap: showCompactGrid ? '12px' : '48px',
          }}
          // Desktop overrides via Tailwind (these win on md+)
          className="md:!grid-cols-2 lg:!grid-cols-2 md:!gap-12"
        >
          {filteredItems.map((item) =>
            showCompactGrid
              ? <CompactCard key={item.id} item={item} />
              : <ProductCard key={item.id} item={item} />
          )}
        </div>

        <footer className="mt-32 text-center border-t border-white/5 pt-12">
          <p className="text-[10px] text-gray-600 tracking-[0.4em] uppercase">
            All prices are in INR. Selection subject to seasonal availability.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MenuOverlay;