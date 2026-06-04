import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How We Work' },
  { href: '#matrix', label: 'Pricing' },
];

export default function Navbar() {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top -60',
      onEnter: () =>
        gsap.to(navRef.current, {
          boxShadow: '0 4px 30px -4px rgba(0,0,0,0.12)',
          backgroundColor: 'rgba(255,255,255,0.97)',
          duration: 0.3,
        }),
      onLeaveBack: () =>
        gsap.to(navRef.current, {
          boxShadow: 'none',
          backgroundColor: 'rgba(255,255,255,0.80)',
          duration: 0.3,
        }),
    });
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    gsap.fromTo(
      mobileMenuRef.current,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' }
    );
  };

  const closeMenu = () => {
    gsap.to(mobileMenuRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => setMenuOpen(false),
    });
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  return (
    <nav ref={navRef} className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-2xl font-black tracking-tight text-indigo-600">
            Nexus<span className="text-slate-800">Flow</span>
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative group hover:text-indigo-600 transition-colors duration-200"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-indigo-600 rounded-full group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#quote-form"
            className="hidden md:inline-flex items-center bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200/60 transition-colors duration-200"
          >
            Free Proposal
          </a>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors items-center"
          >
            <span
              className={`block w-5 h-0.5 bg-slate-800 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-800 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-800 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu — always rendered, GSAP controls height */}
      <div ref={mobileMenuRef} className="md:hidden overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-slate-700 font-semibold py-3 px-3 rounded-xl hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quote-form"
            onClick={closeMenu}
            className="mt-2 bg-indigo-600 text-white font-bold text-sm px-5 py-3 rounded-xl hover:bg-indigo-700 text-center transition-colors"
          >
            Free Proposal
          </a>
        </div>
      </div>
    </nav>
  );
}
