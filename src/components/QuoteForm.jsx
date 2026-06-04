import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const N8N_WEBHOOK_URL = 'https://your-n8n-domain.com/webhook/lead-capture';

const trustBadges = [
  { icon: '⚡', text: 'Response within 24 hours' },
  { icon: '🔒', text: 'Your info stays private' },
  { icon: '📋', text: 'Free, no-obligation proposal' },
];

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'Shopify Store Development',
    estimatedBudget: '$1,000 – $3,000',
    requirements: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef(null);
  const formCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = () => {
    gsap.to(formCardRef.current, {
      boxShadow: '0 25px 60px -12px rgba(99, 102, 241, 0.12)',
      duration: 0.4,
    });
  };

  const handleBlur = () => {
    gsap.to(formCardRef.current, {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.08)',
      duration: 0.4,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const btn = e.target.querySelector('button[type="submit"]');
    gsap.timeline()
      .to(btn, { scale: 0.96, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'NexusFlow Landing Page',
        }),
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: "You're all set! We'll send your custom proposal within 24 hours.",
        });
        setFormData({
          fullName: '', email: '', phone: '', company: '',
          serviceRequired: 'Shopify Store Development',
          estimatedBudget: '$1,000 – $3,000',
          requirements: '',
        });
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please email us directly at hello@nexusflow.io',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm';
  const labelClass = 'block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2';

  return (
    <section id="quote-form" ref={sectionRef} className="py-28 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">Get Started</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
            Start Your Project Today
          </h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Tell us what you need and we'll build a custom proposal with timeline and budget — no strings attached.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
              <span>{badge.icon}</span>
              {badge.text}
            </div>
          ))}
        </div>

        <div
          ref={formCardRef}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/60"
          style={{ opacity: 0 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text" name="fullName" required
                  value={formData.fullName} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass} placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email" name="email" required
                  value={formData.email} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass} placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel" name="phone"
                  value={formData.phone} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass} placeholder="+1 (555) 019-9000"
                />
              </div>
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text" name="company"
                  value={formData.company} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={inputClass} placeholder="Acme Inc."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Service Needed</label>
                <select
                  name="serviceRequired"
                  value={formData.serviceRequired} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option>Shopify Store Development</option>
                  <option>Custom Web Development (React)</option>
                  <option>Meta Ads (Facebook & Instagram)</option>
                  <option>Google Search & Performance Max</option>
                  <option>LinkedIn B2B Advertising</option>
                  <option>Full-Suite Growth Marketing</option>
                  <option>Conversion Rate Optimization</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Monthly Budget</label>
                <select
                  name="estimatedBudget"
                  value={formData.estimatedBudget} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option>Under $1,000</option>
                  <option>$1,000 – $3,000</option>
                  <option>$3,000 – $7,000</option>
                  <option>$7,000 – $15,000</option>
                  <option>$15,000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Project Details *</label>
              <textarea
                name="requirements" required rows="4"
                value={formData.requirements} onChange={handleChange}
                onFocus={handleFocus} onBlur={handleBlur}
                className={inputClass}
                placeholder="Describe your goals, current challenges, and any specific requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-bold py-4 rounded-xl text-sm uppercase tracking-wider text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {isSubmitting ? 'Sending your request...' : 'Request My Free Proposal →'}
            </button>

            {status.message && (
              <div
                className={`mt-2 p-4 rounded-xl text-center text-sm font-semibold border ${
                  status.type === 'success'
                    ? 'bg-teal-50 text-teal-800 border-teal-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
