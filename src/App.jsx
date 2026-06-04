import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBar from './components/MetricsBar';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ProcessPipeline from './components/ProcessPipeline';
import QuoteForm from './components/QuoteForm';

gsap.registerPlugin(ScrollTrigger);

const advantages = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Hidden Fees',
    desc: "Every proposal is itemized. You know exactly what you're paying for — development hours, ad spend, and deliverables — before you sign anything.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Fast Execution',
    desc: 'Most projects go live in 2–4 weeks. We move fast without cutting corners because we have pre-built systems for the most common digital challenges.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'ROI-First Thinking',
    desc: 'Every decision — from your site architecture to your ad targeting — is evaluated through one lens: will this generate more revenue than it costs?',
  },
];

function AdvantagesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="matrix" ref={sectionRef} className="py-28 px-4 bg-slate-100 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">Why NexusFlow</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-2">
            Transparent Pricing. Real Results.
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            We don't pad retainers or bill for strategy decks. Your budget goes directly into execution.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-5">
                {adv.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{adv.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Hero />
      <MetricsBar />
      <Services />
      <Testimonials />
      <ProcessPipeline />
      <AdvantagesSection />
      <QuoteForm />

      <footer className="bg-slate-950 text-slate-500 py-14 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <span className="text-xl font-black tracking-tight text-indigo-400">
                Nexus<span className="text-white">Flow</span>
              </span>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">
                Full-service digital agency helping US brands scale through better web infrastructure and smarter advertising.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#services" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Shopify Development</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Meta & Google Ads</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">LinkedIn B2B Ads</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">CRO & Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Get In Touch</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>
                  <a href="mailto:hello@nexusflow.io" className="hover:text-white transition-colors">
                    hello@nexusflow.io
                  </a>
                </li>
                <li>
                  <a href="#quote-form" className="hover:text-white transition-colors">
                    Request a Free Proposal →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} NexusFlow Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
