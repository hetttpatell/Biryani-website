import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ContactPage = ({ onBack }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [copied, setCopied] = useState(false);
  
  const phoneNumber = "+91 98765 43210";
  const address = "Connaught Place, New Delhi, Delhi 110001";
  const email = "hello@houseofbiryani.com";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".contact-item", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      gsap.from(".contact-bg", {
        scale: 1.1,
        opacity: 0,
        duration: 2,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center px-6 overflow-hidden pt-20"
    >
      {/* Background Decorative Elements */}
      <div className="contact-bg absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[150px]" />
        {/* Modern Grid Line */}
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      </div>


      <div ref={contentRef} className="relative z-10 w-full max-w-4xl">
        <div className="mb-20 text-center">
          <div className="contact-item flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold/30" />
            <span className="text-gold font-header tracking-[0.3em] text-xs uppercase">Get in Touch</span>
            <div className="w-12 h-[1px] bg-gold/30" />
          </div>
          <h1 className="contact-item section-title text-6xl md:text-8xl font-header font-bold text-white mb-8 tracking-tighter">
            Let's <span className="italic font-light text-gold/80">Connect</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Phone Section */}
          <div className="contact-item group">
            <h3 className="text-gold/40 text-[10px] uppercase tracking-[0.3em] mb-4 font-header">Calling</h3>
            <div 
              onClick={handleCopyPhone}
              className="relative cursor-pointer"
            >
              <div className="text-2xl md:text-3xl font-header text-white group-hover:text-gold transition-colors duration-300">
                {phoneNumber}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${copied ? 'bg-green-500 scale-125' : 'bg-gold/40 scale-100'} transition-all duration-300 animate-pulse`} />
                <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-header">
                  {copied ? 'Copied to Clipboard' : 'Click to Copy Number'}
                </span>
              </div>
              {/* Modern hover underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full" />
            </div>
          </div>

          {/* Address Section */}
          <div className="contact-item group">
            <h3 className="text-gold/40 text-[10px] uppercase tracking-[0.3em] mb-4 font-header">Location</h3>
            <div className="text-xl md:text-2xl font-header text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
              {address}
            </div>
            <div className="mt-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="text-[9px] text-gold/60 hover:text-gold uppercase tracking-[0.2em] font-header flex items-center gap-2 transition-all"
              >
                <span>Direct Map View</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>
          </div>

          {/* Email/Social Section */}
          <div className="contact-item group">
            <h3 className="text-gold/40 text-[10px] uppercase tracking-[0.3em] mb-4 font-header">Direct Inquiry</h3>
            <div className="text-xl md:text-2xl font-header text-white/80 group-hover:text-white transition-colors duration-300">
              {email}
            </div>
            <div className="mt-8 flex gap-6">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-[10px] text-white/30 hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="contact-item mt-32 p-12 glass-card rounded-none border-gold/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left w-full">
              <h4 className="text-2xl font-header text-white mb-2">Ready to taste the <span className="text-gold italic">Legeacy?</span></h4>
              <p className="text-white/40 text-xs tracking-widest font-header uppercase">We are open daily from 11:00 AM — 11:00 PM</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
