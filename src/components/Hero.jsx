import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const socialProof = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '$12M+', label: 'Revenue Generated' },
  { value: '98%', label: 'Client Retention' },
];

export default function Hero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Looping ambient orb animations
      gsap.to(orb1Ref.current, {
        y: -55, x: 35, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
      gsap.to(orb2Ref.current, {
        y: 45, x: -35, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5,
      });
      gsap.to(orb3Ref.current, {
        y: -30, x: 25, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8,
      });

      // Entry animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(badgeRef.current,
          { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.1 })
        .fromTo(line1Ref.current,
          { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.6')
        .fromTo(line2Ref.current,
          { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.0 }, '-=0.75')
        .fromTo(descRef.current,
          { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(Array.from(buttonsRef.current.children),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, '-=0.5')
        .fromTo(Array.from(statsRef.current.children),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax for orbs
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

    gsap.to(orb1Ref.current, { x: x * 45, y: y * 30, duration: 1.6, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(orb2Ref.current, { x: x * -28, y: y * -22, duration: 2.0, ease: 'power2.out', overwrite: 'auto' });
    gsap.to(orb3Ref.current, { x: x * 20, y: y * 35, duration: 1.3, ease: 'power2.out', overwrite: 'auto' });
  };

  // Magnetic CTA
  const handleCtaMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  };

  const handleCtaMouseLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white py-32 md:py-40 px-4 text-center"
    >
      {/* Animated ambient orbs */}
      <div
        ref={orb1Ref}
        className="absolute -top-32 -right-20 w-[580px] h-[580px] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"
      />
      <div
        ref={orb2Ref}
        className="absolute -bottom-24 -left-20 w-[480px] h-[480px] rounded-full bg-teal-500/15 blur-[100px] pointer-events-none"
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/3 w-[320px] h-[320px] rounded-full bg-sky-500/10 blur-[80px] pointer-events-none"
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #818cf8 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 bg-white/5 text-indigo-300 font-semibold text-xs uppercase px-4 py-2 rounded-full border border-white/10 tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          Full-Service Digital Growth Agency
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight mt-6 mb-6 leading-[1.06]">
          <span ref={line1Ref} className="block">
            We Build Digital Systems That
          </span>
          <span
            ref={line2Ref}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-400"
          >
            Scale Your Revenue.
          </span>
        </h1>

        {/* Description */}
        <p ref={descRef} className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          From blazing-fast Shopify stores to high-ROAS ad campaigns — we run the full digital stack for ambitious US brands. Tell us your goals and get a custom proposal within 24 hours.
        </p>

        {/* CTAs */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#quote-form"
            onMouseMove={handleCtaMouseMove}
            onMouseLeave={handleCtaMouseLeave}
            className="group relative w-full sm:w-auto overflow-hidden bg-teal-400 text-slate-950 font-extrabold px-10 py-4 rounded-xl shadow-xl shadow-teal-400/20 hover:bg-teal-300 transition-colors text-center inline-block"
          >
            <span className="relative z-10">Get a Free Proposal</span>
            <span className="animate-shimmer absolute inset-0 bg-white/25 pointer-events-none" />
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto group text-slate-300 font-semibold px-6 py-4 hover:text-white transition-colors text-center inline-flex items-center justify-center gap-2"
          >
            See Our Services
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

        {/* Social proof */}
        <div
          ref={statsRef}
          className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-x-12 gap-y-6"
        >
          {socialProof.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
