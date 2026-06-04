import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery & Audit',
    desc: 'We dig into your analytics, ad accounts, and site infrastructure to map exactly where revenue is being left on the table.',
  },
  {
    num: '02',
    title: 'Strategy & Build',
    desc: 'Your dedicated team engineers the solution — whether that\'s a new Shopify store, React app, or a full paid media framework.',
  },
  {
    num: '03',
    title: 'Launch & Acquire',
    desc: 'We deploy your campaigns and assets together, so your paid traffic lands on a fully optimized destination from day one.',
  },
  {
    num: '04',
    title: 'Optimize & Scale',
    desc: 'Weekly data reviews and continuous A/B testing keep your ROAS climbing and your cost per acquisition falling.',
  },
];

export default function ProcessPipeline() {
  const containerRef = useRef(null);
  const stepsRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 78%' },
        }
      );

      // Animated connecting line
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.4, ease: 'power2.inOut',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 75%' },
        }
      );

      // Steps staggered reveal
      gsap.fromTo(
        stepsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: stepsRef.current, start: 'top 78%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Subtle hover lift on each step card
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { y: -6, borderColor: 'rgba(99,102,241,0.4)', duration: 0.3, ease: 'power2.out' });
  };
  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { y: 0, borderColor: 'rgba(51,65,85,0.5)', duration: 0.4, ease: 'power2.out' });
  };

  return (
    <section id="process" ref={containerRef} className="py-28 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div ref={titleRef} className="mb-16 max-w-xl">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">How It Works</span>
          <h2 className="text-3xl font-black tracking-tight mt-2 text-white sm:text-4xl">
            From Brief to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-400">
              Revenue
            </span>{' '}
            in 4 Steps
          </h2>
          <p className="mt-3 text-slate-400 leading-relaxed">
            A streamlined delivery process built to get you results fast — without the back-and-forth of a typical agency engagement.
          </p>
        </div>

        {/* Connecting line (desktop only) */}
        <div className="hidden md:block relative mb-0 h-0">
          <div className="absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-slate-800 overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-left bg-gradient-to-r from-indigo-500 via-sky-400 to-teal-400"
              style={{ scaleX: 0 }}
            />
          </div>
        </div>

        <div ref={stepsRef} className="grid md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative group p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl transition-colors will-change-transform"
            >
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-400/60 to-transparent mb-4 leading-none">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
