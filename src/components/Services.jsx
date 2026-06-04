import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ShopifyIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const TrendIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const agencyServices = [
  {
    Icon: WebIcon,
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Web Development',
    desc: 'High-performance React applications built for speed, SEO, and conversions. We target sub-2s load times and score 95+ on Core Web Vitals — so you rank higher and convert better.',
  },
  {
    Icon: ShopifyIcon,
    color: 'bg-emerald-50 text-emerald-600',
    title: 'Shopify Development',
    desc: 'Custom Liquid themes, app integrations, and full store migrations. Every build is optimized for checkout speed and conversion rate — because your store\'s performance directly drives revenue.',
  },
  {
    Icon: TrendIcon,
    color: 'bg-pink-50 text-pink-600',
    title: 'Meta Ads Management',
    desc: 'Full-funnel Facebook & Instagram campaigns with dynamic creative testing, precise audience segmentation, and clean pixel attribution to stabilize and scale your ROAS.',
  },
  {
    Icon: SearchIcon,
    color: 'bg-sky-50 text-sky-600',
    title: 'Google Paid Search',
    desc: 'Intent-driven Search, Performance Max, and Shopping campaigns built to capture buyers at the bottom of the funnel. We own the keywords your competitors are missing.',
  },
  {
    Icon: BriefcaseIcon,
    color: 'bg-violet-50 text-violet-600',
    title: 'LinkedIn B2B Ads',
    desc: 'Qualified B2B pipeline generation using laser-targeted filtering by job title, company size, and industry. Ideal for SaaS, agencies, and enterprise service providers.',
  },
  {
    Icon: BoltIcon,
    color: 'bg-amber-50 text-amber-600',
    title: 'Conversion Rate Optimization',
    desc: 'Data-driven site audits, heatmap analysis, A/B testing, and landing page redesigns that turn your existing traffic into measurable revenue — without spending more on ads.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

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
        gridRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // 3D card tilt on hover
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(card, {
      rotationX: (y - 0.5) * -10,
      rotationY: (x - 0.5) * 10,
      scale: 1.025,
      transformPerspective: 900,
      boxShadow: '0 24px 48px -12px rgba(99, 102, 241, 0.14)',
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
      duration: 0.55,
      ease: 'power3.out',
    });
  };

  return (
    <section id="services" ref={sectionRef} className="py-28 px-4 max-w-6xl mx-auto">
      <div ref={titleRef} className="text-center mb-20">
        <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">What We Do</span>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-2">
          Everything Your Brand Needs to Grow
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We cover the full digital stack — from your storefront to your ad accounts — so you never have to coordinate between five different agencies.
        </p>
      </div>

      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agencyServices.map((service, idx) => (
          <div
            key={idx}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-white p-8 rounded-2xl border border-slate-200/70 shadow-sm transition-colors will-change-transform cursor-default"
          >
            <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-6`}>
              <service.Icon />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
