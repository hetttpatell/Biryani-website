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

const ProductCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(imgRef.current, {
      x: x * 20,
      y: y * 20,
      scale: 1.1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    });
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="card-entrance relative flex flex-col glass-card h-[500px] overflow-hidden group cursor-pointer"
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gold/5 opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
      
      {/* Category Tag */}
      <div className="absolute top-6 left-6 z-20">
        <span className="px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-[10px] tracking-[0.2em] uppercase rounded-full">
          {item.tag}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 flex items-center justify-center p-8 overflow-visible">
        <div className="absolute w-40 h-40 bg-gold/10 rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
        <img 
          ref={imgRef}
          src="/biryani.png" 
          alt={item.title}
          className="w-full h-full object-contain relative z-10 floating-img-shadow transition-transform duration-500"
        />
        {/* Shadow Pedestal */}
        <div className="absolute bottom-8 w-32 h-4 bg-black/60 blur-xl rounded-full transform scale-x-150 opacity-40" />
      </div>

      {/* Content */}
      <div className="flex-grow p-8 flex flex-col justify-between relative z-10 bg-gradient-to-t from-black/80 to-transparent">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-header text-xl text-white tracking-widest leading-tight w-2/3 group-hover:text-gold transition-colors">
              {item.title}
            </h3>
            <span className="font-header text-gold text-lg gold-glow">{item.price}</span>
          </div>
          
          <p className="text-gray-400 font-body text-xs leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-2 group-hover:translate-y-0 translate-mask">
            {item.desc}
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
            {Object.entries(item.stats).map(([key, val]) => (
              <div key={key} className="text-center">
                <p className="text-[8px] text-gold/60 uppercase tracking-widest mb-1">{key}</p>
                <p className="text-[10px] text-white font-header">{val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-[9px] text-gray-500 font-body uppercase tracking-tighter italic">
            {item.origin}
          </span>
          <button className="px-4 py-2 border border-gold/40 text-gold text-[10px] tracking-widest hover:bg-gold hover:text-black transition-all duration-300 rounded-sm">
            EXPERIENCE
          </button>
        </div>
      </div>
    </div>
  );
};

const MenuOverlay = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const gridRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".menu-header-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out"
      });

      // Grid Stagger
      gsap.from(".card-entrance", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, []);

  const filteredItems = activeCategory === "ALL" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="relative z-10 bg-[#050505] min-h-screen overflow-x-hidden selection:bg-gold/30">
      {/* Background Texture/Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'radial-gradient(circle at center, #D4AF37 0.5px, transparent 0.5px)',
             backgroundSize: '30px 30px'
           }} 
      />
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[60] px-10 py-8 flex justify-end items-center mix-blend-difference">
        <div className="hidden md:flex items-center gap-8">
          <span className="text-gold/40 text-[10px] tracking-[0.5em] uppercase">Private Selection 2026</span>
          <div className="w-12 h-[1px] bg-gold/20" />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-32 relative z-10">
        
        {/* Editorial Header */}
        <header ref={headerRef} className="mb-24 text-center">
          <div className="menu-header-item inline-block mb-4 overflow-hidden">
            <span className="text-gold text-xs tracking-[0.8em] uppercase font-header">The Master Selection</span>
          </div>
          <h1 className="menu-header-item text-6xl md:text-8xl lg:text-9xl font-header font-extrabold text-white tracking-tighter leading-none mb-8">
            MENU <span className="font-light italic text-gold/80 italic-serif">EDITORIAL</span>
          </h1>
          <p className="menu-header-item max-w-2xl mx-auto text-gray-500 font-body text-sm md:text-base leading-relaxed tracking-wide">
            A curated journey through the heritage of the Indian subcontinent. Each dish is a signature reserve, 
            prepared with artisanal grains and secret heirloom spices.
          </p>
        </header>

        {/* Categories Carousel */}
        <div className="menu-header-item flex flex-wrap justify-center items-center gap-2 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase font-header transition-all duration-500 border ${
                activeCategory === cat 
                ? 'bg-gold text-black border-gold' 
                : 'bg-transparent text-gray-400 border-white/10 hover:border-gold/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Footer Accent */}
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
