import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { themeConfig, textGradientStyle, themeBorder } from '../config/themeConfig';
import { usePluckCMS } from '../hooks/usePluckCMS';

gsap.registerPlugin(ScrollTrigger);

// ── Static fallback testimonial data ─────────────────────────────────────────
// Rendered when Pluck CMS is unavailable.
// Update copy in the CMS dashboard → testimonials endpoint without redeploying.
const STATIC_TESTIMONIALS = {
  eyebrow:          'Client Results',
  heading:          'Trusted by',
  heading_gradient: 'Growing US Brands',
  subtext:          'Real outcomes from real clients — not vanity metrics.',
  items: [
    {
      id:        'marcus',
      name:      'Marcus Reynolds',
      role:      'Founder, Atlas Commerce',
      location:  'Austin, TX',
      avatar:    'MR',
      avatarBg:  themeConfig.colors.primary,
      result:    '+40% conversion rate in 30 days',
      quote:     "NexusFlow rebuilt our Shopify store and our conversion rate jumped 40% in month one. They didn't just make it look good — they made it sell. First agency that actually moved the needle.",
    },
    {
      id:        'sarah',
      name:      'Sarah Chen',
      role:      'Marketing Director, Luminary Brands',
      location:  'New York, NY',
      avatar:    'SC',
      avatarBg:  themeConfig.colors.secondary,
      result:    '55% lower CPA, 3× budget scaled',
      quote:     "Their Google Ads team cut our cost-per-acquisition by 55% while we tripled the budget. Weekly reports, zero fluff. I've worked with four agencies — NexusFlow is the only one I'd recommend without hesitation.",
    },
    {
      id:        'david',
      name:      'David Walsh',
      role:      'CEO, TechBridge Solutions',
      location:  'Chicago, IL',
      avatar:    'DW',
      avatarBg:  '#7c3aed',
      result:    '3× qualified leads in 60 days',
      quote:     "LinkedIn campaigns generated 3× more qualified demo requests in 60 days. The proposal they sent before we even signed showed they'd actually done their homework on our business.",
    },
  ],
};

// ── Star icon ─────────────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" style={{ color: '#fbbf24' }}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ t }) {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-sm flex flex-col gap-5"
      style={{ border: themeBorder('border') }}
    >
      {/* Stars + result badge */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap border"
          style={{
            color:           '#0f766e',
            backgroundColor: '#f0fdfa',
            borderColor:     '#99f6e4',
          }}
        >
          {t.result}
        </span>
      </div>

      {/* Quote — supports CMS rich-text via quote_html */}
      {t.quote_html ? (
        <div
          className="prose prose-sm max-w-none flex-1"
          style={{ color: themeConfig.colors.headerText }}
          dangerouslySetInnerHTML={{ __html: t.quote_html }}
        />
      ) : (
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: '#334155' }}
        >
          "{t.quote}"
        </p>
      )}

      {/* Author */}
      <div
        className="flex items-center gap-3 pt-2"
        style={{ borderTop: themeBorder('border') }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: t.avatarBg || themeConfig.colors.primary }}
        >
          {t.avatar}
        </div>
        <div>
          <div
            className="font-bold text-sm"
            style={{ color: themeConfig.colors.headerText }}
          >
            {t.name}
          </div>
          <div
            className="text-xs"
            style={{ color: themeConfig.colors.mutedText }}
          >
            {t.role} · {t.location}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { data: cms } = usePluckCMS('testimonials', STATIC_TESTIMONIALS);

  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const testimonials =
    (cms.items && cms.items.length > 0)
      ? cms.items
      : STATIC_TESTIMONIALS.items;

  return (
    <section
      ref={sectionRef}
      id="testimonials-inner"
      className="py-28 px-4 border-y"
      style={{
        backgroundColor: themeConfig.colors.surface,
        borderColor:     themeConfig.colors.border,
        fontFamily:      themeConfig.fonts.family,
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div ref={titleRef} className="text-center mb-16">
          <span
            className={`${themeConfig.fonts.tailwind.eyebrow} font-bold tracking-widest uppercase`}
            style={{ color: themeConfig.colors.primary }}
          >
            {cms.eyebrow}
          </span>

          <h2
            className={`${themeConfig.fonts.tailwind.sectionHeading} font-extrabold tracking-tight mt-2`}
            style={{ color: themeConfig.colors.headerText }}
          >
            {cms.heading}{' '}
            <span style={textGradientStyle(themeConfig.gradients.brand)}>
              {cms.heading_gradient}
            </span>
          </h2>

          {cms.subtext_html ? (
            <div
              className="prose prose-sm md:prose-base max-w-xl mx-auto mt-4"
              dangerouslySetInnerHTML={{ __html: cms.subtext_html }}
            />
          ) : (
            <p
              className={`${themeConfig.fonts.tailwind.bodyLead} mt-4 max-w-xl mx-auto`}
              style={{ color: themeConfig.colors.bodyText }}
            >
              {cms.subtext}
            </p>
          )}
        </div>

        {/* ── Testimonial cards ───────────────────────────────────────────── */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id || i} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}
