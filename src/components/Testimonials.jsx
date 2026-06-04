import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Marcus Reynolds',
    role: 'Founder, Atlas Commerce',
    location: 'Austin, TX',
    avatar: 'MR',
    avatarBg: 'bg-indigo-600',
    quote:
      'NexusFlow rebuilt our Shopify store and our conversion rate jumped 40% in the first month. They actually understand e-commerce — not just design. Highly recommend.',
  },
  {
    name: 'Sarah Chen',
    role: 'Marketing Director, Luminary Brands',
    location: 'New York, NY',
    avatar: 'SC',
    avatarBg: 'bg-teal-600',
    quote:
      'Their Google Ads team cut our cost-per-acquisition by 55% while we scaled our budget 3x. Clear reporting, zero fluff. Best agency we\'ve ever worked with.',
  },
  {
    name: 'David Walsh',
    role: 'CEO, TechBridge Solutions',
    location: 'Chicago, IL',
    avatar: 'DW',
    avatarBg: 'bg-violet-600',
    quote:
      'Our LinkedIn B2B campaigns generated 3x more qualified leads compared to everything we\'d done before. The ROI was undeniable within 60 days.',
  },
];

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Testimonials() {
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
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-4 bg-slate-50 border-y border-slate-200/60">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">Client Results</span>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight mt-2">
            Trusted by Growing US Brands
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            Real outcomes from real clients — not vanity metrics.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-slate-200/70 shadow-sm flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => <StarIcon key={s} />)}
              </div>

              {/* Quote */}
              <p className="text-slate-700 text-sm leading-relaxed flex-1">"{t.quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
